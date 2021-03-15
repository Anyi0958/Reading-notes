css-����-��ת��糵 Ŀ¼
[TOC]
***

# ǰ��

- `css`ʵ�ֶ���Ч��
- ѧϰ��Դ

# ���չ��

![��ת��糵](.\img\0-��ת��糵.gif)

# ����ʵ��

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>CSS ����</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="box">
        <div>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</body>
</html>
```

```css
body{
    margin: 0; /*��߾�*/
    padding: 0; /*�ڱ߾�*/
    background-color: #607d8b; /*������ɫ*/
}
.box{
    position:absolute; /*���Զ�λ*/
    top: calc(50% - 150px); /*���ϲ�*/
    left: calc(50% - 100px); /*����*/
    transform: perspective(1000px) rotateY(-45deg); /*���� �Ӿ� Y����ת*/
    width: 200px; /*���*/
    height: 300px; /*�߶�*/
    transform-style: preserve-3d; /*����3DЧ��*/
}
.box::before{ /*֮�����*/
    content: ""; /*����*/
    position: absolute;
    bottom: -100px;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: #000;
    filter: blur(40px); /**/
    opacity: 0.5; /*͸����*/
    transform: rotateX(90deg);
}
.box div{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    animation: cc 5s linear infinite; /*�������� 5S ʱ�� �ظ�ѭ��*/
}
.box div span{
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, #f1f1f1,#bbb,#f1f1f1); /*����*/
    border-radius: 20px; /*Բ��*/
}
.box div span:nth-child(1){ /*��һ��*/
    transform: rotateX(0deg);
}
.box div span:nth-child(2){
    transform: rotateX(45deg);
}
.box div span:nth-child(3){
    transform: rotateX(-45deg);
}

.box div span:nth-child(4){
    transform: rotateX(90deg);
}
@keyframes cc{ /*����*/
    0%{
        transform: perspective(1000px) rotateX(0deg);
    }
    100%{
        transform: perspective(1000px) rotateX(359deg);
    }
}
```

