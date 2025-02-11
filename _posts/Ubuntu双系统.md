---
title: Ubuntu双系统
tags:
  - Blog
top_img: transparent
date: 2025-02-11 16:45:30
---

> 本博客记录所有安装Ubuntu双系统后遇到的问题以及部分重大操作,留作备案

## Begin Start , SMART !

> [Win11启动盘制作](https://blog.csdn.net/beaver2010/article/details/137599949)
> 
### 准备工作

#### 确保 BIOS 是 UEFI 模式
开始菜单搜索系统信息查看
![ ](./images/Ubuntu双系统/1.png)

如果不是 进入BIOS系统修改(修改后记得保存)

#### 确保磁盘是GPT格式

进入磁盘管理 点击属性 卷

![](./images/Ubuntu双系统/2.png)

若为主启动记录(MBR),修改为GPT

进入终端输入 `diskpart`

依次输入以下命令

```shell
list disk #列出磁盘
select disk=0 #选择要转换的磁盘 这里是0
convert gpt # 转换
list disk #确认转换成功
```

![](./images/Ubuntu双系统/3.png)

#### 关闭BitLocker加密

在磁盘管理器中查看是否有BitLocker加密
若有 在设置 隐私 安全性中关闭 (解密时间和硬盘内存储的东西有关,越多就越久)

#### 关闭独显直连

避免安装Ubuntu时候出现bug
UP这里之前进华硕 `Armoury Create` 关闭了

### 制作Ubuntu 系统盘

#### 下载Ubuntu镜像网站

[Ubuntu官网下载地址](https://ubuntu.com/download)

[清华镜像下载网址](https://launchpad.net/ubuntu/+mirror/mirrors.tuna.tsinghua.edu.cn-release)

前者较为麻烦 这里我选择清华镜像

找到 `Mirror location information`
进入一个镜像地址

选择 `ubuntu-22.04.5-desktop-amd64.iso`

server没有图形界面

![](./images/Ubuntu双系统/4.png)

#### 下载Rufu

下载 Rufu 导入 镜像文件

![](./images/Ubuntu双系统/5.png)

点击开始

![](./images/Ubuntu双系统/6.png)

持续点击确定,需要等待一段时间

看到准备就绪绿色条满后便可点击关闭软件,之后哪台电脑需要,插入哪台电脑即可

### 多IOS启动盘制作(Ventoy)

#### 下载Ventoy 

> 注意Windows还是Linux

[Ventoy官方Github仓库地址](https://github.com/ventoy/Ventoy/releases)

#### 安装到U盘

打开下载的Ventoy工具包,找到并双击运行Ventoy2Disk.exe(Windows版)
将U盘插入电脑 软件会自动识别
选择U盘设备 开始安装

> 注意 安装Ventoy会清除U盘上的所有数据

复制IOS文件到U盘

### 安装 Ubuntu 系统盘

将刚刚做好的启动盘插入电脑

重启 狂按 F2  进入BIOS模式 (博主是华硕天选,其他机型自行百度)

> 先关闭BIOS中的安全启动,避免后续不必要的麻烦

然后关闭Intel RST,避免安装过程中出现Turn off RST
方法 找到SATA Controller Mode这个磁盘的SATA管理器选项,选择设置为AHCI(有些电脑没有这个选项就不用管)
最后把U盘设置为最优先引导项,避免要进入U盘的Ubuntu安装程序时,电脑自动返回到Windows系统启动。
在BIOS设置界面找到Boot启动顺序列表
把要用的U盘设备按提示移到最前面,鱼鱼的电脑是F6上移,有些电脑可以直接鼠标拖动的

## Travel ! (配置)

> 至此 Ubuntu22.04双系统下载成功，我们来配置一些功能使得更定制化

### GNOME Tweaks

#### 安装 & 启动

```shell
sudo apt install gnome-tweaks
```

启动

```shell
gnome-tweaks
```

### Rime输入法

Rime输入法提供给用户高度自定义化,可实现颜文字,希腊字母的输入

#### 安装Rime

```shell
sudo apt install ibus-rime
```
此处安装`ibus`版本

也可以安装 apt-get 安装 Rime 原版

#### 配置 Rime

进入设置 区域与语言 在输入法系统中选择 `ibus`

在 设置 键盘 中 添加 Rime 输入源 

### 隐藏 VScode 顶部标题栏

进入设置 修改为custom

![](./images/Ubuntu双系统/9.png)




## 蓝牙耳机单边没声音

在安装完系统后,发现耳机能正常连接,却有一边没有声音输出

Sollution 打开设置 声音(sound) 修改input device 切换为耳机再切换回来

![](./images/Ubuntu双系统/8.png)

成功修复 ! (原因暂未知)