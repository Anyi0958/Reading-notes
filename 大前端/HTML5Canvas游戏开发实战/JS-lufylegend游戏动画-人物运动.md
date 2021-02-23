JS-lufylegend游戏动画-人物运动 目录
[TOC]
***

# 前言

- 动画是游戏的最基本组成部分

- 利用`LAnimation`类和循环时间，可以轻松实现一组动画的播放

- 准备一张照片，包含任务的动作

  ![54-animation][54]

***

# 引入库

- [`lufylegend`官网](http://lufylegend.com/lufylegend "lufylegend")
- 开发建议：`<script src="./lufylegend-1.10.1.min.js">`
- 学习建议：`<script src="./lufylegend-1.10.1.js"></script>`

***

# 使用流程

1. 引入库件
2. 创建`<div>`
3. 使用`init`函数初始化工作

***

# 函数解析

- `init(speed, divid, width, height, completeFuc, type)`
  - `speed`：游戏速度设定
  - `divid`：`canvas`传入此`div`内部
  - `width,height`：游戏宽高
  - `completeFunc`：游戏初始化完成后，调用此函数

- `LAnimation(layer,data,list)`
  - `layer`：`LSprite`对象
  - `data`：`LBitmapData`对象
  - `list`：存储坐标的二维数组
- 数组通过`LGlobal.divideCoordinate(width,height,row,col)`
  - `width,height`：宽，高
  - `row,col`：行数，列数
  - 此函数会将传入的宽高按照行数和列数进行拆分计算，从而得到二维数组
  - 例如图片为`256x256`，拆分代码`LGlobal.divideCoordinate(256,256,4,4)`

```html
 <div id="legend">Loading...</div>
    <script>

        init(50, "legend", 500, 350, () => {
            let loader = new LLoader();
            loader.addEventListener(LEvent.COMPLETE, event => {
                let bitmapdata = new LBitmapData(loader.content, 0,0,64,64);
                let list = LGlobal.divideCoordinate(287,287,4,4)
                
                let layer = new LSprite();
                addChild(layer);

                let anime = new LAnimation(layer, bitmapdata, list);
                layer.addEventListener(LEvent.ENTER_FRAME, () => {
                    anime.onframe();
                });
            });
            loader.load("animation.png", "bitmapData");
            
        });
    </script>
```

![55-animation][55]

***

# 代码讲解

- 人物动起来，其实是将第一行图片逐个循环播放

- `LAnimation`类的`onframe()`：将所播放的图片列号加1，在循环事件中播放，就成了动画

- 要实现所有的图片循环播放，需要用到`setAction`

- `setAction(rowIndex, colIndex)`：可以改变图片的行号和列号
  - `rowIndex`：数组行号
  - `colIndex`：数组列号

***

# 移动运动

```html
    <div id="legend">Loading...</div>
    <script>

        init(50, "legend", 500, 350, () => {
            let loader = new LLoader();
            loader.addEventListener(LEvent.COMPLETE, event => {
                let bitmapdata = new LBitmapData(loader.content, 0,0,64,64);
                let list = LGlobal.divideCoordinate(287,287,4,4)
                
                let layer = new LSprite();
                addChild(layer);

                let anime = new LAnimation(layer, bitmapdata, list);
                layer.addEventListener(LEvent.ENTER_FRAME, () => {
                    let action = anime.getAction();
                    switch(action[0]) {
                        case 0:
                            layer.y += 5;
                            if(layer.y >= 200)  anime.setAction(2);
                            break;
                        case 1:
                            layer.x -= 5;
                            if(layer.x <= 0)    anime.setAction(0);
                            break;
                        case 2:
                            layer.x += 5;
                            if(layer.x >= 200)  anime.setAction(3);
                            break;
                        case 3:
                            layer.y -= 5;
                            if(layer.y <= 0)    anime.setAction(1);
                            break;
                    }
                    anime.onframe();
                });
            });
            loader.load("animation.png", "bitmapData");
            
        });
    </script>
```

![56-animation][56]

***

# 代码讲解

- `getAction`取得当前播放动画的行号和列号，返回是个数组
- $[1,2,3,4]$分别代表着"下，左，右，上"4个方向，然后移动，根据到达的位置改变移动方向
- `layer.y += 5`：控制着图像移动的节奏和步伐
- `layer.y >= 350 - 287/2`：则控制着移动的空间，最大公式是:

$$
canvas高度 - \frac{整体图的高度}{分成的行数} \times 单个图在canvas显示的高度 \times 2
$$







***

[54]: ./img/animation.png "54-animation"
[55]:./img/55-animation.gif "55-animation"
[56]:./img/56-animation.gif "56-animation"

