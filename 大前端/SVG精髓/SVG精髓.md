SVG���� Ŀ¼
[TOC]
***

# ǰ��

- ����Ϊ��SVG Essential�����Ķ��ʼ�

***

# �Ƽ��Ķ�

- ��SVG Essential��

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

```

