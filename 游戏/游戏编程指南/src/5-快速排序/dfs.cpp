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

// 移动方向总数
int MaxAct = 4;

// 已到过标记
char Table[SY][SX];

// 第几步
int Level = -1;

// 这一步的搜索是否完成
int LevelComplete = 0;

// 全部搜索是否完成
int AllComplete = 0;

// 每一步的移动方向，搜索1000步
char Act[1000];

// 现在的坐标
int x = 1, y = 1;

// 目标的坐标
int TargetX = 9, TargetY = 8;

void Test();
void Back();
int ActOK();

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

void Test(){
    // 已经到达目标
    if((x == TargetX) && (y == TargetY)){
        for(int i = 0; i <= Level; i++) 
            cout << (int)Act[i];
        LevelComplete = AllComplete = 1;
    }
}

int ActOK() {
    int tx = x + dx[Act[Level] - 1];
    int ty = y + dy[Act[Level] - 1];

    if(Act[Level] > MaxAct)
        return 0;
    if((tx >= SX) || (tx < 0))
        return 0;
    if((ty >= SY) || (ty < 0))
        return 0;
    if(Table[ty][tx] == 1)
        return 0;
    if(Block[ty][tx] == 1)
        return 0;

    x = tx;
    y = ty;
    Table[y][x] = 1;
    return 1;
}

void Back() {
    x -= dx[Act[Level-1]-1];
    y -= dy[Act[Level-1]-1];

    Table[y][x] = 0;
    Act[Level] = 0;

    Level--;
}