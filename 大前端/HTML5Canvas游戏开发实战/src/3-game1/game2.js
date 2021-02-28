let width = window.innerWidth,
    height = window.innerHeight;

console.log(width);
init(50,"legend", width, height, main);
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
    console.log(isNaN( this.backLayer));
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
