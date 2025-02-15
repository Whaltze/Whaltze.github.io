---
title: 基于hexo的butterfiy主题的博客配置教程
date: 2024-09-22 20:47:31
top_img: transparent # 顶部背景图
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
