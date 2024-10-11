---
title: SMART
date: 2024-09-22 17:00:00
top_img: transparent # 顶部背景图
tags:
- Blog
- SMART
top: 100
---
> 此文章记载零碎知识，供查阅

## .sh文件权限不够
```shell
chmod +x <filename>.sh
# chmod +x start.sh
```
## 中英文符号切换
windows自带输入法,进入设置开启中英文标点符号切换功能,默认为 **ctrl+.** ctrl加句号,便可实现中文输入法状态下,输出英文字符

## source /setup.bash
> [CSDN-ROS中的setup.bash](https://blog.csdn.net/qq_28087491/article/details/109179151)

在创建了ROS的workspace后，需要将workspace中的setup.bash文件写入~/.bashrc 文件中，让其启动，就像这个样子

```shell
source /opt/ros/melodic/setup.bash
```

写入和打开方式（vim打开也阔以）
```shell
sudo gedit ~/.bashrc
```
这句话的目的就是在开新的terminal的时候，运行这个setup.bash，而这个setup.bash的作用是让一些ROS* 开头的命令可以使用。

在工作空间的devel文件夹中存在几个setup.*sh形式的环境变量设置脚本。使用source命令运行这些脚本文件，则工作空间的环境变量设置可以生效（如可以找到该工作空间内的项目）。
```shell
source devel/setup.bash
```
为了确保环境变量已经生效，可以使用如下命令进行检查：
```shell
echo $ROS_PACKAGE_PATH
```
如果打印的路径中已经包含当前工作空间的路径，则说明环境变量设置成功

```shell
/home/yinji/catkin_ws/src:/opt/ros/melodic/share
```

没有用source运行该脚本时，打印的路径为

```shell
/opt/ros/melodic/share
```

有时候可通过命令行添加
```shell
export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:~/rm/rplidar_c1/install
```

在终端中使用source命令设置的环境变量只能在当前终端中生效，如果希望环境变量在所有终端中有效，则需要在终端的配置文件中加入环境变量的设置
```shell
echo “source /WORKSPACE/devel/setup.bash”>>~/.bashrc
```
请使用工作空间路径替代 WORKSPACE。（将source /catkin_ws/devel/setup.bash命令放入.bashrc文件内）

## 功能包的构建

> [[ROS] 手把手教你如何从无到有构建一个ROS软件包](https://blog.csdn.net/wangmj_hdu/article/details/119985553)




