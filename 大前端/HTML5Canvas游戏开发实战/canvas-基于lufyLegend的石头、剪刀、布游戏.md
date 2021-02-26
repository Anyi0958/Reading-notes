canvas-基于lufyLegend的石头、剪刀、布游戏 目录
[TOC]
***

# 前言

- 存在一些问题

# 开发实战

## 石头剪子布

### 游戏分析

游戏需要的东西：

1. 图片描画
2. 图形绘制
3. 文字绘制
4. 鼠标的点击
5. 电脑`AI`
6. 条件分支与判断

### 必要的`JS`知识

- 随机数
- 条件分支
- `canvas`操作，文本框、图像、切换
- `lufylegend`操作，最好分层

## 分层实现

1. 整个游戏界面
2. 出拳部分
3. 结果显示部分

## 代码实现

### 1.整个界面

```html
    <div id="legend"></div>
    <script>
        let backLayer;
        init(50,"legend", 800, 400, () =>{
            backLayer = new LSprite();
            addChild(backLayer);
            // 游戏背景
            backLayer.graphics.drawRect(10, '#008800',
                [0,0,LGlobal.width,LGlobal.height],
                true,
                '#000000');
            
            // 结果显示层初始化
            initResultLayer();
            // 操作层初始化
            initClickLayer();
        });

        function initResultLayer() {
            let resultLayer = new LSprite();
            resultLayer.graphics.drawRect(4,'#ff8800',
                [0,0,150,110],
                true,
                '#ffffff');
                resultLayer.x = 10;
                resultLayer.y = 100;

                backLayer.addChild(resultLayer);
        }
        function initClickLayer() {
            let clickLayer = new LSprite();
            clickLayer.graphics.drawRect(4,'#ff8800',
                [0,0,300,110],
                true,
                '#ffffff');
                clickLayer.x = 250;
                clickLayer.y = 275;
                backLayer.addChild(clickLayer);
        }
    </script>
```

![57-game-1][57]

#### 代码解析

1. 分3个显示层：背景、结果、操作
2. `LGlobal.width,LGlobal.height`是`canvas`的宽、高

### 2. 出拳部分

- 准备素材

![58-hand][58]

![59-clip][59]

![60-ham][60]

- 图片读取函数：`LLoadManage.load(lits,onupdate,oncoplete)`
  - `list`：图片数组，格式必须为规定格式
  - `onupdate`：每读取数组中一张图片后调用的函数
  - `oncomplete`：读取完所有后调用的函数

```html
    <div id="legend"></div>
    <script>
        let backLayer;
        init(50,"legend", 800, 400, () =>{
            backLayer = new LSprite();
            addChild(backLayer);
            // loading画面
            let loadingLayer = new LoadingSample3();

            backLayer.addChild(loadingLayer);

            // imglist
            let imgList = {};
            let imgData = new Array(
                {name: "title", path: "./show.jpg"},
                {name: "hand", path: "./58-hand.png"},
                {name: "hand", path: "./59-clip.png"},
                {name: "hand", path: "./60-ham.png"},
                );
            // manage
            LLoadManage.load(
                imgData,
                progress => {
                    loadingLayer.setProgress(progress);
                },
                result => {
                    imgList = result;
                    backLayer.removeChild(loadingLayer);
                    loadingLayer = null;

                    backLayer.graphics.drawRect(10, '#008800',
                        [0,0,LGlobal.width,LGlobal.height],
                        true,
                        '#000000');
                    initResultLayer();
                    initClickLayer();
                }
            );
            
        });

        function initResultLayer() {
            let resultLayer = new LSprite();
            resultLayer.graphics.drawRect(4,'#ff8800',
                [0,0,150,110],
                true,
                '#ffffff');
                resultLayer.x = 10;
                resultLayer.y = 100;

                backLayer.addChild(resultLayer);
        }
        function initClickLayer() {
            let clickLayer = new LSprite();
            clickLayer.graphics.drawRect(4,'#ff8800',
                [0,0,300,110],
                true,
                '#ffffff');
                clickLayer.x = 250;
                clickLayer.y = 275;
                backLayer.addChild(clickLayer);
        }
    </script>
```

![61-loading][61]

- 代码反思：虽然对着写是很好用，但是耦合性太强，需要考虑高内聚低耦合，建立函数模块

```js
init(50,"legend", 800, 400, main);
// imglist
let imgList = {},
        backLayer;
let imgData = new Array(
        {name: "title", path: "./show.jpg"},
        {name: "hand", path: "./58-hand.png"},
        {name: "clip", path: "./59-clip.png"},
        {name: "ham", path: "./60-ham.png"},
        );
    
function main() {
    backLayer = new LSprite();
    addChild(backLayer);
    // loading画面
    let loadingLayer = new LoadingSample3();

    backLayer.addChild(loadingLayer);
    // manage
    LLoadManage.load(
        imgData,
        progress => {
            loadingLayer.setProgress(progress);
        },
        result => {
            imgList = result;
            backLayer.removeChild(loadingLayer);
            loadingLayer = null;
            gameInit();
        }
    );
}

function gameInit() {
    backLayer.graphics.drawRect(10, '#008800',
                [0,0,LGlobal.width,LGlobal.height],
                true,
                '#000000');
    initResultLayer();
    initClickLayer();

}

function initResultLayer() {
    let resultLayer = new LSprite();
    resultLayer.graphics.drawRect(4,'#ff8800',
        [0,0,150,110],
        true,
        '#ffffff');
        resultLayer.x = 10;
        resultLayer.y = 100;

        backLayer.addChild(resultLayer);
}
function initClickLayer() {
    let clickLayer = new LSprite();
    clickLayer.graphics.drawRect(4,'#ff8800',
        [0,0,300,110],
        true,
        '#ffffff');
        clickLayer.x = 250;
        clickLayer.y = 275;
        backLayer.addChild(clickLayer);
}
```
- `imgData`中包含的是图片的路径`{name:"x",path:"y"}`
- 加载进度条：`loadingLayer = new LoadingSample3();backLayer.addChild(loadingLayer)`
- `lufylegend`中一共有3个进度条显示对象，`LoadingSample1,LoadingSample2,LoadingSample3`
- `LLoadManage.load()`利用静态类`LLoadManage`的`load`函数去读取数组中的图片
- `loadingLayer.setProgress(progress)`：获取图片个数占图片数组长度的比例，将这个比例通过`setProgress`传递，实现动态的进度条
- 读取完图片后的结果集赋值给`imglist`，然后一处画面上的进度条对象，再调用`gameInit`进入下一步

```html
<div id="legend"></div>
<script>

init(50,"legend", 800, 400, main);
// imglist
let imgList = {},
        backLayer,
        showList = new Array();
let imgData = new Array(
        {name: "title", path: "./show.jpg"},
        {name: "hand", path: "./58-hand.png"},
        {name: "clip", path: "./59-clip.png"},
        {name: "ham", path: "./60-ham.png"},
        );
    
function main() {
    backLayer = new LSprite();
    addChild(backLayer);
    // loading画面
    let loadingLayer = new LoadingSample3();

    backLayer.addChild(loadingLayer);
    // manage
    LLoadManage.load(
        imgData,
        progress => {
            loadingLayer.setProgress(progress);
        },
        result => {
            imgList = result;
            backLayer.removeChild(loadingLayer);
            loadingLayer = null;
            gameInit();
        }
    );
}

function gameInit() {
    // console.log(imgList);
    showList.push(new LBitmapData(imgList["ham"]));
    showList.push(new LBitmapData(imgList["clip"]));
    showList.push(new LBitmapData(imgList["hand"]));
    // console.log(showList[0].image);
    // console.log(showList[0] == imgList["ham"]);
    // 游戏背景
    backLayer.graphics.drawRect(10, '#008800',
                [0,0,LGlobal.width,LGlobal.height],
                true,
                '#000000');

    // 显示游戏标题
    let titleBitmap = new LBitmap(new LBitmapData(imgList["title"],20,20,50,50));
    // (全部-图的长度)/2 = 中点
    titleBitmap.x = (LGlobal.width - titleBitmap.width) / 2;
    titleBitmap.y = 10;
    // 加到背景层里
    backLayer.addChild(titleBitmap);

    // 玩家
    selfBitmap = new LBitmap(new LBitmapData(showList[0].image));
    selfBitmap.x = 400 - selfBitmap.width - 50;
    selfBitmap.y = 130;
    backLayer.addChild(selfBitmap);

    // 电脑
    computerBitmap = new LBitmap(new LBitmapData(showList[0].image));
    computerBitmap.x = 400 + 50;
    computerBitmap.y = 130;
    backLayer.addChild(computerBitmap);

    // 玩家，电脑名称设定
    let nameText;
    nameText = new LTextField();
    nameText.text = 'Player';
    nameText.weight = 'bolder';
    nameText.color = '#ffffff';
    nameText.size = 24;
    nameText.x = selfBitmap.x + 
        (selfBitmap.width - nameText.getWidth()) / 2;
    nameText.y = 95;
    backLayer.addChild(nameText);

    nameText = new LTextField();
    nameText.text = 'computer';
    nameText.weight = 'bolder';
    nameText.color = '#ffffff';
    nameText.size = 24;
    nameText.x = computerBitmap.x + 
        (computerBitmap.width - nameText.getWidth())/2;
    nameText.y = 95;
    backLayer.addChild(nameText);


    initResultLayer();
    initClickLayer();
}

function initResultLayer() {
    let resultLayer = new LSprite();
    resultLayer.graphics.drawRect(4,'#ff8800',
        [0,0,150,110],
        true,
        '#ffffff');
        resultLayer.x = 10;
        resultLayer.y = 100;

        backLayer.addChild(resultLayer);
}
function initClickLayer() {
    let clickLayer = new LSprite();
    clickLayer.graphics.drawRect(4,'#ff8800',
        [0,0,300,110],
        true,
        '#ffffff');
        clickLayer.x = 250;
        clickLayer.y = 275;
        backLayer.addChild(clickLayer);
}
</script>
```

![62-gameText.png][62]

### 3. 结果层显示

- 用`win,loss,equal`表示结果的次数

```html
<div id="legend"></div>
<script>

init(50,"legend", 800, 400, main);
// imglist
let imgList = {},
        backLayer,
        showList = new Array();
let imgData = new Array(
        {name: "title", path: "./show.jpg"},
        {name: "hand", path: "./58-hand.png"},
        {name: "clip", path: "./59-clip.png"},
        {name: "ham", path: "./60-ham.png"},
        );
    
function main() {
    backLayer = new LSprite();
    addChild(backLayer);
    // loading画面
    let loadingLayer = new LoadingSample3();

    backLayer.addChild(loadingLayer);
    // manage
    LLoadManage.load(
        imgData,
        progress => {
            loadingLayer.setProgress(progress);
        },
        result => {
            imgList = result;
            backLayer.removeChild(loadingLayer);
            loadingLayer = null;
            gameInit();
        }
    );
}

function gameInit() {
    // console.log(imgList);
    showList.push(new LBitmapData(imgList["ham"]));
    showList.push(new LBitmapData(imgList["clip"]));
    showList.push(new LBitmapData(imgList["hand"]));
    // console.log(showList[0].image);
    // console.log(showList[0] == imgList["ham"]);
    // 游戏背景
    backLayer.graphics.drawRect(10, '#008800',
                [0,0,LGlobal.width,LGlobal.height],
                true,
                '#000000');

    // 显示游戏标题
    let titleBitmap = new LBitmap(new LBitmapData(imgList["title"],20,20,50,50));
    // (全部-图的长度)/2 = 中点
    titleBitmap.x = (LGlobal.width - titleBitmap.width) / 2;
    titleBitmap.y = 10;
    // 加到背景层里
    backLayer.addChild(titleBitmap);

    // 玩家
    selfBitmap = new LBitmap(new LBitmapData(showList[0].image));
    selfBitmap.x = 400 - selfBitmap.width - 50;
    selfBitmap.y = 130;
    backLayer.addChild(selfBitmap);

    // 电脑
    computerBitmap = new LBitmap(new LBitmapData(showList[0].image));
    computerBitmap.x = 400 + 50;
    computerBitmap.y = 130;
    backLayer.addChild(computerBitmap);

    // 玩家，电脑名称设定
    let nameText;
    nameText = new LTextField();
    nameText.text = 'Player';
    nameText.weight = 'bolder';
    nameText.color = '#ffffff';
    nameText.size = 24;
    nameText.x = selfBitmap.x + 
        (selfBitmap.width - nameText.getWidth()) / 2;
    nameText.y = 95;
    backLayer.addChild(nameText);

    nameText = new LTextField();
    nameText.text = 'computer';
    nameText.weight = 'bolder';
    nameText.color = '#ffffff';
    nameText.size = 24;
    nameText.x = computerBitmap.x + 
        (computerBitmap.width - nameText.getWidth())/2;
    nameText.y = 95;
    backLayer.addChild(nameText);


    initResultLayer();
    initClickLayer();
}

function initResultLayer() {
    let resultLayer = new LSprite();
    resultLayer.graphics.drawRect(4,'#ff8800',
        [0,0,150,110],
        true,
        '#ffffff');
        resultLayer.x = 10;
        resultLayer.y = 100;

        backLayer.addChild(resultLayer);

        let selfText = new LTextField();
        selfText.text = '猜拳次数: 0';
        selfText.weight = 'bolder';
        selfText.x = 10;
        selfText.y = 20;
        resultLayer.addChild(selfText);
        
        let win = new LTextField();
        win.text = 'win: 0';
        win.weight = 'bolder';
        win.x = 10;
        win.y = 40;
        resultLayer.addChild(win);

        let loss = new LTextField();
        loss.text = 'loss: 0';
        loss.weight = 'bolder';
        loss.x = 10;
        loss.y = 60;
        resultLayer.addChild(loss);

        let equal = new LTextField();
        equal.text = 'equal: 0';
        equal.weight = "bolder";
        equal.x = 10;
        equal.y = 80;
        resultLayer.addChild(equal);
}
function initClickLayer() {
    let clickLayer = new LSprite();
    clickLayer.graphics.drawRect(4,'#ff8800',
        [0,0,300,110],
        true,
        '#ffffff');
        clickLayer.x = 250;
        clickLayer.y = 275;
        backLayer.addChild(clickLayer);
}
```

### 4. 控制层

- 添加替换按钮
- `LButton(up,down)`

```html
<div id="legend"></div>
<script>

init(50,"legend", 800, 400, main);
// imglist
let imgList = {},
        backLayer,
        showList = new Array();
let imgData = new Array(
        {name: "title", path: "./show.jpg"},
        {name: "hand", path: "./58-hand.png"},
        {name: "clip", path: "./59-clip.png"},
        {name: "ham", path: "./60-ham.png"},
        );
    
function main() {
    backLayer = new LSprite();
    addChild(backLayer);
    // loading画面
    let loadingLayer = new LoadingSample3();

    backLayer.addChild(loadingLayer);
    // manage
    LLoadManage.load(
        imgData,
        progress => {
            loadingLayer.setProgress(progress);
        },
        result => {
            imgList = result;
            backLayer.removeChild(loadingLayer);
            loadingLayer = null;
            gameInit();
        }
    );
}

function gameInit() {
    // console.log(imgList);
    showList.push(new LBitmapData(imgList["ham"]));
    showList.push(new LBitmapData(imgList["clip"]));
    showList.push(new LBitmapData(imgList["hand"]));
    // console.log(showList[0].image);
    // console.log(showList[0] == imgList["ham"]);
    // 游戏背景
    backLayer.graphics.drawRect(10, '#008800',
                [0,0,LGlobal.width,LGlobal.height],
                true,
                '#000000');

    // 显示游戏标题
    let titleBitmap = new LBitmap(new LBitmapData(imgList["title"],20,20,50,50));
    // (全部-图的长度)/2 = 中点
    titleBitmap.x = (LGlobal.width - titleBitmap.width) / 2;
    titleBitmap.y = 10;
    // 加到背景层里
    backLayer.addChild(titleBitmap);

    // 玩家
    selfBitmap = new LBitmap(new LBitmapData(showList[0].image));
    selfBitmap.x = 400 - selfBitmap.width - 50;
    selfBitmap.y = 130;
    backLayer.addChild(selfBitmap);

    // 电脑
    computerBitmap = new LBitmap(new LBitmapData(showList[0].image));
    computerBitmap.x = 400 + 50;
    computerBitmap.y = 130;
    backLayer.addChild(computerBitmap);

    // 玩家，电脑名称设定
    let nameText;
    nameText = new LTextField();
    nameText.text = 'Player';
    nameText.weight = 'bolder';
    nameText.color = '#ffffff';
    nameText.size = 24;
    nameText.x = selfBitmap.x + 
        (selfBitmap.width - nameText.getWidth()) / 2;
    nameText.y = 95;
    backLayer.addChild(nameText);

    nameText = new LTextField();
    nameText.text = 'computer';
    nameText.weight = 'bolder';
    nameText.color = '#ffffff';
    nameText.size = 24;
    nameText.x = computerBitmap.x + 
        (computerBitmap.width - nameText.getWidth())/2;
    nameText.y = 95;
    backLayer.addChild(nameText);


    initResultLayer();
    initClickLayer();
}

function initResultLayer() {
    let resultLayer = new LSprite();
    resultLayer.graphics.drawRect(4,'#ff8800',
        [0,0,150,110],
        true,
        '#ffffff');
        resultLayer.x = 10;
        resultLayer.y = 100;

        backLayer.addChild(resultLayer);

        let selfText = new LTextField();
        selfText.text = '猜拳次数: 0';
        selfText.weight = 'bolder';
        selfText.x = 10;
        selfText.y = 20;
        resultLayer.addChild(selfText);
        
        let win = new LTextField();
        win.text = 'win: 0';
        win.weight = 'bolder';
        win.x = 10;
        win.y = 40;
        resultLayer.addChild(win);

        let loss = new LTextField();
        loss.text = 'loss: 0';
        loss.weight = 'bolder';
        loss.x = 10;
        loss.y = 60;
        resultLayer.addChild(loss);

        let equal = new LTextField();
        equal.text = 'equal: 0';
        equal.weight = "bolder";
        equal.x = 10;
        equal.y = 80;
        resultLayer.addChild(equal);
}
function initClickLayer() {
    let clickLayer = new LSprite();
    clickLayer.graphics.drawRect(4,'#ff8800',
        [0,0,300,110],
        true,
        '#ffffff');

        let msgText = new LTextField();
        msgText.text = "请出拳：";
        msgText.weight = 'bolder';
        msgText.x = 10;
        msgText.y = 10;

        clickLayer.addChild(msgText);

        let btnHam = getButton('ham');
        btnHam.x = 30;
        btnHam.y = 35;
        clickLayer.addChild(btnHam);

        let btnClip = getButton('clip');
        btnClip.x = 115;
        btnClip.y = 35;
        clickLayer.addChild(btnClip);

        let btnHand = getButton('hand');
        btnHand.x = 200;
        btnHand.y = 35;
        clickLayer.addChild(btnHand);

        clickLayer.x = 250;
        clickLayer.y = 275;
        backLayer.addChild(clickLayer);
}

function getButton(value){
    let btnUp = new LBitmap(new LBitmapData(imgList[value]));
    btnUp.scaleX = 0.5;
    btnUp.scaleY = 0.5;

    let btnOver = new LBitmap(new LBitmapData(imgList[value]));
    btnOver.scaleX = 0.5;
    btnOver.scaleY = 0.5;
    btnOver.x = 2;
    btnOver.y = 2;

    let btn = new LButton(btnUp, btnOver);
    btn.name = value;
    return btn;
}
</script>
```

### 5. 出拳

- 利用随机函数`Math.floor(Math.random() * 3)`对机器人进行赋值

### 6. 结果判定

制作判定数组：

![63-judge.png][63]

```js
let checkList = [
    [0,1,-1],
    [-1,0,1],
    [1,-1,0]
];
```

### 7. 游戏总体代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./lufylegend-1.10.1.js"></script>
</head>
<body>
<div id="legend"></div>
<script>

init(50,"legend", 800, 400, main);
// imglist
let imgList = {},
        backLayer,
        showList = new Array(),
        selfBitmap,
        computerBitmap,
        win,
        loss,
        equal,
        selfText,        
        lossCount = 0,
        winCount = 0,
        equalCount = 0;
let imgData = new Array(
        {name: "title", path: "./show.jpg"},
        {name: "hand", path: "./58-hand.png"},
        {name: "clip", path: "./59-clip.png"},
        {name: "ham", path: "./60-ham.png"},
        );
let checkList = [
    [0,1,-1],
    [-1,0,1],
    [1,-1,0]
];

function main() {
    backLayer = new LSprite();
    addChild(backLayer);
    // loading画面
    let loadingLayer = new LoadingSample3();

    backLayer.addChild(loadingLayer);
    // manage
    LLoadManage.load(
        imgData,
        progress => {
            loadingLayer.setProgress(progress);
        },
        result => {
            imgList = result;
            backLayer.removeChild(loadingLayer);
            loadingLayer = null;
            gameInit();
        }
    );
}

function gameInit() {
    // console.log(imgList);
    showList.push(new LBitmapData(imgList["ham"]));
    showList.push(new LBitmapData(imgList["clip"]));
    showList.push(new LBitmapData(imgList["hand"]));
    // console.log(showList[0].image);
    // console.log(showList[0] == imgList["ham"]);
    // 游戏背景
    backLayer.graphics.drawRect(10, '#008800',
                [0,0,LGlobal.width,LGlobal.height],
                true,
                '#000000');

    // 显示游戏标题
    let titleBitmap = new LBitmap(new LBitmapData(imgList["title"],20,20,50,50));
    // (全部-图的长度)/2 = 中点
    titleBitmap.x = (LGlobal.width - titleBitmap.width) / 2;
    titleBitmap.y = 10;
    // 加到背景层里
    backLayer.addChild(titleBitmap);

    // 玩家
    selfBitmap = new LBitmap(new LBitmapData(showList[0].image));
    selfBitmap.x = 400 - selfBitmap.width - 50;
    selfBitmap.y = 130;
    backLayer.addChild(selfBitmap);

    // 电脑
    computerBitmap = new LBitmap(new LBitmapData(showList[0].image));
    computerBitmap.x = 400 + 50;
    computerBitmap.y = 130;
    backLayer.addChild(computerBitmap);

    // 玩家，电脑名称设定
    let nameText;
    nameText = new LTextField();
    nameText.text = 'Player';
    nameText.weight = 'bolder';
    nameText.color = '#ffffff';
    nameText.size = 24;
    nameText.x = selfBitmap.x + 
        (selfBitmap.width - nameText.getWidth()) / 2;
    nameText.y = 95;
    backLayer.addChild(nameText);

    nameText = new LTextField();
    nameText.text = 'computer';
    nameText.weight = 'bolder';
    nameText.color = '#ffffff';
    nameText.size = 24;
    nameText.x = computerBitmap.x + 
        (computerBitmap.width - nameText.getWidth())/2;
    nameText.y = 95;
    backLayer.addChild(nameText);


    initResultLayer();
    initClickLayer();
}

function initResultLayer() {
    let resultLayer = new LSprite();
    resultLayer.graphics.drawRect(4,'#ff8800',
        [0,0,150,110],
        true,
        '#ffffff');
        resultLayer.x = 10;
        resultLayer.y = 100;

        backLayer.addChild(resultLayer);

        selfText = new LTextField();
        selfText.text = '猜拳次数: 0';
        selfText.weight = 'bolder';
        selfText.x = 10;
        selfText.y = 20;
        resultLayer.addChild(selfText);
        
        win = new LTextField();
        win.text = 'win: 0';
        win.weight = 'bolder';
        win.x = 10;
        win.y = 40;
        resultLayer.addChild(win);

        loss = new LTextField();
        loss.text = 'loss: 0';
        loss.weight = 'bolder';
        loss.x = 10;
        loss.y = 60;
        resultLayer.addChild(loss);

        equal = new LTextField();
        equal.text = 'equal: 0';
        equal.weight = "bolder";
        equal.x = 10;
        equal.y = 80;
        resultLayer.addChild(equal);
}
function initClickLayer() {
    let clickLayer = new LSprite();
    clickLayer.graphics.drawRect(4,'#ff8800',
        [0,0,300,110],
        true,
        '#ffffff');

        let msgText = new LTextField();
        msgText.text = "请出拳：";
        msgText.weight = 'bolder';
        msgText.x = 10;
        msgText.y = 10;

        clickLayer.addChild(msgText);

        let btnHam = getButton('ham');
        btnHam.x = 30;
        btnHam.y = 35;
        clickLayer.addChild(btnHam);
        btnHam.addEventListener(LMouseEvent.MOUSE_UP, onclick);

        let btnClip = getButton('clip');
        btnClip.x = 115;
        btnClip.y = 35;
        clickLayer.addChild(btnClip);
        btnClip.addEventListener(LMouseEvent.MOUSE_UP, onclick);

        let btnHand = getButton('hand');
        btnHand.x = 200;
        btnHand.y = 35;
        clickLayer.addChild(btnHand);
        btnHand.addEventListener(LMouseEvent.MOUSE_UP, onclick);

        clickLayer.x = 250;
        clickLayer.y = 275;
        backLayer.addChild(clickLayer);
}

function getButton(value){
    let btnUp = new LBitmap(new LBitmapData(imgList[value]));
    btnUp.scaleX = 0.5;
    btnUp.scaleY = 0.5;

    let btnOver = new LBitmap(new LBitmapData(imgList[value]));
    btnOver.scaleX = 0.5;
    btnOver.scaleY = 0.5;
    btnOver.x = 2;
    btnOver.y = 2;

    let btn = new LButton(btnUp, btnOver);
    btn.name = value;
    return btn;
}

function onclick(event, display){
    let selfValue, computerValue;

    if(display.name == 'ham')   selfValue = 0;
    else if(display.name == 'clip') selfValue = 1;
    else if(display.name == 'hand') selfValue = 2;

    computerValue = Math.floor(Math.random()*3);
    console.log(computerValue);
    selfBitmap.bitmapData = showList[selfValue];
    computerBitmap.bitmapData = showList[computerValue];

    let result = checkList[selfValue][computerValue];
    if(result == -1)    lossCount += 1;
    else if(result == 1)    winCount += 1;
    else if(result == 0)    equalCount += 1;

    win.text = `win: ${winCount}`,
    loss.text = `loss: ${lossCount}`,
    equal.text = `equal: ${equalCount}`;
    selfText.text = `次数： ${winCount + lossCount + equalCount}`;
}
</script>
</body>
</html>
```

![64-game1][64]

# 总结和评价

游戏制作思路：

1. 建立容器背景
2. 画出结果和操作栏
3. 画出显示栏
4. 通过操作从而实现更换图片，并记录数值，最后与机器人比较，并获得判定结果
5. 显示结果改变

总结：

- 用到的方法大体为：
  - 原生：图片引入，画文本框，输入文字
  - `luxylegend`：分层，`loading`动画，监听事件

- 原版代码水平质量较低，只是单纯的增加函数，而没有考虑做成模块，并且分类进行调取运用

# 模块

- <span style="color:red;">暂时存在`addChild问题，需要解决`</span>

```javascript
class GamePlay {
    constructor(linethickness, idName, width, height){
        const checkList = [
            [0,1,-1],
            [-1,0,1],
            [1,-1,0]
        ];
        this.variable = new Map({
            [Symbol.iterator]: function*() {
                yield* [
                    [Symbol.for('imgList'), {}],
                    [Symbol.for('showList'), []],
                    [Symbol.for('imgData'), []],
                    [Symbol.for('checkList'), checkList]
                ];
            }
        });

        this.linethickness = linethickness,
        this.idName = idName,
        this.width = width,
        this.height = height;
        this.lossCount = 0,
        this.winCount = 0,
        this.equalCount = 0;

        this.backLayer = new LSprite();
        console.log(this.backLayer);
        // 此处报错，暂时找不到问题和解决办法
        this.prototype.LSprite().addChild(this.backLayer);
        this.resultLayer = new LSprite();  
        this.list = ['ham', 'clip', 'hand'];
        
    }

    setVal(id, val){
        this.variable.set(Symbol.for(id), val);
    }

    getVal(id){
        return this.variable.get(Symbol.for(id));
    }

    pushImgData(name,path){
        let imgData = Symbol.for('imgData');
        this.variable.get(imgData).push({name:name, path:path});
        return this.variable.get(imgData);
    }

    backGroundPotray(){
        init(this.linethickness, this.idName, this.width, this.height, this.load);
    }

    load(){        
        
        // loading
        let loadingLayer = new LoadingSample3();

        this.backLayer.addChild(loadingLayer);
        this.pushImgData('title','./show.jpg');
        this.pushImgData('hand','./58-hand.png');
        this.pushImgData('clip','./59-clip.png');
        this.pushImgData('ham','./60-ham.png');
        // manage
        LLoadManage.load(
            this.getVal('imgData'),
            progress => loadingLayer.setProgress(progress),
            result => {
                this.getVal('imgList').data = result;
                this.backLayer.removeChild(loadingLayer);
                loadingLayer = null;
                this.gameInit();
            });
    }

    gameInit(){
        for(let val of this.list)   this.getVal('showList').push(new LBitmapData(this.getVal('imgList').data[val]));

        // 游戏背景
        this.backLayer.graphics.drawRect(10, '#008800',
            [0,0,LGlobal.width,LGlobal.height],
            true,
            '#000000');

        // title
        let titleBitmap = new LBitmap(new LBitmapData(
            this.getVal('imgList').data['title'],20,20,50,50
        ));
        this.location(titleBitmap, (LGlobal.width - titleBitmap.width)/2, 10);
        
        // player
        let selfBitmap = new LBitmap(new LBitmapData(this.getVal('showList')[0].image));
        this.setVal('selfBitmap', selfBitmap);
        this.location(selfBitmap, 400 - selfBitmap.width - 50, 130);

        // computer
        let computerBitmap = new LBitmap(new LBitmapData(this.getVal('showList')[0].image));
        this.setVal('computerBitmap', computerBitmap);
        this.location(computerBitmap, 400 + 500, 130);

        // text setting
        this.textSetting('Player', 'bolder', '#ffffff', 24, 
            this.getVal('selfBitmap').x + (this.getVal('selfBitmap').width/2),
            95, this.backLayer);

        this.textSetting('computer', 'bolder', '#ffffff', 24,
            this.getVal('computerBitmap').x + this.getVal('computerBitmap').width/2,
            95, this.backLayer);

        this.initResultLayer();

    }

    initResultLayer(){
        
        this.resultLayer.graphics.drawRect(4, '#ff8800',
            [0,0,150,110],
            true,
            '#ffffff');
        this.resultLayer.x = 0;
        this.resultLayer.y = 100;

        this.backLayer.addChild(this.resultLayer);

        this.textSetting('猜拳的次数： 0','bolder', '#000000',24,10,20, this.resultLayer);
        this.textSetting('win： 0','bolder', '#000000',24,10,40, this.resultLayer);
        this.textSetting('loss： 0','bolder', '#000000',24,10,60, this.resultLayer);
        this.textSetting('equal: 0','bolder', '#000000',24,10,80, this.resultLayer);
    }

    initClickLayer(){
        let clickLayer = new LSprite();

        clickLayer.graphics.drawRect(4, '#ff8800',
            [0,0,300,110],
            true,
            '#ffffff');

        this.textSetting('请出拳','bolder', '#000000',24,10,40, clickLayer);

        this.getButton('ham', 30, 35, clickLayer, onclick);
        this.getButton('ham', 115, 35, clickLayer, onclick);
        this.getButton('ham', 200, 35, clickLayer, onclick);
    }

    location(bitmap, x, y){
        bitmap.x = x;
        bitmap.y = y;
        this.backLayer.addChild(bitmap);
    }

    textSetting(text, weight, color, size, x, y, layer){
        let nameText = new LTexField();

        nameText.text = text;
        nameText.weight = weight;
        nameText.color = color;
        nameText.sieze = size;
        nameText.x = x;
        nameText.y = y;
        layer.addChild(nameText);
    }

    getButton(value, x, y, layer, callback){
        let btnUp = new LBitmap(new LBitmapData(this.getVal('imgList').data[value]));
        btnUp.scaleX = 0.5;
        btnUp.scaleY = 0.5;

        let btnOver = new LBitmap(new LBitmapData(this.getVal('imgList').data[value]));
        btnOver.scaleX = 0.5;
        btnOver.scaleY = 0.5;
        btnOver.x = 2;
        btnOver.y = 2;
        
        let btn = new LButton(btnUp, btnOver);
        btn.name = value;
        
        btn.x = x;
        btn.y = y;
        layer.addChild(btn);

        btn.addEventListener(LMouseEvent.MOUSE_UP, callback);
    }

    onclick(event, display){
        let selfValue, computer;
        
        if(display.name == 'ham')   selfValue = 0;
        else if(display.name == 'clip') selfValue = 1;
        else if(display.name == 'hand') selfValue = 2;
    
        computerValue = Math.floor(Math.random()*3);
        console.log(computerValue);
        this.getVal('selfBitmap').bitmapData = this.getVal('showList')[selfValue];
        this.getVal('computerBitmap').bitmapData = this.getVal('showList')[computerValue];
    
        let result = checkList[selfValue][computerValue];
        if(result == -1)    this.lossCount += 1;
        else if(result == 1)    this.winCount += 1;
        else if(result == 0)    this.equalCount += 1;

        
        this.textSetting(`次数： ${this.winCount + this.lossCount + this.equalCount}`,'bolder', '#000000',24,10,20, this.resultLayer);
        this.textSetting(`win: ${this.winCount}`,'bolder', '#000000',24,10,40, this.resultLayer);
        this.textSetting(`loss: ${this.lossCount}`,'bolder', '#000000',24,10,60, this.resultLayer);
        this.textSetting(`equal: ${this.equalCount}`,'bolder', '#000000',24,10,80, this.resultLayer);
    }

}

const game = new GamePlay(50, 'legend', 800, 400);
game.backGroundPotray();
```

***

[57]:./img/57-game-1.png "57-game-1"
[58]:./img/58-hand.png "58-hand"
[59]:./img/59-clip.png "59-clip"
[60]:./img/60-ham.png "60-ham"
[61]:./img/61-loading.gif "61-loading"

[62]:./img/62-gameText.png "62-gameText.png"
[63]:./img/63-judge.png "63-judge"
[64]:./img/64-game1.png "64-game1"

