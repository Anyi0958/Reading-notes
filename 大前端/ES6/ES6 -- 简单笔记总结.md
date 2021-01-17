[TOC]
# ES6 - 简单笔记总结

## JSON
当非JSON对象的字符串进行解构时：
* const { str : len} = str; str = 'sss';
* len的返回值会自动变成长度的估计；

## 严格模式
- use strict
```javascript
"use strict";
x = 3.14; // x 没有声明导致了报错

//sample
let catName;
let quote;
function catTalk() {
  "use strict";

  catName = "Oliver";
  quote = catName + " says Meow!";

}
catTalk();
```

## 箭头函数编写简洁的匿名函数
经常遇到不需要给函数命名的情况，尤其是在需要将一个函数作为参数传给另外一个函数的时候。这时，我们会创建匿名函数。因为这些函数不会在其他地方复用，所以我们不需要给它们命名。
```javascript
//原来的
const myFunc = function() {
  const myVar = "value";
  return myVar;
}

//箭头函数.提供了其他写匿名函数的方式的语法糖。你可以使用箭头函数
const myFunc = () => {
  const myVar = "value";
  return myVar;
}

// 当不需要函数体，只返回一个值的时候，
// 箭头函数允许你省略return关键字和外面的大括号。
//这样就可以将一个简单的函数简化成一个单行语句。
const myFunc= () => "value"


// 带参
// 给传入的数值乘以 2 并返回结果
const doubler = (item) => item * 2;
```
## 高阶箭头函数
箭头函数在类似map()，filter()，reduce()等需要其他函数作为参数来处理数据的高阶函数里会很好用。
```javascript
FBPosts.filter(function(post) {
  return post.thumbnail !== null && post.shares > 100 && post.likes > 500;
})

FBPosts.filter((post) => post.thumbnail !== null && post.shares > 100 && post.likes > 500)

```

## 设置函数的默认参数
默认参数会在参数没有被指定（值为 undefined ）的时候起作用。
参数name会在没有得到新的值的时候，默认使用值 "Anonymous"。
你还可以给多个参数赋予默认值。
```javascript
function greeting(name = "Anonymous") {
  return "Hello " + name;
}
console.log(greeting("John")); // Hello John
console.log(greeting()); // Hello Anonymous
```

## rest 操作符 与 函数参数一起使用
ES6 推出了用于函数参数的 rest 操作符帮助我们创建更加灵活的函数。在rest操作符的帮助下，你可以创建有一个变量来接受多个参数的函数。这些参数被储存在一个可以在函数内部读取的数组中。

* rest操作符可以避免查看args数组的需求，并且允许我们在参数数组上使用map(),filter()，和reduce()。

```javascript
function howMany(...args) {
  return "You have passed " + args.length + " arguments.";
}
// 输出：You have passed 3 arguments.
console.log(howMany(0, 1, 2)); 
// 输出：You have passed 4 arguments.
console.log(howMany("string", null, [1, 2, 3], { })); 
```

##  spread 运算符展开数组项
apply()来计算数组的最大值.
```javascript
//ES5
//必须使用Math.max.apply(null,arr)，是因为直接调用Math.max(arr)会返回NaN。
//Math.max()函数需要传入的是一系列由逗号分隔的参数，而不是一个数组。
var arr = [6, 89, 3, 45];
var maximus = Math.max.apply(null, arr); // 返回 89

//ES6
const arr = [6, 89, 3, 45];
const maximus = Math.max(...arr); // 返回 89
//...arr返回了一个“打开”的数组。或者说它 展开 了数组。
let arr2 = [...arr1];

//展开操作符只能够在函数的参数中，或者数组之中使用。下面的代码将会报错：
const spreaded = ...arr; // 将会发生语法错误
```

## 使用解构赋值从对象中分配变量
解构赋值 就是可以从对象中直接获取对应值的语法。
```javascript
//ES5
var voxel = {x: 3.6, y: 7.4, z: 6.54 };
var x = voxel.x; // x = 3.6
var y = voxel.y; // y = 7.4
var z = voxel.z; // z = 6.54

//ES6
const { x, y, z } = voxel; // x = 3.6, y = 7.4, z = 6.54


//如果你想将voxel.x,voxel.y,voxel.z的值分别赋给a,b,c
//可以用以下这种很棒的方式：
const { x : a, y : b, z : c } = voxel; // a = 3.6, b = 7.4, c = 6.54
//将x地址中的值拷贝到a当中去。


//使用解构语法去得到输入的str字符串的长度，并将长度赋值给len。
function getLength(str) {
  "use strict";

  // 在这行以下修改代码
  const {length : len} = str; // change this
  // 在这行以上修改代码

  return len; // 你必须在这行将 length 赋值给 len

}

console.log(getLength('FreeCodeCamp'));
```

## 使用解构赋值从嵌套对象中分配变量
```javascript
//在上面的例子里，a.start将值赋给了变量start，start同样也是个对象。
const a = {
  start: { x: 5, y: 6},
  end: { x: 6, y: -9 }
};
const { start : { x: startX, y: startY }} = a;
console.log(startX, startY); // 5, 6


//sample
const LOCAL_FORECAST = {
  today: { min: 72, max: 83 },
  tomorrow: { min: 73.3, max: 84.6 }
};

function getMaxOfTmrw(forecast) {
  "use strict";
  // 在这行以下修改代码
  const { tomorrow : { max : maxOfTomorrow } } = forecast; 
  // 改变这一行
  // 在这行以上修改代码
  return maxOfTomorrow;
}

console.log(getMaxOfTmrw(LOCAL_FORECAST)); // 应该为 84.6
```

## 使用解构赋值从数组中分配变量
与数组解构不同，数组的扩展运算会将数组里的所有内容分解成一个由逗号分隔的列表。
所以，你不能选择哪个元素来给变量赋值。
```javascript
//变量a以及b分别被数组的第一、第二个元素赋值。
const [a, b] = [1, 2, 3, 4, 5, 6];
console.log(a, b); // 1, 2

//在数组解构中使用逗号分隔符，来获取任意一个想要的值：
const [a, b,,, c] = [1, 2, 3, 4, 5, 6];
console.log(a, b, c); // 1, 2, 5
```

## 使用解构赋值配合 rest 操作符来重新分配数组元素

* 变量a与b分别获取了数组的前两个元素的值。之后，因为rest操作符的存在，arr获取了原数组剩余的元素的值，并构成了一个新的数组。
* rest操作只能对数组列表最后的元素起作用。这意味着你不能使用rest操作符来截取原数组中间元素的子数组。
```javascript
// 以下代码的结果与使用Array.prototype.slice()相同：
const [a, b, ...arr] = [1, 2, 3, 4, 5, 7];
console.log(a, b); // 1, 2
console.log(arr); // [3, 4, 5, 7]
```

## 使用解构赋值将对象作为函数的参数传递
可以在函数的参数里直接解构对象。
* 函数不需要再去操作整个对象，而仅仅是操作复制到函数作用域内部的参数。
* 去除了多余的代码，使代码更加整洁。
```javascript
const profileUpdate = (profileData) => {
  const { name, age, nationality, location } = profileData;
  // 对这些变量执行某些操作
}

const profileUpdate = ({ name, age, nationality, location }) => {
  /* 对这些参数执行某些操作 */
}
```

## 使用模板字面量创建字符串
* 模板字符串是 ES6 的另外一项新的功能。这是一种可以轻松构建复杂字符串的方法。
```javascript
const person = {
  name: "Zodiac Hasbro",
  age: 56
};

// string interpolation
const greeting = `Hello, my name is ${person.name}!
I am ${person.age} years old.`;

console.log(greeting); // 打印出
// Hello, my name is Zodiac Hasbro!
// I am 56 years old.
```
* 首先，上面使用的${variable}语法是一个占位符。这样一来，你将不再需要使用+运算符来连接字符串。当需要在字符串里增加变量的时候，你只需要在变量的外面括上${和}，并将其放在字符串里就可以了。
* 其次，在例子使用了反引号（\`），而不是引号（'或者"）将字符串括了起来，并且这个字符串可以换行。

## 使用简单字段编写简洁的对象字面量声明
```javascript
const getMousePosition = (x, y) => ({
  x: x,
  y: y
});
```
* ES6 提供了一个语法糖，消除了类似x: x这种冗余的写法.你可以仅仅只写一次x，解释器会自动将其转换成x: x。
```javascript
const getMousePosition = (x, y) => ({ x, y });
```

## 用 ES6 编写简洁的函数声明
* 需要在对象中定义一个函数的时候，我们必须如下面这般使用function关键字：
```javascript
const person = {
  name: "Taylor",
  sayHello: function() {
    return `Hello! My name is ${this.name}.`;
  }
};
```

* 在 ES6 语法的对象中定义函数的时候，你可以完全删除function关键字和冒号。
```javascript
const person = {
  name: "Taylor",
  sayHello() {
    return `Hello! My name is ${this.name}.`;
  }
};
```

## 使用 class 语法定义构造函数
* 在 ES5 里面，我们通常会定义一个构造函数，然后使用 new关键字来实例化一个对象

```javascript
var SpaceShuttle = function(targetPlanet){
  this.targetPlanet = targetPlanet;
}
var zeus = new SpaceShuttle('Jupiter');
```

* class的语法只是简单地替换了构造函数的写法
```javascript
class SpaceShuttle {
  constructor(targetPlanet){
    this.targetPlanet = targetPlanet;
  }
}
const zeus = new SpaceShuttle('Jupiter');
```
* 注意class关键字声明了一个新的函数，并在其中添加了一个会在使用new关键字创建新对象时调用的构造函数。

## 使用 getter 和 setter 来控制对象的访问
* 可以从对象中获得一个值，也可以给对象的属性赋值。
* 这些通常行为被称为 getters 以及 setters。
* Getter 函数的作用是可以让返回一个对象私有变量的值给用户，而不需要直接去访问私有变量。
* Setter 函数的作用是可以基于传进的参数来修改对象中私有变量的值。这些修改可以是计算，或者是直接替换之前的值。
```javascript
class Book {
  constructor(author) {
    this._author = author;
  }
  // getter
  get writer(){
    return this._author;
  }
  // setter
  set writer(updatedAuthor){
    this._author = updatedAuthor;
  }
}
const lol = new Book('anonymous');
console.log(lol.writer);  // anonymous
lol.writer = 'wut';
console.log(lol.writer);  // wut
```

## 了解 import 和 require 之间的差异
* 在过去，我们会使用require()函数来从外部文件或模块中引入函数或者代码。这时候会遇到一个问题：有些文件或者模块会特别大，但你却往往只需要引入其中的一些核心代码。
* ES6 给我们提供了import这个便利的工具。通过它，我们能够从外部的文件或者模块中选择我们需要的部分进行引入，从而节约载入的时间和内存空间。
* 请看下面的例子：想象math_array_functions拥有大概20个函数，但是我只需要countItems这一个函数在我当前的文件里。使用老的require()方式会强制我引入所有20个函数。而使用新的import语法，我可以只引入需要的那个函数：
```javascript
import { countItems } from "math_array_functions"

//语义解释
import { function } from "file_path_goes_here"
// 我们还可以用同样的方式来引入变量！

//对import的使用，有许多的写法，但是上面的例子是最常用的写法。
```
注意：
* 在大括号里的函数名的两侧加上空格是一个最佳实践——这可以帮助我们轻松的阅读import语句。
* import以及与其相关的在后面课程中的语句，是无法直接在浏览器上运行的。但是，我们可以通过一些工具来使它可以在浏览器中运行。
* 在许多的例子中，在文件的路径前会加上./；否则， node.js 会先尝试去node_modules目录中寻找依赖项。

## 用 export 来重用代码块
* 学习了关于import语句是如何从大文件中引入其中的部分代码的。但是，为了让其正常的工作，我们还必须了解一个与之相关的语句，叫做export。
* 当我们想要一些代码——函数或者变量——在其他文件中使用，我们必须将它们导出来供其他文件导入。和import一样，export也是一个非浏览器的功能。
* 下面的例子阐述了如何进行一个命名导出。通过这样，我们可以使用上节课学习的import语法，将导出的代码导入到其他的文件中去。请看下面的例子：
```javascript
const capitalizeString = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export { capitalizeString } //如何导出函数。
export const foo = "bar"; //如何导出变量。


//如果你想要将你所有的export语句打包成一行，你可以像下面这个例子一样实现：
const capitalizeString = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const foo = "bar";
export { capitalizeString, foo }
```

## 用 * 从文件中导入所有内容
```javascript
// 导入所有
import * as myMathModule from "math_functions";
myMathModule.add(2,3);
myMathModule.subtract(5,3);

import * as object_with_name_of_your_choice from "file_path_goes_here"
object_with_name_of_your_choice.imported_function
```
* 你可以在import * as之后添加任意的名称。这个方法接收到的值是一个对象，你可以使用点表示法来获取对象里具体的值。

## 用 export default 创建一个默认导出
* 另外一种被称为默认导出的export的语法。在文件中只有一个值需要导出的时候，你通常会使用这种语法。它也常常用于给文件或者模块创建返回值。
```javascript
export default function add(x,y) {
  return x + y;
}
```
注意：
* 当使用export default去声明一个文件或者模块的返回值，你在每个文件或者模块中应当只默认导出一个值。特别地，你能将export deafult与var，let与const一起使用。


