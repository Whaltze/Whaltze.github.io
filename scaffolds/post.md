---
title: {{ title }}
date: {{ date }}
tags:
- Blog
top_img: /img/{{ title }}.png # 顶部背景图
cover: /img/{{ title }}.png   # 文章封面
# password: 1977-04-08

---

文章创作完成后需要删除以下内容

```html
<!-- 规定图片大小 -->
{% inlineImg https://i.loli.net/2021/03/19/5M4jUB3ynq7ePgw.png 150px %}

<!-- 字体油漆桶 -->
{% label 中道崩殂 blue %}。今天下三分，{% label 益州疲敝 pink %}

<!-- 折叠框 -->
{% folding cyan open, 查看默认打开的折叠框 %}

这是一个默认打开的折叠框。

{% endfolding %}

<!-- 文章链接跳转 -->
<a href="{% post_path SMART %}#爬取Gemini动态视图界面">点击这里跳转到 Gemini 爬取教程</a>

```