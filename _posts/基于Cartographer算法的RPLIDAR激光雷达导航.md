---
title: 基于Cartographer算法的RPLIDAR激光雷达导航
date: 2024-09-22 20:00:00
top_img: transparent
tags:
- Blog
- 导航
- 视觉组
- RPLIDAR
- Cartographer
- RoboMaster
---

> ubuntu22.04-ros2-humble
> 环境为 conda activate rm (待更新)
> 从功能包入手介绍建图过程
> 工程根目录为sllidar,下设src文件存放各种功能包,编译目录为~/rm/sllidar

> 一些好的学习资料
> [古月居-URDF讲解-机器人建模方法](https://book.guyuehome.com/ROS2/3.%E5%B8%B8%E7%94%A8%E5%B7%A5%E5%85%B7/3.3_URDF/) 
> [古月居-TF树讲解-机器人坐标系管理神器](https://book.guyuehome.com/ROS2/3.%E5%B8%B8%E7%94%A8%E5%B7%A5%E5%85%B7/3.2_TF/)
> [ROS-Wiki-导航教程](https://wiki.ros.org/navigation/Tutorials)

# sllidar_ros

> [Github-sllidar_ros](https://github.com/Slamtec/sllidar_ros2)

第一个功能包,调试雷达正常驱动运行,我使用的是思岚rplidar_c1雷达

在src中打开终端,切换rm环境后开始git

```shell
git clone https://github.com/Slamtec/sllidar_ros2.git
```

source一下
```shell
source /opt/ros/humble/setup.bash
```

接下来编译构建
```shell    
colcon build --symlink-install
```
> 启用–symlink-install后将不会把文拷贝到install目录，而是通过创建符号链接的方式,允许通过更改src下的部分文件来改变install,每次调整 python 脚本时都不必重新build了

如果构建功能包没问题,继续source
```shell
source ./install/setup.bash
```
> 如果想要添加永久工作区环境变量。 每次启动新 shell 时都会自动将 ROS2 环境变量添加到您的 bash 会话中：运行

```shell
echo "source <your_own_ros2_ws>/install/setup.bash" >> ~/.bashrc
source ~/.bashrc
```
为 rplidar 创建 udev 规则

sllidar_ros2运行需要串行设备的读写权限。 您可以使用以下命令手动修改它：
```shell
sudo chmod 777 /dev/ttyUSB0
# sudo chmod 666 /dev/ttyUSB0
```
但更好的方法是创建一个 udev 规则：
```
cd src/sllidar_ros/
source scripts/create_udev_rules.sh
```

启动sllidar_ros功能包
运行rplidar_c1 并在rviz中查看
```shell
ros2 launch sllidar_ros2 view_sllidar_c1_launch.py
```
看到下图所示点云图,即启动成功
![ ](./images/基于Cartographer算法的RPLIDAR激光雷达导航/1.png)

# cartographer && cartographer_ros

> 成功驱动雷达后,我们需要考虑如何构建地图,有点云的,稠密or稀疏,栅格地图occupancy_grid_map等等

确保ros和cartographer的相关依赖已经安装完成
```shell
sudo apt update
sudo apt install -y \
    build-essential cmake git wget curl unzip \
    python3-vcstool python3-pip python3-numpy \
    libceres-dev libprotobuf-dev protobuf-compiler \
    libboost-all-dev libgflags-dev libgoogle-glog-dev \
    liblua5.3-dev ninja-build stow clang \
    libeigen3-dev libopencv-dev
```

安装ros-humble版本的cartographer依赖
```shell
sudo apt install -y ros-humble-cartographer ros-humble-cartographer-ros ros-humble-cartographer-ros-msgs
```

也可以直接git clone 举个例子
```shell
git clone https://github.com/ros2/cartographer_ros.git
```

检查是否安装成功
```shell
ros2 pkg list | grep cartogrpaher
```
