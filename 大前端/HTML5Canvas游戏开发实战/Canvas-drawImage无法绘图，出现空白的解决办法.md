目录：

[TOC]

***

# 问题剖析

在操作`drawImage()`函数时，经常会出现调取正常，但`canvas`绘制出现空白的情况：

![1-voidSample][01]

这种情况，原因可以归为：

- 浏览器在加载图片时，图片尚未加载完毕，便开始绘图
- 主要原因为：`drawImage()`为异步函数

# 解决办法

1. `drawImage()`函数，要等到`img`标签里指定的图像加载完成后，再开始绘图，否则会出现无图的情况

2. 可以声明两种加载方式：

   1. `img.onload = function() {drawImage()}`
   2. `window.onload = function() {drawImage()}`

3. 可以使用`addEventListener('load', () => {drawImage()})`，可以绘出图像

   1. 同理：`document.querySelector('#imgs').addEventListener('load', (event) => {drawImage()})`
## 例子代码

```js
 let img = document.getElementById('imgs');
        // 会加载出图片	
        img.addEventListener('load', ()=> {
            ctx.drawImage(img, 20, 20);
        });
        // 会加载出来图片
        img.onload = () => {
            ctx.drawImage(img, 20, 20);
        }
```
效果：
![2-show.png][02]

# 测试样例
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    img <br />
    <img id="imgs" width="240" height="240" src="../../img/show.jpg">
    <hr />
    canvas<br />
    <canvas id="canvas" width="500" height="350"></canvas>
    <script>
        let c = document.getElementById('canvas');
        let ctx = c.getContext('2d');

        let img = document.getElementById('imgs');
        // 会加载出图片
        img.addEventListener('load', () => {
            ctx.drawImage(img, 20, 20);
        });
        // 会加载出来图片
      /*   img.onload = () => {
            ctx.drawImage(img, 20, 20);
        } */
    </script>
</body>
</html>
```
***

[01]: ./img/1-voidSample.png "1-voidSample"
[02]: ./img/2-show.png "2-show.png"
