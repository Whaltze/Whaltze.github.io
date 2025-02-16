---
title: stm32学习记录
tags:
  - Blog
  - stm32
  - 单片机
  - SMART
# top_img: transparent
cover: /img/4.png
date: 2024-10-20 18:06:22
---

> 一些好用的网站
> [STM32参考手册大汇总，史上巨全，再也不用到处找啦](https://shequ.stmicroelectronics.cn/thread-623877-1-1.html)
> [keil编译运行错误，缺少error:#5：#include "core_cm3.h"](https://www.cnblogs.com/ligangblog/p/9963786.html)
> [MDK5.37不预安装Compiler Version5解决办法](https://zhuanlan.zhihu.com/p/561047339)
> [keil5 显示 No target connected](https://blog.csdn.net/AI_QS_CSDN/article/details/105213662)
> [STM32 No Target connected四种解决办法](https://blog.csdn.net/kangweijian/article/details/107564868)
> [【Keil5教程及技巧】](https://bbs.huaweicloud.com/blogs/433459)
> [Keil 丢失编译器版本5、内核文件core_cm3.c报错解决方案](https://blog.csdn.net/gitblog_06586/article/details/142399385)
> 发现与stm32的三种启动方式有关（我听信别人，如果使用swd下载程序，则boot0就可以悬空，才导致出现flash锁死），于是我将程序擦除后，并用短接帽将boot0接地，boot1此时可以作它用，重新进入调试时，就可以正常使用的了。
> [在MDK调试STM32出现“could not stop cortex-m device”解决办法](https://blog.csdn.net/m0_46217142/article/details/122861796)
> [使用STM32CubeMX和STM32CubeIDE的常见问题和注意事项](https://blog.csdn.net/HongAndYi/article/details/115604543)
> [官方文档-串口通信](https://doc.embedfire.com/mcu/stm32/f103zhinanzhe/std/zh/latest/book/USART.html)
> [【经验分享】STM32使用HAL库的ADC多通道数据采集（DMA+非DMA方式）+ 读取内部传感器温度](https://shequ.stmicroelectronics.cn/thread-634287-1-1.html)
> [ADC模数转换](https://www.cnblogs.com/Lavender-edgar/p/18347469)
> 

# Stm32F103C8T6学习

> 课设寻迹小车需要,遂开始学习单片机有关知识,在此进行记录学习

下载Keil5(不要下载太高版本的),高版本不再自带arm compiler,需要自行安装version5编译器版本
小tips,也可以从别人那里直接copy **AEMCC**整个目录到自己的ARM目录下去配置

这里贴几个网图

![ ](./images/Stm32学习记录/1.png)



