SVG精髓 目录
[TOC]
***

# 前言

- 本书为《SVG Essential》的阅读笔记

***

# 推荐阅读

- 《SVG Essential》

***

# 1. 入门

- `SVG`是一种`XML`应用，可移植的形式

## 1. 图形系统

描述图形信息的两大系统：

- 栅格图形 - `raster graphics`
- 矢量图形 - `vector graphics`

### 1. 栅格系统

- 图像被表示为图片元素或者像素的长方形数组
- 每个像素用`RGB`表示
- 位图

### 2. 矢量图形

- 线条
- 不失真

## 2. `SVG`作用

- 特定的二进制格式存储绘图信息

### 1. 文档结构

- `xml`处理指令
- `DOCTYPE`声明
- `SVG`根元素：声明`width, height`
- `title`
- `desc`

```xml
<?xml version="1.0"?>
<!DOCTYPE svg PUBLIC "">

<svg width="140" height="170" xmlns="http://www.w3.org/2000/svg">
<title>Cat</title>
<desc>Stick Figure of a Cat</desc>
<!-- 在这里绘图 -->
</svg>
```

### 2. `circle`

```xml
<?xml version="1.0"?>
<!DOCTYPE svg>

<svg width="140" height="170" xmlns="http://www.w3.org/2000/svg">
<title>Cat</title>
<desc>Stick Figure of a Cat</desc>
<!-- 在这里绘图 -->
<circle cx="70" cy="95" r="50" style="stroke: black; fill: none" />
</svg>
```

![image-20210306003203176](.\img\0-circle.png)

### 3. 指定样式 - `fill, stroke`

```xml
<circle cx="70" cy="95" r="50" style="stroke: black; fill: none" />
```

### 4. 线 - `line`

```xml
<circle cx="70" cy="95" r="50" style="stroke: black; fill: none" />
<circle cx="55" cy="80" r="5" stroke="black" fill="#339933" />
<circle cx="85" cy="80" r="5" stroke="black" fill="#339933" />
<g id="whiskers">
    <line x1="75" y1="95" x2="135" y2="85" style="stroke: black;" />
    <line x1="75" y1="95" x2="135" y2="105" style="stroke: black;" />
</g>
```

![image-20210306004509622](.\img\1-line.png)

### 5. 变换坐标系统 - `use, transform, scale`

- `use`：复用
- `transform`：变换
  - `translate`：移动
  - `scale`：大小和方向

```xml
<circle cx="70" cy="95" r="50" style="stroke: black; fill: none" />
<circle cx="55" cy="80" r="5" stroke="black" fill="#339933" />
<circle cx="85" cy="80" r="5" stroke="black" fill="#339933" />
<g id="whiskers">
    <line x1="75" y1="95" x2="135" y2="85" style="stroke: black;" />
    <line x1="75" y1="95" x2="135" y2="105" style="stroke: black;" />
</g>
<use href="#whiskers" transform="scale(-1,1) translate(-140, 0)" />
```

![image-20210306005107382](.\img\2-transform.png)

### 6. 折现 - `polyline`

- `points`：接收一对`x y`多组作为数据

```xml

```

