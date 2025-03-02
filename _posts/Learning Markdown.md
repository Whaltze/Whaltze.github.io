---
title: Markdown
date: 2024-07-10 03:00:00
tags:
- Blog
- Markdown
top_img: /img/1.png # 顶部背景图
cover: /img/1.png   # 文章封面
---

<!-- <b><font face="微软雅黑" color=black size=3>

 [TOC] 

</font></b> -->

# Introduction 

*<b><font face="微软雅黑">*Hello! In this post, you will learn some basic skills about markdown-writing.*</font></b>*


><b><font face=“仿宋”>Please click [***Markdown***](https://markdown.com.cn/basic-syntax/) for more informations.</font></b>

>*<b><font face="微软雅黑">The form is effect, following is md grammar.</font></b>*

<b><font size=5 color=black face="微软雅黑">Now let's start!</font></b>

**********************************
# Basic Grammar

## Heading

**The symbol  ***```#```***  stands the priority**
For example

># This is Fist-level title
>## This is Second-level title

```js
# This is Fist-level title

## This is Second-level title
```
**********************************
## Bold && Italic
>**the word is be bold**
```js
**the word is be bold**
__the word is be bold__
```
>*the word is be italicized*
```js
*the word is be italicized*
_the word is be italicized_
```
>***the word is be bold && italic***
```js
***the word is be bold && italic***
___the word is be bold && italic___
```
**********************************
## Blockquote
>This is a blockquote
```js
>This is a blockquote
```
***********************************
## Code
```js
This is code block
```
```js
`This is code block`
```This is code block```
```
>*<font face="仿宋">The latter can reserved spaces</font>*
*************************************
## List
### Ordered List

>1. First item
>2. Second item
>3. Third item
```js
1. First item
2. Second item
3. Third item
```
### Unordered List

>- First item
>- Second item
>- Third item
```js
- First item
- Second item
- Third item
```
*************************************
## Horizontal Rule
*<b><font face="微软雅黑">Using on a single line following</font></b>*

```js
*******************
-------------------
___________________
```
************************************
## Link
>This is an external link: [website](https://www.example.com)

```js
This is an external link: [website](https://www.example.com)
```
><XXXX@qq.com>
```js
This is an email <XXXX@qq.com>
```
************************************
## Picture
>![This is a Picture](/imges/philly-magic-garden.jpg "Magic Gardens")

```js
![This is a Picture](Picture website address "picture title")
```
```js
[![This is a picture](/imges/shiprock.jpg "Shiprock")](https://markdown.com.cn)
```
**************************************
## The Escape Character
The escape character is **`\`**, displaying special characters

like this
>the \*

```js
actually \*                 
 ```

***These are escapable character***
| Character    |	Name    |
|:------------:|:----------:|
|     \	       |  backslash |
| `	           |  backtick  |
| *	           |  asterisk  |
| _	           | underscore |
| { }	       |curly braces|
| [ ]	       |  brackets  |
| ( )	       |parentheses |
| #	           | pound sign |
|+	           |  plus sign |
| -            | minus sign |
| .            |	dot     |
| !	          |exclamation mark|
| |	           |    pipe    |

*************************************************

## Face && Size && Color && Font
><font face="黑体">I'm Boldface</font>
<font face="微软雅黑">I'm Microsoft_YaHei</font>
<font face="STCAIYUN">I'm Chinese_Clouds</font>
<font color=red>I'm Red</font>
<font color=#008000>I'm geen</font>
<font color=Blue>I'm bule</font>
<font size=5>I'm size5</font>
<font face="黑体" color=green size=5>Boldface, green, size5</font>
<b><font face="黑体" color=green size=5>Boldface, bold, green, size5</font></b>
<font size=3>
>| It can revise the size of table | put in the `<font></font>`| 
>|:-------------------------------:|:-------------------------:|
</font>

<font size=4>

```js
code in md:
><font face="黑体">I'm Boldface</font>
<font face="微软雅黑">I'm Microsoft_YaHei</font>
<font face="STCAIYUN">I'm Chinese_Clouds</font>
<font color=red>I'm Red</font>
<font color=#008000>I'm geen</font>
<font color=Blue>I'm bule</font>
<font size=5>I'm size5</font>
<font face="黑体" color=green size=5>Boldface, green, size5</font>
<b><font face="黑体" color=green size=5>Boldface, bold, green, size5</font></b>
<font size=>
| It can revise the size of table | put  in the <font></font>  | 
|:-------------------------------:|:--------------------------:|
</font>
```
</font>

************************************************
## Highlight Test
>==Hello==
```js
==hello==
```
************************************************
## Generate directory
```js
[TOC]Content title
```
*************************************************
## Strikethrough
>~~Hello World !~~
```js
~~Hello World ！~~
```

*************************************************
## Emoji
>:joy: :tent: :moon: :pig:
```js
:joy: :tent: :moon: :pig: 
```

# 补充

> <strong style="font-family:'仿宋';">不一样代码方式添加字体</strong>
```shell
<strong style="font-family:'仿宋';">不一样代码方式添加字体</strong>
```

> <s style="font-family:'仿宋';">添加高级删除线</s>
```shell
<s style="font-family:'仿宋';">添加高级删除线</s>
```
