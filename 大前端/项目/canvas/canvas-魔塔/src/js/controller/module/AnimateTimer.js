//全局动画定时器
const GlobalAnimateTimer = window.setInterval(function(){
    if(GlobalAnimate.length > 0){
      for(let i = 0;i < GlobalAnimate.length;i++){
        //防止重复定义
        var ResName,IconX,IconY,IconW,IconH,X,Y;
        if(GlobalAnimate[i][1] != null){
          var Step = [0,32,96,64]; //定义动画顺序
          ResName = GlobalAnimate[i][2]; //获得该帧动画的资源名
          IconX = Step[GlobalAnimateStep];
          IconY = GlobalAnimate[i][5][2];
          IconW = GlobalAnimate[i][5][3];
          IconH = GlobalAnimate[i][5][4];
          X = GlobalAnimate[i][3] * IconW;
          Y = GlobalAnimate[i][4] * IconH;
          Map.ClearMap(Map.Event,X,Y,IconW,IconH); 
          Map.Event.drawImage(Map.Res[ResName],IconX,IconY,IconW,IconH,X,Y,IconW,IconH);
        }
        else{
          ResName = GlobalAnimate[i][2];
          IconX = GlobalAnimate[i][5][GlobalAnimateStep][1];
          IconY = GlobalAnimate[i][5][GlobalAnimateStep][2];
          IconW = GlobalAnimate[i][5][GlobalAnimateStep][3];
          IconH = GlobalAnimate[i][5][GlobalAnimateStep][4];
          X = GlobalAnimate[i][3] * 32;
          Y = GlobalAnimate[i][4] * 32;
          Map.ClearMap(Map.Event,X,Y,IconW,IconH); 
           Map.Event.drawImage(Map.Res[ResName],IconX,IconY,IconW,IconH,X,Y,IconW,IconH);
        }
      }
      GlobalAnimateStep++;
      if(GlobalAnimateStep > 3){
        GlobalAnimateStep = 0;
      }
    }
},200); 

export {GlobalAnimateTimer};