JavaScript高级程序设计第四版 目录
[TOC]
***
# 前言

本文章来源为：《JavaScript高级程序设计》（第四版），如有机会，请以书中内容为主。

## 注意

- <p style="color:red;">此文不涉及基础语法，如有需要可观看<a href="https://www.runoob.com/js/js-tutorial.html">菜鸟教程</a></p>

## 个人体会

第四版这本书啃起来有点难啃。迭代器，原型链，promise还是有一定了解才行，否则阅读起来有点生硬。
node毕竟是单线程非阻塞的语言，为了模拟多线程，会出现async和await这种东西，精髓是在回调函数上。

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

console.log(f[Symbol.asyncIterator]());	// Object [AsyncGenerator] {}
```
- 这个由`Symbol.asyncIterator`生成的对象应该通过其`next()`方法陆续返回`Promise`实例
- 既可以通过显示调用`next()`方法返回，也可以通过隐式调用异步生成器函数返回
```js
class Emitter {
    constructor(max) {
        this.max = max;
        this.asyncIdx = 0;
    }
    // 异步迭代器的API
    async *[Symbol.asyncIterator] () {
        while(this.asyncIdx < this.max) {
            yield new Promise((resolve) => resolve(this.asyncIdx++));
        }
    }
}

async function asyncCount() {
    let emitter = new Emitter(5);

    // 循环时，异步迭代操作
    for await(const x of emitter){
        console.log(x);
    }
}

asyncCount();
```
#### 注意
- `symbol.asyncIterator`只支持ES2018规范

### Symbol.hasInstance
- 该方法决定一个构造器对象是否认可一个对象时它的实例，由`instanceof`操作符使用
- `instanceof`操作符可以确定一个对象实例的原型链上是否有原型
```js
function Foo() {}
let f = new Foo();
console.log(f instanceof Foo);  // true

class Bar{}
let b = new Bar();
console.log(b instanceof Bar);  // true
```
- `instanceof`会使用`Symbol.hasInstance`确定关系

#### Symbol.hasInstance为键
```js
function Foo() {}
let f = new Foo();
console.log(Foo[Symbol.hasInstance](f));  // true

class Bar{}
let b = new Bar();
console.log(Bar[Symbol.hasInstance](b));  // true
```
#### 重新定义函数
- 这个属性定义在`function`原型上，默认所有函数和类上都可以调用
- 可以在继承的类上通过静态方法重新定义这个函数
```js
class Bar{};
class Baz extends Bar {
    static [Symbol.hasInstance]() {
        return false;
    }
}

let b = new Baz();
console.log(Bar[Symbol.hasInstance](b));  // true
console.log(b instanceof Bar);  //true
console.log(Baz[Symbol.hasInstance](b));  //false
console.log(b instanceof Baz);  //false

```

### Symbol.isConcatSpreadable

- 布尔值，如果是`true`，意味着对象应该用`Array.prototype.concat()`打平其数组元素
- `Array.prototype.concat()`会根据接收到的对象类型选择如何将一个类数组对象拼接成数组实例
- false: 默认追加到数组末尾
- true: 被打平到数组实例
- 其他不是类数组对象的对象，在`Symbol.isConcatSpreadable`被设置为true的情况下忽略
```js
let initial = ['foo'];

let array = ['bar'];
// false
console.log(array[Symbol.isConcatSpreadable]);  // undefined
console.log(initial.concat(array));  // ['foo', 'bar']
array[Symbol.isConcatSpreadable] = false;
console.log(initial.concat(array));  //['foo', Array(1)]
// true
let arrayLikeObject = { length: 1, 0: 'baz'};
console.log(arrayLikeObject[Symbol.isConcatSpreadable]);  //undefined
console.log(initial.concat(arrayLikeObject));  //['foo', {...}]
arrayLikeObject[Symbol.isConcatSpreadable] = true;
console.log(initial.concat(arrayLikeObject));  //['foo', 'baz']
// set
let otherObject = new Set() . add('qux');
console.log(otherObject[Symbol.isConcatSpreadable]);  //undefined
console.log(initial.concat(otherObject));  // ['foo', Set(1)]
otherObject[Symbol.isConcatSpreadable] = true;
console.log(initial.concat(otherObject));  // ['foo']
```
![3-Symbol.isconcatSpreadable][03]

### Symbol.iterator

- 该方法返回对象默认的迭代器，由`for-of`使用
```js
class Foo {
    *[Symbol.iterator]() {}
}

let f = new Foo();

console.log(f[Symbol.iterator]);
```
![4-symbol.iterator.js.png][04]

- 显示next()
- 隐式生成器函数
```js
class Emitter{
    constructor(max) {
        this.max = max;
        this.idx = 0;
    }

    *[Symbol.iterator]() {
        while(this.idx < this.max){
            yield this.idx++;
        }
    }
}

function count() {
    let emitter = new Emitter(5);

    for (const x of emitter){
        console.log(x);
    }
}

count();
```
### symbol.match
- 正则表达式法，用正则表达式去匹配字符串
- 用`String.prototype.match()`
- `String.prototype.match()`会使用`Symbol.match`为键的函数来对正则表达式求值
- 正则表达式的原型上默认有这个函数的定义，因此所有正则表达式实例默认是这个`String`方法的有效参数
```js
console.log(RegExp.prototype[Symbol.match]);

console.log('foobar'.match(/bar/));
```
![5-symbolmatch][05]
- 如果传入非正则表达式值，会导致该值被转换为`regexp`对象
- 重新定义`symbol.match`，可直接使用实例
```js
class FooMatcher {
    static [Symbol.match](target){
        return target.includes('foo');
    }
}

console.log('foobar'.match(FooMatcher));    // true
console.log('barbaz'.match(FooMatcher));    //false

class StringMatcher{
    constructor(str){
        this.str = str;
    }

    [Symbol.match](target){
        return target.includes[this.str];
    }
}

console.log('foobar'.match(new StringMatcher('foo')));  // true
console.log('barbaz'.match(new StringMatcher('qux')));  //false
```

### symbol.replace
- 替换一个字符串中匹配的子串，由`String.prototype.replace()`使用
```js
console.log(RegExp.prototype[Symbol.replace]);

console.log('foobarbaz'.replace(/bar/, 'qux'));
```
![6-replace][06]

```js
class FooReplacer {
    static [Symbol.replace] (target, replacement) {
        return target.split('foo').join(replacement);
    }    
}

console.log('barfoobaz'.replace(FooReplacer, 'qux'));

class StringReplacer {
    constructor(str){
        this.str = str;
    }
    
    [Symbol.replace](target, replacement){
        return target.split(this.str).join(replacement);
    }
}

console.log('barfoobaz'.replace(new StringReplacer('foo'), 'qux'));
```
![7-replace2][07]

### Symbol.search
- 返回字符串中匹配正则表达式的索引
```js
class FooSearch {
    static [Symbol.search](target) {
        return target.indexOf('foo');
    }
}

console.log('foobar'.search(FooSearch));    // 0
console.log('barfoo'.search(FooSearch));    // 3
console.log('barbaz'.search(FooSearch));    // -1

class StringSearch {
    constructor(str) {
        this.str = str;
    }

    [Symbol.search](target){
        return target.indexOf(this.str);
    }
}

console.log('foobar'.search(new StringSearch('foo')));  // 0
console.log('barfoo'.search(new StringSearch('foo')));  // 3
console.log('barbaz'.search(new StringSearch('foo')));  // -1
```
![8-search][08]

### symbol.species
- 创建派生对象的构造函数
- 用`symbol.species`定义静态的获取器(getter)，覆盖新创建实例的原型定义
```js
class Bar extends Array {}
class Baz extends Array {
    static get [Symbol.species]() {
        return Array;
    }
}

let bar = new Bar();
console.log(bar instanceof Array);  // true
console.log(bar instanceof Bar);    // true

bar = bar.concat('bar');
console.log(bar instanceof Array);  // true
console.log(bar instanceof Bar);    // true

let baz = new Baz();
console.log(baz instanceof Array);  // true
console.log(baz instanceof Baz);    // true

baz = baz.concat('baz');
console.log(baz instanceof Array);  // true
console.log(baz instanceof Baz);    // false
```

### symbol.split
- 该函数作为创建派生对象的构造函数
```js
class FooSplitter {
    static [Symbol.split](target){
        return target.split('foo');
    }
}

console.log('barfoobaz'.split(FooSplitter));

class StringSplitter {
    constructor(str){
        this.str = str;
    }

    [Symbol.split](target){
        return target.split(this.str);
    }
}

console.log('barfoobaz'.split(new StringSplitter('foo')));
```
![9-split][09]

### symbol.toPrimitive
- 将对象转换为相应的原始值
```js
class Foo {}
let foo = new Foo();

console.log(3 + foo);   
console.log(3 - foo);
console.log(String(foo));

class Bar {
    constructor() {
        this[Symbol.toPrimitive] = function(hint) {
            switch(hint) {
                case 'number':
                    return 3;
                case 'string':
                    return 'string bar';
                case 'default':
                default:
                    return 'default bar';
            }
        }
    }
}

let bar = new Bar();

console.log(3 + bar);
console.log(3 - bar);
console.log(String(bar));
```
![10-toPrimitive][10]

### symbol.toStringTag
- 该字符串用于创建对象的默认字符串描述
- `Object.prototype.toString()`
```js
let s = new Set();

console.log(s);     // Set[0] {}
console.log(s.toString());      // [Object Set]
console.log(s[Symbol.toStringTag]); //Tag

class Foo {}
let foo = new Foo();

console.log(foo);       // Foo {}
console.log(foo.toString());    // [object Object]
console.log(foo[Symbol.toStringTag]);   // undefined

class Bar {
    constructor(){
        this[Symbol.toStringTag] = 'Bar';
    }
}
let bar = new Bar();

console.log(bar);       // Bar {}
console.log(bar.toString());    // [object object]
console.log(bar[Symbol.toStringTag]);   // bar
```
![11-toString][11]

## Object
- 对象其实就是一组数据和功能的集合
- `let o = new Object()`
- Object也是派生其他类的基类，Object类所有属性和方法在派生的对象上同样存在

### 每个Object类的属性和方法
1. constructor
2. hasOwnProperty(propertyName)：判断当前对象实例是否存在给定属性
3. isPrototypeof(object)：判断当前对象是否为另一个对象的原型
4. propertyIsEnumerable(propertyName)：判定给定的属性是否可以使用
5. toLocaleString()：返回对象的字符串表示
6. toString()
7. valueOf()

## for-in 语句
- 严格的迭代语句，用于枚举对象中的非符号键属性
- `for (property in expression) statement`

## for-of 语句
- 迭代语句，遍历可迭代对象的元素
- `for (property of expression) statement`

## with语句
- 将代码作用域设置为特定的对象
- `with (expression) statement`
- 主要是针对一个对象反复操作
```js
let qs = location.search.substring(1);
let hostname = location.hostname;
let url = location.href;

with(location) {
    let qs = search.substring(1);
    let hostname = hostname;
    let url = href;
}
```
- 严格模式不允许使用`with`

## 严格模式的限制
1. 函数不能以`eval`或者`arguments`作为名称
2. 函数的参数不能叫做`eval`或者`arguments`
3. 两个函数的参数不能教同一个名称
<p style="color: red;">**如果违反以上规则，将会导致语法错误，代码也不会运行**</p>

# 4 变量、作用域和内存
## 原始值和引用值
- 原始值：最简单的数据，按值访问
- 引用值：多个值构成的对象，是保存在内存中的对象
### 注意：字符串和对象
- 在很多语言中，字符串是使用对象表示的，被认为是引用类型，但是JS不是

## 复制值
```js
let num1 = 5;
let num2 = num1;
```
- 这两个值是完全独立的
复制前的变量对象：
|
:-:|:-:
|
num1|5 (Number类型)

复制后的变量对象：
|
:-:|:-:
num2|5 (Number类型)
num1|5 (Number类型)

```js
let obj1 = new Object();
let obj2 = obj1;
```
![12-heap][12]

## 执行上下文与作用域
- 每个上下文都有一个关联的变量对象，而这个上下文中定义的所有变量和函数都存在于这个对象上
- 全局上下文是最外层的上下文，就是常说的`window`对象
- 上下文中的代码在执行的时候，会创建变量对象的一个作用域链，这个作用域链决定了各级上下文中的代码在访问变量和函数时的顺序

## 作用域链增强
执行上下文的种类：
- 全局上下文
- 函数上下文
- eval()调用内部存在

## 变量声明
```js
var color = 'blue';
function getColor(){
	let color = 'red';
	{
		let color = 'green';
		return color;
	}
}

console.log(getColor());	// green
```
- 如果要使用全局变量`color`，需要使用`window.color`

### 标识符查找的代价
- 访问局部变量比访问全局变量要快，因为不用切换作用域

## 垃圾回收
- JS使用垃圾回收，执行环境负责在代码执行时管理内存
- 自动内存管理实现内存分配和闲置资源回收
- 基本思路：确定哪个变量不会再使用，然后释放它占用的内存，每隔一定时间就会自动运行
- 浏览器标记策略：标记清理和引用计数

### 标记清理
- JS常用垃圾回收策略是标记清理
![13-marksweep][13]

### 引用计数
- 对每个值都记录它被引用的次数
- 被赋值，引用加1；如果引用的变量被覆盖，引用数减1
- 垃圾回收程序下次运行的时候会释放引用数为0的值的内存
#### 存在问题
```js
function problem() {
	let objectA = new Object();
	let objectB = new Object();
	
	objectA.someOtherObject = objectB;
	objectB.anotherObject = objectA;
}
```
- 引用数永远不会变成0

### 性能
- IE饱受诟病的地方：它的策略是根据分配数，导致垃圾回收程序过于频繁执行

### 内存管理
- 优化内存占用的最佳手段是保证在执行代码时只保存必要的数据
- 解除引用：`variable = null`
- 解除对一个值的引用不会自动导致相关内存被回收，确保不在上下文，下次垃圾回收时被回收
#### JS内存特点
1. 通过`const`和`let`声明提升性能
2. 隐藏类和删除操作
3. 内存泄漏
4. 静态分配和对象池
##### 对象池
- 创建一个对象池，用来管理一组可回收的对象
- 应用程序可以向这个对象池请求一个对象、设置其属性并使用，操作完后还给对象池
- 由于没有发生对象初始化，垃圾回收探测不会发现有对象更替，自然垃圾回收程序不会频繁运行
```js
function addVectorRaw(a, b){
    let resultant = new Vector();
    resultant.x = a.x + b.x;
    resultant.y = a.y + b.y;

    return resultant;
}

function addVector(a, b, resultant){
    resultant.x = a.x + b.x;
    resultant.y = a.y + b.y;

    return resultant;
}

// 对象池的伪实现
// vectorPool是已有的对象池
let v1 = vectorPool.allocate();
let v2 = vectorPool.allocate();
let v3 = vectorPool.allocate();
let v4 = vectorPool.allocate();

v1.x = 10;
v1.y = 5;

v2.x = -3;
v2.y = -6;

addVector(v1, v2, v3);

console.log([v3.x, v3.y]);

vectorPool.free(v1);
vectorPool.free(v2);
vectorPool.free(v3);

// 如果对象有属性引用了其他对象
// 则这里也需要把这些属性设置伪null
v1 = null;
v2 = null;
v3 = null;
```
##### 注意
- 静态分配是优化的一种极端形式

[01]: ./img/1-DOM.png "1-DOM"
[02]: ./img/2-symbol.png "2-symbol"
[03]: ./img/3-Symbol.isconcatSpreadable.png "3-Symbol.isconcatSpreadable"
[04]: ./img/4-symbol.iterator.js.png "4-symbol.iterator.js.png"
[05]: ./img/5-symbolmatch.png "5-symbolmatch"
[06]: ./img/6-replace.png "6-replace"
[07]: ./img/7-replace2.png "7-replace2"
[08]: ./img/8-search.png "8-search"
[09]: ./img/9-split.png "9-split"
[10]: ./img/10-toPrimitive.png "10-toPrimitive"
[11]: ./img/11-toString.png "11-toString"
[12]: ./img/12-heap.png "12-heap"
[13]: ./img/13-marksweep.jpg "13-marksweep"