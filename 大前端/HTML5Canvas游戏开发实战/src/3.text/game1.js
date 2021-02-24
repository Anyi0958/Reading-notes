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