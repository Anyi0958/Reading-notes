RayTracingonOneWeek Ŀ¼
[TOC]
***
# ǰ��
- �����ʺϴ���Ӵ�ȥѧϰ
- ����������
***
# �Ƽ�
- ��Ray Tracing in One Weekend��
- ����ԭ�飺[����ѷ����](https://www.amazon.com/gp/product/B01B5AODD8/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B01B5AODD8&linkCode=as2&tag=inonwe09-20&linkId=OPNJXXJY2IBCMEGE "����ѷ����")
- [�ٷ�����](https://github.com/petershirley/raytracinginoneweekend "�ٷ�����")
***
# 0. ����
## 1. `CodeBlocks`�����`C++`����
- [��������](https://www.codeblocks.org/downloads/ "��������")
��װ��ı������ã�
![0-setting][01]
`Debugger`���ã�
![0-debugger][02]
���У�
![0-run][03]

## 2. Ŀ��
- ����Ŀ����Ǵ�������ͼ��
![0-4-result][04]
***
# 1. ���ͼ��
ʵ��һ��`ppm`���ӣ�
![1-ppm][05]
- ���������д������г�
- �д�ͷ��β�г�
- ���չ���������ÿ��`R/G/B`�ķ�Χ�Ǵ�$0.0$ �� $1.0$ ���Ժ󽫻��ڲ�Ӧ�ø߶�̬��Χ����ɫ��ͼӳ�䵽$0$��$1$�ķ�Χ

![2-tonemap][06]
- ��ɫ�������ɺڱ��
- ��ɫ�ӵ����ϣ��ɺڱ���
- �������Ϊ��ɫ�����Ͻ��ǻ�ɫ


```c++
#include <iostream>
#include <fstream>

using namespace std;

int main(void) {
    // ����ļ�
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
��������
![3-result][07]

## ע��
1. ��Ҫ�������������ŵ��ļ���
2. ��`PPM Viewer`�ļ���Դ�����ļ��������Ƽ�`XnView`

***
[01]: ./img/0-setting.png "0-setting"
[02]: ./img/0-debugger.png "0-debugger"
[03]: ./img/0-run.png "0-run"
[04]: ./img/0-4-result.png "0-4-result"
[05]: ./img/1-ppm.png "1-ppm"
[06]: ./img/2-tonemap.png "2-tonemap"
[07]: ./img/3-result.png "3-result"