TypeScript 目录
[TOC]
***
# 前言
此文为ts整理
- 适合有一定js基础者阅读
- 具体语法，请参考推荐阅读

# 推荐阅读
- [TypeScript官方doc](https://www.tslang.cn/docs/home.html "官方DOC")
- [菜鸟教程](https://www.runoob.com/typescript/ts-tutorial.html "菜鸟教程")

# TypeScript定位
- `TS`设计目标是开发大型应用，可以编译成纯`JavaScript`
- `TS`是一种给`JavaScript`添加特性的语言扩展
## 扩展功能
- 类型批注和编译时类型检查
- 类型推断
- 类型擦除
- 接口
- 枚举
- Mixin
- 泛型编程
- 名字空间
- 元组
- Await
## 与`JavaScript`的区别
- `TS`是超集，扩展了语法
- `TS`可处理已有的`JS`代码，并只对其中的`TS`代码进行编译
![1-ty][01]

sample:
```ts
const hello: string = "Hello World!"
consolr.log(hello);
```
***
# 安装
> 需要用到npm，如果没有，请安装

- NPM安装：`npm install -g typescript`
- 查看版本号：`tsc -v`
- 编译：`tsc filename`
![2-typescript_compiler.png][02]
- 运行：`node filename`
## tsc常用编译参数
1. --help：显示帮助信息
2. --module：载入扩展模块
3. --target：设置 ECMA 版本
4. --declaration：额外生成一个 .d.ts 扩展名的文件。
`tsc ts-hw.ts --declaration`以上命令会生成 ts-hw.d.ts、ts-hw.js 两个文件。
5. --removeComments：删除文件的注释
6. --out：编译多个文件并合并到一个输出的文件
7. --sourcemap：生成一个 sourcemap (.map) 文件。
sourcemap 是一个存储源代码与编译代码对应位置映射的信息文件。
8. --module noImplicitAny：在表达式和声明上有隐含的 any 类型时报错
9. --watch：在监视模式下运行编译器。会监视输出文件，在它们改变时重新编译。

## 面向对象编程
```ts
class Site {
    name(): void{
        console.log("test");
    }
}

var obj = new Site();
obj.name();
```

# 基础类型
- 任意类型：any
- 数字类型：number `let test: number = 6;`
- 字符串类型：string
- 布尔类型：boolean
- 数组类型：`let arr: number[] = [1,2];`
- 元组：`let x: [string, number];x = ["xx", 1]`
- 枚举：enum `enum Color {red, Green, Blue}; let c: color = Color.red;`
- never：never 代表从不会出现的值

## Any
针对编程时类型不明确的变量使用的一种数据类型，常用于：
1. 变量的值会动态改变，比如用户输入
```ts
let x: any = 1;
x = 'I am';
```
2. 移除类型检查
```ts
let x: any = 1;
x.ifItExists(); // 正确，方法运行时可能存在，但不会检查
x.toFixed();    //正确
```
3. 定义存储各种类型数据的数组
```ts
let arrayList: any[] = [1, false, 'fine'];
arrayList[1] = 100;
```
## 多种类型声明
- 如果一个类型可能出现`null`,`undefined`，可以用`|`来支持多种类型
```ts
let x: number | null | undefined;

x = 1;
x = undefined;
x = null;
```
## never类型
- 其他类型的子类型，代表从不会出现的值
- never类型的变量只能被`never`类型所赋值
- 常表现为抛出异常或无法执行到终止点
```ts
let x: never;
let y: number;

// 运行错误，数字类型不能转为 never 类型
x = 123;

// 运行正确，never 类型可以赋值给 never类型
x = (()=>{ throw new Error('exception')})();

// 运行正确，never 类型可以赋值给 数字类型
y = (()=>{ throw new Error('exception')})();

// 返回值为 never 的函数可以是抛出异常的情况
function error(message: string): never {
    throw new Error(message);
}

// 返回值为 never 的函数可以是无法被执行到的终止点的情况
function loop(): never {
    while (true) {}
}
```
# 变量声明
- `var [name]: [type] = value;`
- 不声明`type`，默认是任意类型
## 类型断言(Type Assertion)
- 类型断言可以用来手动指定一个值的类型，即允许变量从一种类型更改为另一种类型
- `<Type>value` 或者 `value as Type`
```ts
var str = "1";
var str2: number = <number><any> str;    // str, str2是string类型
console.log(str2);
```
# 函数
- `function name(param [:datatype]): return_type{return value;}`
```ts
function add(x:number, y:number): number{
    return x + y;
}

console.log(add(1,2));
```
## 函数重载
- 函数名相同，参数不同，返回类型相同或不同
- 每个重载的方法，都必须有一个独一无二的参数类型列表

# Map对象
Map 相关的函数与属性：
- map.clear() – 移除 Map 对象的所有键/值对 。
- map.set() – 设置键值对，返回该 Map 对象。
- map.get() – 返回键对应的值，如果不存在，则返回 undefined。
- map.has() – 返回一个布尔值，用于判断 Map 中是否包含键对应的值。
- map.delete() – 删除 Map 中的元素，删除成功返回 true，失败返回 false。
- map.size – 返回 Map 对象键/值对的数量。
- map.keys() - 返回一个 Iterator 对象， 包含了 Map 对象中每个元素的键 。
- map.values() – 返回一个新的Iterator对象，包含了Map对象中每个元素的值 。

# 元组
如果存储的元素数据类型不同，则需要使用元组

# 联合类型
通过管道将变量设置为多种类型
- `var Type1|Type2|Type3[]`

# 接口
一系列抽象方法的声明，方法特征的集合
接口定义：
```ts
interface interface_name extends parent1, parent2{
	firstName: string,
	sayHi: ()=>string,
	[index: number]:string
}
```

# 类
- 不支持多重继承
- 支持方法重写，支持`super`
- 存在访问控制修饰符

# 对象的类型模板
```ts
var sites = {
    site1: "Runoob",
    site2: "Google",
    sayHello: function () { } // 类型模板
};
sites.sayHello = function () {
    console.log("hello " + sites.site1);
};
sites.sayHello();
```
## 鸭子类型-多态
```ts
interface IPoint { 
    x:number 
    y:number 
} 
function addPoints(p1:IPoint,p2:IPoint):IPoint { 
    var x = p1.x + p2.x 
    var y = p1.y + p2.y 
    return {x:x,y:y} 
} 
 
// 正确
var newPoint = addPoints({x:3,y:4},{x:5,y:1})  
 
// 错误 
var newPoint2 = addPoints({x:1},{x:4,y:3})
```
# 命名空间
- 定义：
```ts
namespace SomeNameSpaceName { 
   export interface ISomeInterfaceName {      }  
   export class SomeClassName {      }  
}
```
- 调用：`SomeNameSpaceName.SomeClassName;`
- 命名空间在单独的`TypeScript`文件中引用：`/// <reference path = "SomeFileName.ts" />`
sample:
```ts
// IShape.ts
namespace Drawing { 
    export interface IShape { 
        draw(); 
    }
}
// Circle.ts
/// <reference path = "IShape.ts" /> 
namespace Drawing { 
    export class Circle implements IShape { 
        public draw() { 
            console.log("Circle is drawn"); 
        }  
    }
}

// Triangle.ts
/// <reference path = "IShape.ts" /> 
namespace Drawing { 
    export class Triangle implements IShape { 
        public draw() { 
            console.log("Triangle is drawn"); 
        } 
    } 
}
```
- 编译：`tsc --out app.js filename`

# 模块
## 导出
```ts
// 文件名 : SomeInterface.ts 
export interface SomeInterface { 
   // 代码部分
}
```
## 导入
`import someInterfaceRef = require("./SomeInterface");`

## 编译
`tsc --module amd filename`

# 声明文件
`declare module Module_Name {}`
例子：
```ts
declare module Runoob { 
   export class Calc { 
      doSum(limit:number) : number; 
   }
}
```

***
[01]: ./img/1-ty "1-ty"
[02]: ./img/2-typescript_compiler.png "2-typescript_compiler.png"