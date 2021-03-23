canvas-烟火礼花 目录
[TOC]
***

# 前言

# 推荐阅读

- [烟火](https://zhuanlan.zhihu.com/p/33942947 "烟火礼花")

# 实现效果

<iframe height='498' width='510' src='https://vdn1.vzuu.com/SD/f26dcb6a-2390-11eb-b8ea-e229768f234a.mp4?disable_local_cache=1&auth_key=1614314248-0-0-89890e4fdbb35cd952b19d8a28fd30a5&f=mp4&bu=pico&expiration=1614314248&v=hw' frameborder='0' 'allowfullscreen'></iframe>

# 思路解析

流程：

1. 升空
2. 等待炸裂
3. 炸裂后

属性：

1. 烟花：发射点`(x,y)`，爆炸点`(xEnd,yEnd)`，升空后等待炸裂时间`wait`，炸裂后微粒个数`count`，烟花半径`radius`
2. 炸裂后微粒：自身位置`(x,y)`，自身大小`size`，自身速度`rate`，最大烟花半径`radius`
3. 全局设置：控制参数，画布宽高，烟花属性

## 微粒

- 模拟为圆形小颗粒
- 出现时的位置
- 移动的物理运动

## 烟花

- 坐标
- 结束位置
- 微粒个数



