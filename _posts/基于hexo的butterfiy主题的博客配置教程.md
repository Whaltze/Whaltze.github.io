---
title: 基于hexo的butterfiy主题的博客配置教程
date: 2024-09-22 20:47:31

# top_img: transparent
top_img: /img/基于hexo的butterfiy主题的博客配置教程.png # 顶部背景图
cover: /img/基于hexo的butterfiy主题的博客配置教程.png  # 文章封面
categories: 

# cover: /img/3.png   # 文章封面
tags:
- Blog
- Github
- Git
- 博客
- hexo
- butterfly
---

> scaffolds 修改post.md的默认模板(layout在_config.yml内默认设置为post时)

## hexo 懒人包 

可用于U盘部署 不用安装nodejs npm等  适用于windows版本
[PortableHexo-GitHub](https://github.com/BitMOE/PortableHexo)

Ubuntu Linux 的 node 另外下载解压
[nodejs下载官网](https://nodejs.org/en/download)

```shell
tar -xJf node-v18.20.2-linux-x64.tar.xz -C /media/whale/Media/BLOG/Whaltze-BLOG/blog-demo/support/
mv /media/whale/Media/BLOG/Whaltze-BLOG/blog-demo/support/node-v18.20.2-linux-x64 /media/whale/Media/BLOG/Whaltze-BLOG/blog-demo/support/nodejs
```
解压对应压缩包 并且修改名字

验证 Node.js 是否可用：

```shell
./nodejs/bin/node -v
./nodejs/bin/npm -v   
```


## 修改评论区 小剪刀分割线

> 参考 [洛语 の Blog](https://luoyuy.top/posts/5c76ad4123cd/#%E5%89%8D%E8%A8%80)


- 法一：修改 _config.butterfly.yml 文件中的 hr_icon -> icon 内容（推荐）

```yml
# The setting of divider icon (水平分隔線圖標設置)
hr_icon:
  enable: true
  icon: 'f005' # the unicode value of Font Awesome icon, such as '\3423'
  // ...
```

- 法二：修改 `themes\butterfly\source\css\_global\index.styl` 文件中的 `hr -> &:before -> content` 内容

```yml
hr
    // ...
    &:before
    // ...
    content: $hr-icon // 同样修改为如 '\3423' 形式
```

**如果想去除浮动图标，仅需将参数修改为 '' 即可，例如 `icon: ''`**

## Font Awesome icon 图标

the unicode value of Font Awesome icon 获取方法：

打开 Font Awesome 网址：[Search v5 Icons | Font Awesome](https://fontawesome.com/v5/search)

通过搜索栏选择并点击自己心仪的图标

下图中 所`Unicode`即为所需 `f005` 小星星图标

![](images/基于hexo的butterfiy主题的博客配置教程/image-6)

## 删除comment 水平分割线 小剪刀图标

进入 `M:\BLOG\Whaltze-BLOG\blog-demo\node_modules\hexo-theme-butterfly\scripts\events`文件夹

找到`merge_config`文件 修改 为`false`

```js
hr_icon: {
  enable: false,
  icon: null,
  'icon-top': null
},
```

成功

![](images/基于hexo的butterfiy主题的博客配置教程/image-7)

删除分割线 

进入`M:\BLOG\Whaltze-BLOG\blog-demo\node_modules\hexo-theme-butterfly\source\css\_global\function.styl`

找到

```js
.custom-hr
position: relative
margin: 40px auto
border: 2px dashed var(--hr-border)
```

修改 `2px` 为 `0` 即可

或者 更直接 删除Comment 图标

`M:\BLOG\Whaltze-BLOG\blog-demo\node_modules\hexo-theme-butterfly\layout\includes\third-party\comments\index.pug`

修改 

```pug
//- hr.custom-hr
#post-comment // 注释：定义一个自定义样式的水平线（hr）元素，类名为custom-hr
  .comment-head // 注释：定义一个ID为post-comment的容器，用于包含评论相关的元素
    //- .comment-headline // 注释：定义一个类名为comment-head的容器，用于包含评论头部的元素
    //-   i.fas.fa-comments.fa-fw // 注释：注释掉的代码，原本可能包含一个类名为comment-headline的容器，用于显示评论标题
    //-   span= ' ' + _p('comment') // 注释：注释掉的代码，原本可能包含一个图标元素，使用Font Awesome库的fas、fa-comments和fa-fw类，表示评论图标
```
成功

![](images/基于hexo的butterfiy主题的博客配置教程/image-14)

## 批量初始化 Gitalk 评论

> 以下信息由 DeepSeek生成

<div style="background-color: hsla(0, 0.00%, 49.00%, 0.25); color: white; padding: 10px; margin: 0 auto; margin-top: 20px; border-left: 1px hsla(213, 88.40%, 62.90%, 0.94); border-right: 1px hsla(213, 88.40%, 62.90%, 0.94); text-align: center; font-family: 'Comic Sans MS', cursive; font-size: 17px;  color:hsl(0, 0.00%, 93.70%);">
没有成功 已经弃用 后续有时间再看看 (目前进入博客自动初始化)
</div>

---

### 🔍 问题根源分析
1. **Gitalk 客户端匹配机制**：
   - 通过 `id` 参数匹配 Issue
   - 通过 `labels` 过滤 Issue
   - 需要与脚本中的生成逻辑完全一致

2. **当前存在的矛盾**：
   ```mermaid
   graph LR
   A[脚本生成Issue] --> B{标签/id生成方式}
   C[前端Gitalk配置] --> B
   B -->|不一致| D[无法匹配]
   ```

---

### 🛠️ 完整解决方案

#### 第一步：统一前后端标识生成逻辑
修改 **`scripts/auto-gitalk.js`**：
```javascript
const { readFileSync } = require('fs');
const { resolve, dirname } = require('path');
const axios = require('axios');
const crypto = require('crypto');

// ========== 新增模块引入 ==========
const fs = require('fs'); // 修复 fs 未定义问题
// ================================

// 安全加载配置
const loadConfig = () => {
  try {
    return JSON.parse(
      readFileSync(resolve(__dirname, '../comment-config.json'), 'utf8') // 修正路径
    );
  } catch (error) {
    console.error('❌ 配置文件加载失败:', error.message);
    process.exit(1);
  }
};

// 获取所有文章路径
const matter = require('gray-matter');

const getLocalPosts = () => {
  const postsDir = resolve(__dirname, '../source/_posts');
  
  return fs.readdirSync(postsDir)
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const fullPath = resolve(postsDir, file);
      const content = fs.readFileSync(fullPath, 'utf8');
      const { data: frontmatter } = matter(content);
      
      // 获取规范化的日期格式
      const date = new Date(frontmatter.date || fs.statSync(fullPath).birthtime);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate() - 1).padStart(2, '0');

      // 生成与Hexo一致的路径
      const filename = file.replace(/\.md$/, '');
      const slug = frontmatter.permalink || filename;
      
      return {
        title: frontmatter.title || filename,
        path: `/${year}/${month}/${day}/${slug}/`.replace(/\/+/g, '/'), // 处理多余斜杠
        url: `https://whaltze.github.io/${year}/${month}/${day}/${slug}/`
      };
    });
};

// GitHub API 客户端
class GitHubClient {
  constructor(config) {
    this.client = axios.create({
      baseURL: `https://api.github.com/repos/${config.username}/${config.repo}`,
      headers: {
        Authorization: `Bearer ${config.token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
  }

  async getIssues() {
    const { data } = await this.client.get('/issues?state=all&per_page=100');
    return data;
  }

  // 在 createIssue 方法中增加标准化处理
  async createIssue(post) {
    // 保持与前端完全一致的路径处理
    const rawPath = post.path
      .replace(/\/$/, '')    // 移除末尾斜杠
      .replace(/\.html$/, '') // 适配Hexo生成路径
      .toLowerCase();         // 统一小写处理
  
    const id = crypto.createHash('md5')
      .update(rawPath)
      .digest('hex');
  
    return this.client.post('/issues', {
      title: `[评论] ${post.title}`,
      body: `文章永久链接：${post.url}\n\nGitalk ID: ${id}`, // 添加ID调试信息
      labels: ['Gitalk', id]
    });
  }
}

// 主流程
(async () => {
  console.log('🚀 开始评论系统初始化...');
  
  const config = loadConfig().github;
  const client = new GitHubClient(config);
  const localPosts = getLocalPosts();
  const issues = await client.getIssues();

  // 对比差异
  const newPosts = localPosts.filter(post => 
    !issues.some(issue => 
      issue.body.includes(post.url) && issue.state === 'open'
    )
  );

  if (newPosts.length === 0) {
    console.log('✅ 没有需要初始化的新文章');
    return;
  }

  console.log(`🔄 需要初始化 ${newPosts.length} 篇文章`);
  
  // 批量处理
  for (const [index, post] of newPosts.entries()) {
    try {
      await client.createIssue(post);
      console.log(`(${index + 1}/${newPosts.length}) ${post.title} 初始化成功`);
      await new Promise(resolve => setTimeout(resolve, 1500)); // 防止速率限制
    } catch (error) {
      console.error(`⚠️  ${post.title} 失败：${error.response?.data?.message || error.message}`);
    }
  }
})();
```

#### 第二步：修正 Butterfly 主题配置
修改 **`_config.butterfly.yml`**：
```yaml
# Gitalk 配置
gitalk:
  clientID: '你的GitHub应用ID'
  clientSecret: '你的GitHub应用Secret'
  repo: 'Whaltze.github.io' # 必须与脚本中的repo一致
  owner: 'Whaltze'
  admin: ['Whaltze']
  id: 'md5(location.pathname)' # 核心修改点！
  labels: ['Gitalk'] # 只需要基础标签
  perPage: 15
  distractionFreeMode: false
```

#### 第三步：修改主题模板文件
修改 **`themes/butterfly/layout/includes/comments/gitalk.pug`**：
```pug
- const { client_id, client_secret, repo, owner, admin, option } = theme.gitalk

script.
  (() => {

    // 新增路径标准化处理
    const getGitalkId = () => {
      const path = window.location.pathname
        .replace(/\/$/, '')    // 移除末尾斜杠
        .replace(/\.html$/, '') // 适配Hexo生成路径
        .toLowerCase();         // 统一小写处理
      return CryptoJS.MD5(path).toString();
    };

    const initGitalk = () => {
      const gitalk = new Gitalk(Object.assign({
        clientID: '!{client_id}',
        clientSecret: '!{client_secret}',
        repo: '!{repo}',
        owner: '!{owner}',
        admin: ['!{admin}'],
        id: '!{md5(page.path)}',
        updateCountCallback: commentCount
      },!{JSON.stringify(option)}))

      gitalk.render('gitalk-container')
    }

    const loadGitalk = async() => {
      if (typeof Gitalk === 'function') initGitalk()
      else {
        await getCSS('!{url_for(theme.asset.gitalk_css)}')
        await getScript('!{url_for(theme.asset.gitalk)}')
        initGitalk()
      }
    }
    
    const commentCount = n => {
      const isCommentCount = document.querySelector('#post-meta .gitalk-comment-count')
      if (isCommentCount) {
        isCommentCount.textContent= n
      }
    }

    if ('!{theme.comments.use[0]}' === 'Gitalk' || !!{theme.comments.lazyload}) {
      if (!{theme.comments.lazyload}) btf.loadComment(document.getElementById('gitalk-container'), loadGitalk)
      else loadGitalk()
    } else {
      window.loadOtherComment = loadGitalk
    }
  })()
```

#### 第四步：添加 MD5 支持
在主题布局文件中注入 **`crypto-js`**（修改 **`themes/butterfly/layout/includes/head.pug`**）：
```pug
//- 在 head 末尾添加
if theme.comments.use.includes('Gitalk')
  script(src='https://cdn.bootcdn.net/ajax/libs/crypto-js/4.1.1/crypto-js.min.js')
```

---

### ✅ 验证流程
1. 创建新文章：
   ```bash
   hexo new "测试评论关联"
   ```

2. 运行初始化脚本：
   ```bash
   node scripts/auto-gitalk.js
   ```

3. 查看生成内容：
   ```markdown
   # GitHub Issue 应包含：
   - Label: Gitalk + md5哈希值
   - Body: 包含文章完整URL
   ```

4. 本地预览：
   ```bash
   hexo clean && hexo s --debug
   ```

### 🌐 GitHub 应用配置指南
1. 访问 [GitHub OAuth Apps](https://github.com/settings/developers)
2. 创建新应用：
   - **Application name**: 你的博客名称
   - **Homepage URL**: 你的博客地址
   - **Authorization callback URL**: 你的博客地址
3. 获取 `Client ID` 和 `Client Secret`

## 隐藏式选项卡

[Tag-hide官方文档](https://butterfly.js.org/posts/ceeb73f/#Tag-hide)


```markdown
{% tabs {{ title }}, [index] %}

<!-- tab [Tab caption] [@icon] -->

Any content (support inline tags too).

<!-- endtab -->

{% endtabs %}
```

```markdown
{% tabs test4 %}

<!-- tab 第一個Tab -->

**tab 名字為第一個 Tab**

<!-- endtab -->

<!-- tab @fab fa-apple-pay -->

**只有圖標 沒有 Tab 名字**

<!-- endtab -->

<!-- tab 炸彈@fas fa-bomb -->

**名字+icon**

<!-- endtab -->

{% endtabs %}
```

## 数学公式渲染

### 矩阵

```shell
<span>
$$
\begin{pmatrix}  
  a_{11} & a_{12} & a_{13} \\  
  a_{21} & a_{22} & a_{23} \\  
  a_{31} & a_{32} & a_{33}  
\end{pmatrix}
$$
</span>
```

<span>
$$
\begin{pmatrix}  
  a_{11} & a_{12} & a_{13} \\  
  a_{21} & a_{22} & a_{23} \\  
  a_{31} & a_{32} & a_{33}  
\end{pmatrix}
$$
</span>

### 行内公式

```shell
质能方程：$E = mc^2$，其中 $m$ 是质量。
```

质能方程：$E = mc^2$，其中 $m$ 是质量。

### 段落公示

```shell
$$
I(x, y) \in \mathbb{R}^{M \times N}
$$
```

$$
I(x, y) \in \mathbb{R}^{M \times N}
$$