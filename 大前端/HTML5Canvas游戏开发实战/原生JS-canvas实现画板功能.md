目录：

[TOC]

***

# 前言

常见的电子教室里的电子黑板。

本文特点：

- 原生`JS`
- 封装好的模块

# 最简代码样例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <canvas id="canvas"></canvas>
    <script>
        let c = document.getElementById('canvas');
        c.width = window.innerWidth;
        c.height = window.innerHeight;
        let ctx = c.getContext('2d');

        // draw one black board
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,600,300);

        // 按下标记
        let onoff = false,
            oldx = -10,
            oldy = -10;

        // 设置颜色
        let linecolor = "white";

        // 设置线宽
        let linw = 4;

        // 添加鼠标事件
        // 按下
        c.addEventListener('mousedown', event => {
            onoff = true;
            // 位置 - 10是为了矫正位置，把绘图放在鼠标指针的顶端
            oldx = event.pageX - 10;
            oldy = event.pageY - 10;
        },false);
        // 移动
        c.addEventListener('mousemove', event => {
            if(onoff == true){
                let newx = event.pageX - 10,
                    newy = event.pageY - 10;

                // 绘图
                ctx.beginPath();
                ctx.moveTo(oldx,oldy);
                ctx.lineTo(newx,newy);
                ctx.strokeStyle = linecolor;
                ctx.lineWidth = linw;
                ctx.lineCap = "round";
                ctx.stroke();
                // 每次移动都要更新坐标位置
                oldx = newx,
                oldy = newy;
            }
        }, true);
        // 弹起
        c.addEventListener('mouseup', ()=> {
            onoff = false;
        },false);
    </script>
</body>
</html>
```

# 结果展示

![43-blackBoard][43]

# 代码讲解

## 思路

1. 鼠标按下，开始描画。鼠标按下事件。
2. 鼠标弹起，结束描画。鼠标弹起事件。
3. 鼠标按下移动，路径画线。鼠标移动事件。

## 代码讲解

整体思路：按下鼠标，触发移动的开关，移动后开始记录线条（用移动后的坐标-移动前的坐标，然后绘线），每次移动都会更新旧坐标。松开鼠标后，释放移动开关。

1. 只有在鼠标按下，才会触发移动绘图的效果，所以需要增加一个状态判断。
2. 因为鼠标指针和实际位置有一个偏移量，所以在坐标定位的时候，需要增加`pagex-10`从而使坐标位于指针的尖端处。
3. 每次移动都要更新坐标位置，用小段的线段来模拟不规则的线。

# 封装模块

```html
<canvas id="canvas"></canvas>
<script>
    class Board{
        constructor(canvasName = 'canvas', data = new Map([
            ["onoff", false],
            ["oldx", -10],
            ["oldy", -10],
            ["fillStyle", "black"],
            ["lineColor", "white"],
            ["lineWidth", 4],
            ["lineCap", "round"],
            ["canvasWidth", window.innerWidth],
            ["canvasHeight", window.innerHeight]
        ])){
            // this.data = data;
            this.c = document.getElementById(canvasName);
            this.ctx = this.c.getContext('2d');
            this.onoff = data.get("onoff");
            this.oldx = data.get("oldx");
            this.oldy = data.get("oldy");
            this.lineColor = data.get("lineColor");
            this.lineWidth = data.get("lineWidth");
            this.lineCap = data.get("lineCap");

            this.c.width = data.get("canvasWidth");
            this.c.height = data.get("canvasHeight");

            this.ctx.fillStyle = data.get("fillStyle");
            this.ctx.fillRect(0,0,600,300);
        }

        eventOperation(){
            // 添加鼠标事件
            // 按下
            this.c.addEventListener('mousedown', event => {
                this.onoff = true;
                // 位置 - 10是为了矫正位置，把绘图放在鼠标指针的顶端
                this.oldx = event.pageX - 10;
                this.oldy = event.pageY - 10;
            },false);
            // 移动
            this.c.addEventListener('mousemove', event => {
                if(this.onoff == true){
                    let newx = event.pageX - 10,
                        newy = event.pageY - 10;

                    // 绘图
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.oldx,this.oldy);
                    this.ctx.lineTo(newx,newy);

                    this.ctx.strokeStyle = this.lineColor;
                    this.ctx.lineWidth = this.lineWidth;
                    this.ctx.lineCap = this.lineCap;
                    
                    this.ctx.stroke();
                    // 每次移动都要更新坐标位置
                    this.oldx = newx,
                    this.oldy = newy;
                }
            }, true);
            // 弹起
            this.c.addEventListener('mouseup', ()=> {
                this.onoff = false;
            },false);
        }

    }

    let board = new Board();
    board.eventOperation();
</script>
```







***

[43]: ./img/43-blackBoard.png "43-blackBoard"