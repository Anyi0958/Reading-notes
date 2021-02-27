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
    ]
};
const STAGE_STEP = 1;

// declare globalvariable
// loading show layer, bg layer, square draw layer, 
// square pre-performance layer
let loadingLayer, backLayer, graphicsMap, nextLayer, background;

let imgList = {};
let imgData = new Array(
    {name: 'back', path: './img/bg.jpg'}
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
function gameStart(){
    // clear all in back layer
    backLayer.die();

    backLayer.removeAllChild();

    // bg images portrayed
    // let bitmap = new LBitmap(new LBitmapData(imgList['back']));
    // backLayer.addChild(bitmap);
    background = new Background();
    backLayer.addChild(background);
    backLayer.addEventListener(LEvent.ENTER_FRAME, onframe);
}

function onframe() {
    background.run();
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
};
Floor.prototype.hitRun = function(){};