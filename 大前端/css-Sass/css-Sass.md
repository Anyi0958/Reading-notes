css-Sass Ŀ¼
[TOC]
***

# ǰ��

- `CSS`Ԥ����������չ���ԣ�����`CSS`�ظ�����
- �����ʽ������
- ��չ�� CSS3�������˹��򡢱��������롢ѡ�������̳С����ú����ȵ�����
- �������ø�ʽ���� CSS ���룬������֯��ά��
- �ļ���׺Ϊ `.scss`

# �Ƽ��Ķ�

- [����̳�](https://www.runoob.com/sass/sass-tutorial.html)
- [Sass������](https://www.sass.hk/guide/)

# ������װ

- NPM ��װ��`npm install -g sass`
- Windows �ϰ�װ��`choco install sass`
- Mac OS X (Homebrew)��װ��`brew install sass/sass/sass`

# ����

```css
/* ���������ֵ */
$bgcolor: lightblue;
$textcolor: darkblue;
$fontsize: 18px;

/* ʹ�ñ��� */
body {
  background-color: $bgcolor;
  color: $textcolor;
  font-size: $fontsize;
}

/* ������ɫ������Ҫ�޸���ɫֵ���޸�����Ϳ����� */
$primary_1: #a2b9bc;
$primary_2: #b2ad7f;
$primary_3: #878f99;

/* ʹ�ñ��� */
.main-header {
  background-color: $primary_1;
}

.menu-left {
  background-color: $primary_2;
}

.menu-right {
  background-color: $primary_3;
}
```

# ����Ϊ`css`

- `sass runoob-test.scss runoob-test.css`

# ����

- �������ڴ洢һЩ��Ϣ���������ظ�ʹ��
- ���Դ洢������Ϣ��
  - �ַ���
  - ����
  - ��ɫֵ
  - ����ֵ
  - �б�
  - null ֵ

## ����

- `$variablename: value;`

## ������

- Sass ������������ֻ���ڵ�ǰ�Ĳ㼶����Ч����������ʾ h1 ����ʽΪ���ڲ������ green��p ��ǩ����Ϊ red

```sass
$myColor: red;

h1 {
  $myColor: green;   // ֻ�� h1 ��ͷ���ã��ֲ�������
  color: $myColor;
}

p {
  color: $myColor;
}
```

## `!global`

- Sass �����ǿ���ʹ�� **!global** �ؼ��������ñ�����ȫ�ֵģ�

```sass
$myColor: red;

h1 {
  $myColor: green !global;  // ȫ��������
  color: $myColor;
}

p {
  color: $myColor;
}
```

### ע��

���е�ȫ�ֱ�������һ�㶨����ͬһ���ļ����磺`_globals.scss`��Ȼ������ʹ��`@include`���������ļ���

# Ƕ�׹��������

```sass
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: inline-block;
  }
  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

ת����

```css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  display: inline-block;
}
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```

## ����

```sass
font: {
  family: Helvetica, sans-serif;
  size: 18px;
  weight: bold;
}

text: {
  align: center;
  transform: lowercase;
  overflow: hidden;
}
```

ת����

```css
font-family: Helvetica, sans-serif;
font-size: 18px;
font-weight: bold;

text-align: center;
text-transform: lowercase;
text-overflow: hidden;
```

# `@import`

- Sass ���԰������Ǽ��� CSS �ظ��Ĵ��룬��ʡ����ʱ�䡣

  ���ǿ��԰�װ��ͬ������������һЩ�����ļ����磺����������ļ�����ɫ��ص��ļ���������ص��ļ��ȡ�

##  �����ļ�

- `@import`
- CSS @import ָ����ÿ�ε���ʱ�����ᴴ��һ������� HTTP ���󡣵���Sass @import ָ��ļ������� CSS �У�����Ҫ����� HTTP ����

- `@import filename;`

**ע�⣺**�����ļ�ʱ����Ҫָ���ļ���׺��Sass ���Զ���Ӻ�׺ .scss��

���⣬��Ҳ���Ե��� CSS �ļ���

��������ǾͿ��������ļ���ʹ�õ����ļ��ȱ�����

����ʵ�������� variables.scss��colors.scss �� reset.scss �ļ�:

```css
@import "variables";
@import "colors";
@import "reset";
```

## �������Ϊ`css` - Partials

- ����㲻ϣ����һ�� Sass �Ĵ����ļ����뵽һ�� CSS �ļ�����������ļ����Ŀ�ͷ���һ���»��ߡ��⽫���� Sass ��Ҫ������뵽 CSS �ļ�
- `_filename;`

## **ע��**

�벻Ҫ�����»����벻���»��ߵ�ͬ���ļ�������ͬһ��Ŀ¼�£����磬_colors.scss �� colors.scss ����ͬʱ������ͬһ��Ŀ¼�£�������»��ߵ��ļ����ᱻ���ԡ�

# `@mixin`��`@include`

- `@mixin` ָ���������Ƕ���һ��������������ʽ�����ظ�ʹ�õ���ʽ��
- `@include` ָ����Խ����루mixin�����뵽�ĵ��С�

```css
@mixin important-text {
  color: red;
  font-size: 25px;
  font-weight: bold;
  border: 1px solid blue;
}

selector {
  @include mixin-name;
}
```

## ����봫�ݱ���

- ������Խ��ղ�����

- ��������봫�ݱ�����

������Խ��ղ����Ļ��룺

```css
/* ��������������� */
@mixin bordered($color, $width) {
  border: $width solid $color;
}

.myArticle {
  @include bordered(blue, 1px);  // ���û��룬��������������
}

.myNotes {
  @include bordered(red, 2px); // ���û��룬��������������
}
```

## �����ǰ׺ʹ�û���

```css
@mixin transform($property) {
  -webkit-transform: $property;
  -ms-transform: $property;
  transform: $property;
}

.myBox {
  @include transform(rotate(20deg));
}

// after transfer
.myBox {
  -webkit-transform: rotate(20deg);
  -ms-transform: rotate(20deg);
  transform: rotate(20deg);
}
```

# `@extend`�ͼ̳�

- `@extend` ָ����� `Sass` һ��ѡ��������ʽ����һѡ�����̳С�
- ���һ����ʽ������һ����ʽ������ͬ��ֻ��������������ʹ�� @extend ���Եú����á�
- ���� Sass ʵ���У����Ǵ�����һ�������İ�ť��ʽ .button-basic���������Ƕ�����������ť��ʽ .button-report �� .button-submit�����Ƕ��̳��� .button-basic ��������Ҫ�������ڱ�����ɫ��������ɫ����������ʽ����һ���ġ�

```css
.button-basic  {
  border: none;
  padding: 15px 30px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}

.button-report  {
  @extend .button-basic;
  background-color: red;
}

.button-submit  {
  @extend .button-basic;
  background-color: green;
  color: white;
}

// after transfer
.button-basic, .button-report, .button-submit {
  border: none;
  padding: 15px 30px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}

.button-report  {
  background-color: red;
}

.button-submit  {
  background-color: green;
  color: white;
}
```

# ����

1. �ַ�����غ���
2. ������غ���
3. �б���غ���
4. ӳ����غ���
5. ѡ������غ���
6. `Introspection`��غ���
7. ��ɫ��غ���

