SVG精髓 目录
[TOC]
***

# 前言

- 本书为《SVG Essential》的阅读笔记

***

# 推荐阅读

- 《SVG Essential》
- 全书源码:[svg-essentials-examples](https://github.com/oreillymedia/svg-essentials-examples "github")

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

### 6. 折线 - `polyline`

- `points`：接收一对`x y`多组作为数据

```xml
<polyline points="35 110, 45 120, 95 120, 105 110" style="stroke: black; fill: none;" />
```

### 7. `path`

- 路径通用写法
- 用来简洁指定路径或者一系列直线和曲线

```xml
<path d="M 75 90 L 65 90 A 5 10 0 0 0 75 90" />
```

### 8. `text`

```xml
<text x="60" y="165" style="font-family: sans-serif; font-size: 14pt; stroke: none; filee: black;">Cat</text>
```

***

# 2. 网页中使用`SVG`

- 图形集成到一个较大的文档中

## 1. 常见的插入网页的方法

- `<img>`标签内：页面基本组成部分

- `css`：主要用来装饰

### 1. `<img>`

```xml
<img src="cat.svg" title="Cat image" alt="cat">
```

## 2. `css`

```css
div.background-cat {
    background-image: url("cat.svg");
    background-size: 100% 100%；       
}
```

## 2. `SVG`作为应用程序

- 为了引入图像，但又不想被上面引入，使用`<Object>`或者`<embed>`

```html
<object data="./test.svg" type="image/svg+xml">
</object>
```

```html
<embed src="./test.svg">
</embed>
```



## 3. 混合文档的`SVG`

- 一个文件包含`SVG`，`HTML, XML`

### 1. `svg`内插入`html`

- `<foreignObject>`

```xml
<g transform="skewX(20)">
    <switch>
        <foreignObject>
            <h1>Hellp</h1>
        </foreignObject>

        <text>
            This
        </text>
    </switch>
</g>
```

### 4. `HTML`内联`svg`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
        svg {
            display: block;
            width: 500px;
            height: 500px;
            margin: auto;
            border: thick double navy;
            background-color: lightblue;
        }

        body{
            font-family: cursive;
        }

        circle {
            fill: lavender;
            stroke: navy;
            strike-width: 5;
        }
    </style>
</head>
<body>
    <h1>Inline SVG in HTML Demo Page</h1>
    <svg viewBox="0 0 250 250">
        <title>An SVG circle</title>
        <circle cx="125" cy="125" r="100" />
        <text x="125" y="125" dy="0.5em" text-anchor="middle">Look Me!</text>
    </svg>
    <p>Again</p>
</body>
</html>
```

***

# 3. 坐标系统

## 1. 画布区域 - 视口

- `svg`的`width, height`

### 单位

- `em` - 默认。文本行高
- `ex`
- `px`
- `pt`
- `pc`
- `cm`
- `mm`
- `in`

```xml
<svg width="200px" height="150px"></svg>
```



## 2. 默认用户坐标

```xml
<rect x="10" y="10" width="50" height="30" />
```

## 3. 指定用户坐标

- `viewBox`：想要叠加在视口上的用户坐标系统最小的坐标

```xml
<svg width="4em" height="5cm" viewBox="0 0 64 80"></svg>
```

- $4 \times 16 = 64$

- 后序默认单位就会改变

## 4. 宽高比

- 视口的宽高比可以和`viewBox`的宽高比不同

```xml
<svg width="45" height="135" viewBox="0 0 90 90"></svg>
```

- `svg`会拉伸改变

## 5. 视口对齐方式 - `preserveAspectRatio`

- `preserveAspectRatio="aligment [meet | slice]"`：相对视口的对齐方式

```xml
<svg width="45" height="135" viewBox="0 0 90 90" preserveAspectRatio="xMinYMin meet"></svg>
```

- `meet`：整体位置
- `slice`：切分位置

# 4. 基本形状

## `line`

- `line`：线条
- `stroke-width`：笔画宽度

## `style`

- `stroke`：笔画颜色
- `stroke-linecap`：线帽
- `stroke-linejoin`：线段在图形棱角处交叉时的效果
- `stroke-opacity`：控制不透明度
- `stroke-dasharray`：虚线实线

## `rect`

- `fill`：颜色填充
- `fill-opacity`：填充透明度
- `rx, ry`：圆角矩形

```xml
<rect x="10" y="10" width="20" height="40" rx="2" ry="2" />
```

``

## `circle, ellipse`

```xml
<circle cx="30" cy="30" r="20" />
<ellipse cx="80" cy="80" rx="20" ry="10" />
```

## 多边形 - `polygon`

- 会自动回到起始坐标

```xml
<polygon points="48,16 16,96 96,48 0,48 80,96" />
```

# 5. 文档结构

- 允许文档表现和文档结构分离

## 1. 在`svg`中使用样式

### 内联

```xml
<text x="60" y="165" style="font-family: sans-serif; font-size: 14pt; stroke: none; filee: black;">Cat</text>
```

### 内部样式表

```xml
<svg>
<defs>
    <style type="text/css"><![CDATA[
	circle {
		fill: #ffc;
	}
	]]></style>
</defs>
    <circle />
</svg>
```

### 外部样式表

```css
rect {
    stroke-dasharray: 7 3;
}
```

```xml
<?xml version="1.0"?>
<?xml-stylesheet href="./xx.css" type="text/css">
```

## 2. 分组和引用对象

### `<g>`元素

- 所有子元素作为一个组合，并指定`id`

```xml
<g id="xxx">
    <desc>
    </desc>
    <title></title>
</g>
<g id="yxx">
    <desc>
    </desc>
    <title></title>
</g>
```

```xml
<?xml version="1.0"?>
<!DOCTYPE svg>
<svg width="240px" height="240px" viewBox="0 0 240 240"
    xmlns="http://www.w3.org/2000/svg">
    <title>Group</title>

    <g id="house" style="fill: none; stroke: black;">
        <desc></desc>
        <rect x="6" y="50" width="60" height="60" />
        <polyline points="6 50, 36 9, 66 50" />
        <polyline points="36 110, 36 80, 50 80, 50 110" />
    </g>

    <g id="man" style="fill:none; stroke: black;">
        <circle cx="85" cy="56" r="10" />
        <line x1="85" y1="66" x2="85" y2="80" />
        <polyline points="76 104, 85 80, 94 104" />
        <polyline points="76 70, 85 76, 94 70" />
    </g>

    <g id="woman" style="fill:none; stroke: black;">
        <circle cx="110" cy="56" r="10" />
        <line x1="104" y1="104" x2="108" y2="90" />
        <line x1="112" y1="90" x2="116" y2="104" />
        <polyline points="110 66, 110 80, 100 90, 120 90, 110 80" />
        <polyline points="101 70, 110 76, 119 80" />
    </g>
</svg>
```

### `<use>`元素

- 重复元素使用
- 除了同一文件内的对象还可以指定任意有效的文件和URI，但会出现不允许跨域的情况

```xml
<use href="#house" x="70" y="100" />
<use href="#woman" x="-80" y="100" />
<use href="#man" x="-30" y="100" />
```

### `<defs>`

- 只定义不显示，用来存储数据
- 根据需求进行调用处理

```xml
<?xml version="1.0"?>
<!DOCTYPE svg>
<svg width="240px" height="240px" viewBox="0 0 240 240"
    xmlns="http://www.w3.org/2000/svg">
    <title>Group</title>
    <defs>
    <g id="house" style="stroke: black;">
        <desc></desc>
        <rect x="6" y="50" width="60" height="60" />
        <polyline points="6 50, 36 9, 66 50" />
        <polyline points="36 110, 36 80, 50 80, 50 110" />
    </g>

    <g id="man" style="stroke: black;">
        <circle cx="85" cy="56" r="10" />
        <line x1="85" y1="66" x2="85" y2="80" />
        <polyline points="76 104, 85 80, 94 104" />
        <polyline points="76 70, 85 76, 94 70" />
    </g>

    <g id="woman" style="stroke: black;">
        <circle cx="110" cy="56" r="10" />
        <line x1="104" y1="104" x2="108" y2="90" />
        <line x1="112" y1="90" x2="116" y2="104" />
        <polyline points="110 66, 110 80, 100 90, 120 90, 110 80" />
        <polyline points="101 70, 110 76, 119 80" />
    </g>
    </defs>

    <use href="#house" x="70" y="100" style="fill: #cfc;" /> 
    <use href="#woman" x="-80" y="100" style="fill: #cfc;" />
    <use href="#man" x="-30" y="100" style="fill: #c00;" />
</svg>
```

![image-20210306171008577](.\img\3-use.png)

### `<symbol>`

- 另一种组合元素的方式，永远不会显示，无需放到`defs`里
- `use`使用与上相同

### `<image>`

- 引入`img`

```xml
<?xml version="1.0"?>
<!DOCTYPE svg>
<svg width="240px" height="240px" viewBox="0 0 240 240">
    <image href="0-circle.png"
        x="72" y="92"
        width="160" height="120" />
</svg>
```

# 6. 坐标系统变换

- 旋转、缩放、移动

## `translate`

- 把坐标移动到指定位置，然后在`(0,0)`绘图
- 改变网格在画布上的位置
- `transform="translate(50,50)"`

## `scale`

- 尺寸
- 改变对应画布上的坐标系统（网格）的大小
- `transform(xvalue, yvalue), transform(value)`

## 变换序列 - `transform`

- 多个变换
- 变换顺序和书写顺序相同

- `transform="translate(value) scale(value)"`

## 笛卡尔坐标系统转换

- 与默认相反，需要变换y轴方向
- `transfortransform=translattranslate(0,100) scale(1, -1)`

## rotate

- 根据指定的角度旋转坐标系统，默认顺时针
- 旋转的中心默认位(0,0)
- `transform(rotate(45))`
- `tranform(rotate(angle, centerX, centerY)), transform(translate(centerX, centerY) rotate(angle)), translate(-centerX, -centerY)`指定点旋转
- 围绕中心点缩放：`translate(-centerX*(factor-1), -centerY*(factor-1)) scale(factor)`

```xml
<?xml version="1.0"?>
<!DOCTYPE svg>
<svg width="240px" height="240px" viewBox="0 0 240 240"     xmlns="http://www.w3.org/2000/svg">
    <rect x="70" y="30" width="20" height="20" style="fill:gray" />
    <rect x="70" y="30" width="20" height="20" 
    transform="rotate(45)"
    style="fill:black" />
        <image href="0-circle.png"
        x="72" y="92"
        width="160" height="120" />
</svg>
```

![image-20210306233919599](.\img\4-rotate.png)

## 倾斜 - `skewX, skewY`变换

- 倾斜某个轴，单位为角度
- `skewX(angle)`倾斜`x`坐标，会让垂直线出现角度
- `skewY(angle)`倾斜`y`坐标，会让水平线出现角度

***

# 7. 路径

## 1. `moveTo, lineTo, closePath`

- 每个命令以`moveTo`开始，缩写为`M`
- `lineTo`绘制线条，缩写为`L`
- `closePath`绘制一条直线回到当前子路径的起点，缩写为`Z`
- 缩写的大小写是存在区别的
  - 大写：坐标是绝对
  - 小写：坐标是相对

```xml
<path d="M 10,20 L 100,20 L 90,60 Z" />
```

## 2. 快捷方式

- `H 20 = L 20 current_y`
- `h 20 = l 20 0`
- `V 20 = L current_x 20`
- `v 20 = l 0 20`

## 3. 椭圆弧 - `A`

- `A x ,y ...`或者`a x, y ...`

## 4. 贝塞尔曲线 - `Q`

```xml
<path d="M 30 75 Q 240 30, 300 120" />
```

## 5. 三次贝塞尔曲线 - `C`

```xml
<path d="M 30 75 C 240 30, 300 120, 200 120" />
```

## 6. `<marker>`

```xml
<?xml version="1.0"?>
<!DOCTYPE svg>
<svg width="500" height="500" viewBox="0 0 240 240"     xmlns="http://www.w3.org/2000/svg">

    <defs>
<marker id="mCircle" markerWidth="10" markerHeight="10"
        refX="5" refY="5">
	<circle cx="5" cy="5" r="4" style="fill:none; stroke:black;" />
</marker>

<marker id="mArrow" markerWidth="4" markerHeight="8"
        refX="0" refY="4">
	<path d="M 0 0 4 4 0 8" style="fill: none; stroke: black;" />
</marker>

<marker id="mTraingle" markerWidth="5" markerHeight="10"
        refX="5" refY="5">
	<path d="M 0 0 5 5 0 10 Z" style="fill: black;" />
</marker>
</defs>

<path d="M 10 20 100 20 A 20 30 0 0 1 120 50 L 120 110"
      style="marker-start:url(#mCircle);
            marker-mid: url(#mArrow);
            marker-end: url(#mTraingle);
             fill: none; stroke: black;" />
</svg>
```

![image-20210307010958596](.\img\5-marker.png)

***

# 8. 图案和渐变

## `patternUnits`

```xml
<defs>
<pattern id="tile" x="0" y="0" width="20%" height="20%"
         patternUnits="objectBoundingBox">
	<path d="M 0 0 Q 5 20 10 10 T 20 20" 
          style="stroke:black; fill: none;"/>
    <path d="M 0 0 h 20 v 20 h -20 z" 
          style="stroke: gray; fill: none;"/>
</pattern>
</defs>

<rect x="20" y="20" width="100" height="100"
      style="fill: url(#tile); stroke: black;" />
```

![image-20210307012327298](.\img\6-pattern.png)

## 渐变 - `linearGradient`

- 沿着线，一系列颜色过度
- `<stop>`：中间条件
  - `offset`：确定位置
  - `stop-color`：颜色

- 方向渐变：`<linearGradient x1="100%" y1="0%" x2="0%" y2="100%"></linearGradient>`

```xml
<?xml version="1.0"?>
<!DOCTYPE svg>
<svg width="500" height="500" viewBox="0 0 240 240"     xmlns="http://www.w3.org/2000/svg">

<defs>
<linearGradient id="two_hues">
    <stop offset="0%" style="stop-color: #ffcc00;" />
    <stop offset="100%" style="stop-color: #0099cc;" />
</linearGradient>
</defs>
<rect x="20" y="20" width="100" height="100"
      style="fill: url(#two_hues); stroke: black;" />
</svg>
```

![image-20210307022517621](.\img\7-linearGradient.png)

## `radialGradient`元素

- 径向渐变，由中心点向外扩散
- `<linearGradient cx="100%" cy="0%" r="141%"></linearGradient>`



# 9. 文本

## 多语言系统 - `switch`

- `systemLanguage` ：设置属性

```xml
<?xml version="1.0"?>
<!DOCTYPE svg>
<svg width="500" height="500" viewBox="0 0 240 240"     xmlns="http://www.w3.org/2000/svg">

<g systemLanguage="en">
...
</g>
</svg>
```

# 10. 裁剪和蒙版

## 裁剪 - `<clipPath>`

```xml
<defs>
<clipPath id="x"></clipPath>
</defs>

<use href="xx" style="clip-Path: url(#x)" />
```

## 蒙版 - `<mask>`

- 蒙版会变换对象的透明度

# 11. 滤镜

- `<filter>`，指定操作

## 投影 - `<feGaussianBlur>`

- `sourceGraphic`：输入源
- `SourceAlpha`：不透明通道
- `stdDeviation`：模糊度
- `result`：当前元可以通过`blur`名引用
- `<feOffset>`：返回结果`blur`
- `<feMerge>`：包裹元素列表

```xml
<defs>
<filter id="drop-shadow">
    <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
    <feOffset in="blur" dx="4" dy="4" result="offsetBlur" />
    	<feMerge>
        	<feMergeNode in="offsetBlur" >
            <feMergeNode in="SourceGraphic" />
        </feMerge>
    </filter>
</defs>

<g id="flower" filter="url(#drop-shadow)">
</g>

<use href="#flower" filter="url(#drop-shadow)"
     transform="translate(4,4)" />
```

## 发光式投影 - `feColorMatrix`
- 通用方式改变颜色值
```xml
<filter id="glow">
	<feColorMatrix type="matrix" 
                   values=
                   "0 0 0 0 0 
                    0 0 0 0.9 0
                    0 0 0 0.9 0
                    0 0 0 1 0" />
    <feGaussianBlur stdDeviation="2.5"
                    result="coloredBlur" />
    <feMerge>
    	<feMergeNode in="coloredBlur" />
        <deMergeNode in="SourceGraphic" />
    </feMerge>
</filter>
```

## `<feImage>`

- 原始图形可以作为滤镜的输入量

```xml
<?xml version="1.0"?>
<!DOCTYPE svg>
<svg width="800" height="500" viewBox="0 0 240 240"     xmlns="http://www.w3.org/2000/svg">
<defs>
<filter id="sky-shadow" filterUnits="objectBoundingBox">

<feImage href="./0-circle.png" result="sky"
        x="0" y="0" width="100%" height="100%"
        preserveAspectRatio="none" />
<feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
<feOffset in="blur" dx="4" dy="4" resulut="offsetBlur" />
<feMerge>
    <feMergeNode in="sky" />
    <feMergeNode in="offsetBlur" />
    <feMergeNode in="SourceGraphic" />
</feMerge>

</filter>
</defs>
<g id="flower" style="filter: url(#sky-shadow)">
    <path d="M 0 0 L 10 50 L 80 90 Z" />
</g>

<image href="./0-circle.png" x="170" y="10" />
</svg>
```

# 12. `SVG`动画

## 1. 收缩矩形

- `attributeName`：动画中持续改变的值
- `attributeType`：有`XML, css`两种。默认`auto`，先`css`后`xml`
- `from, to`：起始、终止
- `begin`：开始时间
- `dur`：持续时间
- `fill:freeze`：默认不再处理，如果要恢复属性为`remove`

```xml
<?xml version="1.0"?>
<!DOCTYPE svg>
<svg width="800" height="500" viewBox="0 0 240 240"     xmlns="http://www.w3.org/2000/svg">
<rect x="10" y="10" width="200" height="20" strooke="black" fill="none">
	<animate
             attributeName="width"
             attributeType="XML"
             from="200"
             to="20"
             begin="2s"
             dur="5s"
             fill="freeze" />
</rect>
</svg>
```

```xml
<?xml version="1.0"?>
<!DOCTYPE svg>
<svg width="800" height="500" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
<rect x="10" y="10" width="200" height="200" strooke="black" fill="black">
	<animate
        attributeName="width"
        attributeType="XML"
        from="200"
        to="20"
        begin="0s"
        dur="2s"
        fill="freeze" />
    <animate
        attributeName="height"
        attributeType="XML"
        from="200"
        to="20"
        begin="0s"
        dur="2s"
        fill="remove" />
    
    <animate
        attributeName="fill-opacity"
        attributeType="CSS"
        from="0.25"
        to="1"
        begin="0s"
        dur="2s"
        fill="freeze" />

    <animate
        attributeName="fill-opacity"
        attributeType="CSS"
        from="1"
        to="0.25"
        begin="3s"
        dur="2s"
        fill="freeze" />
</rect>
</svg>
```

## 动画时间详解

- 单位时间：`h, min, s, ms`

## 同步动画

- `begin="id.end"`
- `begin="id.begin+1.25s"`

## 重复动作

- `repeatCount`：指定重复次数
- `repeatDur`：持续多久
- 如果要重复到用户离开，而指定`indefinite`值

- `begin="id.repeat(n)+xx"`指定动画重复`n`次后开始

## 复杂的属性应用动画

- `from, to`值可以是颜色或者位置

## `from, to`指定多个值 - `values`

- `values=start;end;start;`

## 多级动画时间

- `keyTimes`：以其他方式划分持续时间
- `<set>`：动画序列修改个值

## 运动中指定关键点和时间

```xml
<path d="M -10,-3 L 10,-3 L 0,-25 Z" style="fill: yellow; stroke:red;" >
<animation 
           path="M50,125 C 100,25 150,225, 200,125"
           rotate="auto"
           keyPooints="0;0.2;0.8;1"
           keyTimes="0;0.33;0.66;1"
           calcMode="linear"
           dur="6s" fill="freeze" />
</path>
```



## `CSS`处理

在`css`中给动画元素设置：

- `animation-name`：`@keyframes`名
- `animation-duration`
- `animation-timing-function`：如何计算中间值
- `animation-iteration-count`：重复次数
- `animation-direction`：正向或者反向
- `animation-play-state`
- `animation-delay`
- `animation-fill-mode`：不执行时使用的属性

### 设置关键帧

- `@keyframes`这一媒体类型设置动画每个阶段要该改变的属性

```css
@keyframes {
    0% {
        fill-opacity: 1.0;
        stroke-width: 0;
    }
    
    100% {
        fill-opacity: 0;
        stroke-width: 6;
    }
}
```

# 13. 添加交互

## 在`svg`中使用链接

```xml
<a href="http://www.baidu.com">
	<path d="M120 90, 140 50, 160 90 Z" style="fill: blue;" />
</a>
```



## 交互式

- 绑定`button`对象：`begin="button.click"`

## 脚本控制`svg`

```xml
<svg width="300" height="100" viewBox="0 0 300 100"
    xmlns="http://www.w3.org/2000/svg">
<rect id="rectangle" x="10" y="20" width="30" height="40"
        style="stroke:gray; fill:#ff9; stroke-width:3;" />

<script type="application/ecmascript">
// <![CDATA[
    var txt = document.getElementById("output");
// ]]>
</script>
</svg>
```

## 拖拽对象

```xml
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN"
    "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">

<svg width="400" height="250" viewBox="0 0 400 250"
  onload="init(evt)"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink">

  <defs>
    <style type="text/css" > <![CDATA[
      svg { /* default values */
        stroke: black;
        fill: white;
      }
      g.selected rect {
        fill: #ffc; /* light yellow */
      }
      text {
        stroke: none;
        fill:black;
        text-anchor: middle;
      }
      
      line.slider {
        stroke: gray; 
        stroke-width: 2;
      }
    ]]></style>
    <script type="text/ecmascript"><![CDATA[
      var scaleChoice = 1;
      var scaleFactor = [1.25, 1.5, 1.75];
      var slideChoice = -1;
      var rgb = [100, 100, 100];
      function init(evt) {  
        var obj;
        for (var i = 0; i < 3; i++) {
          obj = document.getElementById("scale" + i);
          obj.addEventListener("click", clickButton, false);
          
          obj = document.getElementById("sliderGroup" + i);
          obj.addEventListener("mousedown", startColorDrag, false);
          obj.addEventListener("mousemove", doColorDrag, false);
          obj.addEventListener("mouseup", endColorDrag, false);
        }
        document.getElementById("eventCatcher").
          addEventListener("mouseup", endColorDrag, false);
        transformShirt();
      }
      function clickButton(evt) {
        var choice = evt.target.parentNode
        var name = choice.getAttribute("id");
        var old = document.getElementById("scale" + scaleChoice);
        old.removeAttribute("class");
        choice.setAttribute("class", "selected");
      
        scaleChoice = parseInt(name[name.length - 1]);
        transformShirt();
      }
      function transformShirt() {    
        var factor = scaleFactor[scaleChoice];
        var obj = document.getElementById("shirt");
        obj.setAttribute("transform",
          "translate(150, 150) " +
          "scale(" + factor + ")");
        obj.setAttribute("stroke-width",
          1 / factor);
      }
      
      /*
      * Stop dragging the current slider (if any)
      * and set the current slider to the one specified.
      * (0 = red, 1 = green, 2 = blue)
      */
      function startColorDrag(evt) {
        var sliderId = evt.target.parentNode.getAttribute("id");
        endColorDrag( evt );
        slideChoice = parseInt(sliderId[sliderId.length - 1]);
      }
      /*
      * Set slider choice to -1, indicating that no
      * slider is begin dragged. No access to the event
      * is needed for this function.
      */
      function endColorDrag(evt) {
        slideChoice = -1;
      }
      function doColorDrag(evt) {
        var sliderId = evt.target.parentNode.getAttribute("id");
        chosen = parseInt(sliderId[sliderId.length - 1]);
        
        if (slideChoice >= 0 && slideChoice == chosen) {
          var pos = evt.clientY - 10;
          if (pos < 0) { pos = 0; }
          if (pos > 100) { pos = 100; }
            
          obj = document.getElementById("slide" + slideChoice);
          obj.setAttribute("y1", pos);
          obj.setAttribute("y2", pos);
            
          rgb[slideChoice] = 100-pos;
            
          var colorStr = "rgb(" + rgb[0] + "%," +
            rgb[1] + "%," + rgb[2] + "%)";        
          obj = document.getElementById("shirt");
          obj.style.setProperty("fill", colorStr, null);
        }
      }
    ]]></script>
    <path id="shirt-outline"
      d="M -6 -30 -32 -19 -25.5 -13 -22 -14 -22 30 23 30
        23 -14 26.5 -13 33 -19 7 -30
        A 6.5 6 0 0 1 -6 -30"/>
  </defs>
  <rect id="eventCatcher" x="0" y="0" width="400" height="300"
    style="fill: none; stroke:none;" pointer-events="visible" />
  <g id="shirt" >
    <use xlink:href="#shirt-outline" x="0" y="0"/>
  </g>
  <g id="scale0" > 
    <rect x="100" y="10" width="30" height="30" />
    <text x="115" y="30">S</text>
  </g>
  <g id="scale1" class="selected">
    <rect x="140" y="10" width="30" height="30" />
    <text x="155" y="30">M</text>
  </g>
  <g id="scale2" >
    <rect x="180" y="10" width="30" height="30" />
    <text x="195" y="30">L</text>
  </g>
  
  <g id="sliderGroup0" transform="translate( 230, 10 )">
    <rect x="-10" y="-5" width="40" height="110"/>
    <rect x="5" y="0" width="10" height="100" style="fill: red;"/>
    <line id="slide0" class="slider"
      x1="0" y1="0" x2="20" y2="0" />
  </g>
  <g id="sliderGroup1" transform="translate( 280, 10 )">
    <rect x="-10" y="-5" width="40" height="110"/>
    <rect x="5" y="0" width="10" height="100" style="fill: green;"/>
    <line id="slide1" class="slider"
      x1="0" y1="0" x2="20" y2="0" />
  </g>
  <g id="sliderGroup2" transform="translate( 330, 10 )">
    <rect x="-10" y="-5" width="40" height="110"/>
    <rect x="5" y="0" width="10" height="100" style="fill: blue;"/>
    <line id="slide2" class="slider"
      x1="0" y1="0" x2="20" y2="0" />
  </g>
</svg>
```

![image-20210307193725930](.\img\8-shirtDrag.png)

