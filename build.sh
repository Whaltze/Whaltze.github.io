#!/bin/bash

# 1. 执行你的自定义图片拷贝逻辑（保留你的习惯）
echo "正在拷贝图片..."
cp -R /m/BLOG/Whaltze-BLOG/blog-demo/source/_posts/images/* /m/BLOG/Whaltze-BLOG/blog-demo/source/ 2>/dev/null

# 2. 将整个博客源码目录推送到 GitHub
echo "正在提交源码到 GitHub..."
git add .

# 使用当前时间作为自动提交的备注
git commit -m "Auto update posts: $(date +'%Y-%m-%d %H:%M:%S')"

# 推送到主分支（触发 Vercel 自动构建）
git push origin main

echo "部署指令已发送！Vercel 将在云端接管后续生成工作。"
read -p "按回车键继续..."