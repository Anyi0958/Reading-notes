/* 
*   状态集合
*/
var Status = new Object();
Status.ResDone = false; //资源加载是否完毕
Status.MessageIn = false; //是否处于消息显示状态
Status.JumpFloor = false; //是否处于跳跃楼层状态
Status.RunOver = false; //是否已经执行完一回了
Status.EventRuning = false; //是否正在执行事件
Status.Move = false; //勇士是否处于移动状态
Status.LockMove = true; //是否锁定勇士移动
Status.LockController = true; //是否禁止控制走动
Status.ChangeHead = true; //是否允许原地转向
Status.NextMessage = false; //是否开始播放下一条消息
Status.MessageBoxStep = 0; //消息框位置状态
Status.FloorChoose = false; //是否处于快速选择楼层状态
Status.ShowMessage = false; //是否正在输出
Status.DisableGoFloor = true; //是否禁用了楼层传送器
Status.DisableEnemyBook = true; //是否禁用了怪物图鉴
Status.ShowGoFloor = false; //是否打开了楼层传送
Status.ShowEnemyBook = false; //是否打开了怪物图鉴
Status.ShowToolsPanel = false; //是否打开了道具面板
Status.ShowSettingPanel = false; //是否打开了设置面板
Status.ShowGetItemPanel = false; //是否打开了获得特殊道具的面板
Status.ShowHelpPanel = false; //是否打开了帮助面板
Status.LockGoFloorButton = true //是否锁定楼层传送按钮
Status.LockEnemyBookButton = true; //是否锁定怪物图鉴按钮
Status.LockToolsButton = true; //是否锁定道具按钮
Status.LockSettingButton = true; //是否锁定设置按钮
Status.LockIceButton = true; //是否锁定冰冻徽章
Status.LockFloorTip = false; //是否锁定楼层提示
Status.ShowStorePanel = false; //是否正在购买能力
Status.SL = false; //是否打开存档界面
Status.GameSL = false; //是否能够存档
Status.Battle = false; //是否处于战斗状态
Status.BattleAnimate = false; //是否开启战斗动画
Status.GameOver = false; //是否已经失败
 //开关集合
Status.Special = {
    Fairy: false, //是否在地下三层与仙子对话
    ScrollMerchant: false, //是否与地震卷轴商人对话
    CaptainKnight: false, //是否与骑士队长对话
    MagicDragon: false,  //是否打败魔龙
    Droiyan: false, //最终决战
    WinDragonMeetFairy: false, //是否魔龙后与仙子对话
    Deamon: false, //恶魔首领
    GuiltyScepter: false, //是否拿了罪恶权杖
};
// 事件集合
Status.Event = [];



const StatusData = function(dataType, ID){
    let status = eval('Status.' + dataType);

    if(status === 'undefined') return 'Status dataType error';

    if( status instanceof Object){
        if(ID !== 'undefined' && status.hasOwnProperty(ID))  return status[ID];
        // if(dataType === 'Event' && ID >= 0 && ID < status.length)   return status[ID];
    }

    return status;
}

// 测试
// let test =  StatusData('Event', 0);
// console.log(test);
/* for(let i in Status ){
    if(i === 'Special'){
        for(let j in Status[i]){
            let test = StatusData(i, j);
            console.log(test);
        }
    }else if(i === 'Event'){    
        let test = StatusData(i, Math.floor(Math.random()*Status[i].length-1));
        console.log(test);
    }else{
        let test = StatusData(i);
        console.log(test);
    }

} */
export {Status, StatusData};