---
title: Deploy Environment to Anaconda3
date: 2024-07-15 15:00:00
tags:
- Blog
- Environment
- Anaconda3
top_img: /img/2.png # 顶部背景图
cover: /img/2.png   # 文章封面
---

## 摘要
> 本文主要介绍了anaconda3 环境配置的相关问题，包括但不限于如何修改 ~/.bashrc 文件，保证每次终端开启不会自启动conda，同时也避免了全盘杀死anaconda进程，导致conda无法初始化，conda找不到指令

# Anaconda3 的下载

# 常用指令

## 新建虚拟环境并指定包版本
```shell
conda create --name <环境名> python=3.6
```
## 查看已有虚拟环境
```shell
conda env list
```
或者
```shell
conda info --envs
```
## 删除虚拟环境
```shell
conda remove -n <环境名称> --all
```
## 进入虚拟环境
```shell
conda activate <环境名>
```
## 退出虚拟环境
```shell
conda deactivate
```
## 环境内安装新包
```shell
conda install <包名>
```
## 查看已安装库
```shell
conda list
```
## 更新包版本
```shell
conda update <包名>
```


 