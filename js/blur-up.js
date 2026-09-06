/**
 * blur-up 渐进加载：页面先用 1-2KB 的预览图完成渲染，
 * 随后（600ms 后）在后台按并发 3 预加载高清原图，解码完成后无缝替换，
 * 解码完成后无缝替换，配合 blur-up.css 做模糊→清晰的过渡。
 *
 * 处理对象由 tools/optimize-img.js --post 在构建时标记：
 *   img[data-full]     —— 预览图已显示，data-full 指向高清原图
 *   [data-full-bg]     —— 背景图为预览图，data-full-bg 指向高清原图
 * 兼容 Butterfly 的 pjax：页面切换后重新扫描。
 */
(function () {
  'use strict';

  var CONCURRENCY = 3;
  var queue = [];
  var active = 0;

  function pump() {
    while (active < CONCURRENCY && queue.length) {
      var task = queue.shift();
      active++;
      task(function () {
        active--;
        pump();
      });
    }
  }

  function enqueue(task) {
    queue.push(task);
    pump();
  }

  // 预加载 url，解码就绪后回调（decode 失败时退回 onload/onerror）
  function preload(url, cb) {
    var im = new Image();
    im.decoding = 'async';
    var finished = false;
    var fin = function (ok) {
      if (finished) return;
      finished = true;
      cb(ok);
    };
    im.onload = function () { fin(true); };
    im.onerror = function () { fin(false); };
    im.src = url;
    if (im.decode) {
      im.decode().then(
        function () { fin(true); },
        function () { /* 等待 onload/onerror 裁决 */ }
      );
    }
  }

  function upgradeImg(img) {
    if (img.dataset.blurUpState || !img.isConnected) return;
    var full = img.getAttribute('data-full');
    if (!full) return;
    img.dataset.blurUpState = 'loading';
    preload(full, function (ok) {
      if (ok) img.src = full;
      img.classList.add('blur-up-done');
      img.dataset.blurUpState = 'done';
    });
  }

  function upgradeBg(el) {
    if (el.dataset.blurUpState || !el.isConnected) return;
    var full = el.getAttribute('data-full-bg');
    if (!full) return;
    el.dataset.blurUpState = 'loading';
    preload(full, function (ok) {
      if (ok) el.style.backgroundImage = 'url("' + full + '")';
      el.classList.add('blur-up-done');
      el.dataset.blurUpState = 'done';
    });
  }

  function init() {
    // 用固定短延时而非 requestIdleCallback：预览图早已随 HTML 渲染，
    // 600ms 后开始预加载原图；后台标签页中 rIC 可能被无限期饿死
    setTimeout(function () {
      var tasks = [];
      document.querySelectorAll('img[data-full]').forEach(function (el) {
        tasks.push(function (next) { upgradeImg(el); next(); });
      });
      document.querySelectorAll('[data-full-bg]').forEach(function (el) {
        tasks.push(function (next) { upgradeBg(el); next(); });
      });
      // DOM 顺序即页面自上而下，视口内的元素天然排在队首
      tasks.forEach(enqueue);
    }, 600);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  // Butterfly 开启了 pjax，切换页面后重新扫描
  document.addEventListener('pjax:complete', init);
})();
