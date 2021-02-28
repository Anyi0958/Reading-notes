// basic configuration
const config = {
    bglayer:{
        bgLineNum: 1,
        bgColor: '#000000',
        bgRect: [0,0,320,480]
    },
    text: {
    },
    imgData:[
        {
            name:'bg.jpg',
            path:'./img/bg.jpg'
        },
    ],
    stage:{
        length: 126,
        height: 32
    },
    charact:{
        modelLength: 15,
        modelHeight: 33
    }
};
const STAGE_STEP = 0.5;
const MOVE_STEP = 1;

// declare globalvariable
// loading show layer, bg layer, square draw layer, 
// square pre-performance layer
let loadingLayer, backLayer, graphicsMap, nextLayer, background, stageLayer,
stageSpeed = 100, g = 3;


let imgList = {};
let imgData = new Array(
    {name: 'back', path: './img/bg.jpg'},
    {name: 'floor0', path: './img/floor0.png'},
    {name: 'hero', path:'./img/chara.png'}
);
// var hero = new Chara();
let map = new Map(
    [[Symbol.for('hero'), new Chara()]]
);

// all initial
init(4, 'legend', 800, 500, main);

// main func, the enter locaion
function main() {
    // bg layer
    backLayer = new LSprite();

    // potray black bg in bg layer
    backLayer.graphics.drawRect(1, '#000000', [0,0,800,500], true, '#000000');

    // background performance
    addChild(backLayer);

    // loading read layer is on the way
    loadingLayer = new LoadingSample2(50);
    // loading layer show
    backLayer.addChild(loadingLayer);

    // LLoadManage, get all images and potray the progress
    LLoadManage.load(
        imgData,
        progress => loadingLayer.setProgress(progress),
        result => {
            imgList = result;
            backLayer.removeAllChild();

            loadingLayer = null;
            gameInitial();
        }
    );

}

// read all images, and generate game title in game initial
function gameInitial(){
    // game title
    let title = new LTextField();
    title.size = 30;
    title.text = '是男人就下100层';
    title.x = (LGlobal.width - title.getWidth())/2;
    title.y = 100;
    
    title.color = '#ffffff';
    
    
    backLayer.addChild(title);

    // show the instro text
    backLayer.graphics.drawRect(1,'#ffffff',
        [(LGlobal.width - 220 )/2,240,220,40]);

    // add start button
    let textClick = new LTextField();
    textClick.size = 18;
    textClick.color = '#ffffff';
    textClick.text = '点击开始';
    textClick.x = (LGlobal.width - textClick.getWidth())/2;
    textClick.y = 250;

    backLayer.addChild(textClick);

    // add click event, click the rect of text named 'start',
    // and start game
    backLayer.addEventListener(LMouseEvent.MOUSE_UP, gameStart);
}

// game start
function gameStart(restart){
    // clear all in back layer
    backLayer.die();

    backLayer.removeAllChild();

    // bg images portrayed
    // let bitmap = new LBitmap(new LBitmapData(imgList['back']));
    // backLayer.addChild(bitmap);
    background = new Background();
    backLayer.addChild(background);
    
    
    // console.log(map.get(Symbol.for('hero')));
    map.get(Symbol.for('hero')).x = 140;
    map.get(Symbol.for('hero')).y = 100;
    map.get(Symbol.for('hero')).hp = map.get(Symbol.for('hero')).maxHp;
    backLayer.addChild(map.get(Symbol.for('hero')));

    stageInit();
    
    backLayer.addEventListener(LEvent.ENTER_FRAME, onframe);
}

function onframe() {
    // console.log(map.get(Symbol.for('hero')));
    background.run();
    let hero = map.get(Symbol.for('hero'));
    // 生成台阶的时间间隔
    if(stageSpeed-- < -100){
        stageSpeed = 100;
        addStage();
    }

    // found表明是否落到地板上，并将状态设置为跳跃
    console.log(hero);
    let found = false;
    hero.isJump = true;

    // 循环动画播放
    for(let key in stageLayer.childList){
        let _child = stageLayer.childList[key];
        // 移除消失的资源
        if(_child.y < -_child.getHeight())
            stageLayer.removeChild(_child);
        // 判断是否跳下站稳
        if(!found && 
            hero.x + config.charact.modelLength >= _child.x &&
            hero.x <= _child.x + config.stage.length &&
            hero.y + config.charact.modelHeight >= _child.y + _child.hy &&
            hero._charaOld + 50 <= _child.y + _child.hy + 1){
                // 接触条约状态
                hero.isJump = false;
                // 改变动作
                hero.changeAction();
                // 地板的child设置为人物
                _child.child = hero;
                // 下落速度为0
                hero.speed = 0;
                // 
                hero.y = _child.y - 49 + _child.hy;
                _child.hitRun();
                found = true;
        }else{
                _child.child = null;
        }
               
        _child.onframe();
    }
    // 处于跳跃状态时，动作设置为跳跃
    // 人物不为空时，持续调用onframe
    // 当血量为0时，游戏结束
    if(hero.isJump) hero.anime.setAction(1,0);
    if(hero) {
        hero.onframe();

        if(hero.hp <= 0){
            backLayer.removeChild(hero);
            hero = null;
            gameOver();
        }
    }
}

// 游戏结束
function gameOver(){

}

// 背景图片实现卷轴效果
function Background() {
    // base-封装继承: base(子对象本身，父对象，参数)
    base(this, LSprite, []);
    let self = this;
    // 导入图像
    self.bitmapData = new LBitmapData(imgList['back']);
    // 赋值三分    
    self.bitmap1 = new LBitmap(self.bitmapData);
    self.addChild(self.bitmap1);
    // 对高度的设置
    self.bitmap2 = new LBitmap(self.bitmapData);
    self.bitmap2.y = self.bitmap1.getHeight();
    self.addChild(self.bitmap2);

    self.bitmap3 = new LBitmap(self.bitmapData);
    self.bitmap3.y = self.bitmap1.getHeight() * 2;
    self.addChild(self.bitmap3);
}
// 卷轴运动
Background.prototype.run = function() {
    let self = this;
    // 3个每次移动
    self.bitmap1.y -= STAGE_STEP;
    self.bitmap2.y -= STAGE_STEP;
    self.bitmap3.y -= STAGE_STEP;
    // 往上移动，当图像完全消失后，开始更改图像的位置
    // 第1个移走后，1放到1，重新计算其他两个的坐标
    if(self.bitmap1.y <= -self.bitmap1.getHeight()){
        self.bitmap1.y = self.bitmap2.y;
        console.log(self.bitmap1.y);
        self.bitmap2.y = self.bitmap1.y + self.bitmap1.getHeight();
        // self.bitmap3.y = self.bitmap1.y + self.bitmap1.getHeight() * 2;
    }
}

// add static floor
function Floor(){
    base(this, LSprite, []);
    let self = this;

    self.hy = 0;
    self.setView();
}

Floor.prototype.setView = function(){};
Floor.prototype.onframe = function(){
    let self = this;
    self.y -= STAGE_STEP;
    if(self.child)  self.child.y -= STAGE_STEP;
};
Floor.prototype.hitRun = function(){};

function Floor01() {
    base(this, Floor, []);
}

Floor01.prototype.setView = function() {
    let self = this;

    self.bitmap = new LBitmap(new LBitmapData(imgList["floor0"]));
    self.addChild(self.bitmap);
}

function stageInit() {
    stageLayer = new LSprite();
    backLayer.addChild(stageLayer);
}

function addStage() {
    let mstage;

    mstage = new Floor01();
    mstage.y = 480,
    mstage.x = Math.random() * 700;
    stageLayer.addChild(mstage);
}

// 人物类
function Chara(){
    base(this, LSprite, []);

    let self = this;
    // 控制人物
    self.moveType = null;
    // 当前血量
    self.hp = 3;
    // 最大血量
    self.maxHp = 3;
    // 血量恢复
    self.hpCtrl = 0;
    // 是否处于跳跃状态
    self.isJump = true;
    // 动作变换的快慢
    self.index = 0;
    // 主角下落的速度
    self.speed = 0;
    // 每次下落之前的y坐标
    self._charaOld = 0;

    // 分割图片
    let list = LGlobal.divideCoordinate(627,33,1,24);

    let data = new LBitmapData(imgList['hero'],0,0,14,33);

    self.anime = new LAnimation(self, data, [
        [list[0][0]],
        [list[0][1]],
        [
            list[0][2], list[0][3], list[0][4], list[0][5], list[0][6],
            list[0][7], list[0][8], list[0][9], list[0][10], list[0][11],
            list[0][12]
        ],
        [
            list[0][13], list[0][14], list[0][15], list[0][16], list[0][17],
            list[0][18], list[0][19], list[0][20], list[0][20], list[0][21],
            list[0][22], list[0][23]
        ]
    ]);

    // list1 = new Array();
}

Chara.prototype.onframe = function (){
    let self = this;
    // 人物的旧位置
    self._charaOld = self.y;
    // 随着跳下，位置增高，下落1次
    self.y += self.speed;
    // 下落速度
    self.speed += g;
    // 限制最高
    if(self.speed > 20) self.speed = 20;
    // 掉出去后，血条归0
    if(self.y > LGlobal.height) self.hp = 0;
    // 人物位置操作，移动MOVE_STEP
    if(self.moveType == 'left')
        self.x -= MOVE_STEP;
    else if (self.moveType == 'right')
        self.x += MOVE_STEP;
    // 如果位置超出框架，限制位置
    if(self.x < -10)
        self.x = -10;
    else if(self.x > LGlobal.width - 30)
        self.x = LGlobal.width - 30;
    // 控制人物动作的快慢变化
    if(self.index-- > 0)
        return;
    // 每10次，人物的动作变换一次
    self.index = 10;
    self.anime.onframe();
};

// 控制动作
Chara.prototype.changeAction = function() {
    let self = this;

    if(self.moveType == 'left')
        hero.anime.setAction(3);
    else if(self.moveType == 'right')
        hero.anime.setAction(2);
    else if(hero.isJump)
        hero.anime.setAction(1,0);
    else
        hero.anime.setAction(0,0);
};