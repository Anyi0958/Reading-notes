export function w(){
    console.log('test');
}

//更新加载提示内容
export function UpdateLoadTip(LoadTip, Content){
    LoadTip.innerHTML = Content;
}

//更新加载进度条
export function UpdateLoadProgress(LoadProgress, Progress){
    LoadProgress.style.width = Progress + "px";
}

//加载图片资源
export function LoadImage(Path,ResName,ResNum,callback){
    var Img = new Image(); //创建一个图片对象
    Img.src = Path; //获得图片路径
    //如果该图片已经缓存则直接回调
    if(Img.complete){
        callback(ResName,ResNum,Img);
        return;
    }
    //未缓存则等待加载完成后回调
    Img.onload = function(){
        callback(ResName,ResNum,Img);
    }
}

//加载资源
export function LoadResource(ResPath,ResNameList,callback){
    var ResTemp = {}; //临时存储对象
    for(var r = 0;r < ResNameList.length;r++){
        var ResName = ResNameList[r]; //获得资源名称
        UpdateLoadTip("Load " + ResName + ".png...");
        //开始加载图片
        LoadImage(ResPath + ResName + ".png",ResName,ResNameList.length,function(ResName,ResNum,Img){
            //图片加载完成
            var rnum = 0; //资源个数
            ResData[ResName] = Img; //存入图片对象数组
            UpdateLoadTip(ResName + ".png - Done");
            var Num = parseInt(LoadProgressBar.offsetWidth/ResNum); //计算进度
            UpdateLoadProgress(NowProgress += Num);
            for(var r in ResData){rnum++}; //统计资源数量
            if(rnum == ResNum){
            UpdateLoadTip("Done");
            var NowOpacity = 1; //当前透明度150%
            UpdateLoadProgress(LoadProgressBar.offsetWidth - 20);
            var MessageOutTimer = setInterval(function(){
            GameStart.style.opacity = NowOpacity -= 0.1; //开始渐变到透明度为0
                if(NowOpacity <= 0){
                    clearInterval(MessageOutTimer);
                    GameStart.style.display = "none"; //隐藏开始界面
                    callback();
                }
            },40);
            }
        });
    }
    //完成后返回所有资源
    return ResTemp;
}

//重置大小
export function Resize(Map){
    CilentWidth = document.documentElement.clientWidth; //重新获得设备宽度
    CilentHeight = document.documentElement.clientHeight; //重新获得设备高度	
    if(CilentWidth <= 490){
        GameGroup.style.width = CilentWidth + "px"; //将游戏容器宽度设置为设备宽度
        GameGroup.style.height = CilentHeight + "px"; //将游戏容器高度设置为设备高度
            WindowMode = 0;
            CanvasGroup.style.width = "352px";
        CanvasGroup.style.height = "512px";
            MapBg.style.marginTop = "100px";
            MapEvent.style.marginTop = "100px";
            MapFg.style.marginTop = "100px";
            SystemUI.style.marginTop = "100px";
            DataUpdate.style.marginTop = "100px";
        MapBg.style.marginLeft = "0px";
            MapEvent.style.marginLeft = "0px";
            MapFg.style.marginLeft = "0px";
            SystemUI.style.marginLeft = "0px";
            DataUpdate.style.marginLeft = "0px";
            Property.width = 352;
            Property.height = 512;
    }
    else{
        GameGroup.style.width = "800px"; //将游戏容器宽度设置为设备宽度
        GameGroup.style.height = CilentHeight + "px"; //将游戏容器高度设置为设备高度
            WindowMode = 1;
            var Left = 122 + "px";
            CanvasGroup.style.width = "474px";
            CanvasGroup.style.height = "352px";
            MapBg.style.marginTop = "0px";
            MapEvent.style.marginTop = "0px";
            MapFg.style.marginTop = "0px";
            SystemUI.style.marginTop = "0px";
            DataUpdate.style.marginTop = "0px";
            MapBg.style.marginLeft = Left;
            MapEvent.style.marginLeft = Left;
            MapFg.style.marginLeft = Left;
            SystemUI.style.marginLeft = Left;
            DataUpdate.style.marginLeft = Left;
            Property.width = 452;
            Property.height = 352;	  	
    }
    if(TestNull(Map)){
        Map.DrawPropertyGroup();
    }
}

//属性刷新
export function UpdateProperty(){
    Map.DrawPropertyGroup();
}

export function Vibrate(Time){
    if (navigator.vibrate) {
        navigator.vibrate(Time);
    }
    else if(navigator.webkitVibrate){
        navigator.webkitVibrate(Time);
    }
  }