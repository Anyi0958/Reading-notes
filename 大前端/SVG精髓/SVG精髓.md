SVG���� Ŀ¼
[TOC]
***

# ǰ��

- ����Ϊ��SVG Essential�����Ķ��ʼ�

***

# �Ƽ��Ķ�

- ��SVG Essential��
- ȫ��Դ��:[svg-essentials-examples](https://github.com/oreillymedia/svg-essentials-examples "github")

***

# 1. ����

- `SVG`��һ��`XML`Ӧ�ã�����ֲ����ʽ

## 1. ͼ��ϵͳ

����ͼ����Ϣ������ϵͳ��

- դ��ͼ�� - `raster graphics`
- ʸ��ͼ�� - `vector graphics`

### 1. դ��ϵͳ

- ͼ�񱻱�ʾΪͼƬԪ�ػ������صĳ���������
- ÿ��������`RGB`��ʾ
- λͼ

### 2. ʸ��ͼ��

- ����
- ��ʧ��

## 2. `SVG`����

- �ض��Ķ����Ƹ�ʽ�洢��ͼ��Ϣ

### 1. �ĵ��ṹ

- `xml`����ָ��
- `DOCTYPE`����
- `SVG`��Ԫ�أ�����`width, height`
- `title`
- `desc`

```xml
<?xml version="1.0"?>
<!DOCTYPE svg PUBLIC "">

<svg width="140" height="170" xmlns="http://www.w3.org/2000/svg">
<title>Cat</title>
<desc>Stick Figure of a Cat</desc>
<!-- �������ͼ -->
</svg>
```

### 2. `circle`

```xml
<?xml version="1.0"?>
<!DOCTYPE svg>

<svg width="140" height="170" xmlns="http://www.w3.org/2000/svg">
<title>Cat</title>
<desc>Stick Figure of a Cat</desc>
<!-- �������ͼ -->
<circle cx="70" cy="95" r="50" style="stroke: black; fill: none" />
</svg>
```

![image-20210306003203176](.\img\0-circle.png)

### 3. ָ����ʽ - `fill, stroke`

```xml
<circle cx="70" cy="95" r="50" style="stroke: black; fill: none" />
```

### 4. �� - `line`

```xml
<circle cx="70" cy="95" r="50" style="stroke: black; fill: none" />
<circle cx="55" cy="80" r="5" stroke="black" fill="#339933" />
<circle cx="85" cy="80" r="5" stroke="black" fill="#339933" />
<g id="whiskers">
    <line x1="75" y1="95" x2="135" y2="85" style="stroke: black;" />
    <line x1="75" y1="95" x2="135" y2="105" style="stroke: black;" />
</g>
```

![image-20210306004509622](.\img\1-line.png)

### 5. �任����ϵͳ - `use, transform, scale`

- `use`������
- `transform`���任
  - `translate`���ƶ�
  - `scale`����С�ͷ���

```xml
<circle cx="70" cy="95" r="50" style="stroke: black; fill: none" />
<circle cx="55" cy="80" r="5" stroke="black" fill="#339933" />
<circle cx="85" cy="80" r="5" stroke="black" fill="#339933" />
<g id="whiskers">
    <line x1="75" y1="95" x2="135" y2="85" style="stroke: black;" />
    <line x1="75" y1="95" x2="135" y2="105" style="stroke: black;" />
</g>
<use href="#whiskers" transform="scale(-1,1) translate(-140, 0)" />
```

![image-20210306005107382](.\img\2-transform.png)

### 6. ���� - `polyline`

- `points`������һ��`x y`������Ϊ����

```xml
<polyline points="35 110, 45 120, 95 120, 105 110" style="stroke: black; fill: none;" />
```

### 7. `path`

- ·��ͨ��д��
- �������ָ��·������һϵ��ֱ�ߺ�����

```xml
<path d="M 75 90 L 65 90 A 5 10 0 0 0 75 90" />
```

### 8. `text`

```xml
<text x="60" y="165" style="font-family: sans-serif; font-size: 14pt; stroke: none; filee: black;">Cat</text>
```

***

# 2. ��ҳ��ʹ��`SVG`

- ͼ�μ��ɵ�һ���ϴ���ĵ���

## 1. �����Ĳ�����ҳ�ķ���

- `<img>`��ǩ�ڣ�ҳ�������ɲ���

- `css`����Ҫ����װ��

### 1. `<img>`

```xml
<img src="cat.svg" title="Cat image" alt="cat">
```

## 2. `css`

```css
div.background-cat {
    background-image: url("cat.svg");
    background-size: 100% 100%��       
}
```

## 2. `SVG`��ΪӦ�ó���

- Ϊ������ͼ�񣬵��ֲ��뱻�������룬ʹ��`<Object>`����`<embed>`

```html
<object data="./test.svg" type="image/svg+xml">
</object>
```

```html
<embed src="./test.svg">
</embed>
```



## 3. ����ĵ���`SVG`

- һ���ļ�����`SVG`��`HTML, XML`

### 1. `svg`�ڲ���`html`

- `<foreignObject>`

```xml
<g transform="skewX(20)">
    <switch>
        <foreignObject>
            <h1>Hellp</h1>
        </foreignObject>

        <text>
            This
        </text>
    </switch>
</g>
```

### 4. `HTML`����`svg`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
        svg {
            display: block;
            width: 500px;
            height: 500px;
            margin: auto;
            border: thick double navy;
            background-color: lightblue;
        }

        body{
            font-family: cursive;
        }

        circle {
            fill: lavender;
            stroke: navy;
            strike-width: 5;
        }
    </style>
</head>
<body>
    <h1>Inline SVG in HTML Demo Page</h1>
    <svg viewBox="0 0 250 250">
        <title>An SVG circle</title>
        <circle cx="125" cy="125" r="100" />
        <text x="125" y="125" dy="0.5em" text-anchor="middle">Look Me!</text>
    </svg>
    <p>Again</p>
</body>
</html>
```

***

# 3. ����ϵͳ

## 1. �������� - �ӿ�

- `svg`��`width, height`

### ��λ

- `em` - Ĭ�ϡ��ı��и�
- `ex`
- `px`
- `pt`
- `pc`
- `cm`
- `mm`
- `in`

```xml
<svg width="200px" height="150px"></svg>
```



## 2. Ĭ���û�����

```xml
<rect x="10" y="10" width="50" height="30" />
```

## 3. ָ���û�����

- `viewBox`����Ҫ�������ӿ��ϵ��û�����ϵͳ��С������

```xml
<svg width="4em" height="5cm" viewBox="0 0 64 80"></svg>
```

- $4 \times 16 = 64$

- ����Ĭ�ϵ�λ�ͻ�ı�

## 4. ��߱�

- �ӿڵĿ�߱ȿ��Ժ�`viewBox`�Ŀ�߱Ȳ�ͬ

```xml
<svg width="45" height="135" viewBox="0 0 90 90"></svg>
```

- `svg`������ı�

## 5. �ӿڶ��뷽ʽ - `preserveAspectRatio`

- `preserveAspectRatio="aligment [meet | slice]"`������ӿڵĶ��뷽ʽ

```xml
<svg width="45" height="135" viewBox="0 0 90 90" preserveAspectRatio="xMinYMin meet"></svg>
```

- `meet`������λ��
- `slice`���з�λ��

# 4. ������״

## `line`

- `line`������
- `stroke-width`���ʻ����

## `style`

- `stroke`���ʻ���ɫ
- `stroke-linecap`����ñ
- `stroke-linejoin`���߶���ͼ����Ǵ�����ʱ��Ч��
- `stroke-opacity`�����Ʋ�͸����
- `stroke-dasharray`������ʵ��

## `rect`

- `fill`����ɫ���
- `fill-opacity`�����͸����
- `rx, ry`��Բ�Ǿ���

```xml
<rect x="10" y="10" width="20" height="40" rx="2" ry="2" />
```

``

## `circle, ellipse`

```xml
<circle cx="30" cy="30" r="20" />
<ellipse cx="80" cy="80" rx="20" ry="10" />
```

## ����� - `polygon`

- ���Զ��ص���ʼ����

```xml
<polygon points="48,16 16,96 96,48 0,48 80,96" />
```

# 5. �ĵ��ṹ

- �����ĵ����ֺ��ĵ��ṹ����

## 1. ��`svg`��ʹ����ʽ

### ����

```xml
<text x="60" y="165" style="font-family: sans-serif; font-size: 14pt; stroke: none; filee: black;">Cat</text>
```

### �ڲ���ʽ��

```xml
<svg>
<defs>
    <style type="text/css"><![CDATA[
	circle {
		fill: #ffc;
	}
	]]></style>
</defs>
    <circle />
</svg>
```

### �ⲿ��ʽ��

```css
rect {
    stroke-dasharray: 7 3;
}
```

```xml
<?xml version="1.0"?>
<?xml-stylesheet href="./xx.css" type="text/css">
```

## 2. ��������ö���

### `<g>`Ԫ��

- ������Ԫ����Ϊһ����ϣ���ָ��`id`

```xml
<g id="xxx">
    <desc>
    </desc>
    <title></title>
</g>
<g id="yxx">
    <desc>
    </desc>
    <title></title>
</g>
```

```xml
<?xml version="1.0"?>
<!DOCTYPE svg>
<svg width="240px" height="240px" viewBox="0 0 240 240"
    xmlns="http://www.w3.org/2000/svg">
    <title>Group</title>

    <g id="house" style="fill: none; stroke: black;">
        <desc></desc>
        <rect x="6" y="50" width="60" height="60" />
        <polyline points="6 50, 36 9, 66 50" />
        <polyline points="36 110, 36 80, 50 80, 50 110" />
    </g>

    <g id="man" style="fill:none; stroke: black;">
        <circle cx="85" cy="56" r="10" />
        <line x1="85" y1="66" x2="85" y2="80" />
        <polyline points="76 104, 85 80, 94 104" />
        <polyline points="76 70, 85 76, 94 70" />
    </g>

    <g id="woman" style="fill:none; stroke: black;">
        <circle cx="110" cy="56" r="10" />
        <line x1="104" y1="104" x2="108" y2="90" />
        <line x1="112" y1="90" x2="116" y2="104" />
        <polyline points="110 66, 110 80, 100 90, 120 90, 110 80" />
        <polyline points="101 70, 110 76, 119 80" />
    </g>
</svg>
```

### `<use>`Ԫ��

- �ظ�Ԫ��ʹ��
- ����ͬһ�ļ��ڵĶ��󻹿���ָ��������Ч���ļ���URI��������ֲ������������

```xml
<use href="#house" x="70" y="100" />
<use href="#woman" x="-80" y="100" />
<use href="#man" x="-30" y="100" />
```

### `<defs>`

- ֻ���岻��ʾ�������洢����
- ����������е��ô���

```xml
<?xml version="1.0"?>
<!DOCTYPE svg>
<svg width="240px" height="240px" viewBox="0 0 240 240"
    xmlns="http://www.w3.org/2000/svg">
    <title>Group</title>
    <defs>
    <g id="house" style="stroke: black;">
        <desc></desc>
        <rect x="6" y="50" width="60" height="60" />
        <polyline points="6 50, 36 9, 66 50" />
        <polyline points="36 110, 36 80, 50 80, 50 110" />
    </g>

    <g id="man" style="stroke: black;">
        <circle cx="85" cy="56" r="10" />
        <line x1="85" y1="66" x2="85" y2="80" />
        <polyline points="76 104, 85 80, 94 104" />
        <polyline points="76 70, 85 76, 94 70" />
    </g>

    <g id="woman" style="stroke: black;">
        <circle cx="110" cy="56" r="10" />
        <line x1="104" y1="104" x2="108" y2="90" />
        <line x1="112" y1="90" x2="116" y2="104" />
        <polyline points="110 66, 110 80, 100 90, 120 90, 110 80" />
        <polyline points="101 70, 110 76, 119 80" />
    </g>
    </defs>

    <use href="#house" x="70" y="100" style="fill: #cfc;" /> 
    <use href="#woman" x="-80" y="100" style="fill: #cfc;" />
    <use href="#man" x="-30" y="100" style="fill: #c00;" />
</svg>
```

![image-20210306171008577](.\img\3-use.png)

### `<symbol>`

- ��һ�����Ԫ�صķ�ʽ����Զ������ʾ������ŵ�`defs`��
- `use`ʹ��������ͬ

### `<image>`

- ����`img`

```xml
<?xml version="1.0"?>
<!DOCTYPE svg>
<svg width="240px" height="240px" viewBox="0 0 240 240">
    <image href="0-circle.png"
        x="72" y="92"
        width="160" height="120" />
</svg>
```

# 6. ����ϵͳ�任

- ��ת�����š��ƶ�

## `translate`

- �������ƶ���ָ��λ�ã�Ȼ����`(0,0)`��ͼ
- �ı������ڻ����ϵ�λ��
- `transform="translate(50,50)"`

## `scale`

- �ߴ�
- �ı��Ӧ�����ϵ�����ϵͳ�����񣩵Ĵ�С
- `transform(xvalue, yvalue), transform(value)`

## �任���� - `transform`

- ����任
- �任˳�����д˳����ͬ

- `transform="translate(value) scale(value)"`

## �ѿ�������ϵͳת��

- ��Ĭ���෴����Ҫ�任y�᷽��
- `transfortransform=translattranslate(0,100) scale(1, -1)`

## rotate

- ����ָ���ĽǶ���ת����ϵͳ��Ĭ��˳ʱ��
- ��ת������Ĭ��λ(0,0)
- `transform(rotate(45))`
- `tranform(rotate(angle, centerX, centerY)), transform(translate(centerX, centerY) rotate(angle)), translate(-centerX, -centerY)`ָ������ת
- Χ�����ĵ����ţ�`translate(-centerX*(factor-1), -centerY*(factor-1)) scale(factor)`

```xml
<?xml version="1.0"?>
<!DOCTYPE svg>
<svg width="240px" height="240px" viewBox="0 0 240 240"     xmlns="http://www.w3.org/2000/svg">
    <rect x="70" y="30" width="20" height="20" style="fill:gray" />
    <rect x="70" y="30" width="20" height="20" 
    transform="rotate(45)"
    style="fill:black" />
        <image href="0-circle.png"
        x="72" y="92"
        width="160" height="120" />
</svg>
```

![image-20210306233919599](.\img\4-rotate.png)

## ��б - `skewX, skewY`�任

- ��бĳ���ᣬ��λΪ�Ƕ�
- `skewX(angle)`��б`x`���꣬���ô�ֱ�߳��ֽǶ�
- `skewY(angle)`��б`y`���꣬����ˮƽ�߳��ֽǶ�

***

# 7. ·��

## 1. `moveTo, lineTo, closePath`

- ÿ��������`moveTo`��ʼ����дΪ`M`
- `lineTo`������������дΪ`L`
- `closePath`����һ��ֱ�߻ص���ǰ��·������㣬��дΪ`Z`
- ��д�Ĵ�Сд�Ǵ��������
  - ��д�������Ǿ���
  - Сд�����������

```xml
<path d="M 10,20 L 100,20 L 90,60 Z" />
```

## 2. ��ݷ�ʽ

- `H 20 = L 20 current_y`
- `h 20 = l 20 0`
- `V 20 = L current_x 20`
- `v 20 = l 0 20`

## 3. ��Բ�� - `A`

- `A x ,y ...`����`a x, y ...`

## 4. ���������� - `Q`

```xml
<path d="M 30 75 Q 240 30, 300 120" />
```

## 5. ���α��������� - `C`

```xml
<path d="M 30 75 C 240 30, 300 120, 200 120" />
```

## 6. `<marker>`

```xml
<?xml version="1.0"?>
<!DOCTYPE svg>
<svg width="500" height="500" viewBox="0 0 240 240"     xmlns="http://www.w3.org/2000/svg">

    <defs>
<marker id="mCircle" markerWidth="10" markerHeight="10"
        refX="5" refY="5">
	<circle cx="5" cy="5" r="4" style="fill:none; stroke:black;" />
</marker>

<marker id="mArrow" markerWidth="4" markerHeight="8"
        refX="0" refY="4">
	<path d="M 0 0 4 4 0 8" style="fill: none; stroke: black;" />
</marker>

<marker id="mTraingle" markerWidth="5" markerHeight="10"
        refX="5" refY="5">
	<path d="M 0 0 5 5 0 10 Z" style="fill: black;" />
</marker>
</defs>

<path d="M 10 20 100 20 A 20 30 0 0 1 120 50 L 120 110"
      style="marker-start:url(#mCircle);
            marker-mid: url(#mArrow);
            marker-end: url(#mTraingle);
             fill: none; stroke: black;" />
</svg>
```

![image-20210307010958596](.\img\5-marker.png)

***

# 8. ͼ���ͽ���

## `patternUnits`

```xml
<defs>
<pattern id="tile" x="0" y="0" width="20%" height="20%"
         patternUnits="objectBoundingBox">
	<path d="M 0 0 Q 5 20 10 10 T 20 20" 
          style="stroke:black; fill: none;"/>
    <path d="M 0 0 h 20 v 20 h -20 z" 
          style="stroke: gray; fill: none;"/>
</pattern>
</defs>

<rect x="20" y="20" width="100" height="100"
      style="fill: url(#tile); stroke: black;" />
```

![image-20210307012327298](.\img\6-pattern.png)

## ���� - `linearGradient`

- �����ߣ�һϵ����ɫ����
- `<stop>`���м�����
  - `offset`��ȷ��λ��
  - `stop-color`����ɫ

- ���򽥱䣺`<linearGradient x1="100%" y1="0%" x2="0%" y2="100%"></linearGradient>`

```xml
<?xml version="1.0"?>
<!DOCTYPE svg>
<svg width="500" height="500" viewBox="0 0 240 240"     xmlns="http://www.w3.org/2000/svg">

<defs>
<linearGradient id="two_hues">
    <stop offset="0%" style="stop-color: #ffcc00;" />
    <stop offset="100%" style="stop-color: #0099cc;" />
</linearGradient>
</defs>
<rect x="20" y="20" width="100" height="100"
      style="fill: url(#two_hues); stroke: black;" />
</svg>
```

![image-20210307022517621](.\img\7-linearGradient.png)

## `radialGradient`Ԫ��

- ���򽥱䣬�����ĵ�������ɢ
- `<linearGradient cx="100%" cy="0%" r="141%"></linearGradient>`



# 9. �ı�

## ������ϵͳ - `switch`

- `systemLanguage` ����������

```xml
<?xml version="1.0"?>
<!DOCTYPE svg>
<svg width="500" height="500" viewBox="0 0 240 240"     xmlns="http://www.w3.org/2000/svg">

<g systemLanguage="en">
...
</g>
</svg>
```

# 10. �ü����ɰ�

## �ü� - `<clipPath>`

```xml
<defs>
<clipPath id="x"></clipPath>
</defs>

<use href="xx" style="clip-Path: url(#x)" />
```

## �ɰ� - `<mask>`

- �ɰ��任�����͸����

# 11. �˾�

- `<filter>`��ָ������

## ͶӰ - `<feGaussianBlur>`

- `sourceGraphic`������Դ
- `SourceAlpha`����͸��ͨ��
- `stdDeviation`��ģ����
- `result`����ǰԪ����ͨ��`blur`������
- `<feOffset>`�����ؽ��`blur`
- `<feMerge>`������Ԫ���б�

```xml
<defs>
<filter id="drop-shadow">
    <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
    <feOffset in="blur" dx="4" dy="4" result="offsetBlur" />
    	<feMerge>
        	<feMergeNode in="offsetBlur" >
            <feMergeNode in="SourceGraphic" />
        </feMerge>
    </filter>
</defs>

<g id="flower" filter="url(#drop-shadow)">
</g>

<use href="#flower" filter="url(#drop-shadow)"
     transform="translate(4,4)" />
```

## ����ʽͶӰ - `feColorMatrix`
- ͨ�÷�ʽ�ı���ɫֵ
```xml
<filter id="glow">
	<feColorMatrix type="matrix" 
                   values=
                   "0 0 0 0 0 
                    0 0 0 0.9 0
                    0 0 0 0.9 0
                    0 0 0 1 0" />
    <feGaussianBlur stdDeviation="2.5"
                    result="coloredBlur" />
    <feMerge>
    	<feMergeNode in="coloredBlur" />
        <deMergeNode in="SourceGraphic" />
    </feMerge>
</filter>
```

## `<feImage>`

- ԭʼͼ�ο�����Ϊ�˾���������

```xml
<?xml version="1.0"?>
<!DOCTYPE svg>
<svg width="800" height="500" viewBox="0 0 240 240"     xmlns="http://www.w3.org/2000/svg">
<defs>
<filter id="sky-shadow" filterUnits="objectBoundingBox">

<feImage href="./0-circle.png" result="sky"
        x="0" y="0" width="100%" height="100%"
        preserveAspectRatio="none" />
<feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
<feOffset in="blur" dx="4" dy="4" resulut="offsetBlur" />
<feMerge>
    <feMergeNode in="sky" />
    <feMergeNode in="offsetBlur" />
    <feMergeNode in="SourceGraphic" />
</feMerge>

</filter>
</defs>
<g id="flower" style="filter: url(#sky-shadow)">
    <path d="M 0 0 L 10 50 L 80 90 Z" />
</g>

<image href="./0-circle.png" x="170" y="10" />
</svg>
```

# 12. `SVG`����

## 1. ��������

- `attributeName`�������г����ı��ֵ
- `attributeType`����`XML, css`���֡�Ĭ��`auto`����`css`��`xml`
- `from, to`����ʼ����ֹ
- `begin`����ʼʱ��
- `dur`������ʱ��
- `fill:freeze`��Ĭ�ϲ��ٴ������Ҫ�ָ�����Ϊ`remove`

```xml
<?xml version="1.0"?>
<!DOCTYPE svg>
<svg width="800" height="500" viewBox="0 0 240 240"     xmlns="http://www.w3.org/2000/svg">
<rect x="10" y="10" width="200" height="20" strooke="black" fill="none">
	<animate
             attributeName="width"
             attributeType="XML"
             from="200"
             to="20"
             begin="2s"
             dur="5s"
             fill="freeze" />
</rect>
</svg>
```

```xml
<?xml version="1.0"?>
<!DOCTYPE svg>
<svg width="800" height="500" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
<rect x="10" y="10" width="200" height="200" strooke="black" fill="black">
	<animate
        attributeName="width"
        attributeType="XML"
        from="200"
        to="20"
        begin="0s"
        dur="2s"
        fill="freeze" />
    <animate
        attributeName="height"
        attributeType="XML"
        from="200"
        to="20"
        begin="0s"
        dur="2s"
        fill="remove" />
    
    <animate
        attributeName="fill-opacity"
        attributeType="CSS"
        from="0.25"
        to="1"
        begin="0s"
        dur="2s"
        fill="freeze" />

    <animate
        attributeName="fill-opacity"
        attributeType="CSS"
        from="1"
        to="0.25"
        begin="3s"
        dur="2s"
        fill="freeze" />
</rect>
</svg>
```

## ����ʱ�����

- ��λʱ�䣺`h, min, s, ms`

## ͬ������

- `begin="id.end"`
- `begin="id.begin+1.25s"`

## �ظ�����

- `repeatCount`��ָ���ظ�����
- `repeatDur`���������
- ���Ҫ�ظ����û��뿪����ָ��`indefinite`ֵ

- `begin="id.repeat(n)+xx"`ָ�������ظ�`n`�κ�ʼ

## ���ӵ�����Ӧ�ö���

- `from, to`ֵ��������ɫ����λ��

## `from, to`ָ�����ֵ - `values`

- `values=start;end;start;`

## �༶����ʱ��

- `keyTimes`����������ʽ���ֳ���ʱ��
- `<set>`�����������޸ĸ�ֵ

## �˶���ָ���ؼ����ʱ��

```xml
<path d="M -10,-3 L 10,-3 L 0,-25 Z" style="fill: yellow; stroke:red;" >
<animation 
           path="M50,125 C 100,25 150,225, 200,125"
           rotate="auto"
           keyPooints="0;0.2;0.8;1"
           keyTimes="0;0.33;0.66;1"
           calcMode="linear"
           dur="6s" fill="freeze" />
</path>
```



## `CSS`����

��`css`�и�����Ԫ�����ã�

- `animation-name`��`@keyframes`��
- `animation-duration`
- `animation-timing-function`����μ����м�ֵ
- `animation-iteration-count`���ظ�����
- `animation-direction`��������߷���
- `animation-play-state`
- `animation-delay`
- `animation-fill-mode`����ִ��ʱʹ�õ�����

### ���ùؼ�֡

- `@keyframes`��һý���������ö���ÿ���׶�Ҫ�øı������

```css
@keyframes {
    0% {
        fill-opacity: 1.0;
        stroke-width: 0;
    }
    
    100% {
        fill-opacity: 0;
        stroke-width: 6;
    }
}
```

# 13. ��ӽ���

## ��`svg`��ʹ������

```xml
<a href="http://www.baidu.com">
	<path d="M120 90, 140 50, 160 90 Z" style="fill: blue;" />
</a>
```



## ����ʽ

- ��`button`����`begin="button.click"`

## �ű�����`svg`

```xml
<svg width="300" height="100" viewBox="0 0 300 100"
    xmlns="http://www.w3.org/2000/svg">
<rect id="rectangle" x="10" y="20" width="30" height="40"
        style="stroke:gray; fill:#ff9; stroke-width:3;" />

<script type="application/ecmascript">
// <![CDATA[
    var txt = document.getElementById("output");
// ]]>
</script>
</svg>
```

## ��ק����

```xml
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN"
    "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">

<svg width="400" height="250" viewBox="0 0 400 250"
  onload="init(evt)"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink">

  <defs>
    <style type="text/css" > <![CDATA[
      svg { /* default values */
        stroke: black;
        fill: white;
      }
      g.selected rect {
        fill: #ffc; /* light yellow */
      }
      text {
        stroke: none;
        fill:black;
        text-anchor: middle;
      }
      
      line.slider {
        stroke: gray; 
        stroke-width: 2;
      }
    ]]></style>
    <script type="text/ecmascript"><![CDATA[
      var scaleChoice = 1;
      var scaleFactor = [1.25, 1.5, 1.75];
      var slideChoice = -1;
      var rgb = [100, 100, 100];
      function init(evt) {  
        var obj;
        for (var i = 0; i < 3; i++) {
          obj = document.getElementById("scale" + i);
          obj.addEventListener("click", clickButton, false);
          
          obj = document.getElementById("sliderGroup" + i);
          obj.addEventListener("mousedown", startColorDrag, false);
          obj.addEventListener("mousemove", doColorDrag, false);
          obj.addEventListener("mouseup", endColorDrag, false);
        }
        document.getElementById("eventCatcher").
          addEventListener("mouseup", endColorDrag, false);
        transformShirt();
      }
      function clickButton(evt) {
        var choice = evt.target.parentNode
        var name = choice.getAttribute("id");
        var old = document.getElementById("scale" + scaleChoice);
        old.removeAttribute("class");
        choice.setAttribute("class", "selected");
      
        scaleChoice = parseInt(name[name.length - 1]);
        transformShirt();
      }
      function transformShirt() {    
        var factor = scaleFactor[scaleChoice];
        var obj = document.getElementById("shirt");
        obj.setAttribute("transform",
          "translate(150, 150) " +
          "scale(" + factor + ")");
        obj.setAttribute("stroke-width",
          1 / factor);
      }
      
      /*
      * Stop dragging the current slider (if any)
      * and set the current slider to the one specified.
      * (0 = red, 1 = green, 2 = blue)
      */
      function startColorDrag(evt) {
        var sliderId = evt.target.parentNode.getAttribute("id");
        endColorDrag( evt );
        slideChoice = parseInt(sliderId[sliderId.length - 1]);
      }
      /*
      * Set slider choice to -1, indicating that no
      * slider is begin dragged. No access to the event
      * is needed for this function.
      */
      function endColorDrag(evt) {
        slideChoice = -1;
      }
      function doColorDrag(evt) {
        var sliderId = evt.target.parentNode.getAttribute("id");
        chosen = parseInt(sliderId[sliderId.length - 1]);
        
        if (slideChoice >= 0 && slideChoice == chosen) {
          var pos = evt.clientY - 10;
          if (pos < 0) { pos = 0; }
          if (pos > 100) { pos = 100; }
            
          obj = document.getElementById("slide" + slideChoice);
          obj.setAttribute("y1", pos);
          obj.setAttribute("y2", pos);
            
          rgb[slideChoice] = 100-pos;
            
          var colorStr = "rgb(" + rgb[0] + "%," +
            rgb[1] + "%," + rgb[2] + "%)";        
          obj = document.getElementById("shirt");
          obj.style.setProperty("fill", colorStr, null);
        }
      }
    ]]></script>
    <path id="shirt-outline"
      d="M -6 -30 -32 -19 -25.5 -13 -22 -14 -22 30 23 30
        23 -14 26.5 -13 33 -19 7 -30
        A 6.5 6 0 0 1 -6 -30"/>
  </defs>
  <rect id="eventCatcher" x="0" y="0" width="400" height="300"
    style="fill: none; stroke:none;" pointer-events="visible" />
  <g id="shirt" >
    <use xlink:href="#shirt-outline" x="0" y="0"/>
  </g>
  <g id="scale0" > 
    <rect x="100" y="10" width="30" height="30" />
    <text x="115" y="30">S</text>
  </g>
  <g id="scale1" class="selected">
    <rect x="140" y="10" width="30" height="30" />
    <text x="155" y="30">M</text>
  </g>
  <g id="scale2" >
    <rect x="180" y="10" width="30" height="30" />
    <text x="195" y="30">L</text>
  </g>
  
  <g id="sliderGroup0" transform="translate( 230, 10 )">
    <rect x="-10" y="-5" width="40" height="110"/>
    <rect x="5" y="0" width="10" height="100" style="fill: red;"/>
    <line id="slide0" class="slider"
      x1="0" y1="0" x2="20" y2="0" />
  </g>
  <g id="sliderGroup1" transform="translate( 280, 10 )">
    <rect x="-10" y="-5" width="40" height="110"/>
    <rect x="5" y="0" width="10" height="100" style="fill: green;"/>
    <line id="slide1" class="slider"
      x1="0" y1="0" x2="20" y2="0" />
  </g>
  <g id="sliderGroup2" transform="translate( 330, 10 )">
    <rect x="-10" y="-5" width="40" height="110"/>
    <rect x="5" y="0" width="10" height="100" style="fill: blue;"/>
    <line id="slide2" class="slider"
      x1="0" y1="0" x2="20" y2="0" />
  </g>
</svg>
```

![image-20210307193725930](.\img\8-shirtDrag.png)

