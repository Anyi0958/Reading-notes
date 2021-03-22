#include <iostream.h>
#include <memory.h>

#define SX 11
#define SY 10

int dx[4] = {0,0,-1,1};
int dy[4] = {-1,1,0,0};

char Block[SY][SX] = {
    {1,1,1,1,1,1,1,1,1,1,1},
    {1,0,1,0,1,0,0,0,0,0,1},
    {1,0,1,0,0,0,1,0,1,1,1},
    {1,0,0,0,1,0,1,0,0,0,1},
    {1,0,1,1,0,0,1,0,0,1,1},
    {1,0,1,0,1,1,0,1,0,0,1},
    {1,0,0,0,0,0,0,0,1,0,1},
    {1,0,1,0,1,0,1,0,1,0,1},
    {1,0,0,1,0,0,1,0,1,0,1},
    {1,1,1,1,1,1,1,1,1,1,1}
};

// 全部完成标志
int AllComplete = 0;

// 搜索到第几层
int LevelNow = 1,
    Act,    //现在移动的方向
    ActBefore,  // 现在节点的父结点
    MaxAct = 4, // 移动方向总数
    ActNow,     //现在的节点
    tx,
    ty;

int LevelFoot[200], //最后的节点
    ActHead[3000];

// 每个节点的移动方向
char AllAct[3000];
char ActX[3000], ActY[3000];
char Table[SY][SX];
char TargetX = 9, TargetY = 8;

void Test();
int ActOK();

int ActOK() {
    tx = ActX[ActBefore] + dx[Act-1];
    ty = ActY[ActBefore] + dy[Act-1];

    if((tx >= SX) || (tx < 0))
        return 0;
    if((ty >= SY) || (ty < 0))
        return 0;
    if(Table[ty][tx] == 1)
        return 0;
    if(Block[ty][tx] == 1)
        return 0;
    return 1;
}

void Test(){
    // 已经到达目标
    if((x == TargetX) && (y == TargetY)){
        int act = ActNow;
        while (act != 0)
        {
            cout << (int)AllAct[act];
            act = ActHead[act];
        }
        return 1;
    }
    return 0;
}



void main() {
    // 清零
    memset(Act, 0, sizeof(Act));
    memset(Table, 0, sizeof(Table));
    // 做已到过的标记
    Table[y][x] = 1;
    // 是否全部搜索完
    while(!AllComplete){
        Level++;
        LevelComplete = 0;
        // 搜索下一步
        while (!LevelComplete)
        {
            // 改变移动方向
            Act[Level]++;
            // 移动方向是否合理
            if(ActOK()){
                Test();
                LevelComplete = 1;
            }else{
                if(Act[Level] > MaxAct) Back();
                // 退出
                if(Level < 0)   LevelComplete = AllComplete = 1;
            }
        }
        
    }
}

