JavaScript高级程序设计第四版 目录
[TOC]
***
# 前言

本文章来源为：《JavaScript高级程序设计》（第四版），如有机会，请以书中内容为主。

## 注意

- <p style="color:red;">此文不涉及基础语法，如有需要可观看<a href="https://www.runoob.com/js/js-tutorial.html">菜鸟教程</a></p>

# 推荐

- 《JavaScript高级程序设计》（第四版）
- 《JavaScript学习指南》

# 1. 什么是JavaScript

## DOm
文档对象模型(DOM):是一个应用编程接口(API)
```html
<html>
<head>
	<title>xxx</title>
</head>
<body>
<p>xxxx</p>
</body>
</html>
```

图例：
![1-DOM.png][01]

# 2. HTML中的JavaScript

## `<script>`元素
### 属性
- async：立刻下载脚本
- charset：指定的代码字符集
- crossorigin：跨资源共享设置
- defer：在文档解析和显示完成后再执行脚本
- integrity：允许比对接收到的资源和指定的加密签名，已验证子资源的完整性。用于CDN
- language
- src
- type：代码块中脚本语言的内容类型。如果是`module`，则被当作ES6模块

## 动态加载脚本
```javascript
let script = document.createElement('script');
script.src = 'test.js'
document.head.appendChild(script);
```
## XHTML中的变化
XHTML是将HTML作为XML重新包装的结果。
### 区别
- XHTML使用JavaScript必须指定`type=text/javascript`
- 规则严格
- 已经废弃
- `//<!CDATA //]]>`块

# 3. 语言基础
## 内容概括
- 语法
- 数据类型
- 控制语句
- 函数

<p style="color:red;">此文不涉及基础语法，可观看菜鸟教程</p>

## 严格模式
- 处理不规范写法
- `use strict`






[01]: ./img/1-DOM.png "1-DOM"