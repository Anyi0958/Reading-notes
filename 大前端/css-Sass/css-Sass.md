css-Sass 目录
[TOC]
***

# 前言

- `CSS`预处理器，扩展语言，减少`CSS`重复代码
- 层叠样式表语言
- 扩展了 CSS3，增加了规则、变量、混入、选择器、继承、内置函数等等特性
- 生成良好格式化的 CSS 代码，易于组织和维护
- 文件后缀为 `.scss`

# 推荐阅读

- [菜鸟教程](https://www.runoob.com/sass/sass-tutorial.html)
- [Sass中文网](https://www.sass.hk/guide/)

# 环境安装

- NPM 安装：`npm install -g sass`
- Windows 上安装：`choco install sass`
- Mac OS X (Homebrew)安装：`brew install sass/sass/sass`

# 例子

```css
/* 定义变量与值 */
$bgcolor: lightblue;
$textcolor: darkblue;
$fontsize: 18px;

/* 使用变量 */
body {
  background-color: $bgcolor;
  color: $textcolor;
  font-size: $fontsize;
}

/* 定义颜色变量，要修改颜色值，修改这里就可以了 */
$primary_1: #a2b9bc;
$primary_2: #b2ad7f;
$primary_3: #878f99;

/* 使用变量 */
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

# 编译为`css`

- `sass runoob-test.scss runoob-test.css`

# 变量

- 变量用于存储一些信息，它可以重复使用
- 可以存储以下信息：
  - 字符串
  - 数字
  - 颜色值
  - 布尔值
  - 列表
  - null 值

## 声明

- `$variablename: value;`

## 作用域

- Sass 变量的作用域只能在当前的层级上有效果，如下所示 h1 的样式为它内部定义的 green，p 标签则是为 red

```sass
$myColor: red;

h1 {
  $myColor: green;   // 只在 h1 里头有用，局部作用域
  color: $myColor;
}

p {
  color: $myColor;
}
```

## `!global`

- Sass 中我们可以使用 **!global** 关键词来设置变量是全局的：

```sass
$myColor: red;

h1 {
  $myColor: green !global;  // 全局作用域
  color: $myColor;
}

p {
  color: $myColor;
}
```

### 注意

所有的全局变量我们一般定义在同一个文件，如：`_globals.scss`，然后我们使用`@include`来包含该文件。

# 嵌套规则和属性

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

转换后：

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

## 属性

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

转换后：

```css
font-family: Helvetica, sans-serif;
font-size: 18px;
font-weight: bold;

text-align: center;
text-transform: lowercase;
text-overflow: hidden;
```

# `@import`

- Sass 可以帮助我们减少 CSS 重复的代码，节省开发时间。

  我们可以安装不同的属性来创建一些代码文件，如：变量定义的文件、颜色相关的文件、字体相关的文件等。

##  导入文件

- `@import`
- CSS @import 指令在每次调用时，都会创建一个额外的 HTTP 请求。但，Sass @import 指令将文件包含在 CSS 中，不需要额外的 HTTP 请求。

- `@import filename;`

**注意：**包含文件时不需要指定文件后缀，Sass 会自动添加后缀 .scss。

此外，你也可以导入 CSS 文件。

导入后我们就可以在主文件中使用导入文件等变量。

以下实例，导入 variables.scss、colors.scss 和 reset.scss 文件:

```css
@import "variables";
@import "colors";
@import "reset";
```

## 不想编译为`css` - Partials

- 如果你不希望将一个 Sass 的代码文件编译到一个 CSS 文件，你可以在文件名的开头添加一个下划线。这将告诉 Sass 不要将其编译到 CSS 文件
- `_filename;`

## **注意**

请不要将带下划线与不带下划线的同名文件放置在同一个目录下，比如，_colors.scss 和 colors.scss 不能同时存在于同一个目录下，否则带下划线的文件将会被忽略。

# `@mixin`和`@include`

- `@mixin` 指令允许我们定义一个可以在整个样式表中重复使用的样式。
- `@include` 指令可以将混入（mixin）引入到文档中。

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

## 向混入传递变量

- 混入可以接收参数。

- 可以向混入传递变量。

定义可以接收参数的混入：

```css
/* 混入接收两个参数 */
@mixin bordered($color, $width) {
  border: $width solid $color;
}

.myArticle {
  @include bordered(blue, 1px);  // 调用混入，并传递两个参数
}

.myNotes {
  @include bordered(red, 2px); // 调用混入，并传递两个参数
}
```

## 浏览器前缀使用混入

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

# `@extend`和继承

- `@extend` 指令告诉 `Sass` 一个选择器的样式从另一选择器继承。
- 如果一个样式与另外一个样式几乎相同，只有少量的区别，则使用 @extend 就显得很有用。
- 以下 Sass 实例中，我们创建了一个基本的按钮样式 .button-basic，接着我们定义了两个按钮样式 .button-report 与 .button-submit，它们都继承了 .button-basic ，它们主要区别在于背景颜色与字体颜色，其他的样式都是一样的。

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

# 函数

1. 字符串相关函数
2. 数字相关函数
3. 列表相关函数
4. 映射相关函数
5. 选择器相关函数
6. `Introspection`相关函数
7. 颜色相关函数

