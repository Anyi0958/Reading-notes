HTML5 Canvas核心技术 图形、动画与游戏开发 目录
[TOC]
***

# 前言

- 本文为阅读感言
- 涵盖内容：
  - 图形
  - 文本
  - 图像
  - 动画
  - 精灵：实现具备绘制器和行为策略的动画精灵对象
  - 物理效果
  - 碰撞检测
  - 游戏开发
  - 自定义控件
  - 移动开发

***

# 推荐阅读

- 《HTML5 Canvas核心技术 图形、动画与游戏开发》
- [本书配套网站](http://corehtml5canvas.com/)
- 

***

# 1. 基础知识

- 通过`css`更改`canvas`背景颜色：

```css
#canvas {
    margin: 10px;
    padding: 10px;
    background: #ffffff;
    border: thin inset #aaaaaa;
}
```

效果：

![0-canvasbg.png][01]

<span style="color:red;">只是在页面上显示黑色，下载后为无</span>

- `canvas`存在两套大小：`css`的元素本身大小和`canvas`元素绘图表面的大小

## 常见`API`

- `width`
- `height`
- `getContext()`：返回绘图环境
- `toDataURL(type, quality)`：返回一个数据地址(data url)，可以设置为`img`元素的`src`属性值
  - `type`：`image/jpeg, image/png`
  - `quality`：$1-10$

```js
let img = document.createElement('img');               let c = document.getElementById('canvas');
let ctx = c.getContext('2d');
img.src = c.toDataURL('image/png', 5);
console.log(img.src);
document.body.appendChild(img);
```



- `toBlob(callback, type, args...)`：创建一个用于展示此`canvas`元素图像文件的`Blob`。这个图片文件可以缓存或者保存到本地

```javascript
let url;
let img = document.createElement('img');        
let c = document.getElementById('canvas');
c.toBlob(blob => {
    url = URL.createObjectURL(blob);
    img.src = url;
},'image/png', 5);

img.onload = () => {
    URL.revokeObjectURL(url);
};

console.log(img.src);
document.body.appendChild(img);
```

## `2D`绘图环境

- `2d`绘图环境提供很多`API`

### `API`

- `fillStyle`：图形填充颜色、渐变色和图案
- `font`：字型
- `globalAlpha`：全局透明度设定，0-1
- `globalCompsiteOperation`：该值决定了浏览器将某个物体绘制再其他物体之上时，所采用的绘制方式
- `lineCap`：绘制线段的端点，`butt, round, square`
- `lineWidth`：线段宽度
- `lineJoin`：线段相交时，如何绘制焦点，`bevel, round, miter`
- `miterLimit`：如何绘制`miter`形式的线段焦点
- `shadowBlur`：阴影效果
- `shadowColor`：阴影颜色
- `shadowOffsetX`：水平偏移量
- `shadowOffsetY`：垂直偏移量
- `strokeStyle`：对路径进行描边时，所采用的绘制风格

提示：

可以扩充`2d`绘图环境对象的功能，也可对已有方法进行扩充

## `3D WebGL`

- `3d`绘图环境就是`WebGL`
- 完全符合`OpenGL ES`，推荐阅读：[WebGL标准](http://www.khronos.org/registry/webgl/specs/latest)

## 恢复和保存

- 进行绘图时，需要频繁设置值。临时性改变属性，就需要记录保存
- 比如：背景中绘制网格线，然后用粗线绘制。就需要先保存，再临时修改`lineWidth`
- `save()`：保存
- `restore()`：恢复

### `UserAgent`

- 将`canvas`元素的实现者称为`User Agent`简称`UA`

## 常见工具

- 性能分析器(profiler)
- 时间轴(timeline)

## 动画规范

- `canvas`
- 基于脚本的定时控制动画(Timing control for script-based animation)
- `H5`视频与音频

常用`window.setInterval()`和`window.setTimeout()`制作动画，但这个方法不适用于要求性能的动画，应用`window.requestAnimationFrame()`

### 技巧-编程方式启动和停止性能分析器

- `console.profile('core H5')` 开启
- `console.profileEnd()` 停止

## 时钟程序的绘制

- `arc`
- `beginPath`
- `clearRect`
- `fill`
- `fillText`
- `lineTo`
- `moveTo`
- `stroke`

```javascript
let c = document.getElementById('canvas');
// 设置画布的宽高
c.width = 400,
c.height = 400;

let ctx = c.getContext('2d');
// 常量设计
// 字体大小，边距
// 指针转动的
// 时针
// 数字间的间距
// 半径为减去边距的长
// 文字的横坐标
const FONT_HEIGHT = 15,
    MARGIN = 35,
    HAND_TRUNCATION = c.width / 25,
    HOUR_HAND_TRUNCATION = c.width / 10,
    NUMERAL_SPACING = 20,
    RADIUS = c.width / 2 - MARGIN,
    HAND_RADIUS = RADIUS + NUMERAL_SPACING;

// 绘圆
function drawCircle() {
    ctx.beginPath();
    // 中点做圆心
    ctx.arc(c.width/2, c.height/2,
            RADIUS, 0, Math.PI * 2,
            true);

    ctx.stroke();
}

// 绘刻度
function drawNumerals() {
    let numerals = [1,2,3,4,5,6,7,8,9,10,11,12],
        angle = 0,
        numeralWidth = 0;

    numerals.forEach(numeral => {
        // 平分为2pi/12
        angle = Math.PI/6 * (numeral - 3);
        
        numeralWidth = ctx.measureText(numeral).width;
        // 文字的位置
        ctx.fillText(numeral,
            c.width/2 + Math.cos(angle) * (HAND_RADIUS) - 
                numeralWidth/2,
            c.height/2 + Math.sin(angle) * (HAND_RADIUS) +
                FONT_HEIGHT/3);
    });
}

// 绘制圆心的小圆
function drawCenter() {
    ctx.beginPath();
    ctx.arc(c.width/2, c.height/2, 5, 0, Math.PI*2, true);
    ctx.fill();
}

// 绘指针
function drawHand(loc, isHour, thickness){
    let angle = (Math.PI*2) * (loc/60) - Math.PI/2,
        handRadius = isHour ? RADIUS - HAND_TRUNCATION - HOUR_HAND_TRUNCATION
                            : RADIUS - HAND_TRUNCATION;
    
    ctx.moveTo(c.width/2, c.height/2);
    ctx.lineWidth = thickness;
    ctx.lineTo(c.width/2 + Math.cos(angle)*handRadius,
                c.height/2 + Math.sin(angle)*handRadius);
    
    ctx.stroke();
}

function drawHands() {
    let date = new Date,
        hour = date.getHours();

    hour = hour > 12 ? hour - 12 : hour;

    drawHand(hour * 5 + (date.getMinutes()/60)*5, true, 0.5);
    drawHand(date.getMinutes(), false, 0.5);
    drawHand(date.getSeconds(), false, 0.2);
}

function drawClock() {
    ctx.clearRect(0,0,c.width,c.height);

    drawCircle();
    drawCenter();
    drawHands();
    drawNumerals();
}

ctx.font = FONT_HEIGHT + 'px Arial';
loop = setInterval(drawClock, 1000);
```



## 事件处理

- `H5`应用程序是以事件来驱动
- `canvas`都会处理鼠标或者触摸事件

### 鼠标事件

两种监听方式：

- `canvas.onmousedown`
- `canvas.addEventListener`

```js
// 1.
canvas.onmousedown = event => {};

// 2.
canvas.addEventListener('mousedown', event => {});
```

- 其他事件：`onmousemove, onmouseup, onmouseout`
- 如果要注册多个监听器的话，需要使用`addEventListener`

### 鼠标转换为`canvas`坐标

- `element.getBoundingClientRect()`：返回元素的大小及其相对于视口的位置

```js
let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    readout = document.getElementById('readout'),
    spritesheet = new Image();

// function

/* 
    return: {x,y}坐标
*/
function windowToCanvs(canvas, x, y){
    let bbox = canvas.getBoundingClientRect();

    return {
        x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height)
    };
}

/*
    背景画线
*/
function drawBackground(){
    let VERICAL_LINE_SPACING = 12,
        i = ctx.canvas.height;
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle = 'lightgray';
    ctx.lineWidth = 0.5;

    while(i > VERICAL_LINE_SPACING * 4) {
        ctx.beginPath();
        ctx.moveTo(0,i);
        ctx.lineTo(ctx.canvas.width, i);
        ctx.stroke();

        i -= VERICAL_LINE_SPACING;
    }
}

/* 
    从(0,0)绘图
*/
function drawSpritesheet() {
    ctx.drawImage(spritesheet, 0, 0);
}

/* 
    鼠标画线
 */
function drawGuidelines(x,y){
    ctx.strokeStyle = 'rgba(0,0,230,0.8)';
    ctx.lineWidth = 1;

    drawVerticalLine(x);
    drawHorizontalLine(y);
}

/* 
    更新坐标
 */
function updateReadout(x,y){
    readout.innerHTML = `(${x.toFixed(0)}, ${y.toFixed(0)})`;
}

/* 
    画横线
 */
function drawHorizontalLine(y) {
    ctx.beginPath();
    ctx.moveTo(0,y+0.5);
    ctx.lineTo(ctx.canvas.width, y+0.5);
    ctx.stroke();
}


/* 
    画竖线
 */
function drawVerticalLine(x) {
    ctx.beginPath();
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x+0.5, ctx.canvas.height);
    ctx.stroke();
}

// event listener
canvas.onmousemove = event => {
    let loc = windowToCanvs(canvas,event.clientX, event.clientY);

    drawBackground();
    drawSpritesheet();
    drawGuidelines(loc.x, loc.y);
    updateReadout(loc.x, loc.y);
};

// initialization
spritesheet.src = 'windowToCanvas.png';
spritesheet.onload = event => {
    drawSpritesheet();
};

drawBackground();
```

#### `x,y`与`clientX, clientY`

- 现在已经分开，`clientX, clientY`获取鼠标事件发生的窗口坐标

#### 阻止监听

- 就是阻止事件冒泡：`preventDefault()`

### 键盘事件

- `canvas`是一个不可获取焦点的元素，新增键盘事件监听器是徒劳的
- 想要检测键盘事件的话，应该在`document`或`window`对象上新增键盘事件监听器

三种键盘事件：

1. `keydown`
2. `keypress`
3. `keyup`

- `keydown, keyup`是底层事件
- `keypress`在触发`keyup`事件之前
- 犹豫浏览器只会产生可打印字符时才会触发`keypress`事件，可使用`let key = String.fromCharCode(event.which)`获取字符

## 保存和恢复

- `canvas.save(), canvas.store()`
- `getImageData(), putImageData()`

- `SVG`保留模式：维护绘图形对象的列表
- `canvas`立即模式：立刻绘制，不保存

````js
function saveDrawingSurface() {
    drawdingSurfaceImageData = ctx.getImageData(0,0,canvas.width,canvas.height);
}

function restoreDrawingSurface() {
    ctx.putImageData(drawdingSurfaceImageData,0,0);
}
````



## `canvas`中使用`html`元素

- 使用`css`将控件放置在`canvas`上

### 不可见的`HTML`元素

- 用户拖动鼠标时，动态修改`DIV`大小 - 橡皮筋式















***

[01]:./img/0-canvasbg.png "0-canvasbg.png"