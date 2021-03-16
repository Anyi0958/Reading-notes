canvas扩展-基于原有API,新增虚线函数 目录
[TOC]
***

# 前言

- 当原本的`canvas API`无法满足需求时，对`CanvasRenderingContext2D`进行功能扩展
- 例子为增加绘制虚线函数

# 代码展示

```js
let canvas = document.createElement('canvas');
canvas.id = 'canvas';
document.body.appendChild(canvas);

let context = document.getElementById('canvas').getContext('2d');

// 原型链声明类
// 继承moveTo
let moveToFunction = CanvasRenderingContext2D.prototype.moveTo;

// 上次点位置
CanvasRenderingContext2D.prototype.lastMoveToLocation = {};

// 继承并新增功能
// 记录位置
CanvasRenderingContext2D.prototype.moveTo = function(x, y){
    moveToFunction.apply(context, [x, y]);

    this.lastMoveToLocation.x = x;
    this.lastMoveToLocation.y = y;
};

// 绘制点
// dashLength：指定虚线的长度
CanvasRenderingContext2D.prototype.dashedLineTo = function (x, y, dashLength) {
    dashLength = dashLength || 5;

    let startX = this.lastMoveToLocation.x,
        startY = this.lastMoveToLocation.y;

    // 求出间隔的长度
    let deltaX = x - startX,
        deltaY = y - startY;

    // 获取线段中虚线的个数
    let numDashes = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / dashLength);

    // 遍历个数，每次移动点并绘制短线段
    for(let i = 0; i < numDashes; i++){
        this[i%2 === 0 ? 'moveTo' : 'lineTo']
            (startX + (deltaX / numDashes) * i,
                startY + (deltaY / numDashes) * i);
    }
    // 更新最后的点
    this.moveTo(x, y);
};

context.lineWidth = 3;
context.strokeStyle = 'blue';

context.moveTo(20, 20);
context.dashedLineTo(context.canvas.width - 20, 20);
context.dashedLineTo(context.canvas.width - 20,
                    context.canvas.height - 20);

context.dashedLineTo(20, context.canvas.height - 20);
context.dashedLineTo(20, 20);
context.dashedLineTo(context.canvas.width - 20,
                    context.canvas.height - 20);

context.stroke();
```

# 结果展示

![image-20210314150940392](.\img\0-dashedline.png)

