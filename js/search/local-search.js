/**
 * Refer to hexo-generator-searchdb
 * https://github.com/next-theme/hexo-generator-searchdb/blob/main/dist/search.js
 * Modified by hexo-theme-butterfly
 */

class LocalSearch {
  constructor ({
    path = '',
    unescape = false,
    top_n_per_article = 1
  }) {
    this.path = path
    this.unescape = unescape
    this.top_n_per_article = top_n_per_article
    this.isfetched = false
    this.datas = null
  }

  getIndexByWord (words, text, caseSensitive = false) {
    const index = []
    const included = new Set()

    if (!caseSensitive) {
      text = text.toLowerCase()
    }
    words.forEach(word => {
      if (this.unescape) {
        const div = document.createElement('div')
        div.innerText = word
        word = div.innerHTML
      }
      const wordLen = word.length
      if (wordLen === 0) return
      let startPosition = 0
      let position = -1
      if (!caseSensitive) {
        word = word.toLowerCase()
      }
      while ((position = text.indexOf(word, startPosition)) > -1) {
        index.push({ position, word })
        included.add(word)
        startPosition = position + wordLen
      }
    })
    // Sort index by position of keyword
    index.sort((left, right) => {
      if (left.position !== right.position) {
        return left.position - right.position
      }
      return right.word.length - left.word.length
    })
    return [index, included]
  }

  // Merge hits into slices
  mergeIntoSlice (start, end, index) {
    let item = index[0]
    let { position, word } = item
    const hits = []
    const count = new Set()
    while (position + word.length <= end && index.length !== 0) {
      count.add(word)
      hits.push({
        position,
        length: word.length
      })
      const wordEnd = position + word.length

      // Move to next position of hit
      index.shift()
      while (index.length !== 0) {
        item = index[0]
        position = item.position
        word = item.word
        if (wordEnd > position) {
          index.shift()
        } else {
          break
        }
      }
    }
    return {
      hits,
      start,
      end,
      count: count.size
    }
  }

  // Highlight title and content
  highlightKeyword (val, slice) {
    let result = ''
    let index = slice.start
    for (const { position, length } of slice.hits) {
      result += val.substring(index, position)
      index = position + length
      result += `<mark class="search-keyword">${val.substr(position, length)}</mark>`
    }
    result += val.substring(index, slice.end)
    return result
  }

  parseSearchContent (html = '') {
    const container = document.createElement('div')
    const headings = []
    let text = ''

    container.innerHTML = html

    const walk = node => {
      if (node.nodeType === Node.TEXT_NODE) {
        text += node.nodeValue
        return
      }

      if (node.nodeType !== Node.ELEMENT_NODE) return

      if (node.matches('script, style')) return

      if (/^H[1-6]$/.test(node.tagName) && node.id) {
        headings.push({
          id: node.id,
          position: text.length
        })
      }

      node.childNodes.forEach(walk)
    }

    container.childNodes.forEach(walk)

    return {
      content: text,
      headings
    }
  }

  findHeadingIdBySlice (headings = [], slice) {
    if (!slice || headings.length === 0) return ''

    const targetHit = this.findBestHitBySlice(slice)
    const targetPosition = targetHit ? targetHit.position : slice.start
    let headingId = ''

    for (const heading of headings) {
      if (heading.position > targetPosition) break
      headingId = heading.id
    }

    return headingId
  }

  findBestHitBySlice (slice) {
    if (!slice || !slice.hits.length) return null

    return slice.hits.reduce((bestHit, hit) => {
      if (hit.length !== bestHit.length) {
        return hit.length > bestHit.length ? hit : bestHit
      }

      return hit.position < bestHit.position ? hit : bestHit
    })
  }

  findHitIndexBySlice (hits = [], contentLength = 0, slice) {
    if (!slice || !slice.hits.length || hits.length === 0) return -1

    const targetHit = this.findBestHitBySlice(slice)
    const visibleHits = this.mergeIntoSlice(0, contentLength, hits.map(hit => ({ ...hit }))).hits

    return visibleHits.findIndex(hit => (
      hit.position === targetHit.position && hit.length === targetHit.length
    ))
  }

  findHitIndexesBySlice (hits = [], contentLength = 0, slice) {
    if (!slice || !slice.hits.length || hits.length === 0) return []

    const visibleHits = this.mergeIntoSlice(0, contentLength, hits.map(hit => ({ ...hit }))).hits

    return slice.hits.map(targetHit => visibleHits.findIndex(hit => (
      hit.position === targetHit.position && hit.length === targetHit.length
    ))).filter(index => index > -1)
  }

  buildResultUrl (rawUrl, keywords, headings, contentHits, contentLength, slice) {
    const resultUrl = new URL(rawUrl, location.origin)
    resultUrl.searchParams.append('highlight', keywords.join(' '))

    const searchHitIndex = this.findHitIndexBySlice(contentHits, contentLength, slice)
    if (searchHitIndex > -1) resultUrl.searchParams.append('searchHit', searchHitIndex)

    const searchHitIndexes = this.findHitIndexesBySlice(contentHits, contentLength, slice)
    if (searchHitIndexes.length) resultUrl.searchParams.append('searchHits', searchHitIndexes.join(','))

    const headingId = this.findHeadingIdBySlice(headings, slice)
    if (headingId) resultUrl.hash = headingId

    return resultUrl.href
  }

  getResultItems (keywords) {
    const resultItems = []
    this.datas.forEach(({ title, content, headings, url }) => {
      // The number of different keywords included in the article.
      const [indexOfTitle, keysOfTitle] = this.getIndexByWord(keywords, title)
      const [indexOfContent, keysOfContent] = this.getIndexByWord(keywords, content)
      const contentHits = indexOfContent.map(hit => ({ ...hit }))
      const includedCount = new Set([...keysOfTitle, ...keysOfContent]).size

      // Show search results
      const hitCount = indexOfTitle.length + indexOfContent.length
      if (hitCount === 0) return

      const slicesOfTitle = []
      if (indexOfTitle.length !== 0) {
        slicesOfTitle.push(this.mergeIntoSlice(0, title.length, indexOfTitle))
      }

      let slicesOfContent = []
      while (indexOfContent.length !== 0) {
        const item = indexOfContent[0]
        const { position } = item
        // Cut out 120 characters. The maxlength of .search-input is 80.
        const start = Math.max(0, position - 20)
        const end = Math.min(content.length, position + 100)
        slicesOfContent.push(this.mergeIntoSlice(start, end, indexOfContent))
      }

      // Sort slices in content by included keywords' count and hits' count
      slicesOfContent.sort((left, right) => {
        if (left.count !== right.count) {
          return right.count - left.count
        } else if (left.hits.length !== right.hits.length) {
          return right.hits.length - left.hits.length
        }
        return left.start - right.start
      })

      // Select top N slices in content
      const upperBound = parseInt(this.top_n_per_article, 10)
      if (upperBound >= 0) {
        slicesOfContent = slicesOfContent.slice(0, upperBound)
      }

      let resultItem = ''
      const titleUrl = this.buildResultUrl(url, keywords, headings, contentHits, content.length, slicesOfContent[0])

      if (slicesOfTitle.length !== 0) {
        resultItem += `<div class="local-search-hit-item"><a href="${titleUrl}"><span class="search-result-title">${this.highlightKeyword(title, slicesOfTitle[0])}</span></a>`
      } else {
        resultItem += `<div class="local-search-hit-item"><a href="${titleUrl}"><span class="search-result-title">${title}</span></a>`
      }

      slicesOfContent.forEach(slice => {
        const sliceUrl = this.buildResultUrl(url, keywords, headings, contentHits, content.length, slice)
        resultItem += `<a href="${sliceUrl}"><p class="search-result">${this.highlightKeyword(content, slice)}...</p></a>`
      })

      resultItem += '</div>'
      resultItems.push({
        item: resultItem,
        id: resultItems.length,
        hitCount,
        includedCount
      })
    })
    return resultItems
  }

  fetchData () {
    const isXml = !this.path.endsWith('json')
    fetch(this.path)
      .then(response => response.text())
      .then(res => {
        // Get the contents from search data
        this.isfetched = true
        this.datas = isXml
          ? [...new DOMParser().parseFromString(res, 'text/xml').querySelectorAll('entry')].map(element => ({
              title: element.querySelector('title').textContent,
              content: element.querySelector('content').textContent,
              url: element.querySelector('url').textContent
            }))
          : JSON.parse(res)
        // Only match articles with non-empty titles
        this.datas = this.datas.filter(data => data.title).map(data => {
          const parsedContent = this.parseSearchContent(data.content || '')
          data.title = data.title.trim()
          data.content = parsedContent.content.trim()
          data.headings = parsedContent.headings
          data.url = decodeURIComponent(data.url).replace(/\/{2,}/g, '/')
          return data
        })
        // Remove loading animation
        window.dispatchEvent(new Event('search:loaded'))
      })
  }

  // Highlight by wrapping node in mark elements with the given class name
  highlightText (node, slice, className) {
    const val = node.nodeValue
    let index = slice.start
    const children = []
    for (const { position, length } of slice.hits) {
      const text = document.createTextNode(val.substring(index, position))
      index = position + length
      const mark = document.createElement('mark')
      mark.className = className
      mark.appendChild(document.createTextNode(val.substr(position, length)))
      children.push(text, mark)
    }
    node.nodeValue = val.substring(index, slice.end)
    children.forEach(element => {
      node.parentNode.insertBefore(element, node)
    })
  }

  getSearchHitIndexes () {
    const params = new URL(location.href).searchParams
    const searchHits = params.get('searchHits')
    if (!searchHits) return null

    const indexes = searchHits.split(',')
      .map(index => Number.parseInt(index, 10))
      .filter(index => Number.isInteger(index) && index >= 0)

    if (!indexes.length) return null

    return {
      list: indexes,
      set: new Set(indexes)
    }
  }

  scrollToSearchTarget () {
    const params = new URL(location.href).searchParams
    const hitIndex = Number.parseInt(params.get('searchHit'), 10)
    const selectedHitIndexes = this.getSearchHitIndexes()
    const scrollToElement = element => {
      setTimeout(() => {
        if (window.btf && btf.getEleTop && btf.scrollToDest) {
          btf.scrollToDest(btf.getEleTop(element), 300)
        } else {
          window.scrollTo({
            top: element.getBoundingClientRect().top + window.scrollY - 70,
            behavior: 'smooth'
          })
        }
      }, 0)
      return true
    }

    if (Number.isInteger(hitIndex) && hitIndex >= 0) {
      let targetMarkIndex = hitIndex
      if (selectedHitIndexes) {
        const selectedIndex = selectedHitIndexes.list.indexOf(hitIndex)
        targetMarkIndex = selectedIndex > -1 ? selectedIndex : 0
      }

      const targetHit = document.querySelectorAll('#article-container mark.search-keyword')[targetMarkIndex]
      if (targetHit) return scrollToElement(targetHit)
    }

    if (!location.hash) return false

    let headingId = location.hash.slice(1)
    try {
      headingId = decodeURIComponent(headingId)
    } catch (err) {
      return false
    }

    const targetHeading = document.getElementById(headingId)
    return targetHeading ? scrollToElement(targetHeading) : false
  }

  // Highlight the search words provided in the url in the text
  highlightSearchWords (body) {
    const params = new URL(location.href).searchParams.get('highlight')
    const keywords = params ? params.split(' ') : []
    if (!keywords.length || !body) return
    const selectedHitIndexes = this.getSearchHitIndexes()
    let hitIndex = 0
    const walk = document.createTreeWalker(body, NodeFilter.SHOW_TEXT, null)
    const allNodes = []
    while (walk.nextNode()) {
      if (!walk.currentNode.parentNode.matches('button, select, textarea, .mermaid')) allNodes.push(walk.currentNode)
    }
    allNodes.forEach(node => {
      const [indexOfNode] = this.getIndexByWord(keywords, node.nodeValue)
      if (!indexOfNode.length) return
      const slice = this.mergeIntoSlice(0, node.nodeValue.length, indexOfNode)
      const hits = []

      slice.hits.forEach(hit => {
        if (!selectedHitIndexes || selectedHitIndexes.set.has(hitIndex)) {
          hits.push(hit)
        }
        hitIndex += 1
      })

      if (!hits.length) return

      this.highlightText(node, {
        hits,
        start: 0,
        end: node.nodeValue.length
      }, 'search-keyword')
    })
    this.scrollToSearchTarget()
  }
}

window.addEventListener('load', () => {
// Search
  const { path, top_n_per_article, unescape, languages } = GLOBAL_CONFIG.localSearch
  const localSearch = new LocalSearch({
    path,
    top_n_per_article,
    unescape
  })

  const input = document.querySelector('#local-search-input input')
  const statsItem = document.getElementById('local-search-stats-wrap')
  const $loadingStatus = document.getElementById('loading-status')
  const isXml = !path.endsWith('json')

  const inputEventFunction = () => {
    if (!localSearch.isfetched) return
    let searchText = input.value.trim().toLowerCase()
    isXml && (searchText = searchText.replace(/</g, '&lt;').replace(/>/g, '&gt;'))
    if (searchText !== '') $loadingStatus.innerHTML = '<i class="fas fa-spinner fa-pulse"></i>'
    const keywords = searchText.split(/[-\s]+/)
    const container = document.getElementById('local-search-results')
    let resultItems = []
    if (searchText.length > 0) {
    // Perform local searching
      resultItems = localSearch.getResultItems(keywords)
    }
    if (keywords.length === 1 && keywords[0] === '') {
      container.textContent = ''
      statsItem.textContent = ''
    } else if (resultItems.length === 0) {
      container.textContent = ''
      const statsDiv = document.createElement('div')
      statsDiv.className = 'search-result-stats'
      statsDiv.textContent = languages.hits_empty.replace(/\$\{query}/, searchText)
      statsItem.innerHTML = statsDiv.outerHTML
    } else {
      resultItems.sort((left, right) => {
        if (left.includedCount !== right.includedCount) {
          return right.includedCount - left.includedCount
        } else if (left.hitCount !== right.hitCount) {
          return right.hitCount - left.hitCount
        }
        return right.id - left.id
      })

      const stats = languages.hits_stats.replace(/\$\{hits}/, resultItems.length)

      container.innerHTML = `<div class="search-result-list">${resultItems.map(result => result.item).join('')}</div>`
      statsItem.innerHTML = `<hr><div class="search-result-stats">${stats}</div>`
      window.pjax && window.pjax.refresh(container)
    }

    $loadingStatus.textContent = ''
  }

  let loadFlag = false
  const $searchMask = document.getElementById('search-mask')
  const $searchDialog = document.querySelector('#local-search .search-dialog')

  // fix safari
  const fixSafariHeight = () => {
    if (window.innerWidth < 768) {
      $searchDialog.style.setProperty('--search-height', window.innerHeight + 'px')
    }
  }

  const openSearch = () => {
    const bodyStyle = document.body.style
    bodyStyle.width = '100%'
    bodyStyle.overflow = 'hidden'
    btf.animateIn($searchMask, 'to_show 0.5s')
    btf.animateIn($searchDialog, 'titleScale 0.5s')
    setTimeout(() => { input.focus() }, 300)
    if (!loadFlag) {
      !localSearch.isfetched && localSearch.fetchData()
      input.addEventListener('input', inputEventFunction)
      loadFlag = true
    }
    // shortcut: ESC
    document.addEventListener('keydown', function f (event) {
      if (event.code === 'Escape') {
        closeSearch()
        document.removeEventListener('keydown', f)
      }
    })

    fixSafariHeight()
    window.addEventListener('resize', fixSafariHeight)
  }

  const closeSearch = () => {
    const bodyStyle = document.body.style
    bodyStyle.width = ''
    bodyStyle.overflow = ''
    btf.animateOut($searchDialog, 'search_close .5s')
    btf.animateOut($searchMask, 'to_hide 0.5s')
    window.removeEventListener('resize', fixSafariHeight)
  }

  const searchClickFn = () => {
    btf.addEventListenerPjax(document.querySelector('#search-button > .search'), 'click', openSearch)
  }

  const searchFnOnce = () => {
    document.querySelector('#local-search .search-close-button').addEventListener('click', closeSearch)
    $searchMask.addEventListener('click', closeSearch)
    if (GLOBAL_CONFIG.localSearch.preload) {
      localSearch.fetchData()
    }
    localSearch.highlightSearchWords(document.getElementById('article-container'))
  }

  window.addEventListener('search:loaded', () => {
    const $loadDataItem = document.getElementById('loading-database')
    $loadDataItem.nextElementSibling.style.display = 'block'
    $loadDataItem.remove()
  })

  searchClickFn()
  searchFnOnce()

  // pjax
  window.addEventListener('pjax:complete', () => {
    !btf.isHidden($searchMask) && closeSearch()
    localSearch.highlightSearchWords(document.getElementById('article-container'))
    searchClickFn()
  })
})
