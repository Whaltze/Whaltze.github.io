
cp -R  /m/BLOG/Whaltze-BLOG/blog-demo/source/_posts/images  /m/BLOG/Whaltze-BLOG/blog-demo/source/

hexo clean

# 1. 生成静态文件
hexo g

# 2. 部署静态文件到 GitHub
hexo d

cd .deploy_git/

cp -R  /m/BLOG/Whaltze-BLOG/blog-demo/source/_posts  /m/BLOG/Whaltze-BLOG/blog-demo/.deploy_git/

#git add .

#git commit -m "Update posts "

#git push -u origin master:main

##git push origin main

#read -p "按回车键继续..."




