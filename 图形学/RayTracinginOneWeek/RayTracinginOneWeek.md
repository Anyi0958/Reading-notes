RayTracingonOneWeek 目录
[TOC]
***
# 前言
- 本书适合从零接触去学习
- 简单容易上手
***
# 推荐
- 《Ray Tracing in One Weekend》
- 购买原书：[亚马逊美国](https://www.amazon.com/gp/product/B01B5AODD8/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B01B5AODD8&linkCode=as2&tag=inonwe09-20&linkId=OPNJXXJY2IBCMEGE "亚马逊美版")
- [官方代码](https://github.com/petershirley/raytracinginoneweekend "官方代码")
***
# 0. 概述
## 1. `CodeBlocks`环境搭建`C++`程序
- [官网下载](https://www.codeblocks.org/downloads/ "官网下载")
安装后的编译设置：
![0-setting][01]
`Debugger`设置：
![0-debugger][02]
运行：
![0-run][03]

## 2. 目标
- 本书目标就是创建出此图：
![0-4-result][04]
***
# 1. 输出图像
实现一个`ppm`例子：
![1-ppm][05]
- 像素行以行从左到右列出
- 行从头到尾列出
- 按照惯例来看，每个`R/G/B`的范围是从$0.0$ 到 $1.0$ ，稍后将会内部应用高动态范围，将色调图映射到$0$到$1$的范围

![2-tonemap][06]
- 红色从左到右由黑变红
- 绿色从底向上，由黑变绿
- 红绿相加为黄色，右上角是黄色


```c++
#include <iostream>
#include <fstream>

using namespace std;

int main(void) {
    // 输出文件
    ofstream outfile("./result/toneMap.txt", ios_base::out); 

    int nx = 200;
    int ny = 100;

    outfile << "P3\n" << nx << "  " << ny << "\n255\n";

    for (int j = ny - 1; j >= 0; j --){
        for(int i = 0; i < nx; i ++) {
            
            float r = float(i) / float(nx);
            float g = float(j) / float(ny);
            float b = 0.2;

            int ir = int(255.99 * r);
            int ig = int(255.99 * g);
            int ib = int(255.99 * b);

            outfile << ir << "    " << ig << "    " << ib << "\n";
        }
    }
}
```
输出结果：
![3-result][07]

## 注意
1. 需要将代码输出结果放到文件中
2. 用`PPM Viewer`文件打开源代码文件，这里推荐`XnView`

***
[01]: ./img/0-setting.png "0-setting"
[02]: ./img/0-debugger.png "0-debugger"
[03]: ./img/0-run.png "0-run"
[04]: ./img/0-4-result.png "0-4-result"
[05]: ./img/1-ppm.png "1-ppm"
[06]: ./img/2-tonemap.png "2-tonemap"
[07]: ./img/3-result.png "3-result"