// 声明变量
var loadingLayer, backLayer, graphicsMap, nextLayer, nodeList;
const START_X1 = 15;
const START_Y1 = 20;
const START_X2 = 228;
const START_Y2 = 65;

init(4, 'legend', 800, 400, main);


let imgList = {};

let imgData = new Array(
    {name: 'backImage', path: './show.jpg'},
    {name: 'r1', path: './65-1.png'},
    {name: 'r2', path: './65-2.png'},
    {name: 'r3', path: './65-3.png'},
    {name: 'r4', path: './65-4.png'},
);

let bitmapdataList = [
    new LBitmapData(imgList['r1']),
    new LBitmapData(imgList['r2']),
    new LBitmapData(imgList['r3']),
    new LBitmapData(imgList['r4'])
];

function main(){
    backLayer = new LSprite();
    backLayer.graphics.drawRect(1, '#000000',
        [0,0,800,400],
        true,
        '#000000');
    addChild(backLayer);

    loadingLayer = new LoadingSample1();
    backLayer.addChild(loadingLayer);

    LLoadManage.load(
        imgData,
        progress => loadingLayer.setProgress(progress),
        reusult => {
            imgList = reusult;
            backLayer.removeChild(loadingLayer);
            loadingLayer = null;

            gameInit();
        }
    );
}

function gameInit() {
    let title = new LTextField();
    console.log(title.width);
    title.x = (LGlobal.width - title.getWidth() - 60)/2;
    console.log(title.x);
    title.y = 100;

    title.size = 30;
    title.color = '#ffffff';
    title.text = 'Teris';

    backLayer.addChild(title);

    backLayer.graphics.drawRect(1,'#ffffffff',
        [(LGlobal.width - 220)/2,240,220,40]
    );

    let textClick = new LTextField();
    textClick.size = 18;
    textClick.color = '#ffffff';
    textClick.text = '点击开始';
    textClick.x = (LGlobal.width - textClick.getWidth())/2;
    textClick.y = 245;

    backLayer.addChild(textClick);

    textClick.addEventListener(LMouseEvent.MOUSE_UP, gameToStart);
}

function gameToStart(){
    backLayer.die();

    backLayer.removeAllChild();

    let bitmap = new LBitmap(new LBitmapData(imgList['backImage'], 0,0,800, 400));
    backLayer.addChild(bitmap);

    let box = new Box();
    let nextBox, nowBox, pointBox;

    let map = new Array(20).fill(new Array(10).fill(0));
    nodeList = [];

    for(let i = 0; i < map.length; i++){
        for(let j = 0; j < map[0].length; j++){
            let bitmap = new LBitmap(bitmapdataList[0]);
            bitmap.x = bitmap.getWidth() * j + START_X1;
            bitmap.y = bitmap.getHeight() * i + START_Y1;
            graphicsMap.addChild(bitmap);
            nodeList[i][j] = {
                "index": -1,
                "value": 0,
                "bitmap": bitmap
            };
        }
    }
}

function Box(){
    let self = this;

    self.box1 = [
        [0,0,0,0],
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0]
    ];

    self.box2 = [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
    ];

    self.box3 = [
        [0,0,0,0],
        [1,1,1,0],
        [0,1,0,0],
        [0,0,0,0]
    ];

    self.box4 = [
        [0,1,1,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,0,0,0]
    ];

    self.box5 = [
        [0,1,1,0],
        [0,0,1,0],
        [0,0,1,0],
        [0,0,0,0]
    ];

    self.box6 = [
        [0,0,0,0],
        [0,1,0,0],
        [0,1,1,0],
        [0,0,1,0]
    ];

    self.box7 = [
        [0,0,0,0],
        [0,0,1,0],
        [0,1,1,0],
        [0,1,0,0]
    ];

    self.box = [self.box1,self.box2,self.box3,self.box4,self.box5,self.box6,self.box7];
    
}

Box.prototype = {
    getBox:function(){
        let self = this;

        let num = 7*Math.random();
        let index = parseInt(num);
        let result = [];
        let colorIndex = 1 + Math.floor(Math.random()*4);
        
        for (let i = 0; i < 4; i++){
            
            for(let j = 0; j < 4; j++){
                result[i][j] = self.box[index][i][j] * colorIndex;
            }             
        }
        return result;
    }

}

function getNewBox(){
    if(!nextBox)    nextBox = Box.getBox();

    nowBox = nextBox;
    pointBox.x = 3;
    pointBox.y = -4;
    nextBox = Box.getBox();

    nextLayer.removeAllChild();

    for(let i = 0; i < nextBox.length; i++){
        for(let j = 0; j < nextBox[i].length; j++){
            if(nextBox[i][j] == 0)  continue;
            let bitmap = new LBitmap(bitmapdataList[nextBox[i][j] - 1]);
            bitmap.x = bitmap.getWidth() * j + START_X2;
            bitmap.y = bitmap.getHeight() * i + START_Y2;
            nextLayer.addChild(bitmap);
        }
    }
}

function plusBox(){
    for(let i = 0; i < nowBox.length; i++){
        for(let j = 0; j < nowBox[i].length; j ++){
            if(i + pointBox.y < 0 || i + pointBox.y >= map.length
                    || j + pointBox.x < 0
                    || j + pointBox.x >= map[0].length) continue;
            
            map[i+pointBox.y][j+pointBox.x] = nowBox[i][j] + map[i+pointBox.y][j+pointBox.x];
            nodeList[i+pointBox.y][j+pointBox.x]["index"] = map[i+pointBox.y][j+pointBox.x] - 1;
        }
    }
}



// 移除方块
function minusBox(){
    for(let i = 0; i < nowBox.length; i++){
        for(let j = 0;j < nowBox[i].length; j++){
            if(i + pointBox.y < 0 ||
                i + pointBox.y >= map.length ||
                j + pointBox.x < 0 ||
                j + pointBox.x >= map[0].length)
                continue;
            
            map[i + pointBox.x][j + pointBox.x] = map[i + pointBox.y][j + pointBox.x] - nowBox[i][j];

            nodeList[i+pointBox.y][j+pointBox.x]['index'] = map[i+pointBox.y][j+pointBox.x] - 1;
        }
    }
}

// 判断是否可移动
function checkPlus(nx, ny){
    // 循环nowBox数组的每个元素
    for(let i = 0; i < nowBox.length; i++ ){
        for(let j = 0; j < nowBox[i].length; j++ ){
            if(i+pointBox.y + ny < 0)
                // 判断网格是否落入网格范围内
                continue;
            else if(i+pointBox.y + ny >= map.length ||
                    j+pointBox.x + nx < 0 ||
                    j+pointBox.x + nx >= map[0].length){
                        // 判断网格超出网格范围
                        if(nowBox[i][j] == 0)   continue;   // 网格为空继续判断
                        else    return false;   // 判断网格不为空则代表无法移动
                    }

            if(nowBox[i][j] > 0 && map[i+pointBox.y + ny][j+pointBox.x + nx] > 0)
                    return false;   // 判断网格的位置有方块，而将要移动到此位置的当前方块耶不为空，则代表无法移动
        }
    }

    return true;
}

// 绘制所有方块
function drawMap(){
    let box1 = 15;
    for(let i =0; i < map.length; i++){
        for(let j = 0; j < map[i].length; j++){
            if(nodeList[i][j]['index'] >= 0)    
                nodeList[i][j]["bitmap"].bitmapData = bitmapdataList[nodeList[i][j]['index']];
            else
                nodeList[i][j]['bitmap'].bitmapData = null;
        }
    }
}

// 游戏结束
function gameOver(){
    backLayer.die();
    let txt = new LTextField();

    txt.color = '#ff0000';
    txt.size = 40;
    txt.text = 'Game Over';

    txt.x = (LGlobal.width - txt.getWidth()) * 0.5;
    txt.y = 200;
    backLayer.addChild(txt);
}

// 控制方块移动
