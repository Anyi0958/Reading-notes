# ES6

[TOC]

***

## 1. 教程

###  环境搭建

* 安装NodeJs
Node.js 安装包及源码下载地址为：https://nodejs.org/en/download/。

#### webpack

webpack 是一个现代 JavaScript 应用程序的静态模块打包器 (module bundler) 。
当 webpack 处理应用程序时，它会递归地构建一个依赖关系图 (dependency graph) ，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle 。
- webpack -> 打包器，构建依赖并打包成捆。 

##### 四个核心概念：
* 入口(Entry)
* 出口(Output)
* loader
* 插件

###### Entry
入口会指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。
进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
在 webpack 中入口有多种方式来定义，
单个入口：
```javascript
const config = {
	entry: "./src/main.js"
};
```
对象语法：
```javascript
const config = {
	app: "./src/main.js",
	vendors: "./src/vendors.js"
};
```
###### Output

output 属性会告诉 webpack 在哪里输出它创建的 bundles，如何命名这些文件。
默认值为 `./dist`。

```javascript
const config = {
	entry: "./src/main.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, 'dist')
	}
};
```
###### Loader
loader 让 webpack 可以去处理那些非 JavaScript 文件（ webpack 自身只理解 JavaScript ）。
loader 可以将所有类型的文件转换为 webpack 能够有效处理的模块。
例如，开发的时候使用 ES6 ，通过 loader 将 ES6 的语法转为 ES5 ，如下配置：
- loader -> 处理非js文件.

```javascript
const config = {
	entry: "./src/main.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: [
					presets: ["env"]
				]
			}
		]
	}
};
```

###### Plugins
loader 被用于转换某些类型的模块，而插件则可以做更多的事情。
包括打包`优化、压缩、定义环境变量`等等。
插件的功能强大，是 webpack 扩展非常重要的利器，可以用来处理各种各样的任务。
使用一个插件也非常容易，只需要 require() ，然后添加到 plugins 数组中。
```javascript
// npm install
const HtmlWebPackPlugin = require('html-webpack-plugin');

// access to the embed plugin
const webpack = require('webpack');

const config = {
	module: {
		rules: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "babel-loader"
		}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({template: './src/index.html'})
	]
};
```

##### 搭建
简单的搭建：webpack.config.js
```javascript
const path = require('path');
 
module.exports = {
  mode: "development", // "production" | "development"
  // 选择 development 为开发模式， production 为生产模式
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: [
          presets: ["env"]
        ]
      }
    ]
  },
  plugins: [
    ...
  ]
}
```
webpack 会从入口 main.js 文件进行构建，通过 loader 进行js转换，输出一个为 bundle.js 的文件，至此一整个过程就构建完成。

#### gulp
gulp 是一个基于流的自动化构建工具。
具有易于使用、构建快速、插件高质和易于学习。
常用于轻量级的工程中。

##### 如何使用

全局安装： `npm install --global gulp`
项目里引入依赖： `npm install --save-dev gulp`

在项目根目录下创建名为 gulpfile.js 的文件:
```javascript
const gulp = require('gulp');

// default 表示一个任务名，为默认执行任务
gulp.task('default', function() {
	//default code
})
```
运行： `gulp`

##### 搭建
gulp搭建应用：
```javascript
const gulp = require('gulp');
const uglify = require("gulp-uglify");  
 
gulp.task('default', function() {
  gulp.src('./src/main.js')
      .pipe(uglify())
      .pipe(gulp.dest('./dist'));
})
```

## 2.1 ES6 let and const

* let - 在let代码块内有效。
* const - 声明一个只读变量。

let:
```javascript
{
	let a = 0;
	console.log(a) //0
}
a	// ReferenceError: a is not defined
```
与var对比：

let|var
:-:|:-: 
代码块内有效 | 全局范围内有效
只能声明一次 | 多次声明
不能变量提升 | 变量提升

## 2.2 ES6解构赋值

- 解构: 赋值运算符的扩展。
- 针对数组的模式匹配。

### 解构模型
* 左变量，右目标。

### 数组解构(Array)

#### 基本
```javascript
	let [a, b, c] = [1, 2, 3];
	// a = 1, b = 2, c = 3;
```

#### 嵌套：
```javascript
	let [a, [[b], c]] = [1, [[2], 3]];
```

#### 可以忽略：
```javascript
	let [a, , b] = [1, 2, 3];
```

#### 不完全解构：
```javascript
	let [a = 1, b] = [];
```

#### 剩余运算法：
```javascript
	let [a, ...b] = [1,2,3];
	//a = 1, b = [2, 3]	
```

#### 字符串：
```javascript
let [a,b,c,d,e] = "hello";
```

#### 解构默认值：
```javascript
let [a = 2] = [undefined];
//a = 2;

let [a = 3, b = a] = [];
let [a = 3, b = a] = [1]; // a=1, b=1
let [a = 3, b = a] = [1, 2];
```
* 如果匹配结果是undefined，处罚默认值。

### 对象解构

#### 基本
```javascript
let {foo, bar} = {foo: 'aaa', bar: 'bbb'};
```
同上S
#### 可嵌套、可忽略
#### 不完全解构
#### 剩余运算符
#### 结构默认值

## 2.3 Symbol

### 概念
新的数据类型 - 表示独一无二的值，用来定义对象的唯一属性名。

### 基本用法
* 不能使用new
* 可以接受string 参数
* 相同参数的返回值不等
```javascript
let sy = Symbol("KK");
console.log(sy);	//Symbol(KK);

let sy2 = Symbol("KK");
sy === sy2;	// false
```
### 使用场景

#### 属性名

* 用法：
	* 每个Symbol都不相等
	* Symbol作为对象的属性名
	* 保证属性不重名
* 3种写法：
	* arr[Symbol]
	* obeject = { [sy]: "k" }
	* Object.defineProperty(x, sy, {value: "k"})
```javascript
let sy = Symbol("key1");
 
// 写法1
let syObject = {};
syObject[sy] = "kk";
console.log(syObject);    // {Symbol(key1): "kk"}
 
// 写法2
let syObject = {
  [sy]: "kk"
};
console.log(syObject);    // {Symbol(key1): "kk"}
 
// 写法3
let syObject = {};
Object.defineProperty(syObject, sy, {value: "kk"});
console.log(syObject);   // {Symbol(key1): "kk"}
```
### 定义常量

#### ES5定义
* const COLOR_RED = "red";

#### Symbol.for()
* 单例模式
* 全局搜索被登记的值

#### Symbol.keyFor()
* 返回登记的值

## 3.1.1 Map, Set

### Map对象

* 保存键值对
* 任何值都能作为键和值

### 和Object 的区别
object | Map
:-:|:-:
键只能是string或Symbols | 键是任意值
键不是有序的 | 键值是有序的(FIFO)
键值个数对只能计算|键值个数从size属性获取
存在和原型链上的设置冲突| 无

### Map's Key
* 基本
```javascript
var myMap = new Map();

myMap.set(key, "value");
myMap.get(key);
```
* key的类型
    * 字符串
    * 对象
    * 函数
    * NaN

### Map的迭代
遍历。
* for...of

```javascript
	for(var[key, value] of myMap);
```
* forEach()
* Map对象的操作
	* Map与Array的转换
```javascript
var arr = [[1,2], [3,4]];

//convert to map
var myMap = new Map(arr);

// convert to arr
var outArray = Array.from(myMap);
```
	* Map克隆
```javascript
	myMap2 = new Map(myMap1);
```
	* Map合并
```javascript
var merge = new Map([...myMap1, ...myMap2]);
```

### Set 对象
	* 允许存储所有类型的唯一值
	* 判断相等的特殊值：
		* +0， -0
		* undefined
		* NaN
	* 实现
```javascript
mySet.add({a:1});
```

### 类型转换
* Array
	
```javascript
    var mySet = new 
    var arr = [...mySet];
    var mySet = new Set('Hello');
```

### 对象作用

* 数组去重
```javascript
var mySet = new Set([1, 2, 3, 4, 4]);
[...mySet]; // [1, 2, 3, 4]
```
* 并集
```javascript
new Set([...a, ...b])
```
* 交集
```javascript
new Set([...a].filter(x => b.has(x)))
```
* 差集
```javascript
new Set([...a].filter(x => !b.has(x)))
```

## Reflect and Proxy

### 概念
* 为了操作对象引入的 API 。

Proxy 可以对目标对象的读取、函数调用等操作进行拦截，然后进行操作处理。
* 它不直接操作对象，而是像代理模式，通过对象的代理对象进行操作，在进行这些操作时，可以添加一些需要的额外操作。

Reflect 可以用于获取目标对象的行为。
* 它与 Object 类似，但是更易读，为操作对象提供了一种更优雅的方式。它的方法与 Proxy 是对应的。

### 基本用法

#### Proxy

* 一个 Proxy 对象由两个部分组成： target 、 handler 。
* 在通过 Proxy 构造函数生成实例对象时，需要提供这两个参数。 
* target 即目标对象， handler 是一个对象，声明了代理 target 的指定行为。
```javascript
let target = {
    name: 'Tom',
    age: 24
}
let handler = {
    get: function(target, key) {
        console.log('getting '+key);
        return target[key]; // 不是target.key
    },
    set: function(target, key, value) {
        console.log('setting '+key);
        target[key] = value;
    }
}
let proxy = new Proxy(target, handler)
proxy.name     // 实际执行 handler.get
proxy.age = 25 // 实际执行 handler.set
```
#### apply(target, ctx, args)
* 用于拦截函数的调用、call 和 reply 操作。
* target 表示目标对象，ctx 表示目标对象上下文，args 表示目标对象的参数数组。
```javascript
function sub(a, b){
    return a - b;
}
let handler = {
    apply: function(target, ctx, args){
        console.log('handle apply');
        return Reflect.apply(...arguments);
    }
}
let proxy = new Proxy(sub, handler)
proxy(2, 1) 
// handle apply
// 1
```
#### HasProperty
* 用于拦截 HasProperty 操作
* 即在判断 target 对象是否存在 propKey 属性时，会被这个方法拦截
* 此方法不判断一个属性是对象自身的属性，还是继承的属性

#### Reflect

* Reflect 对象对某些方法的返回结果进行了修改，使其更合理。
* Reflect 对象使用函数的方式实现了 Object 的命令式操作。

## 3.2.1 字符串
### 扩展方法
* indexOf
* includes()：返回布尔值，判断是否找到参数字符串。
* startsWith()：返回布尔值，判断参数字符串是否在原字符串的头部。
* endsWith()：返回布尔值，判断参数字符串是否在原字符串的尾部。
* repeat(): 返回新的字符串，表示将字符串重复指定次数返回。
* padStart：返回新的字符串，表示用参数字符串从头部（左侧）补全原字符串。
* padEnd：返回新的字符串，表示用参数字符串从尾部（右侧）补全原字符串。

## 3.2.2 数值
* 二进制表示： 0B / 0b

## 3.2.3 对象

### 属性的简洁表示法
```javascript
	const age = 12;
	
	const person = {age: age};
```

### 对象的扩展运算符
拓展运算符（...）用于取出参数对象所有可遍历属性然后拷贝到当前对象。
```javascript
let person = {name: "Amy", age: 15};
ler person2 = ....;
let someone = {...person, ...person2};
someone;
```
#### Object.assign(target, source_1, ···)
用于将源对象的所有可枚举属性复制到目标对象中。
```javascript
let target = {a: 1};
let object2 = {b: 2};
let object3 = {c: 3};
Object.assign(target,object2,object3);  
// 第一个参数是目标对象，后面的参数是源对象
target;  // {a: 1, b: 2, c: 3
```

## 3.2.4 数组

### 数组创建
* Array.of()
将参数中所有值作为元素形成数组。
```javascript
console.log(Array.of(1, '2', true)); // [1, '2', true]
```
* Array.from()
```javascript
console.log(Array.from([1, , 3])); // [1, undefined, 3]
```
### 类数组对象
一个类数组对象必须含有 length 属性，且元素属性名必须是数值或者可转换为数值的字符。
```javascript
let arr = Array.from({
  0: '1',
  1: '2',
  2: 3,
  length: 3
});
console.log(); // ['1', '2', 3]
 
// 没有 length 属性,则返回空数组
let array = Array.from({
  0: '1',
  1: '2',
  2: 3,
});
console.log(array); // []
 
// 元素属性名不为数值且无法转换为数值，返回长度为 length 元素值为 undefined 的数组  
let array1 = Array.from({
  a: 1,
  b: 2,
  length: 2
});
console.log(array1); // [undefined, undefined]
```

### 扩展的方法
* find()
查找数组中符合条件的元素,若有多个符合条件的元素，则返回第一个元素。
```javascript
let arr = Array.of(1, 2, 3, 4);
console.log(arr.find(item => item > 2)); // 3
 
// 数组空位处理为 undefined
console.log([, 1].find(n => true)); // undefined
```
* findIndex()
查找数组中符合条件的元素索引，若有多个符合条件的元素，则返回第一个元素索引。

* fill()
将一定范围索引的数组元素内容填充为单个指定的值。

* copyWithin()
将一定范围索引的数组元素修改为此数组另一指定范围索引的元素。

* entries()
遍历键值对。

* keys()
遍历键名。

* values()
遍历键值。

* includes()
数组是否包含指定值。

* flat()
嵌套数组转一维数组.

* 复制数组
```javascript
let arr = [1, 2],
    arr1 = [...arr];
console.log(arr1); // [1, 2]
 
// 数组含空位
let arr2 = [1, , 3],
    arr3 = [...arr2];
console.log(arr3); [1, undefined, 3]
console.log([...[1, 2],...[3, 4]]); // [1, 2, 3, 4]
```

## 4.1 函数

* 不定参数： function f(...valuse){};

## 4.2迭代器
### Iterator
* 迭代器是一个统一的接口，它的作用是使各种数据结构可被便捷的访问，它是通过一个键为Symbol.iterator 的方法来实现。
* 迭代器是用于遍历数据结构元素的指针（如数据库中的游标）。

### 迭代过程
* 通过 Symbol.iterator 创建一个迭代器，指向当前数据结构的起始位置
* 随后通过 next 方法进行向下迭代指向下一个位置， next 方法会返回当前位置的对象，对象包含了 value 和 done 两个属性， value 是当前属性的值， done 用于判断是否遍历结束
* 当 done 为 true 时则遍历结束

```javascript
const items = ["zero", "one", "two"];
const it = items[Symbol.iterator]();
 
it.next();
>{value: "zero", done: false}
it.next();
>{value: "one", done: false}
it.next();
>{value: "two", done: false}
it.next();
>{value: undefined, done: true}
```

## Class类

### 概述
在ES6中，class (类)作为对象的模板被引入，可以通过 class 关键字定义类。
class 的本质是 function。
它可以看作一个语法糖，让对象原型的写法更加清晰、更像面向对象编程的语法。

### 基础用法
```javascript
// 匿名类
let Example = class {
    constructor(a) {
        this.a = a;
    }
}
// 命名类
let Example = class Example {
    constructor(a) {
        this.a = a;
    }
}

// 类声明
class Example {
    constructor(a) {
        this.a = a;
    }
}
```
### 类的主体
* prototype
* 添加方法： Object.assign(Example.prototype,{});
* 静态属性： static
* decorator: decorator 是一个函数，用来修改类的行为，在代码编译时产生作用。
* 类修饰:
```javascript
function testable(target) {
    target.isTestable = true;
}
@testable
class Example {}
Example.isTestable; // true
```
* 方法修饰：
```javascript
class Example {
    @writable
    sum(a, b) {
        return a + b;
    }
}
function writable(target, name, descriptor) {
    descriptor.writable = false;
    return descriptor; // 必须返回
}
```

## 4.4 模块

### 概述
* RequireJS
* seaJS
* ES6 -> export, import

* use strict

### export, import
* export 命令可以出现在模块的任何位置，但必需处于模块顶层。
* import 命令会提升到整个模块的头部，首先执行。
```javascript
/*-----export [test.js]-----*/
let myName = "Tom";
let myAge = 20;
let myfn = function(){
    return "My name is" + myName + "! I'm '" + myAge + "years old."
}
let myClass =  class myClass {
    static a = "yeah!";
}
export { myName, myAge, myfn, myClass }
 
/*-----import [xxx.js]-----*/
import { myName, myAge, myfn, myClass } from "./test.js";
console.log(myfn());// My name is Tom! I'm 20 years old.
console.log(myAge);// 20
console.log(myName);// Tom
console.log(myClass.a );// yeah!
```

### as
as 重新定义导出的接口名称，隐藏模块内部的变量
```javascript
/*-----export [test.js]-----*/
let myName = "Tom";
export { myName as exportName }
 
/*-----import [xxx.js]-----*/
import { exportName } from "./test.js";
console.log(exportName);// Tom
使用 as 重新定义导出的接口名称，隐藏模块内部的变量
/*-----export [test1.js]-----*/
let myName = "Tom";
export { myName }
/*-----export [test2.js]-----*/
let myName = "Jerry";
export { myName }
/*-----import [xxx.js]-----*/
import { myName as name1 } from "./test1.js";
import { myName as name2 } from "./test2.js";
console.log(name1);// Tom
console.log(name2);// Jerry
```

## 5.1 Promise对象
### 概述
* 异步编程的一种解决方案。
* Promise 是一个对象，从它可以获取异步操作的消息。

### Promise状态
#### 状态的特点
* Promise 异步操作有三种状态：
	* pending（进行中）
	* fulfilled（已成功）
	* rejected（已失败）。
* 除了异步操作的结果，任何其他操作都无法改变这个状态。

* Promise 对象只有：
	* 从 pending 变为 fulfilled 和从 pending 变为 rejected 的状态改变。
	* 只要处于 fulfilled 和 rejected ，状态就不会再变了即 resolved（已定型）。

```javascript
const p1 = new Promise(function(resolve,reject){
    resolve('success1');
    resolve('success2');
}); 
const p2 = new Promise(function(resolve,reject){  
    resolve('success3'); 
    reject('reject');
});
p1.then(function(value){  
    console.log(value); // success1
});
p2.then(function(value){ 
    console.log(value); // success3
});
```

#### 状态的缺点
* 无法取消 Promise ，一旦新建它就会立即执行，无法中途取消。
* 如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。
* 当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

#### then方法
* then 方法接收两个函数作为参数。
* 第一个参数是 Promise 执行成功时的回调。
* 第二个参数是 Promise 执行失败时的回调。
* 两个函数只会有一个被调用。

- 特点
* 在 JavaScript 事件队列的当前运行完成之前，回调函数永远不会被调用。
```javascript
const p = new Promise(function(resolve,reject){
  resolve('success');
});
 
p.then(function(value){
  console.log(value);
});
 
console.log('first');
// first
// success
```

* 通过` .then` 形式添加的回调函数，不论什么时候，都会被调用。
* `then`常用于多次调用

添加多个回调函数，按照插入顺序独立运行
```javascript
const p = new Promise(function(resolve,reject){
  resolve(1);
}).then(function(value){ // 第一个then // 1
  console.log(value);
  return value * 2;
}).then(function(value){ // 第二个then // 2
  console.log(value);
}).then(function(value){ // 第三个then // undefined
  console.log(value);
  return Promise.resolve('resolve'); 
}).then(function(value){ // 第四个then // resolve
  console.log(value);
  return Promise.reject('reject'); 
}).then(function(value){ // 第五个then //reject:reject
  console.log('resolve:' + value);
}, function(err) {
  console.log('reject:' + err);
});
```
* then 方法将返回一个 resolved 或 rejected 状态的 Promise 对象用于链式调用
* Promise 对象的值就是这个返回值。

- 注意点
* 简便的 Promise 链式编程最好保持扁平化。
* 不要嵌套 Promise。
* 注意总是返回或终止 Promise 链。
```javascript
const p1 = new Promise(function(resolve,reject){
  resolve(1);
}).then(function(result) {
  p2(result).then(newResult => p3(newResult));
}).then(() => p4());
```
* 创建新 Promise 但忘记返回它时，对应链条被打破，导致 p4 会与 p2 和 p3 同时进行。
* 大多数浏览器中不能终止的 Promise 链里的 rejection，建议后面都跟上 .catch(error => console.log(error));

#### Promise优缺点

- 优点
* 有了 Promise 对象，就可以将异步操作以同步操作的流程表达出来
* 避免了层层嵌套的回调函数。
* Promise 对象提供统一的接口，使得控制异步操作更加容易。

- 缺点
* 无法取消 Promise，一旦新建它就会立即执行，无法中途取消。
* 如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。
* 当处于 Pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

#### 深入Promise参数
* Promise 构造函数包含一个参数和一个带有 resolve（解析）和 reject（拒绝）两个参数的回调。
* 在回调中执行一些操作（例如异步），如果一切都正常，则调用 resolve，否则调用 reject。
```javascript
var myFirstPromise = new Promise(function(resolve, reject){
    //当异步代码执行成功时，我们才会调用resolve(...), 当异步代码失败时就会调用reject(...)
    //在本例中，我们使用setTimeout(...)来模拟异步代码，实际编码时可能是XHR请求或是HTML5的一些API方法.
    setTimeout(function(){
        resolve("成功!"); //代码正常执行！
    }, 250);
});
 
myFirstPromise.then(function(successMessage){
    //successMessage的值是上面调用resolve(...)方法传入的值.
    //successMessage参数不一定非要是字符串类型，这里只是举个例子
    document.write("Yay! " + successMessage);
});
```

* 已经实例化过的 promise 对象可以调用 promise.then() 方法，传递 resolve 和 reject 方法作为回调。
* promise.then() 是 promise 最为常用的方法。
```javascript
promise.then(onFulfilled, onRejected)
// above means that following
promise.then(onFulfilled).catch(onRejected)
```
#### Promise Ajax
```javascript
function ajax(URL) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest(); 
        req.open('GET', URL, true);
        req.onload = function () {
        if (req.status === 200) { 
                resolve(req.responseText);
            } else {
                reject(new Error(req.statusText));
            } 
        };
        req.onerror = function () {
            reject(new Error(req.statusText));
        };
        req.send(); 
    });
}
var URL = "/try/ajax/testpromise.php"; 
ajax(URL).then(function onFulfilled(value){
    document.write('内容是：' + value); 
}).catch(function onRejected(error){
    document.write('错误：' + error); 
});
```

#### Promise.prototype.then方法：链式操作
```javascript
getJSON("/post/1.json").then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments) {
  // some code
}).catch(function(error) {
  // 处理前两个回调函数的错误
});
```
* 上面的代码使用 then 方法，依次指定了两个回调函数。
* 第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。
* 如果前一个回调函数返回的是Promise对象，这时后一个回调函数就会等待该Promise对象有了运行结果，才会进一步调用。

#### Promise.all, Promise.race
Promise.all 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
```javascript
Promise.all([p1,p2,p3]);
var p = Promise.race([p1,p2,p3]);
```

#### resolve, reject
两种方法可以返回promise
```javascript
var p = Promise.reject('出错了');
 
p.then(null, function (s){
  console.log(s)
});
// 出错了
var p = Promise.resolve('Hello');
 
p.then(function (s){
  console.log(s)
});
// Hello
```

## 5.2 Generator
Generator 函数，可以通过 yield 关键字，把函数的执行流挂起，为改变执行流程提供了可能，从而为异步编程提供解决方案。

### 组成
* function后，函数名前有个*，表示Generator
* yield，定义函数内部状态

### 执行机制
* Generator 函数不会像普通函数一样立即执行。
* 而是返回一个指向内部状态对象的指针。
* 要调用遍历器对象Iterator 的 next 方法，指针就会从函数头部或者上一次停下来的地方开始执行。
```javascript
f.next();
// one
// {value: "1", done: false}
 
f.next();
// two
// {value: "2", done: false}
 
f.next();
// three
// {value: "3", done: true}
 
f.next();
// {value: undefined, done: true}
```
### return方法
* return 方法返回给定值，并结束遍历 Generator 函数。
* return 方法提供参数时，返回该参数；不提供参数时，返回 undefined 。
```javascript
function* foo(){
    yield 1;
    yield 2;
    yield 3;
}
var f = foo();
f.next();
// {value: 1, done: false}
f.return("foo");
// {value: "foo", done: true}
f.next();
// {value: undefined, done: true}
throw 方法
throw 方法可以再 Generator 函数体外面抛出异常，再函数体内部捕获。
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('catch inner', e);
  }
};
 
var i = g();
i.next();
 
try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('catch outside', e);
}
// catch inner a
// catch outside b

```

## async
异步操作.

* 基础语法：`async function name([param[, param[, ... param]]]) { statements }`
* 返回：一个promise对象。
* await：遇到 await 就会先暂停执行 ，等到触发的异步操作完成后，恢复 async 函数的执行并返回解析值。
```javascript
function testAwait(){
   return new Promise((resolve) => {
       setTimeout(function(){
          console.log("testAwait");
          resolve();
       }, 1000);
   });
}
 
async function helloAsync(){
   await testAwait();
   console.log("helloAsync");
 }
helloAsync();
// testAwait
// helloAsync
```
- await针对所跟不同表达式的处理方式：

* Promise 对象：await 会暂停执行，等待 Promise 对象 resolve，然后恢复 async 函数的执行并返回解析值。
* 非 Promise 对象：直接返回对应的值。

## 总结图

![ES6][01]

[01]: ./es6-tutorial.jpg "es6"