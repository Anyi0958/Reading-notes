canvas-实现钟表 目录
[TOC]
***

# 前言

- 模拟时钟的运行

# 推荐阅读

- [`canvas`基础](https://blog.csdn.net/u012468376/article/details/73350998 "canvas")

# 思路解析

1. 主题有2种：表盘，表针
2. 绘制表针
3. 绘制表盘
4. 运行

# 代码实现

```js
class Click{
    constructor(canvas){
        this.c = document.getElementsByTagName(canvas)[0];
        this.c.width = 300;
        this.c.height = 300;
        this.ctx = this.c.getContext('2d');
        console.log(this.ctx);
    }

    GameStart(){
        let that = this;
        requestAnimationFrame(function step(){                     
            console.log(that.ctx);
            // console.log(this.ctx);            
            
            that.drawDial(that.ctx);
            that.drawAllHands(that.ctx);
            requestAnimationFrame(step);
        });
    }

    drawDial(ctx){
        let pi = Math.PI;
        ctx.clearRect(0,0,300,300);
        ctx.save();
        // 圆心
        ctx.translate(150,150);
        ctx.arc(0,0,148,0,Math.PI*2);
        ctx.stroke();
        ctx.closePath();

        for(let i = 0; i < 60; i++){
           ctx.save();
            // 一周是2pi,分成60份，就是pi/30
            ctx.rotate(-pi/2 + i*pi/30);

            ctx.beginPath();
            ctx.moveTo(110,0);
            ctx.lineTo(140,0);
            
            ctx.lineWidth = i % 5 ? 2 : 4;
            ctx.strokeStyle = i % 5 ? "blue" : "red";

            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }

        ctx.restore();

    }

    drawAllHands(){
        let time = new Date();

        let hour = time.getHours(),
            minute = time.getMinutes(),
            second = time.getSeconds();

        let pi = Math.PI;
        let secondAngle = pi / 180 * 6 * second;
        let minuteAngle = pi / 180 * 6 * minute + secondAngle / 60;
        let hourAngle = pi / 180 * 30 * hour + minuteAngle / 12;

        this.drawHand(hourAngle,60,6,"red",this.ctx);
        this.drawHand(minuteAngle,106,4,"green",this.ctx);
        this.drawHand(secondAngle,129,2,"blue",this.ctx);
    }

    drawHand(angle, length, width, color, ctx){
        ctx.save();

        ctx.translate(150,150);
        ctx.rotate(-Math.PI / 2 + angle);
        
        ctx.beginPath();
        ctx.moveTo(-4,0);
        ctx.lineTo(length,0);
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.lineCap = "round";

        ctx.stroke();
        ctx.closePath();

        ctx.restore();
    }
}
let click = new Click('canvas');
click.GameStart();
```

# 结果观测

![click][01]

***

[01]:./click.gif "click"

