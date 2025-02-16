---
title: 解决VMware下Ubuntu22.04无法联网问题
date: 2024-08-26 15:00:00
tags:
- obstacle
- Ubuntu22.04
- 网络

# top_img: transparent
top_img: /img/解决VMware下Ubuntu22.04无法联网问题.png # 顶部背景图
cover: /img/解决VMware下Ubuntu22.04无法联网问题.png  # 文章封面

# cover: /img/2.png   # 文章封面
---

> 尝试了很多方法，网上大多是重启网络适配器等，后来发现虚拟机里系统桌面右上角并没有有线网络图标
> 尝试删除网络缓存文件后，重启网络后 问题解决

在终端中输入以下命令 删除NetworkManager缓存文件
```shell
sudo service NetworkManager stop 

sudo rm /var/lib/NetworkManager/NetworkManager.state 

sudo service NetworkManager start

```

打开Ubuntu内置的火狐浏览器 发现可以上网啦