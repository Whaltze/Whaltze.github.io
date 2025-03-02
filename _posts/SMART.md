---
title: SMART
date: 2024-09-22 17:00:00
# top_img: /img/SMART.png # 顶部背景图
cover: /img/SMART.png   # 文章封面
tags:
- Blog
- SMART
top: 100
password: "1977-04-08"
# output: pdf_document
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


## VMware虚拟机 网络不显示有线连接

```shell
sudo service NetworkManager stop
sudo rm /var/lib/NetworkManager/NetworkManager.state
sudo service NetworkManager start
```

## 在ubuntu安装edge

[如何在 Ubuntu 上安装 Microsoft Edge 浏览器](https://www.sysgeek.cn/ubuntu-install-microsoft-edge/)

从 Ubuntu 中卸载 Microsoft Edge 浏览器

执行命令卸载 Edge

```shell
sudo apt remove microsoft-edge-stable
```

删除 GPG 密钥：

```shell
sudo rm -rf /usr/share/keyrings/microsoft-edge.gpg
```

从系统中移除 Microsoft Edge 的软件源：

```shell
sudo rm /etc/apt/sources.list.d/microsoft-edge.list
```

## 使用 代理 Clone Github

[北极熊-陈佬博客-使用代理Clone Github](https://flowus.cn/lihanchen/share/c2e8bab3-4be9-437b-ab2a-50bc11971c6d)


## VScode 折叠所有代码块

```shell
crtl + K + 0
```

展开 
`ctrl + K + J`

## 在VScode直接粘贴图片 编写markdown

[如何设置VS Code 中 Markdown粘贴图片的位置](https://blog.csdn.net/seek97/article/details/139220331#:~:text=%E5%9C%A8VS%20Code%E4%B8%AD%EF%BC%8C%E6%8C%89%E4%B8%8B%20Ctrl%20%2B%20%2C%EF%BC%8C%E6%89%93%E5%BC%80%E8%AE%BE%E7%BD%AE%E7%95%8C%E9%9D%A2%E3%80%82%20%E6%96%B0%E5%A2%9E%E9%85%8D%E7%BD%AE%E9%A1%B9%20key%20%E4%B8%BA,%E4%BD%A0%E7%9A%84%E7%9B%AE%E6%A0%87%E8%B7%AF%E5%BE%84%E3%80%82%20%E6%AF%94%E5%A6%82%E6%88%91%E6%83%B3%E5%B0%86%E5%9B%BE%E7%89%87%E6%94%BE%E5%9C%A8%20photo%E7%9B%AE%E5%BD%95%E4%B8%8B%20markdown%E6%96%87%E4%BB%B6%E5%90%8C%E5%90%8D%E7%9A%84%E7%9B%AE%E5%BD%95%E4%B8%8B%EF%BC%8C%E9%82%A3%E4%B9%88%E6%88%91%E5%B0%B1%E5%8F%AF%E4%BB%A5%E8%AE%BE%E7%BD%AE%E4%B8%BAphoto%E3%80%82%20%E4%BF%9D%E5%AD%98%E8%AE%BE%E7%BD%AE%E5%8D%B3%E5%8F%AF%E3%80%82%20%EF%BC%881%EF%BC%89%E6%B3%A8%E6%84%8F%E4%B8%8D%E8%A6%81%E5%8A%A0%22%22%20%EF%BC%882%EF%BC%89%E4%B8%8D%E7%94%A8%E9%87%8D%E5%90%AF%E4%B9%9F%E4%BC%9A%E7%94%9F%E6%95%88%E3%80%82%20%E6%96%87%E7%AB%A0%E6%B5%8F%E8%A7%88%E9%98%85%E8%AF%BB1.4k%E6%AC%A1%EF%BC%8C%E7%82%B9%E8%B5%9E5%E6%AC%A1%EF%BC%8C%E6%94%B6%E8%97%8F8%E6%AC%A1%E3%80%82)

设置搜索 `maekdown.copy`

修改如下

![](images/SMART/image.png)

## VScode 只能打开单个选项卡页面


![](images/SMART/image-1.png)

## 博客内容缺失

今天提交 Ubuntu双系统博客的时候 忽然出现大段内容缺失

进入 github 仓库 源码查看 
一一对比 没有发现问题
`F12` edge 开发者模式 查看 发现有一处开始大段文字被注释

进入md源码查看 发现 md 推送到网页 不能用 `<!--   -->` 符号进行注释 会导致网页端错误 进而导致后续内容缺失删除符号后遂可


## 修改 博客置顶

打开博客目录
`node_modules\hexo-generator-index\lib`

其中的`generator.js`文件就是我们所要修改的文件。

实现该功能需要在`const posts = locals.posts.sort(config.index_generator.order_by);`
代码下添加一下内容：

```js
posts.data = posts.data.sort(function(a, b) {
if(a.top && b.top) { // 两篇文章都有top，top大的在前
    if(a.top == b.top)
        return b.date - a.date; // 若top值一样，最新的文章在前面
    else
        return b.top - a.top; // top大的在前面
}
else if(a.top && !b.top) { // 以下是只有一篇文章top有定义，那么将有top的排在前面
    return -1;
}
else if(!a.top && b.top) {
    return 1;
}
else return b.date - a.date; 	//都没有top标签，最新的文章在前面
});
```

之后 在文章前添加 top 值 即可

```markdown
---
title: SMART
date: 2024-09-22 17:00:00
# top_img: /img/SMART.png # 顶部背景图
cover: /img/SMART.png   # 文章封面
tags:
- Blog
- SMART
top: 100
output: pdf_document
---
```


## 博客加入评论系统 Gitalk

[Hexo-butterfly评论系统配置: Gittalk](https://blog.csdn.net/qq_33384402/article/details/107200465)

## 博客 npm 安装treee

[windows tree 生成目录结构](https://blog.csdn.net/weixin_44375151/article/details/140546831)

## HTML编写隐藏段落块

### 

<div class="custom-toggle" onclick="this.nextElementSibling.classList.toggle('show')" 
     style="background-color: hsla(213, 88.40%, 62.90%, 0.94); color: white; padding: 10px; margin: 0 auto 30px; text-align: center; font-family: 'Comic Sans MS', cursive; font-size: 18px; cursor: pointer;">
点击
</div>

<div class="code-container" style="display: none;">
{% codeblock lang:yml %}
这是一个隐藏框
{% endcodeblock %}
</div>

<script>
document.querySelectorAll('.custom-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const codeBlock = btn.nextElementSibling;
    codeBlock.style.display = codeBlock.style.display === 'none' ? 'block' : 'none';
  });
});
</script>

```html
<div class="custom-toggle" onclick="this.nextElementSibling.classList.toggle('show')" 
     style="background-color: hsla(213, 88.40%, 62.90%, 0.94); color: white; padding: 10px; margin: 0 auto 30px; text-align: center; font-family: 'Comic Sans MS', cursive; font-size: 18px; cursor: pointer;">
点击
</div>

<div class="code-container" style="display: none;">
{% codeblock lang:yml %}
这是一个隐藏框
{% endcodeblock %}
</div>

<script>
document.querySelectorAll('.custom-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const codeBlock = btn.nextElementSibling;
    codeBlock.style.display = codeBlock.style.display === 'none' ? 'block' : 'none';
  });
});
</script>
```

### 

<!-- 折叠标题 -->
<div class="custom-toggle" 
     style="background-color: hsla(213, 88.40%, 62.90%, 0.94); 
            color: white; 
            padding: 12px 40px 12px 20px;
            margin: 0 auto 30px;
            border: 2px solid hsla(213, 88%, 63%, 0.3);
            border-radius: 8px 8px 0 0;
            font-family: 'Comic Sans MS', cursive; 
            font-size: 18px; 
            cursor: pointer;
            position: relative;
            transition: all 0.3s ease;">
 嘿嘿
  <!-- 动态箭头 -->
  <span class="toggle-arrow" style="position: absolute; 
                                  right: 15px; 
                                  top: 50%;
                                  transform: translateY(-50%);
                                  color: rgba(255,255,255,0.8);
                                  transition: transform 0.3s ease;">
    ▼
  </span>
</div>

<!-- 代码容器 -->
<div class="code-container" style="display: none;
                                 border: 2px solid hsla(213, 88%, 63%, 0.3);
                                 border-top: none;
                                 border-radius: 0 0 8px 8px;
                                 background: hsla(213, 88.40%, 62.90%, 0.06);
                                 padding: 15px;
                                 margin-top: -2px;">
  {% codeblock lang:yml %}
增加一些美化细节
  {% endcodeblock %}
</div>

<script>
document.querySelectorAll('.custom-toggle').forEach(btn => {
  const arrow = btn.querySelector('.toggle-arrow');
  const codeBlock = btn.nextElementSibling;

  btn.addEventListener('click', () => {
    // 切换显示状态
    const isShowing = codeBlock.style.display === 'block';
    codeBlock.style.display = isShowing ? 'none' : 'block';
    
    // 箭头动画
    arrow.style.transform = isShowing 
      ? 'translateY(-50%) rotate(0deg)' 
      : 'translateY(-50%) rotate(180deg)';
    
    // 边框动画
    btn.style.borderRadius = isShowing 
      ? '8px 8px 0 0' 
      : '8px';
    codeBlock.style.borderRadius = isShowing 
      ? '0 0 8px 8px' 
      : '0 0 8px 8px';
  });
});
</script>

<style>
/* 悬停效果 */
.custom-toggle:hover {
  background-color: hsla(213, 88.40%, 62.90%, 0.98) !important;
  box-shadow: 0 2px 8px hsla(213, 88%, 63%, 0.2);
}

.custom-toggle:hover .toggle-arrow {
  color: #fff;
}

/* 代码块过渡动画 */
.code-container {
  transition: opacity 2.0s ease, transform 2.0s ease;
  opacity: 0;
  transform: translateY(-10px);
}

.code-container[style*="display: block"] {
  opacity: 1;
  transform: translateY(0);
}

/* 移动端优化 */
@media (max-width: 768px) {
  .custom-toggle {
    font-size: 16px !important;
    padding: 10px 35px 10px 15px !important;
  }
  .toggle-arrow {
    right: 12px !important;
    font-size: 14px;
  }
}
</style>

```html
<!-- 折叠标题 -->
<div class="custom-toggle" 
     style="background-color: hsla(213, 88.40%, 62.90%, 0.94); 
            color: white; 
            padding: 12px 40px 12px 20px;
            margin: 0 auto 30px;
            border: 2px solid hsla(213, 88%, 63%, 0.3);
            border-radius: 8px 8px 0 0;
            font-family: 'Comic Sans MS', cursive; 
            font-size: 18px; 
            cursor: pointer;
            position: relative;
            transition: all 0.3s ease;">
 嘿嘿
  <!-- 动态箭头 -->
  <span class="toggle-arrow" style="position: absolute; 
                                  right: 15px; 
                                  top: 50%;
                                  transform: translateY(-50%);
                                  color: rgba(255,255,255,0.8);
                                  transition: transform 0.3s ease;">
    ▼
  </span>
</div>

<!-- 代码容器 -->
<div class="code-container" style="display: none;
                                 border: 2px solid hsla(213, 88%, 63%, 0.3);
                                 border-top: none;
                                 border-radius: 0 0 8px 8px;
                                 background: hsla(213, 88.40%, 62.90%, 0.06);
                                 padding: 15px;
                                 margin-top: -2px;">
  {% codeblock lang:yml %}
增加一些美化细节
  {% endcodeblock %}
</div>

<script>
document.querySelectorAll('.custom-toggle').forEach(btn => {
  const arrow = btn.querySelector('.toggle-arrow');
  const codeBlock = btn.nextElementSibling;

  btn.addEventListener('click', () => {
    // 切换显示状态
    const isShowing = codeBlock.style.display === 'block';
    codeBlock.style.display = isShowing ? 'none' : 'block';
    
    // 箭头动画
    arrow.style.transform = isShowing 
      ? 'translateY(-50%) rotate(0deg)' 
      : 'translateY(-50%) rotate(180deg)';
    
    // 边框动画
    btn.style.borderRadius = isShowing 
      ? '8px 8px 0 0' 
      : '8px';
    codeBlock.style.borderRadius = isShowing 
      ? '0 0 8px 8px' 
      : '0 0 8px 8px';
  });
});
</script>

<style>
/* 悬停效果 */
.custom-toggle:hover {
  background-color: hsla(213, 88.40%, 62.90%, 0.98) !important;
  box-shadow: 0 2px 8px hsla(213, 88%, 63%, 0.2);
}

.custom-toggle:hover .toggle-arrow {
  color: #fff;
}

/* 代码块过渡动画 */
.code-container {
  transition: opacity 2.0s ease, transform 2.0s ease;
  opacity: 0;
  transform: translateY(-10px);
}

.code-container[style*="display: block"] {
  opacity: 1;
  transform: translateY(0);
}

/* 移动端优化 */
@media (max-width: 768px) {
  .custom-toggle {
    font-size: 16px !important;
    padding: 10px 35px 10px 15px !important;
  }
  .toggle-arrow {
    right: 12px !important;
    font-size: 14px;
  }
}
</style>
```

### 

<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>显示/隐藏代码块</title>
<style>
  .code-block {
    display: none; /* 初始状态隐藏代码块 */
    margin-top: 10px;
  }
</style>
</head>
<body>

<button id="toggleButton">这是一个神秘按钮</button>

<div class="code-block">
  <pre>
    <code>
        嘿嘿 祝你健康幸福 万事顺遂 !
    </code>
  </pre>
</div>

<script>
  document.getElementById('toggleButton').addEventListener('click', function() {
    var codeBlock = document.querySelector('.code-block');
    if (codeBlock.style.display === 'none') {
      codeBlock.style.display = 'block';
    } else {
      codeBlock.style.display = 'none';
    }
  });
</script>

</body>
</html>

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>显示/隐藏代码块</title>
<style>
  .code-block {
    display: none; /* 初始状态隐藏代码块 */
    margin-top: 10px;
  }
</style>
</head>
<body>

<button id="toggleButton">这是一个神秘按钮</button>

<div class="code-block">
  <pre>
    <code>
        嘿嘿 祝你健康幸福 万事顺遂 !
    </code>
  </pre>
</div>

<script>
  document.getElementById('toggleButton').addEventListener('click', function() {
    var codeBlock = document.querySelector('.code-block');
    if (codeBlock.style.display === 'none') {
      codeBlock.style.display = 'block';
    } else {
      codeBlock.style.display = 'none';
    }
  });
</script>

</body>
</html>
```


## Ubuntu 终端查看所有指令

```shell
script cmd.log
```
开始记录终端中执行的所有命令，并保存到当前文件夹下的cmd.log文件中 文件名字后缀都可更改

```shell
exit
```
退出记录


## Ubuntu 虚拟串口 socat

安装 

```shell
sudo apt-get install socat
```

生成虚拟串口对

```shell
socat -d -d pty,b115200 pty,b115200
```

`/dev/pts/7`和`/dev/pts/8`就是生成的虚拟串口对


## 编写虚拟串口

`virtualPort.py`

```shell
#! /usr/bin/env python
#coding=utf-8

import pty
import os
import select

def mkpty():
    master1, slave = pty.openpty()
    slaveName1 = os.ttyname(slave)
    master2, slave = pty.openpty()
    slaveName2 = os.ttyname(slave)
    print ('Virtual serial port : ', slaveName1, slaveName2)
    return master1, master2

if __name__ == "__main__":
    master1, master2 = mkpty()
    while True:
        rl, wl, el = select.select([master1,master2], [], [], 1)
        for master in rl:
            data = os.read(master, 128)
            print ("read %d data." % len(data))
            if master==master1:
                os.write(master2, data)
            else:
                os.write(master1, data)
```

编译

```shell
g++ main.cpp SerialPort.cpp -o read -lpthread -D VITRUALPROT -D READ
g++ main.cpp SerialPort.cpp -o write -lpthread -D VITRUALPROT -D WRITE
```

运行

```shell
python3 virtualPort.py     //virtualPort.py 为我上面虚拟串口程序的文件名
```

打开另一个终端 开始读写

**修改名称**

指定虚拟串口的名称：

```shell
socat -d -d pty,raw,echo=0,link=$HOME/socatpty7 pty,raw,echo=0,link=$HOME/socatpty8
```

其中，$HOME/socatpty7和$HOME/socatpty8是自己设定的串口名称

### 测试串口

启动串口

```shell
socat -d -d pty,b115200 pty,b115200
```

测试文件 向/dev/pts/7写入

```python
#!/usr/bin/env python
#coding=utf8
 
import serial
from time import sleep
 
if __name__=="__main__":
    serial = serial.Serial("/dev/pts/7", 115200, timeout=0.5)
    if serial.isOpen():
        print("open success")
    else:
        print("open failed")
 
    while True:
        serial.write("test")
        print("send: test")
        sleep(1)
```

测试文件 从/dev/pts/8读取

```python
#!/usr/bin/env python
#coding=utf8
 
import serial
from time import sleep
 
if __name__=="__main__":
    serial = serial.Serial("/dev/pts/7", 115200, timeout=0.5)
    if serial.isOpen():
        print("open success")
    else:
        print("open failed")
 
    while True:
        serial.write("test".encode('utf-8'))
        print("send: test")
        sleep(1)
```

读取/dev/pts/8串口代码

```python
#!/usr/bin/env python
#coding=utf8
 
import serial
from time import sleep
 
def recv(serial):
    while True:
        data = serial.read_all()
        if data == '':
            continue;
        else:
            break;
        sleep(0.02)
    return data
 
if __name__=="__main__":
    serial = serial.Serial("/dev/pts/8", 115200, timeout=0.5)
    if serial.isOpen():
        print("open success")
    else:
        print("open failed")
 
    while True:
        data = recv(serial)
        if data != b'':
            print("receive:", data)
            serial.write(data)
```

运行
```shell
pip install pyserial
python3 tx.py
python3 rx.py
```