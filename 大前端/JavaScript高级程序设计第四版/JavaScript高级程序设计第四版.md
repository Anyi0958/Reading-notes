JavaScript高级程序设计第四版 目录
[TOC]
***
# 前言

本文章来源为：《JavaScript高级程序设计》（第四版），如有机会，请以书中内容为主。

## 注意

- <p style="color:red;">此文不涉及基础语法，如有需要可观看<a href="https://www.runoob.com/js/js-tutorial.html">菜鸟教程</a></p>

# 推荐

- 《JavaScript高级程序设计》（第四版）
- 《JavaScript学习指南》

# 1. 什么是JavaScript

## DOm
文档对象模型(DOM):是一个应用编程接口(API)
```html
<html>
<head>
	<title>xxx</title>
</head>
<body>
<p>xxxx</p>
</body>
</html>
```

图例：
![1-DOM.png][01]

# 2. HTML中的JavaScript

## `<script>`元素
### 属性
- async：立刻下载脚本
- charset：指定的代码字符集
- crossorigin：跨资源共享设置
- defer：在文档解析和显示完成后再执行脚本
- integrity：允许比对接收到的资源和指定的加密签名，已验证子资源的完整性。用于CDN
- language
- src
- type：代码块中脚本语言的内容类型。如果是`module`，则被当作ES6模块

## 动态加载脚本
```javascript
let script = document.createElement('script');
script.src = 'test.js'
document.head.appendChild(script);
```
## XHTML中的变化
XHTML是将HTML作为XML重新包装的结果。
### 区别
- XHTML使用JavaScript必须指定`type=text/javascript`
- 规则严格
- 已经废弃
- `//<!CDATA //]]>`块

# 3. 语言基础
## 内容概括
- 语法
- 数据类型
- 控制语句
- 函数

<p style="color:red;">此文不涉及基础语法，可观看菜鸟教程</p>

## 严格模式
- 处理不规范写法
- `use strict`

## Symbol类型
`ECMAScript6`新增数据类型
- 符号是原始值
- 符号实例时唯一、不可变的
- 用于确保对象属性使用唯一标识符，不会出现冲突

### 符号的基本用法
#### Symbol()函数初始化
```js
let sym = Symbol();
console.log(typeof sym);	// symbol
```
#### 传入字符串对符号描述
```js
let genericSymbol = Symbol();
let otherGenericSymbol = Symbol();

let foolSymbol = Symbol('foo');
let otherFoolSymbol = Symbol('foo');

console.log(genericSymbol == otherGenericSymbol);
console.log(foolSymbol == otherFoolSymbol);
```

#### Symbol函数不能用作构造函数
- 不能和`new`一起使用

### 全局符号注册表 - symbol.for
如果运行时的不同部分需要共享和重用符号实例：
- 用一个字符串作为键
- 全局符号注册表中创建并重用符号
- `Symbol.for()`方法
```js
// 创建新符号
let fooGlobalSymbol = Symbol.for('foo');
// 重用已有符号
let otherFooGlobalSymbol = Symbol.for('foo');

console.log(fooGlobalSymbol === otherFooGlobalSymbol);  // true
```
#### symbol.for
- 对每个字符串键都执行幂等操作
- 第一次使用某个字符串调用时，会检查全局运行时注册表
- 如果不存在对应的符号，会生成一个新符号实例并添加到注册表中
- 后续使用相同的字符串调用时，会先检查注册表，发现对应的符号返回该符号实例
- 全局注册表中的符号必须为字符串，任何值都会被转换为字符串
- <p style="color:red;">类似于设计模式中的单例模式</p>
- symbol与symbol.for定义的结果是不同的
```js
let test1 = Symbol('foo');
let test2 = Symbol.for('foo');

console.log(test1 === test2);   // false
```
#### 查询全局注册表 - symbol.keyFor
- 接收符号，返回该全局符号对应的字符串键
- 如果查询的不是全局符号，则会返回`undefined`
```js
// create global symbol
let s = Symbol.for('foo');
console.log(Symbol.keyFor(s));  // foo

// create ordinary symbol
let s2 = Symbol('bar');
console.log(Symbol.keyFor(s2)); // undefined

// type error
console.log(Symbol.keyFor(123));
```
### 使用符号作为属性
可以用字符串或者数值作为属性的地方，都可以使用符号。
包括：
- 对象字面量属性，只能在计算属性语法中使用符号作为属性
- `Object.defineProperty()`
- `Object.definedProperties()`
```js
let s1 = Symbol('foo'),
    s2 = Symbol('bar'),
    s3 = Symbol('baz'),
    s4 = Symbol('qux');

let o = {
    [s1]: 'foo val'
};

console.log(o);

o[s2] = 'foo val2';
console.log(o);
```
![2-symbol][02]

#### 获取对象实例的四种用法
- `Object.getOwnPropertyNames()`：返回对象实例的常规属性数组
- `Object.getOwnPropertySymbols()`：返回对象实例的符号属性数组
- `Object.getOwnPropertyDescriptors()`：返回同时包含常规和符号属性描述符的对象
- `Reflect.ownKeys()`：返回两种类型的键
```js
console.log(Object.getOwnPropertyNames(o));
console.log(Object.getOwnPropertySymbols(o));
console.log(Object.getOwnPropertyDescriptor(o));
console.log(Reflect.ownKeys(o));
```
##### 注意
- 符号属性是对内存中符号的一个引用
- 直接创建并用作属性的符号不会丢失
- 如果没有显式地保存这些属性的引用，必须遍历对象的所有符号属性才能找到响应的属性键
```js
let o = {
    [Symbol('foo')]: 'foo val',
    [Symbol('bar')]: 'bar val'
};

console.log(o);

let barSymbol = Object.getOwnPropertySymbols(o)
                .find((symbol) => 
                    symbol.toString().match(/bar/)
                );

console.log(barSymbol);
```

### 常用内置符号
- 用于暴露语言内部行为，可以直接访问、重写或模拟这些行为
- 都以Symbol工厂函数字符串属性的形式存在
- 常用于重新定义，改变原生结构的行为
#### 注意
- 引用符号在规范中的名称，前缀为`@@`，如`@@iterator`指的就是`Symbol.iterator`

### Symbol.asyncIterator
- 该方法返回对象默认的`AsyncIterator`，由`for-await-of`使用
- 这个符号表示实现异步迭代器API的函数
- `for-await-of`循环时，执行异步迭代操作，调用以`Symbol.asyncIterator`为键的函数，返回一个实现迭代器的API对象
- 对象是实现API的`AsyncGenerator`
```js
class Foo {
    async *[Symbol.asyncIterator]() {}
}

let f = new Foo();

console.log(f[Symbol.asyncIterator]());
```
- 这个由`Symbol.asyncIterator`生成的对象应该通过其`next()`方法陆续返回`Promise`实例
- 既可以通过显示调用`next()`方法返回，也可以通过隐式调用异步生成器函数返回



[01]: ./img/1-DOM.png "1-DOM"
[02]: ./img/2-symbol.png "2-symbol"