ԭ��jsʵ���ֲ�ͼ-setInterval, setTimeout Ŀ¼
[TOC]
***

# ǰ��

- ����ԭ��`js`ʵ���ֲ�ͼ
- ���븴�ƿ���

# ����ʵ��

## `setTimeout`�͵ݹ�ʵ��

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
        let img = document.createElement('img');
        img.width = 800,
        img.height = 500;

        document.body.appendChild(img);
        // ͼƬ��·��
        let imgList = ['./1.jpg', './2.jpg', './3.jpg'],
            start = 0;
        function run(){
            if(start >= imgList.length)	start = 0;
            img.src = imgList[start++];
            
            setTimeout(()=>{run()},2000);
        }
        run();
    </script>
</body>
</html>
```

## `setInterval`

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
        let img = document.createElement('img');
        img.width = 800,
        img.height = 500;

        document.body.appendChild(img);
        let imgList = ['./1.jpg', './2.jpg', './3.jpg'],
            start = 0;
        setInterval(()=>{
            if(start >= imgList.length) start = 0;
            img.src = imgList[start++];
        },2000);
    </script>
</body>
</html>
```

# Ч��չʾ

![pic.gif][01]

***

[01]:./img/pic.gif "pic.gif"

