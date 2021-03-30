import {deepCopy,getData} from './getData.js';
import * as common from './module/common.js';
// const test = require('./module/common.js');

/* 初始化 */
//获取所有元素
const CilentWidth = document.documentElement.clientWidth, //获得设备宽度
	CilentHeight = document.documentElement.clientHeight, //获得设备高度
	GameGroup = document.getElementById("GameGroup"), //获得游戏容器
	GameStart = document.getElementById("GameStart"), //获得开始画面
	GameLoading = document.getElementById("GameLoading"), //获得加载文字
	LoadTip = document.getElementById("LoadTip"), //获得加载时的提示
	LoadProgressBar = document.getElementById("LoadProgressBar"), //获得加载进度条
	LoadProgress = document.getElementById("LoadProgress"), //获得加载进度
	CanvasGroup = document.getElementById("CanvasGroup"), //获得画布容器
	WaitDraw = document.getElementById("GameLoading"),
	GoFloorButton = document.getElementById("GoFloorButton"),
	EnemyBookButton = document.getElementById("EnemyBookButton"),
	ToolsButton = document.getElementById("ToolsButton"),
	SettingButton = document.getElementById("SettingButton"),
	SaveGameButton =  document.getElementById("SaveGame"),
	LoadGameButton = document.getElementById("LoadGame"),
	HelpButton = document.getElementById("HelpButton"),
	ControlGroup = document.getElementById("ControlGroup"), //获得控制界面
	Controller = document.getElementById("Controller"), //获得控制按钮
	Controller2 = document.getElementById("Controller2"), //获得被触发的控制按钮
	ZoomBox = document.getElementById("ZoomBox"), //获得缩放选择框
	Property = document.getElementById("Property"),
	MapBg = document.getElementById("MapBg"), //获得背景画布
	MapEvent = document.getElementById("MapEvent"), //获得事件画布
	MapFg = document.getElementById("MapFg"), //获得前景画布
	SystemUI = document.getElementById("SystemUI"), //获得界面画布
	DataUpdate = document.getElementById("DataUpdate"), //获得数据画布
	TestButton = document.getElementById("Test");

//全局动画
var GlobalAnimate = []; 
//全局动画当前绘制的资源名称
var GlobalAnimateResName = "";
//全局动画当前步骤
var GlobalAnimateStep = 0;
var Temp;
//定义变量
let Version = getData('script', 'version', 0);
document.title = getData('script', 'title', 0) + Version;
console.log(Version);
var Map,Event;
// 人物属性声明
let mole = deepCopy('Hero');
console.log(mole);

var Floor = getData('hero', 'Floor', 0), //当前楼层
    Zoom = getData('hero', 'Zoom', 0), // 人物移动速度
    SLMode = "",
    HeroLocation = [2,5,10], //勇士当前朝向和坐标
    NoPassLocation = [], //禁止通行的坐标
    ItemLocation = [], //物品的坐标
    DoorLocation = [], //门的坐标
    StairLocation = [], //楼梯口坐标
    EnemyLocation = [], //怪物坐标
    NpcLocation = [], //Npc坐标
    EventLocation = [], //事件坐标
    HeroMove = 4,
    AnimateStep = 2,
    BattleAnimateStep = 0,
    MoveStepNum = 0,
    HeroIconData,
    StoreOptionNum = 10,
    StoreOptionTemp = "",
    HelpPanelPage = 1,
    StoreChoose = 0,
    SLPanelChoose = 1,
    ToolPanelChoose = 0,
	WindowMode = 0, //0竖屏 1横屏
	EnemyPage = 0,
	NowFloor = 0,
	LastTalk = "",
	StartTip = getData('Script', 'tip', 0),
	StartX = 0,
	StartY = 0,
	ControllerMode = 1, //控制模式，0触屏，1按键
	LastHead = 5,
	MoveTimeout,
    WaitSave,
    WaitLoad,
    FloorTipOut,
    WaitChooseFloor,
	UpTimer,
    LeftTimer,
    DownTimer,
    RightTimer,
	MoveTimer,
	RunTimer,
	MessageInTimer,
	MessageOutTimer,
	WaitOut,
	WaitNextMessageTimer,
	ShowWordTimer,
	EnemyBookAnimate,
	FloorTipTimer,
	MessageIconAnimate,
	ChooseFloorTimer,
	BattleAnimateTimer,
	AnimateNoPass = 0,
	ResPath = "../resource/"; //资源路径

console.log(StartTip);

    //资源名称列表
var ResNameList = ['Hero','Npc1','Npc2','Npc3','Enemy1','Enemy2','Enemy3','Enemy4','Enemy5','Enemy6','Enemy7','Enemy8','Enemy9','Enemy10','Enemy11','Enemy12','Enemy13','Enemy14','Enemy15','Store','Terrain','Stair','Door1','Door2','Door3','Door4','Gem','Weapon','Floor','Item1','Item2','Item3','Star','Lava','Water','Name','Battle1'],
    ResData = {},   //存储所有图片对象的数组	 
	MapsData = deepCopy('MapSet'),	
	IconsData = deepCopy('IconSet'),	 //所有图标坐标数据
	EnemyData = deepCopy('EnemySet'),	
	ItemsData = deepCopy('ItemSet'),	 //所有物品数据
	ToolsData = deepCopy('ItemSet.Tool'),	
	NowProgress = 0;	 //当前加载进度

