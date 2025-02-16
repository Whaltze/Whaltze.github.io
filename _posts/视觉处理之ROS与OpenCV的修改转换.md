---
title: 视觉处理之ROS与OpenCV的修改转换
date: 2024-08-01 08:00:00

# top_img: transparent
top_img: /img/视觉处理之ROS与OpenCV的修改转换.png # 顶部背景图
cover: /img/视觉处理之ROS与OpenCV的修改转换.png  # 文章封面

# cover: /img/3.png   # 文章封面

tags:
- Blog
- ROS
- humble
- ubuntu22.04
- OpenCV
---

> 此文章为202302暑期RM视觉培训总结
> 具体实现目标任务如下
> • 安装usb_cam或其他USB摄像头驱动包驱动笔记本电脑自带的摄像头
> • 新建功能包，编写节点实时订阅摄像头发布的图像话题消息并将ROS图像消息转换为OpenCV图像
> • 在图像右上角绘制矩形，再将OpenCV图像转换回ROS图像消息重新发布到一个新的话题
> • 用rviz或者rqt_image_view显示图像消息

## 打开摄像头
### 安装 usb_cam摄像头驱动
```shell
sudo apt install ros-humble-usb_cam # 笔者这里用的是humble版本，不同版本自行替换
```
也可以通过cheese
```shell
sudo apt install cheese #下载
cheese  # 运行茄子
```
进入后适当修改分辨率会更流畅
> **注意记得先更新**
> sudo apt update


### 运行camera.launch.py
```shell
ros2 launch usb_cam camera.launch.py
```
> 错误1
![ ](./images/视觉处理之ROS与OpenCV的修改转换/1.png )
> 解决方法
> pip install pydantic==1.10.14
> 这里笔者下载时版本不够，没有model_validator,报错如下
> - ImportError: cannot import name 'model_validator' from 'pydantic' (/home/whaltze/.local/lib/python3.10/site-packages/pydantic/_\_init__.cpython-310-x86_64-linux-gnu.so)
> 后续需要进行更新  pip install --upgrade pydantic

再次运行即可
![ ](./images/视觉处理之ROS与OpenCV的修改转换/2.png )

## 运行摄像头
### 使用rqt_image_view
另外开启一个终端
```shell
sudo apt-get install ros-humble-rqt 
# rqt # 运行rqt
ros2 run rqt_image_view rqt_image_view
```
选择/camera1/image_raw 即可看到图像消息

### 使用rviz
```shell
sudo apt-get install ros-humble-rviz2
ros2 run rviz2 rviz2
```
选择左下角Add，如图即可看到视频图像
![ ](./images/视觉处理之ROS与OpenCV的修改转换/3.png )

## 编写节点
### 创建功能包

进入工作空间（这里笔者的是/home/whaltze/rm/202302/ros2）
```shell
cd ~/rm/202302/ros2/src #进入src文件夹
ros2 pkg create --build-type ament_python camera #创建功能包
cd camera
```
### setup.py

在camera中创建setup.py 

```py
from setuptools import find_packages, setup

package_name = 'camera'

setup(
    name=package_name,
    version='0.0.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='whaltze',
    maintainer_email='whaltze@todo.todo',
    description='TODO: Package description',
    license='TODO: License declaration',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': ['camera_node = camera.camera_node:main'
        ],
    },
)

```
笔者在创建功能包的时候已经自动创建了setup程序，没有的自行添加
中间的文件名，用户名记得修改

### camera_node.py
> cd /src/camera/camera/

创建camera_node.py程序

```py
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image
from cv_bridge import CvBridge
import cv2

class CameraNode(Node):
    def __init__(self):
        super().__init__('camera_node')
        self.subscription = self.create_subscription(
            Image,
            '/camera1/image_raw',  # 图像话题，根据实际设置情况更改
            self.listener_callback,
            10)
        self.publisher1 = self.create_publisher(Image, 'rec_image', 10)

        self.bridge = CvBridge()
        
    def listener_callback(self, msg):
        cv_image = self.bridge.imgmsg_to_cv2(msg, "bgr8")   #转换为OpenCV图像
        
        # 在图像右上角绘制矩形
        height, width, _ = cv_image.shape
        cv2.rectangle(cv_image, (width - 100, 0), (width, 100), (255, 255, 255), 2)
        
        # 将 OpenCV 图像转换回 ROS 图像消息
        ros_image = self.bridge.cv2_to_imgmsg(cv_image, "bgr8")
        
        # 发布处理后的图像
        self.publisher1.publish(ros_image)

def main(args=None):
    rclpy.init(args=args)
    camera_node = CameraNode()
    rclpy.spin(camera_node)
    camera_node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()


```
笔者这里直接将最后结果图像右上角画一个白色矩形，转换为ROS图像消息输出

## 成果检验

回到ros2工作目录，打开终端，输入
> ros2 launch usb_cam camera.launch.py
![ ](./images/视觉处理之ROS与OpenCV的修改转换/4.png )

再打开一个终端输入
> source install/setup.bash
> ros2 run camera camera_node
![ ](./images/视觉处理之ROS与OpenCV的修改转换/5.png )

再打开一个终端，输入
> ros2 run rqt_image_view rqt_image_view
![ ](./images/视觉处理之ROS与OpenCV的修改转换/6.png )

最终效果如图（笔者有点害羞，就用手遮住摄像头啦）
![ ](./images/视觉处理之ROS与OpenCV的修改转换/7.png )

## 进阶讲解 - camera_node
> ```py
> import rclpy
> from rclpy.node import Node
> ```
> rclpy是针对Python语言的ROS2客户端库，提供了初始化、创建节点、发布和订阅话题等功能
> 这里贴两个链接 &nbsp; &nbsp; [RCLPY文档](https://docs.ros2.org/latest/api/rclpy/index.html) &nbsp;  &nbsp; [RCLPY源码](https://github.com/ros2/rclpy)
> 
> Node 类是 rclpy 中定义的基本类，用于创建 ROS 2 节点。一个节点是 ROS 2 系统中的基本通信实体，可以发布和订阅话题、提供和调用服务等

> ```py
> from sensor_msgs.msg import Image
> ```
> Image 消息类型定义在 sensor_msgs 包中，用于传输图像数据。它包含图像的元数据（如高度、宽度、编码等）和实际的图像数据。
在 ROS 2 中，图像数据通常通过 Image 消息在节点之间传输。
> 
> [介绍ROS中的sensor_msgs](https://qiangsun89.github.io/2023/04/25/%E4%BB%8B%E7%BB%8DROS%E4%B8%ADsensor-msgs/) &nbsp; &nbsp;  [sensor_msgs::Image消息及其参数](https://blog.csdn.net/I_canjnu/article/details/124855613)
> 
> ![ ](./images/视觉处理之ROS与OpenCV的修改转换/8.png)

注意 ***sensor_msgs/Image*** 是原始的未经压缩的图像消息，通常用于传输原始图像数据，例如 RGB、灰度或深度图像。而 ***sensor_msgs/CompressedImage*** 是经过压缩的图像消息，数据量较少，压缩格式通常是 JPEG 或 PNG

> ```py
> from cv_bridge import CvBridge
> ```
> CvBridge 是用于在 ROS 图像消息 (sensor_msgs/Image) 和 OpenCV 图像 (numpy 数组) 之间转换的工具包，OpenCV 提供了丰富的图像处理功能，而 ROS 使用 Image 消息进行图像传输。这样的转化便于图像处理，笔者后续也基于此构建矩形
>
> ![ ](./images/视觉处理之ROS与OpenCV的修改转换/9.png)

> ```py
> import cv2
> ```
> cv2 非常著名，是 OpenCV 的 Python 接口。OpenCV 作为一个开源计算机视觉库，提供了丰富的图像处理和计算机视觉功能。在这个节点中，我们使用 OpenCV 来处理和修改图像，例如在图像上绘制矩形。

> ```py
> class CameraNode(Node):
> ```
> 定义一个名为 CameraNode 的类，继承自 Node，这是一个自定义的 ROS 2 节点类。Node 是从 rclpy.node 导入的类，它提供了 ROS 2 节点的基础功能。

> ```py
>     def __init__(self):
> ```
> 定义构造函数，初始化节点,_\_init__ 方法是类的构造函数。当创建一个类的实例（对象）时，Python 会自动调用这个方法来初始化对象的属性。
> 即 定义类的构造函数，_\_init__ 方法会在创建 CameraNode 实例时自动调用，用于初始化对象的属性。
[__init__函数的用法详解！](https://blog.csdn.net/pengneng123/article/details/137555573) &nbsp;  **[_\_init__ + super详解](https://gitcode.csdn.net/65e6e3c51a836825ed786deb.html?dp_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjQ2ODkyOSwiZXhwIjoxNzIzNjkxNzA1LCJpYXQiOjE3MjMwODY5MDUsInVzZXJuYW1lIjoiV2hhbHR6ZSJ9.MPDTDnoa4X65mIZkrlOYZDICEPI7liFNoYmGol6ViOs)**

> ```py
>         super().__init__('camera_node')
> ```
> 调用父类（Node）的构造函数，并传递节点名称 'camera_node'。这将创建一个名为 'camera_node' 的 ROS 2 节点。
> 其中，super() 函数用于调用父类（基类）的方法。它允许子类调用从父类继承的方法，而不是覆盖它们。在这个例子中，我们用它来调用父类的构造函数。即super() 函数返回父类（Node）的对象，然后使用 . 访问父类的方法（_\_init__）

> ```py
>         self.subscription = self.create_subscription(
>             Image,
>             '/camera1/image_raw',  # 图像话题，根据实际设置情况更改
>             self.listener_callback,
>             10)
> ```
> 创建一个订阅者，用于订阅 /usb_cam/image_raw 话题。订阅的消息类型是 Image。
> 当接收到消息时，调用 listener_callback 函数进行处理。

self.subscription 表示访问当前对象（self）的 subscription 属性。
self.create_subscription 表示访问当前对象（self）的 create_subscription 方法。

> ```py
>         self.publisher1 = self.create_publisher(Image, 'rec_image', 10)
> ```
> 创建一个发布者，用于发布处理后的图像。发布的话题名称是 'rec_image'，消息类型是 Image。

> ```py
>         self.bridge = CvBridge()
> ```
> 创建一个 CvBridge 实例，用于在 ROS 图像消息和 OpenCV 图像之间进行转换
> self.bridge 是类的属性，用于存储 CvBridge 对象。

> ```py
>     def listener_callback(self, msg):
> ```
> 定义回调函数，当接收到图像消息时调用。

> ```py
>         cv_image = self.bridge.imgmsg_to_cv2(msg, "bgr8")   #转换为OpenCV图像
> ```
> 使用 CvBridge 将 ROS 图像消息转换为 OpenCV 图像（numpy 数组）。图像编码为 "bgr8"，表示 8-bit BGR 图像。


> ```py
>         height, width, _ = cv_image.shape
> ```
> 获取图像的高度和宽度

> ```py
>         cv2.rectangle(cv_image, (width - 100, 0), (width, 100), (255, 255, 255), 2)
> ```
> 在图像右上角绘制一个白色矩形，宽度为 100 像素，高度为 100 像素，线条宽度为 2 像素。
> 注意图像原点在左上角

> ```py
>         ros_image = self.bridge.cv2_to_imgmsg(cv_image, "bgr8")
> ```
> 将处理后的 OpenCV 图像转换回 ROS 图像消息。

> ```py
>         self.publisher1.publish(ros_image)
> ```
> 发布处理后的图像消息。

主函数部分
 ```py
 def main(args=None):          #定义主函数
    rclpy.init(args=args)      #初始化 ROS 2 客户端库。
    camera_node = CameraNode() #创建 CameraNode 实例。
    rclpy.spin(camera_node)    #进入 ROS 2 节点的事件循环，等待并处理事件（例如接收消息）。
    camera_node.destroy_node() #销毁节点。
    rclpy.shutdown()           #关闭 ROS 2 客户端库。

if __name__ == '__main__':     #如果脚本作为主程序运行，调用 main() 函数。
    main()
```

> 参考文章
[ROS系列：八、图像消息和OpenCV图像之间进行转换-cv_bridge](https://blog.csdn.net/hltt3838/article/details/107646737)
[在ROS中 opencv 发布和接收图像消息 学习总结](https://blog.csdn.net/sansanjinli/article/details/102998069)
