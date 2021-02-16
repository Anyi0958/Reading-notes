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

# 5.引用类型
引用值（或对象）是某个特定引用类型的实例。
- 引用对象虽然有点像类，但跟类不是一个概念
```js
let someDate = new Date(Date.parse("May 23, 2019"));
console.log(someDate);
console.log(Date.now());
```
![14-datetime][14]

## 正则捕获组
```js
let text = "This has been a short summer.";
let pattern = /(..)or(.)/g;

if(pattern.test(text)){
    console.log(RegExp.$1); // sh
    console.log(RegExp.$2); // t
}
```

## 字符串迭代与解构
- 字符串原型上暴露了一个`@@iterator`方法，表示可以迭代字符串的每个字符
```js
let message = "abc";
let stringIterator = message[Symbol.iterator];

console.log(stringIterator.next()); // {value: "a", done: false}
console.log(stringIterator.next()); // {value: "b", done: false}
console.log(stringIterator.next()); // {value: "c", done: false}
console.log(stringIterator.next()); // {value: undefined, done: true}

for (const c of "abcde"){
    console.log(c);
}

console.log([...message]);
```
## URL编码方法
- `encodeURI()`：对整个URI进行编码，`www.xxx.com/adawd.js`
- `encodeURIComponent()`：编码URI中单独的组件，``adawd.js`
- `decodeURI()`,`decodeURIComponent()`

### 区别
- `encodeURI`不会编码属于URL组件的特殊字符，比如冒号、斜杠、问号或者井号
- `encodeURIComponent`会编码所有非标准字符
```js
let uri = "http://www.wrox.com/illegal value.js#start";

console.log(encodeURI(uri));
console.log(encodeURIComponent(uri));
```
![15-encode][15]

### 注意
不要在生产环境使用`escape()`和`unescape()`

## eval()方法
- 一个完整的ECMAScript解释器，接收一个参数，即一个要执行的ECMAScript(JavaScript)字符串
- 可以看作`eval`转换为正常语句
```js
eval("console.log('hi')");

// equal above
console.log("hi");
```
- `eval()`执行的代码属于该调用所在的上下文，有相同的作用域链
- 变量也可在`eval`中被引用
```js
let msg = "hello world!";
eval("console.log(msg)");
```
- `eval`可在内部定义函数
```js
eval("function sayHi() { console.log('hi'); }");
sayHi();
```
- 内部声明报错。通过`eval`定义的任何变量和函数都不会被提升，只有在`eval`执行时才会被创建
- 会报错
```js
eval("let msg = 'hello worlds';");
console.log(msg);	// Reference Error: msg is not defined
```
- <p style="color:red;">严格模式下，`eval`内部创建的变量和函数无法被外部访问</p>
- 严格模式下，赋值给`eval`会报错
```js
"use strict"
eval = "hi";
```

# 6. 集合引用类型
- 对象
- 数组与定型数组
- Map, WeakMap, Set, WeakSet

## Object
- `let person = {}`与`new Object()`相同
- Object很适合存储和在应用程序间交换数据
对象字面量(Object literal)：
```js
let person = {
    name: "Nicholas",
    age: 29
};
```
## Array
### 创建数组的办法
```js
// 创建array
// 1.new
let colors1 = new Array();

// 2.create value
let colors2 = new Array(20);
let colors3 = new Array("red", "blue");

// 3. decline new
let colors4 = Array(3);

// 4. array literal
let colors5 = ["red", "blue", "green"];
```

### 创建数组的静态方法-from, of
- from()：用于将类数组结构转换为数组实例
- of()：将一组参数转换为数组实例
```js
console.log(Array.from("Matt"));    //["M", "a", "t", "t"]
// 可以使用from将集合和映射转换为一个数组
const m = new Map() .set(1, 2)
                    .set(3, 4);
const s = new Set() .add(1)
                    .add(2)
                    .add(3)
                    .add(4);
console.log(Array.from(m));
console.log(Array.from(s));
```
![16-array][16]

## 迭代器方法
- Array的原型上暴露了3个用于检索数组内容的方法：keys(), values(), entries()
- keys()：返回数组索引的迭代器
- values()：返回数组元素的迭代器
- entries()：返回索引/值对的迭代器
```js
const a = ["foo", "bar", "baz", "qux"];

// 这些方法都返回迭代器
// 可以将他们的内容通过Array.from()直接转换成数组实例
const aKeys = Array.from(a.keys());
const aValues = Array.from(a.values());
const aEntries = Array.from(a.entries());

console.log(aKeys);
console.log(aValues);
console.log(aEntries);

// ES6解构，拆分键值
const b = ["foo", "bar", "baz", "qux"];

for (const [idx, element] of a.entries()){
    console.log(`idx: ${idx}, element: ${element}`);    
}

```
![17-iterator][17]

## 栈方法
LIFO，后进先出
```js
let colors = new Array();
let count = colors.push("red", "green");

console.log(count);

count = colors.push("black");
console.log(count);

let item = colors.pop();
console.log(item);
console.log(colors.length);
```
## 迭代方法
- `every()`:对数组每一项都运行传入的函数，如果对每一项函数都返回`true`，则这个方法返回`true`
- `filter()`:对数组每一项都运行传入的函数，函数返回`true`的项会组成数组之后返回
- `forEach()`:对数组每一项都运行传入的函数，没有返回值
- `map()`:对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组
- `some()`:对数组每一项都运行传入的函数，如果由一项函数返回`true`，则这个方法返回`true`

## ArrayBuffer
- `Float32Array`是一种视图，允许js运行时访问一块名为`ArrayBuffer`的预分配内存
- `ArrayBuffer`是所有定型数组及视图引用的基本单位
- `SharedArrayBuffer`是一个变体，可以无需复制就在执行上下文间传递它
- `ArrayBuffer()`是一个构造函数，用于在内存中分配特定数量的字节空间
```js
const buf = new ArrayBuffer(16);    // 在内存中分配16字节
console.log(buf.byteLength);    // 16
```
- `ArrayBuffer`一经创建就不能再调整大小
- 但可以使用`slice()`复制其全部或部分到一个新实例中：
```js
const buf1 = new ArrayBuffer(16);
const buf2 = buf1.slice(4, 12);
console.log(buf2.byteLength);   // 8
```
### `ArrayBuffer与malloc的区别`
- 分配失败时会抛出错误
- 最大尺寸不能超过`Number.MAX_SAFE_INTEGER(2^53 -1)`
- 将所有二进制位初始化为0
- 分配的堆内存可以被当成垃圾回收，不用手动释放

## DataView
- 专为文件I/O和网络I/O设计
```js
const buf = new ArrayBuffer(16);

// DataView默认使用整个ArrayBuffer
const fullDataView = new DataView(buf);
console.log(fullDataView.byteOffset);   // 0
console.log(fullDataView.byteLength);   // 16
console.log(fullDataView.buffer == buf);    // true

// 构造函数接收一个可选的字节偏移量和字节长度
// byteOffset = 0 表示视图从缓冲起点开始
// byteLLength = 8 限制视图为前8个字节
const firstHalfDataView = new DataView(buf, 0, 8);
console.log(firstHalfDataView.byteOffset);  // 0
console.log(firstHalfDataView.byteLength);  // 8
console.log(firstHalfDataView.buffer == buf);   // true

// 如果不指定，则datavie会使用剩余的缓冲
// byteOffset = 8表示视图从缓冲的第9个字节开始
// byteLength 未指定,默认为剩余缓冲
const secondHalfDataView = new DataView(buf, 8);
console.log(secondHalfDataView.byteOffset); // 8
console.log(secondHalfDataView.byteLength); // 8
console.log(secondHalfDataView.buffer == buf);  // true
```
- 默认为大端字节序

### 默认字节序
- 又叫“网络字节序”，最高有效位保存在第一个字节，最低有效位保存在最后一个字节

## 定型数组
- 提供了适用面更广的API和更高的性能
- 设计目的时提高与WebGL等原生库交换二进制数据的效率
```js
const ints = new Int16Array([1,2,3]);
for(const int of ints) {
    console.log(int);
}
```
## Map

### 基本API

- 创建：`const m = new Map();`
- 初始化值：`const m1 = new Map(["key1", "val1"]);`
- 查看是否存在键值对：`m.has(key);`
- 获取键对应值：`m.get(key);`
- 新增设置：`m.set('key2', 'val2');`
- 迭代：
	- 获取k-v：`entries()`，`[Symbol.iterator]`
		- `for(let i of m.entries())`
		- `for(let i of m[Symbol.iterator])`
	- `m.forEach((key,val) => console(${key}->${val}))`
	- 获取keys：`for(let key of m.keys())`
	- 获取val：`for(let val of m.values())`
sample:
```js
const m1 = new Map([
	["key1", "val1"]
]);

for(let i of m1.keys()){
	console.log(m1.get(i));	// val1
}
```

## Object和Map的选择

- web开发任务来说，两者没有区别
- 在乎内存和性能的话，对象和映射存在显著的差别
### 差别
1. 内存占用，`map`多存储50%
2. 插入性能，`map`性能更佳
3. 查找速度，`object`更好
4. 删除性能，`map`更好

## WeakMap

- 弱映射，描述的是`javascript`垃圾回收程序对待`弱映射`中键的方式
```js
const m = new Map();
const wm = new WeakMap();
```
### 基本API
- 创建：`const wm = new WeakMap();`
- 初始化值：`const key1 = {id:1};const wm = new WeakMap([[key1, "val1"], [key2, "val2"]]);`
- 查看是否存在：`wm.has(key1)`
- 获取相应的键值：`wm.get(key1)`
- 新增：`wm.set(key1, "val1")`
- 不可迭代

### 使用弱映射

- `weakMap`与`JavaScript`对象有着很大的不同
#### 1. 私有变量
- 弱映射造就了`Js`中实现真正私有变量的一种方式
- 私有变量会存储在弱映射里，以对象实例为键，以私有成员的字典为值
```js
const wm = new WeakMap();

class User {
    constructor(id) {
        this.idProperty = Symbol('id');
        this.setId(id);
    }

    setPrivate(property, value) {
        const privateMembers = wm.get(this) || {};
        privateMembers[property] = value;
        wm.set(this, privateMembers);
    }

    getPrivate(property){
        return wm.get(this)[property];
    }

    setId(id) {
        this.setPrivate(this.idProperty, id);
    }

    getId() {
        return this.getPrivate(this.idProperty);
    }
}

const user = new User(123);
console.log(user.getId());  // 123
user.setId(456);
console.log(user.getId());  // 456

// 并非是真正私有的
console.log(wm.get(user)[user.idProperty]); // 456
```
##### 注意
- 外部代码只需要拿到对象实例的引用和弱映射，就可以取得“私有”变量
- 避免这种情况，需要闭包把`weakMap`包装起来，把弱映射和外界完全隔离开来
```js
const User = (() => {
    const wm = new WeakMap();

    class User {
        constructor(id) {
            this.idProperty = Symbol('id');
            this.setId(id);
        }

        setPrivate(property, value) {
            const privateMembers = wm.get(this) || {};
            privateMembers[property] = value;
            wm.set(this, privateMembers);
        }

        getPrivate(property) {
            return wm.get(this)[property];
        }

        setId(id) {
            this.setPrivate(this.idProperty, id);
        }

        getId() {
            return this.getPrivate(this.idProperty);
        }
    }

    return User;
}) ();

const user = new User(123);
console.log(user.getId());  // 123
user.setId(456);
console.log(user.getId());  // 456
```
- 拿不到弱映射中的键，也无法取得弱映射中对应的值
- 但是陷入了ES6之前的闭包私有变量模式

#### 2. DOM节点元数据
- 因为`weakMap`实例不会妨碍垃圾回收，非常适合保存关联元数据

常规`Map`：
```js
const m = new Map();

const loginButton = document.querySelector('#login');

// 给这个结点关联一些元数据
m.set(loginButton, {disabled: true});
```
- 假设以上代码执行，页面被JS改变了，原来的登录按钮从`DOM`树中被删掉了
- 但由于映射中还保存着按钮的引用，所以对应的`DOM`节点仍然会逗留在内存中
- 除非明确将其从映射中删除或者等到映射本身被销毁

如果使用弱映射，当节点从`DOM`树中被删除后，垃圾回收程序可以立即释放内存，前提是没有其他地方引用这个对象：
```js
const wm = new WeakMap();
wm.set(loginButton, {disabled: true});
```

## Set
一种集合类型，集合数据结构。
- 类似于加强的`Map`，大多数的API和行为都是共有的

### 基本API
- 创建：`const m = new Set()`
- 初始化值：`const m = new Set(["val1", "val2"]);`
- 查看是否存在：`m.has("val1")`
- 没有获取
- 新增：`m.add("val3")`
- `m.add({a:'1'})`会输出`{a:'1'}`，如果是指定的`xx.a`，就会输出`1`
- `set`可以作为函数的参数进行传递`function(m = new Set())`
- 迭代：
	- 获取k-v：`entries()`，值会出现两次`["val1", "val1"]` 
	- 获取`value`：
	- `for(let i of m.values())`
	- `for(let i of m[Symbol.iterator]())`

创建的同时初始化实例，传入一个可迭代对象：

```js
const s1 = new Set(["val1", "val2", "val3"]);

console.log(s1.size);   // 3

// 使用自定义迭代器初始化集合
const s2 = new Set({
    [Symbol.iterator]: function* () {
        yield "val1";
        yield "val2";
        yield "val3";        
    }
});

console.log(s2.size);   // 3
```
- 初始化之后，可以使用：
	- add(): 增加值
	- has(): 查询
	- size: 获取元素数量
	- delete(): 删除元素
	- clear(): 清空元素
`add()`可以将多个操作连缀起来：
```js
const s = new Set() .add("val1");

s.add("val2")
 .add("val3");

console.log(s.size);   // 3
```
与`Map`相似，Set可以包含任何数据类型，同时使用了`SameValueZero`操作，相当于使用严格对象相等的标准来检查值的匹配：
```js
const s = new Set();

const functionVal = function() {};
const symbolVal = Symbol();
const objectVal = new Object();

s.add(functionVal)
 .add(symbolVal)
 .add(objectVal);

console.log(s.has(functionVal) 
            && s.has(symbolVal) 
            && s.has(objectVal));    //true

// SameValueZero检查
console.log(s.has(function() {}));  // false
```

### 顺序与迭代
`Set`会维护值插入时的顺序，支持顺序迭代
- 集合实例可以提供一个迭代器，能以插入顺序生成集合内容
- `values()`，`keys()`，`Symbol.iterator`
```js
const s = new Set(["val1", "val2", "val3"]);

console.log(s.values === s[Symbol.iterator]);   // true
console.log(s.keys === s[Symbol.iterator]);

for (let value of s.values()) {
    console.log(value);
}

for (let value of s[Symbol.iterator]()) {
    console.log(value);
}

for (let value of s.keys()) {
    console.log(value);
}
```
- `values()`是默认迭代器，可以直接对集合实例使用扩展操作，把集合转换为数组：
```js
const s = new Set(["val1", "val2", "val3"]);
console.log([...s]);
```

## WeakSet
`WeakSet`是`Set`的兄弟类型，`weak`指的是垃圾回收程序对待“弱集合”中值的方式
`const ws = new WeakSet()`：实例化一个空的`WeakSet`
### 基本API
- 创建：`const ws = new WeakSet()`
- 初始化值：`const val1 = {id:1};const ws = new WeakSet([val1])`
- 查看是否拥有：`ws.has(val1)`
- 新增：`ws.add(val1)`
- 没有获取值的函数
- 不可迭代
***
# 7. 迭代器和生成器
本章内容：
1. 理解迭代
2. 迭代器模式
3. 生成器
- 迭代(Iteration)源自拉丁文`itero`
- 迭代：按照顺序反复多次执行一段程序，通常会有明确的终止条件
- 新特性：迭代器和生成器，能够更清晰、高效、方便地实现迭代

## 理解迭代

计数循环就是最简单的迭代：
```js
for(let i = 0; i <= 10; ++i){
    console.log(i);
}
```
- 循环是迭代机制的基础
- 循环执行例程不是好选择：
	- 迭代之前需要事先知道如何使用数据结构
	- 遍历顺序并不是数据结构固有的
- 新增`Array.prototype.forEach()`，通用迭代，但没有标识迭代何时终止。

## 迭代器模式
- 可以把有些结构称为可迭代对象(iterable)
- 可迭代对象：数组或集合
	- 元素有限
	- 具有无歧义的遍历顺序
- 临时性可迭代对象可以实现为生成器
- 迭代器无需了解可迭代对象的结构，只需要知道如何取得连续的值

## 可迭代协议
- 支持迭代的自我识别能力
- 创建实现Iterator接口的对象的能力
- 默认迭代器属性(以`Symbol.iterator`)引用一个迭代器工厂，调用这个工厂返回一个新迭代器
### 检查是否存在默认迭代器属性可以暴露这个工厂
```js
let num = 1;
let obj = {};

// 这两种类型没有实现迭代器工厂函数
console.log(num[Symbol.iterator]);  // undefined
console.log(obj[Symbol.iterator]);  // undefined

let str = 'abc';
let arr = ['a', 'b', 'c'];
let map = new Map() .set('a', 1).set('b', 2).set('c', 3);
let set = new Set() .add('a') .add('b') .add('c');
let els = document.querySelectorAll('div');

// 这些类型都实现了迭代器工厂函数
console.log(str[Symbol.iterator]);  // f values() { [native code] }
console.log(arr[Symbol.iterator]);  // f values() { [native code] }
console.log(map[Symbol.iterator]);  // f values() { [native code] }
console.log(set[Symbol.iterator]);  // f values() { [native code] }
console.log(els[Symbol.iterator]);  // f values() { [native code] }

// 调用这个工厂函数会生成一个迭代器
console.log(str[Symbol.iterator] () );  // StringIterator {}
console.log(arr[Symbol.iterator] () );  // ArrayIterator {}
console.log(map[Symbol.iterator] () );  // MapIterator {}
console.log(set[Symbol.iterator] () );  // SetIterator {}
console.log(els[Symbol.iterator] () );  // ArrayIterator {}
```
- 实际写代码的过程中，不需要显式调用这个工厂函数来生成迭代器
- 自动兼容接收的语言特性：
	1. `for-of`
	2. 数组解构
	3. 扩展操作符
	4. `Array.from()`
	5. 创建集合
	6. 创建映射
	7. `Promise.all()`接收由期约组成的可迭代对象
	8. `Promise.race()`接收由期约组成的可迭代对象
	9. `yield*`操作符，在生成器中使用

## 迭代器协议
定义：
- 迭代器是一种一次性使用的对象，用于迭代与其关联的可迭代对象
- 迭代器API使用`next()`方法在可迭代对象中遍历数据，每次成功调用，都会返回`IteratorResult`对象，其中包含迭代器返回的下一个值
- 如果不调用`next()`，则无法知道迭代器的当前位置
- `IteratorResult`包含两个属性：`done`和`value`
- `done`是一个布尔值，表示是否可以再次调用`next`取得下一个值
- `value`包含下一个值

sample:
```js
// 可迭代对象
let arr = ['foo', 'bar'];

// 迭代器工厂函数
console.log(arr[Symbol.iterator]);  // f values() { [native code] }

// 迭代器
let iter = arr[Symbol.iterator]();
console.log(iter);  // ArrayIterator {}

// 执行迭代
console.log(iter.next());   // {done: false, value: 'foo'}
console.log(iter.next());   // {done: false, value: 'bar'}
console.log(iter.next());   // {done: true, value: undefined }
```
特点：
- 每个迭代器都表示对可迭代对象的一次性有序遍历
- 不同迭代器实例相互之间没有联系，会独立运行
- 可迭代对象改变，迭代器也变化
- 迭代器维护者一个指向可选迭代对象的引用，会阻止垃圾回收程序回收可迭代对象
- 迭代器可以是通用的迭代，也可以是接口，也可是迭代器类型
```js
// 这个类实现了可迭代接口(Iterable)
// 调用默认的迭代器工厂函数会返回
// 一个实现迭代器接口(Iterator)的迭代器对象
class Foo {
    [Symbol.iterator](){
        return {
            next(){
                return { done: false, value: 'foo' };
            }
        };
    }
}

let f = new Foo();

// 打印出实现了迭代器接口的对象
console.log(f[Symbol.iterator]());  // {next: f() {}}

// Array类型实现了可迭代接口(Iterable)
// 调用Array类型的默认迭代器工厂函数
// 会创建一个ArrayIterator的实例
let a = new Array();

// 打印出ArrayIterator的实例
console.log(a[Symbol.iterator]());  // Array Iterator {}
```
## 自定义迭代器
- 任何实现`Iterator`接口的对象都可以作为迭代器使用
```js
class Counter {
    // Counter的实例应该迭代limit次
    constructor(limit){
        this.count = 1;
        this.limit = limit;
    }

    next() {
        if(this.count <= this.limit){
            return { done: false, value: this.count++ };
        }else {
            return { done: true, value: undefined};
        }
    }

    [Symbol.iterator]() {
        return this;
    }
}

let counter = new Counter(3);
for (let i of counter) {
    console.log(i);
}
// 1
// 2
// 3

for (let i of counter)  {console.log(i);} // nothing logged and printed
```

- 让一个可迭代对象能创建多个迭代器，必须每创建一个迭代器就对应一个新计数器
- 计数器变量放到闭包里，通过闭包返回迭代器
```js
class Counter {
    constructor(limit){
        this.limit = limit;
    }

    [Symbol.iterator](){
        let count = 1;
        let limit = this.limit;

        return {
            next(){
                if(count <= limit){
                    return {done: false, value: count++};
                }else{
                    return {done: true, value: undefined};
                }
            }
        };
    }
}

let counter = new Counter(3);

for (let i of counter)   console.log(i);
// 1
// 2
// 3

for (let i of counter)  console.log(i);
// 1
// 2
// 3
```
## 提前终止迭代器
- 可选的`return()`方法用于指定在迭代器提前关闭时执行的逻辑
可能的情况：
	- `for-of`循环通过`break`,`continue`,`return`或`throw`提前退出
	- 解构操作并未消费所有值
- `return`方法必须返回一个有效的`IteratorResult`对象，可以只返回`{done: true}`
- 内置语言结构在发现还有更多值可以迭代，但不会消费这些值时，会自动调用`return`方法
```js
class Counter {
    constructor(limit){
        this.limit = limit;
    }

    [Symbol.iterator]() {
        let count = 1,
            limit = this.limit;
        return {
            next() {
                if(count <= limit){
                    return {done: false, value: count++};
                } else {
                    return {done: true, value: undefined};
                }
            },

            return() {
                console.log('Exiting early.');
                return {done: true};
            }
        };
    }
}

let counter1 = new Counter(5);
for(let i of counter1){
    if(i > 2)
        break;
    console.log(i);
}
// 1
// 2
// Exiting early

let counter2 = new Counter(5);

try{
    for(let i of counter2){
        if(i > 2)
            throw 'err';
        console.log(i);
    }
}catch(err) {}
// 1
// 2
// Exiting early

let counter3 = new Counter(5);

let [a, b] = counter3;
// Exiting early
```
- 如果迭代器没有关闭，则继续从上次离开的地方继续迭代
- 数组的迭代器就是不能关闭的
```js
let c = [1,2,3,4,5];
let iter = c[Symbol.iterator]();

for (let i of iter){
    console.log(i);
    if(i > 2)
        break;
}
// 1
// 2
// 3
for (let i of iter){
    console.log(i);
}
// 4
// 5
```
- 因为`return`方法是可选的，所以并非所有迭代器都是可关闭的
- 测试这个迭代器实例的`return`属性是不是函数对象，可知是否可关闭
- 有`return`并不能让迭代器变成可关闭的，不会强制进入关闭状态
```js
let d = [1,2,3,4,5];
let iter = d[Symbol.iterator]();
iter.return = () => {
    console.log('Exiting early.');
    return {done: true};
};

for(let i of iter){
    console.log(i);
    if(i > 2){
        break;
    }
}
// 1
// 2
// 3
// Exiting early

for(let i of iter){
    console.log(i);
}
// 4
// 5
```
## 生成器
- 生成器是一个极为灵活的结构
- 作用：拥有在一个函数块内暂停和恢复代码执行的能力
- 应用：使用生成器可以自定义迭代器和实现协程
### 生成器基础
- 生成器的形式是一个函数
- 函数名称前面加一个星号，表示它是一个生成器
- 只要是可以定义函数的地方，就可以定义生成器
```js
// 生成器函数声明
function* generatorFn() {}

// 生成器函数表达式
let generatorFn = function* () {}

// 作为对象字面量方法的生成器函数
let foo = {
	* generatorFn() {}
}

// 作为类实例方法的生成器函数
class Foo {
	* generatorFn() {}
}

// 作为类静态方法的生成器函数
class Bar {
	static * generatorFn() {}
}
```
- <span style="color:red;">箭头函数不能用来定义生成器函数</span>
- 标示生成器函数的星号不受两侧空格的影响
- 调用生成器函数会产生一个生成器对象
- 生成器对象一开始处于暂停执行(suspended)的状态
- 与迭代器相似，生成器对象也实现了`Iterator`接口，因此具有`Next()`方法，这个方法可以让生成器开始或恢复执行
```js
function* generatorFn() {}

const g = generatorFn();

console.log(g); // generatorFn {<suspended>}
console.log(g.next);  // f next()   { [native code] }
```
- `next()`方法返回值类似于迭代器，有一个`done`和`value`属性
- 函数体为空的生成器函数中间不会停留，调用一次`next()`就会让生成器到达`done: true`状态
- 生成器函数只会在初次调用`next()`方法后开始执行
```js
function* generatorFn() {
    console.log("foobar");
}

// 初次调用生成器函数并不会打印日志
let generatorObject = generatorFn();

generatorObject.next(); // foobar
```
- 生成器对象实现了`Iterable`接口，默认的迭代器是自引用的：
```js
function* generatorFn2() {}

console.log(generatorFn2);  // f* generatorFn() {}
console.log(generatorFn2()[Symbol.iterator]);   // f [Symbol.iterator]() [native code]
console.log(generatorFn2());    // generatorFn2 {<suspended>}
console.log(generatorFn2()[Symbol.iterator]()); // generatorFn2 {<suspended>}

const g = generatorFn2();
console.log(g === g[Symbol.iterator]());    // true
```
### 通过`yield`中断执行
- `yield`关键字可以让生成器停止和开始执行，也是最有用的地方
- 生成器函数在遇到`yield`关键字后，执行停止，函数作用域的状态会被保留
- 停止后通过调用`next()`来恢复执行，返回的`{done: true|false, value: xx|undefined}`
```js
function* generatorFn() {
    yield 'foo';
    yield 'bar';
    return 'baz';
}

let generatorObject = generatorFn();

console.log(generatorObject.next());    // {done: false, value: 'foo'}
console.log(generatorObject.next());    // {done: false, value: 'bar'}
console.log(generatorObject.next());    // {done: true, value: 'baz'}
```
- 生成器函数内部的执行流程会针对每个生成器对象的区分作用域，也就是在一个生成器对象上调用`next()`不会影响其他生成器
```js
function* generatorFn() {
    yield 'foo';
    yield 'bar';
    return 'baz';
}

let generatorObject1 = generatorFn(),
	generatorObject2 = generatorFn();

console.log(generatorObject1.next());    // {done: false, value: 'foo'}
console.log(generatorObject2.next());    // {done: false, value: 'foo'}
```
- `yield`只能在生成器函数内部使用，用在其他地方会抛出错误
- 如果有`return`，`yield`必须位于生成器函数定中，出现在嵌套的非生成器函数中会报错
```js
// valid
function* validGeneratorFn() {
    yield;
}

// invalid
function* invalidGeneratorFnA() {
    function a() {
        yield;
    }
}

// invalid
function* invalidGeneratorFnB() {
    const b = () => {
        yield;
    }
}

// invalid
function* invalidGeneratorFnC() {
    (() => {
        yield;
    })();
}
```
#### 1. 生成器对象作为可迭代对象
- 显示调用`next()`方法的用处不大
- 生成器对象当成可迭代对象，使用将会很方便
```js
function* generatorFn() {
    yield 1;
    yield 2;
    yield 3;
}

for (const x  of generatorFn()) {
    console.log(x);
}
// 1
// 2
// 3
```

- 在需要自定义迭代对象时，如此使用生成器对象会特别有用
- 比如，定义一个可迭代对象，它会产生一个迭代器，这个迭代器会执行指定的次数
```js
function* nTimes(n) {
    while(n--){
        yield;
    }
}

for (let _ of nTimes(3)) {
    console.log('foo');
}
// foo
// foo
// foo
```
#### 2. 使用`yield`实现输入和输出
- `yield`关键字还可以作为函数的中间参数使用
- 生成器函数暂停的`yield`关键字会接收到传给`next()`方法的第一个值
- 第一次调用`next()`传入的值不会被使用，第一次调用是为了开始执行生成器函数
```js
function* generatorFn(initial) {
    console.log(initial);
    console.log(yield);
    console.log(yield);
}

let generatorObject = generatorFn('foo');

generatorObject.next('bar');    // foo
generatorObject.next('baz');    // baz
generatorObject.next('qux');    // qux
```
- `yield`可以同时用于输入和输出
```js
function* generatorFn(){
	return yield 'foo';
}
let generatorObject = generatorFn();

console.log(generatorObject.next());	// {done: false, value: 'foo'}
console.log(generatorObject.next('bar'));	// {done: true, value: 'bar'}
```
- 如果有生成器函数，要迭代指定次数，并产生迭代的索引，用`for-of`
```js
function* nTimes(n) {
    for(let i = 0; i < n; ++i)
        yield i;
}

for(let x of nTimes(3)) console.log(x);
// 0
// 1
// 2
```
- 可以使用生成器实现范围和填充数组
```js
function* range(start, end){
    while(end > start)  yield start++;
}

for(let x of range(4,7)) console.log(x);
// 4
// 5
// 6

function* zeroes(n) {
    while(n--)  yield 0;
}

console.log(Array.from(zeroes(3))); // [0, 0, 0]
```
#### 3. 产生可迭代对象
- 可以使用星号增强`yield`的行为，让它能够迭代一个可迭代对象，从而一次产出一个值
```js
// 等价的
function* generatorFn1() {
    for(const x of [1,2,3]) yield x;
}

function* generatorFn2() {
    yield* [1,2,3];
}

let test1 = generatorFn2();

for(const x of test1)   console.log(x);
// 1
// 2
// 3
```
- `yield*`只是将一个可迭代对象序列化为一连串可以单独产出的值，所以跟把`yield`放到一个循环里没什么不同
- 与放到循环里等价
- `yield*`的值是关联迭代器返回`done: true`时的`value`属性，对于普通迭代器来说，这个值是`undefined`:
```js
function* generatorFn() {
    console.log('iter value:', yield* [1,2,3]);
}

for(const x of generatorFn())   console.log('value:', x);
// value: 1
// value: 2
// value: 3
// iter value: undefined
```
- `yield*`的值对于生成器函数产生的迭代器来说，这个值就是生成器函数返回的值：
```js
function* innerGeneratorFn() {
    yield 'foo';
    return 'bar';
}

function* outerGeneratorFn() {
    console.log('iter value:', yield* innerGeneratorFn() );
}

for (const x of outerGeneratorFn()) console.log('value:', x);
// value: foo
// iter value: bar
```
#### 4. 使用`yield*`实现递归算法
- `yield*`最有用的地方是实现递归操作，生成器可以生成自身
```js
function* nTimes(n) {
    if(n > 0){
        yield* nTimes(n -1);
        yield n - 1;
    }
}

for(const x of nTimes(3))   console.log(x);
// 0
// 1
// 2
```
- 讲解：从最顶层来看，这相当于创建一个可迭代对象并返回递增的整数
- 使用**递归生成器结构**和`yield*`可以优雅地表达递归算法
##### 图的实现
- 图数据结构非常适合遍历，递归生成器用来测试某个图是否连通，常用于深度优先遍历
用于生成一个随机的双向图：
```js
class Node {
    constructor(id) {
        this.id = id;
        this.neighbors = new Set();
    }

    connect(node) {
        if(node !== this){
            this.neighbors.add(node);
            node.neighbors.add(this);
        }
    }
}

class RandomGraph {
    constructor(size) {
        this.nodes = new Set();

        // Create Nodes
        for(let i = 0; i < size; ++ i)  this.nodes.add(new Node(i));

        // random connect nodes
        const threshold = 1 / size;
        for(const x of this.nodes) {
            for(const y of this.nodes){
                if(Math.random() < threshold){
                    x.connect(y);
                }
            }
        }
    }

    // 这个方法用于调试
    print() {
        for(const node of this.nodes){
            const ids = [...node.neighbors]
                        .map(n => n.id)
                        .join(',');
        
            console.log(`${node.id}: ${ids}`);
        }
    }

    // 深度优先遍历
    isConnected() {
        const visitedNodes = new Set();

        function* traverse(nodes) {
            for(const node of nodes ) {
                if(!visitedNodes.has(node)){
                    yield node;
                    yield* traverse(node.neighbors);
                }
            }
        }

        // 取得集合中的第一个结点
        const firstNode = this.nodes[Symbol.iterator]().next().value;

        // 使用递归生成器迭代每个结点
        for (const node of traverse([firstNode])) {
            visitedNodes.add(node);
        }

        return visitedNodes.size === this.nodes.size;
    }
}

const g = new RandomGraph(6);

g.print();

console.log(g.isConnected());

// 0: 2,5
// 1: 5,4
// 2: 0
// 3: 5,4
// 4: 1,3,5
// 5: 1,3,0,4
// true
```
### 生成器作为默认迭代器
- 生成器对象实现了`Iterable`接口
- 生成器函数和默认迭代器被调用后都产生迭代器
生成器作为默认迭代器：
```js
class Foo {
    constructor() {
        this.values = [1,2,3];
    }

    * [Symbol.iterator]() {
        yield* this.values;
    }
}

const f = new Foo();
for(const x of f)   console.log(x);
// 1
// 2
// 3
```
#### 优势
1. 可以一行产出类的内容
2. `for-of`调用的默认迭代器恰好是改写的生成器函数，使用灵活方便

### 提前终止生成器
实现`Iterator`接口的对象：
- 有`next()`方法
- 强制生成器进入关闭状态：
	- 有`return()`方法提前终止迭代器
	- `throw()`抛出错误停止 
```js
function* generatorFn() {}

const g = generatorFn();
console.log(g);     // generatorFn {<suspended>}
console.log(g.next); // f next() { [native code] }
console.log(g.return);  // f return() {[native code]}
console.log(g.throw);   // f throw() {[native code]}
```
#### return
1. 提供给`return`方法的值，就是终止迭代器对象的值
```js
console.log(g.return(4));	//{ value: 4, done: true }
```
2. 生成器对象都有`return`，进入关闭状态就无法恢复，提供的任何返回值都不会被存储和传播，并返回`done: true`
3. `for-of`循环等内置语言结构会忽略状态为`done: true`的`IteratorObject`内部返回的值
```js
function* generatorFn() {
    yield* [1,2,3];
}

const g = generatorFn();

for(const x of g){
    if(x > 1)
        g.return(3);
    console.log(x);
}
// 1
// 2
```
#### throw
- 在暂停的时候，将一个提供的错误注入到生成器对象中
	- 如果错误未处理，生成器就会关闭
	- 如果生成器函数内部处理了这个错误，就不会关闭，还可以恢复执行
	- 错误会跳过对应的`yield`
```js
function* generatorFn1() {
    yield* [1,2,3];
}

const g1 = generatorFn1();

console.log(g1);     // generatorFn {<suspended>}
try{
    g1.throw('foo');
}catch(e){
    console.log(e);     //foo
}
console.log(g1);     // generatorFn {<closed>}

function* generatorFn2() {
    for(const x of [1,2,3]) {
        try{
            yield x;
         }catch(e) {}
    }

}

const g2 = generatorFn2();
console.log(g2.next());     // {done:false, value: 1}
g2.throw('foo');
console.log(g2.next());      // {done: false, value: 3}
```
- 但如果把`yield* [1,2,3]`放在`try`内，内部捕获后，将会终止后续执行
```js
function* xx() {
	try{
		yield* [1,2,3];
	}catch(e){}
}

...
g.throw('foo');
...
```

## 总结
- 迭代器是一个可以由任意对象实现的接口，支持连续获取对象产出的每一个值
- 生成器是一种特殊的函数，调用后会返回一个生成器对象，可以暂停执行，`yield*`序列化为一串值

# 8. 对象、类与面向对象编程


***
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
[14]: ./img/14-datetime.png "14-datetime"
[15]: ./img/15-encode.png "15-encode"
[16]: ./img/16-array.png "16-array"
[17]: ./img/17-iterator.png "17-iterator"