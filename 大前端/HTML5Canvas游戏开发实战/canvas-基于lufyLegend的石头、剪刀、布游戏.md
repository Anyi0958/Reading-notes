canvas-����lufyLegend��ʯͷ������������Ϸ Ŀ¼
[TOC]
***

# ǰ��

- ����һЩ����

# ����ʵս

## ʯͷ���Ӳ�

### ��Ϸ����

��Ϸ��Ҫ�Ķ�����

1. ͼƬ�軭
2. ͼ�λ���
3. ���ֻ���
4. ���ĵ��
5. ����`AI`
6. ������֧���ж�

### ��Ҫ��`JS`֪ʶ

- �����
- ������֧
- `canvas`�������ı���ͼ���л�
- `lufylegend`��������÷ֲ�

## �ֲ�ʵ��

1. ������Ϸ����
2. ��ȭ����
3. �����ʾ����

## ����ʵ��

### 1.��������

```html
    <div id="legend"></div>
    <script>
        let backLayer;
        init(50,"legend", 800, 400, () =>{
            backLayer = new LSprite();
            addChild(backLayer);
            // ��Ϸ����
            backLayer.graphics.drawRect(10, '#008800',
                [0,0,LGlobal.width,LGlobal.height],
                true,
                '#000000');
            
            // �����ʾ���ʼ��
            initResultLayer();
            // �������ʼ��
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

#### �������

1. ��3����ʾ�㣺���������������
2. `LGlobal.width,LGlobal.height`��`canvas`�Ŀ���

### 2. ��ȭ����

- ׼���ز�

![58-hand][58]

![59-clip][59]

![60-ham][60]

- ͼƬ��ȡ������`LLoadManage.load(lits,onupdate,oncoplete)`
  - `list`��ͼƬ���飬��ʽ����Ϊ�涨��ʽ
  - `onupdate`��ÿ��ȡ������һ��ͼƬ����õĺ���
  - `oncomplete`����ȡ�����к���õĺ���

```html
    <div id="legend"></div>
    <script>
        let backLayer;
        init(50,"legend", 800, 400, () =>{
            backLayer = new LSprite();
            addChild(backLayer);
            // loading����
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

- ���뷴˼����Ȼ����д�Ǻܺ��ã����������̫ǿ����Ҫ���Ǹ��ھ۵���ϣ���������ģ��

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
    // loading����
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
- `imgData`�а�������ͼƬ��·��`{name:"x",path:"y"}`
- ���ؽ�������`loadingLayer = new LoadingSample3();backLayer.addChild(loadingLayer)`
- `lufylegend`��һ����3����������ʾ����`LoadingSample1,LoadingSample2,LoadingSample3`
- `LLoadManage.load()`���þ�̬��`LLoadManage`��`load`����ȥ��ȡ�����е�ͼƬ
- `loadingLayer.setProgress(progress)`����ȡͼƬ����ռͼƬ���鳤�ȵı��������������ͨ��`setProgress`���ݣ�ʵ�ֶ�̬�Ľ�����
- ��ȡ��ͼƬ��Ľ������ֵ��`imglist`��Ȼ��һ�������ϵĽ����������ٵ���`gameInit`������һ��

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
    // loading����
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
    // ��Ϸ����
    backLayer.graphics.drawRect(10, '#008800',
                [0,0,LGlobal.width,LGlobal.height],
                true,
                '#000000');

    // ��ʾ��Ϸ����
    let titleBitmap = new LBitmap(new LBitmapData(imgList["title"],20,20,50,50));
    // (ȫ��-ͼ�ĳ���)/2 = �е�
    titleBitmap.x = (LGlobal.width - titleBitmap.width) / 2;
    titleBitmap.y = 10;
    // �ӵ���������
    backLayer.addChild(titleBitmap);

    // ���
    selfBitmap = new LBitmap(new LBitmapData(showList[0].image));
    selfBitmap.x = 400 - selfBitmap.width - 50;
    selfBitmap.y = 130;
    backLayer.addChild(selfBitmap);

    // ����
    computerBitmap = new LBitmap(new LBitmapData(showList[0].image));
    computerBitmap.x = 400 + 50;
    computerBitmap.y = 130;
    backLayer.addChild(computerBitmap);

    // ��ң����������趨
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

### 3. �������ʾ

- ��`win,loss,equal`��ʾ����Ĵ���

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
    // loading����
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
    // ��Ϸ����
    backLayer.graphics.drawRect(10, '#008800',
                [0,0,LGlobal.width,LGlobal.height],
                true,
                '#000000');

    // ��ʾ��Ϸ����
    let titleBitmap = new LBitmap(new LBitmapData(imgList["title"],20,20,50,50));
    // (ȫ��-ͼ�ĳ���)/2 = �е�
    titleBitmap.x = (LGlobal.width - titleBitmap.width) / 2;
    titleBitmap.y = 10;
    // �ӵ���������
    backLayer.addChild(titleBitmap);

    // ���
    selfBitmap = new LBitmap(new LBitmapData(showList[0].image));
    selfBitmap.x = 400 - selfBitmap.width - 50;
    selfBitmap.y = 130;
    backLayer.addChild(selfBitmap);

    // ����
    computerBitmap = new LBitmap(new LBitmapData(showList[0].image));
    computerBitmap.x = 400 + 50;
    computerBitmap.y = 130;
    backLayer.addChild(computerBitmap);

    // ��ң����������趨
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
        selfText.text = '��ȭ����: 0';
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

### 4. ���Ʋ�

- ����滻��ť
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
    // loading����
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
    // ��Ϸ����
    backLayer.graphics.drawRect(10, '#008800',
                [0,0,LGlobal.width,LGlobal.height],
                true,
                '#000000');

    // ��ʾ��Ϸ����
    let titleBitmap = new LBitmap(new LBitmapData(imgList["title"],20,20,50,50));
    // (ȫ��-ͼ�ĳ���)/2 = �е�
    titleBitmap.x = (LGlobal.width - titleBitmap.width) / 2;
    titleBitmap.y = 10;
    // �ӵ���������
    backLayer.addChild(titleBitmap);

    // ���
    selfBitmap = new LBitmap(new LBitmapData(showList[0].image));
    selfBitmap.x = 400 - selfBitmap.width - 50;
    selfBitmap.y = 130;
    backLayer.addChild(selfBitmap);

    // ����
    computerBitmap = new LBitmap(new LBitmapData(showList[0].image));
    computerBitmap.x = 400 + 50;
    computerBitmap.y = 130;
    backLayer.addChild(computerBitmap);

    // ��ң����������趨
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
        selfText.text = '��ȭ����: 0';
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
        msgText.text = "���ȭ��";
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

### 5. ��ȭ

- �����������`Math.floor(Math.random() * 3)`�Ի����˽��и�ֵ

### 6. ����ж�

�����ж����飺

![63-judge.png][63]

```js
let checkList = [
    [0,1,-1],
    [-1,0,1],
    [1,-1,0]
];
```

### 7. ��Ϸ�������

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
    // loading����
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
    // ��Ϸ����
    backLayer.graphics.drawRect(10, '#008800',
                [0,0,LGlobal.width,LGlobal.height],
                true,
                '#000000');

    // ��ʾ��Ϸ����
    let titleBitmap = new LBitmap(new LBitmapData(imgList["title"],20,20,50,50));
    // (ȫ��-ͼ�ĳ���)/2 = �е�
    titleBitmap.x = (LGlobal.width - titleBitmap.width) / 2;
    titleBitmap.y = 10;
    // �ӵ���������
    backLayer.addChild(titleBitmap);

    // ���
    selfBitmap = new LBitmap(new LBitmapData(showList[0].image));
    selfBitmap.x = 400 - selfBitmap.width - 50;
    selfBitmap.y = 130;
    backLayer.addChild(selfBitmap);

    // ����
    computerBitmap = new LBitmap(new LBitmapData(showList[0].image));
    computerBitmap.x = 400 + 50;
    computerBitmap.y = 130;
    backLayer.addChild(computerBitmap);

    // ��ң����������趨
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
        selfText.text = '��ȭ����: 0';
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
        msgText.text = "���ȭ��";
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
    selfText.text = `������ ${winCount + lossCount + equalCount}`;
}
</script>
</body>
</html>
```

![64-game1][64]

# �ܽ������

��Ϸ����˼·��

1. ������������
2. ��������Ͳ�����
3. ������ʾ��
4. ͨ�������Ӷ�ʵ�ָ���ͼƬ������¼��ֵ�����������˱Ƚϣ�������ж����
5. ��ʾ����ı�

�ܽ᣺

- �õ��ķ�������Ϊ��
  - ԭ����ͼƬ���룬���ı�����������
  - `luxylegend`���ֲ㣬`loading`�����������¼�

- ԭ�����ˮƽ�����ϵͣ�ֻ�ǵ��������Ӻ�������û�п�������ģ�飬���ҷ�����е�ȡ����

# ģ��

- <span style="color:red;">��ʱ����`addChild���⣬��Ҫ���`</span>

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
        // �˴�������ʱ�Ҳ�������ͽ���취
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

        // ��Ϸ����
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

        this.textSetting('��ȭ�Ĵ����� 0','bolder', '#000000',24,10,20, this.resultLayer);
        this.textSetting('win�� 0','bolder', '#000000',24,10,40, this.resultLayer);
        this.textSetting('loss�� 0','bolder', '#000000',24,10,60, this.resultLayer);
        this.textSetting('equal: 0','bolder', '#000000',24,10,80, this.resultLayer);
    }

    initClickLayer(){
        let clickLayer = new LSprite();

        clickLayer.graphics.drawRect(4, '#ff8800',
            [0,0,300,110],
            true,
            '#ffffff');

        this.textSetting('���ȭ','bolder', '#000000',24,10,40, clickLayer);

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

        
        this.textSetting(`������ ${this.winCount + this.lossCount + this.equalCount}`,'bolder', '#000000',24,10,20, this.resultLayer);
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

