JavaScript根据Geo获取当前位置
目录：
[TOC]
***
# 前言
- H5新特性，引入了`Geolocation API`
- 根据这个`API`可以调取本地经纬度数据

# 代码实现
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
    <script>
        window.addEventListener('load', () => {
            // 判断可否使用geolocation
            if(navigator.geolocation){
                // regular get location
                navigator.geolocation.watchPosition(position => {
                    console.log(position);
                    // 纬度
                    let lat = position.coords.latitude;
                    // 经度
                    let lng = position.coords.longitude;
                    // performance
                    document.write(`lattitude: ${lat}, longitude: ${lng}`);
                }, err => {
                    console.log("error, can't use");
                });
            }
        }, false);

    </script>
</body>
</html>
```
# 效果
## 控制台打印数据
![1-4-geo-1][02]
## 页面输出数据
![1-4-geo-2][03]

***
[02]: ./img/1-4-geo-1.png "1-4-geo-1"
[03]: ./img/1-4-geo-2.png "1-4-geo-2"