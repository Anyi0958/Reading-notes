/* 
*   资源配置文件
*   图标和地图集合
Terrain 地形图标 
    图标ID 在地形图内的x坐标 在地形图内的y坐标 宽度 高度 是否可通行
Hero 勇士图标 
    图标ID 朝向 在勇士图内的x坐标 在勇士图内的y坐标 宽度 高度
门图标
楼梯图标
Item 物品图标 
    图标ID 在物品图内的x坐标 在物品图内的y坐标 宽度 高度 所属的物品图
Enemy 怪物图标
Npc Npc图标
*/

const IconSet = {
    Terrain: [
        [0,0,0,32,32,1,"Terrain"],
        [1,32,0,32,32,1,"Terrain"],
        [2,64,0,32,32,1,"Terrain"],
        [3,0,32,32,32,1,"Terrain"],
        [4,32,32,32,32,1,"Terrain"],
        [5,64,32,32,32,0,"Terrain"],
        [6,0,0,32,32,1,"Store"],
        [7,64,0,32,32,1,"Store"],
        [8,96,0,32,32,1,"Store"]
    ],
    Hero: [
        //往上
        [
            [0,0,96,32,32],
            [1,32,96,32,32],
            [2,96,96,32,32],
            [3,64,96,32,32]
        ],
        //往左
        [
            [0,0,32,32,32],
            [1,32,32,32,32],
            [2,96,32,32,32],
            [3,64,32,32,32]
        ],
        //往下
        [
            [0,0,0,32,32],
            [1,32,0,32,32],
            [2,96,0,32,32],
            [3,64,0,32,32]
        ],
        //往右
        [
            [0,0,64,32,32],
            [1,32,64,32,32],
            [2,96,64,32,32],
            [3,64,64,32,32]
        ]        
    ],
    Door: [
        [0,0,0,32,32,"Door1"],
        [1,32,0,32,32,"Door1"],
        [2,64,0,32,32,"Door1"],
        [3,96,0,32,32,"Door1"],
        [4,0,0,32,32,"Door2"],
        [5,32,0,32,32,"Door2"],
        [6,64,0,32,32,"Door2"],
        [7,96,0,32,32,"Door2"],
        [8,0,0,32,32,"Door3"],
        [9,32,0,32,32,"Door3"],
        [10,64,0,32,32,"Door3"],
        [11,96,0,32,32,"Door3"],
        [12,0,0,32,32,"Door4"],
        [13,32,0,32,32,"Door4"],
        [14,64,0,32,32,"Door4"],
        [15,96,0,32,32,"Door4"]        
    ],
    Stair: [
        [0,32,0,32,32,"Stair"],
        [1,0,0,32,32,"Stair"],
        [2,64,0,32,32,"Stair"]        
    ],
    Item: [
        [0,0,0,32,32,"Item1"],
        [1,32,0,32,32,"Item1"],
        [2,64,0,32,32,"Item1"],
        [3,96,0,32,32,"Item1"],
        [4,0,32,32,32,"Item1"],
        [5,32,32,32,32,"Item1"],
        [6,64,32,32,32,"Item1"],
        [7,0,0,32,32,"Gem"],
        [8,32,0,32,32,"Gem"],
        [9,96,0,32,32,"Gem"],
        [10,64,0,32,32,"Gem"],
        [11,0,32,32,32,"Gem"],
        [12,32,32,32,32,"Gem"],
        [13,96,32,32,32,"Gem"],
        [14,96,32,32,32,"Gem"],
        [15,0,64,32,32,"Gem"],
        [16,32,64,32,32,"Gem"],
        [17,64,64,32,32,"Gem"],
        [18,96,64,32,32,"Gem"],
        [19,64,96,32,32,"Gem"],
        [20,96,96,32,32,"Gem"],
        [21,0,0,32,32,"Weapon"],
        [22,32,0,32,32,"Weapon"],
        [23,64,0,32,32,"Weapon"],
        [24,96,0,32,32,"Weapon"],
        [25,96,64,32,32,"Item1"],
        [26,0,64,32,32,"Weapon"],
        [27,32,64,32,32,"Weapon"],
        [28,64,64,32,32,"Weapon"],
        [29,96,64,32,32,"Weapon"],
        [30,0,32,32,32,"Weapon"],
        [31,0,96,32,32,"Weapon"],
        ["A1",32,64,32,32,"Item1"],
        ["A2",64,64,32,32,"Item1"],
        ["A4",64,96,32,32,"Item1"],
        ["A5",96,96,32,32,"Item2"],
        ["A6",32,96,32,32,"Item1"],
        ["A7",0,64,32,32,"Item1"],
        ["A8",96,64,32,32,"Item2"],
        ["A9",64,0,32,32,"Item3"],
        ["A10",0,96,32,32,"Item2"],
        ["A11",96,96,32,32,"Gem"],
        ["A12",0,32,32,32,"Item2"]        
    ],
    Enemy: [
        [0,0,0,32,32,"Enemy9"],
        [1,0,32,32,32,"Enemy9"],
        [2,0,64,32,32,"Enemy9"],
        [3,0,96,32,32,"Enemy13"],
        [4,0,0,32,32,"Enemy10"],
        [5,0,96,32,32,"Enemy12"],
        [6,0,96,32,32,"Enemy9"],
        [7,0,32,32,32,"Enemy14"],
        [8,0,0,32,32,"Enemy2"],
        [9,0,32,32,32,"Enemy2"],
        [10,0,64,32,32,"Enemy2"],
        [11,0,96,32,32,"Enemy2"],
        [12,0,0,32,32,"Enemy3"],
        [13,0,32,32,32,"Enemy3"],
        [14,0,64,32,32,"Enemy3"],
        [15,0,96,32,32,"Enemy3"],
        [16,0,0,32,32,"Enemy5"],
        [17,0,0,32,32,"Enemy15"],
        [18,0,32,32,32,"Enemy5"],
        [19,0,64,32,32,"Enemy5"],
        [20,0,96,32,32,"Enemy5"],
        [21,0,0,32,32,"Enemy4"],
        [22,0,32,32,32,"Enemy4"],
        [23,0,0,32,32,"Enemy6"],
        [24,0,32,32,32,"Enemy6"],
        [25,0,64,32,32,"Enemy6"],
        [26,0,64,32,32,"Enemy7"],
        [27,0,96,32,32,"Enemy8"],
        [28,0,32,32,32,"Enemy7"],
        [29,0,96,32,32,"Enemy4"],
        [30,0,64,32,32,"Enemy4"],
        [31,0,96,32,32,"Enemy6"],
        [32,0,0,32,32,"Enemy7"],
        [33,0,96,32,32,"Enemy3"],
        [34,0,64,32,32,"Enemy13"],
        [35,0,32,32,32,"Enemy13"],
        [36,0,0,32,32,"Enemy13"],
        [37,0,64,32,32,"Enemy8"],
        [38,0,96,32,32,"Enemy7"],
        [39,0,0,32,32,"Enemy1"],
        [40,0,32,32,32,"Enemy1"],
        [41,0,64,32,32,"Enemy1"],
        [42,0,96,32,32,"Enemy1"],
        [43,0,128,32,32,"Enemy1"],
        [44,0,159,32,32,"Enemy1"],
        [45,0,191,32,32,"Enemy1"],
        [46,0,223,32,32,"Enemy1"],
        [47,0,257,32,32,"Enemy1"],
        [48,0,0,32,32,"Enemy13"],
        [49,0,32,32,32,"Enemy12"],
        [50,0,0,32,32,"Enemy13"],
        [51,0,64,32,32,"Enemy12"],
        [52,0,32,32,32,"Enemy11"],
        [53,0,96,32,32,"Enemy2"],
        [54,0,32,32,32,"Enemy13"],
        [55,0,64,32,32,"Enemy14"],
        [56,0,96,32,32,"Enemy14"]        
    ],
    Npc: [
        [0,0,0,32,32,"Npc1"],
        [1,0,32,32,32,"Npc1"],
        [2,0,64,32,32,"Npc1"],
        [3,0,96,32,32,"Npc1"],
        [4,0,0,32,32,"Npc2"],
        [5,0,32,32,32,"Npc2"],
        [6,0,64,32,32,"Npc2"],
        [7,0,96,32,32,"Npc2"],
        [8,0,0,32,32,"Npc3"],
        [9,0,32,32,32,"Npc3"],
        [10,0,64,32,32,"Npc3"],
        [11,0,96,32,32,"Npc3"],
        [12,128,128,32,32,"Npc3"],//这个是空图像
        [13,0,96,32,32,"Npc2"]        
    ],
    BattleAnimate: [
        [
            0,
            [
                [0,0],[32,0],[64,0],[96,0],[0,32],[32,32],[64,32],[96,32]
            ],
            "Battle1"
        ],
        [
            1,
            [
                [0,64],[32,64],[64,64],[96,64],[0,96],[32,96]
            ],
            "Battle1"
        ]      
    ],
    Tool: [
        [0,96,96,"Item2"],
        [1,0,64,"Item1"],
        [2,96,96,"Item1"],
        [3,64,96,"Item1"],
        [4,32,96,"Item1"],
        [5,96,96,"Gem"],
        [6,32,96,"Item2"],
        [7,64,64,"Item2"],
        [8,96,64,"Item2"],
        [9,64,0,"Item3"],
        [10,32,64,"Item1"],
        [11,64,64,"Item1"],
        [12,0,96,"Item2"],
        [13,0,32,"Item2"]        
    ],
    Star: [
        [0,0,0,32,32],
        [1,32,0,32,32],
        [2,64,0,32,32],
        [3,96,0,32,32]        
    ],
    Lava: [
        [0,0,0,32,32],
        [1,32,0,32,32],
        [2,64,0,32,32],
        [3,96,0,32,32]        
    ],
    Water: [
        [0,0,0,32,32],
        [1,32,0,32,32],
        [2,64,0,32,32],
        [3,96,0,32,32]        
    ]
};

/*
*   param: string, int
    string: Data Type,
    int: Data index
 */
const IconsData = function(dataType, ID){
    let icons = eval("IconSet." + dataType);

    if(typeof(ID) !== 'undefined') {
        let min = 0,
            max = icons.length - 1;

        while(min <= max){
            let mid = Math.floor((max + min) / 2);
            if(ID === icons[mid][0])    return icons[mid];
            else if(ID > icons[mid][0]) min = mid + 1;
            else    max = mid - 1;
        }
    }

    return icons;
};

// 测试数据
/* 
for(let i in IconSet){
    console.log(i);
    let index = Math.floor(Math.random()*(IconSet[i].length));
    test = IconsData(i, index);
    console.log(test);
} */
export {IconSet, IconsData};