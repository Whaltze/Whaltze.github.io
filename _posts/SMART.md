---
title: SMART
date: 2024-09-22 17:00:00
# top_img: /img/SMART.png # 顶部背景图
cover: /img/SMART.png   # 文章封面
tags:
- Blog
- SMART
top: 100
---
> 此文章记载零碎知识,报错，供查阅

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

## 查看/杀死进程ps

```shell
ps -ef #查看所有进程(不限制此终端)
```
> 选项-r表示只显示正在运行的程序
> 选项-a表示显示当前终端下的所有程序

查看所有进程
```shell
ps aux | less
```

查看特定进程
```shell
ps aux | grey rviz2 #用rviz2进程举例
```

找到对应进程的PID,用kill指令杀死进程
```shell
kill <PID>
```
```shell
kill -9 <PID> #强制杀死
```

# 报错

## rviz2-x11-wayland不兼容
> rviz2不兼容wayland,rviz和gazebo必须在X11/Xorg才能启动（原因为Wayland只支持GLES并且rviz和gazebo用的库不支持GLES）。因此必须要用XWayland才能启动,博主不知道为什么有一天更新软件包后就不能使用rviz2了,出现如下报错
```shell
(rm) whaltze@Ubuntu:~/rm/sllidar$ ros2 launch sllidar_ros2 view_sllidar_c1_launch.py 
[INFO] [launch]: All log files can be found below /home/whaltze/.ros/log/2024-10-12-17-29-29-395549-Ubuntu-437180
[INFO] [launch]: Default logging verbosity is set to INFO
[INFO] [sllidar_node-1]: process started with pid [437181]
[INFO] [rviz2-2]: process started with pid [437183]
[rviz2-2] Warning: Ignoring XDG_SESSION_TYPE=wayland on Gnome. Use QT_QPA_PLATFORM=wayland to run on Wayland anyway.
```
经查询,当前会话类型
```shell
echo $XDG_SESSION_TYPE
```
发现输出wayland,查询GPT,我安装了wayland QT插件
```shell
sudo apt-get install qtwayland5
```
发现没什么用处

之后我又在~/.bashrc中加入x11
```shell
export QT_QPA_PLATFORM=xcb >> ~/.bashrc
source ~/.bashrc
```
成功解决,但在后来学习中了解到用 export QT_QPA_PLATFORM=xcb，这样会导致本来支持Wayland的App强制使用XWayland导致性能或者效果出现异常,所以我更改了~/.bashrc中的配置
```shell
QT_QPA_PLATFORM=xcb gazebo
QT_QPA_PLATFORM=xcb rviz2
```
这样大概率就可以了,博主本人修改后运行carto功能包再运行雷达功能包打开rviz2时候会warning,一直不行,找不到原因,最后是重启解决了(笑),但是开启后雷达终端仍然有warning,但不影响后面调试了

## cartographer_ros_msgs 符号连接创建失败

colcon build后出现如下报错

![ ](./images/SMART/报错2.png)

进入相关工作空间文件/build下
把ament_cmake_python整个文件夹删除后再colcon build
就可以啦