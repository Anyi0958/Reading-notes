JS-基础算法 目录
[TOC]
***

# 前言

- 源自：[freecodecamp](https://learn.freecodecamp.one/ "freecodecamp")

# 推荐阅读

- [freecodecamp](https://learn.freecodecamp.one/ "freecodecamp")

# 1. 反转字符串 - `split, reverse, join`

```js
function reverseString(str) {
  return str
    .split("")
    .reverse()
    .join("");
}

//join() 方法用于把数组中的所有元素放入一个字符串。
//reverse() 方法用于颠倒数组中元素的顺序。
```



# 2. 数字的阶乘 - `递归, array, reduce, fill`

- 返回一个给定整数的阶乘。 

- 若 n 是一个整数，n 的阶乘就是所有小于等于 n 的正整数的乘积。 
- n 的阶乘通常用符号 n!来表示。 
- 例如： 5! = 1 * 2 * 3 * 4 * 5 = 120 
- 只有非负整数会被作为函数的输入参数。

## 1. 递归

```js
//1.递归
function factorialize(num) {
  if (num === 0) {
    return 1;
  }
  return num * factorialize(num - 1);
}

factorialize(5);
```

## 2. 参数递归

```js
//2.第二类，参数递归
function factorialize(num, factorial = 1) {
  if (num == 0) {
    return factorial;
  } else {
    return factorialize(num - 1, factorial * num);
  }
}
factorialize(5);
```

## 3. `Array, reduce, fill`

```js
//3.Array, reduce, fill
function factorialize(num, factorial = 1) {
  return num < 0 ? 1 : (
    new Array(num)
      .fill(undefined)
      .reduce((product, val, index) => product * (index + 1), 1)
  );
}
factorialize(5);
```

# 3. 查找字符串中最长的单词

## 1. `split`

```js
// 1.split切割后，遍历数组判断长度
function findLongestWordLength(str) {
  var words = str.split(' ');
  var maxLength = 0;

  for (var i = 0; i < words.length; i++) {
    if (words[i].length > maxLength) {
      maxLength = words[i].length;
    }
  }

  return maxLength;
}
```

## 2. `reduce`

```js
// 2.reduce比较最大值，类似于比值排序
function findLongestWordLength(s) {
  return s.split(' ')
    .reduce(function(x, y) {
      return Math.max(x, y.length)
    }, 0);
}
```

## 3. `map`

```js
// 3.map
//map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
//map() 方法按照原始数组元素顺序依次处理元素。
//注意： map() 不会对空数组进行检测。
//注意： map() 不会改变原始数组。

function findLongestWordLength(str) {
  return Math.max(...str.split(" ").map(word => word.length));
}
```

## 4. `递归`

```js
// 4.递归
function findLongestWordLength(str) {
  //split the string into individual words
  //(important!!, you'll see why later)
  str = str.split(" ");

  //str only has 1 element left that is the longest element,
  //return the length of that element
  if (str.length == 1) {
    return str[0].length;
  }

  //if the first element's length is greater than the second element's (or equal)
  //remove the second element and recursively call the function)
  if (str[0].length >= str[1].length) {
    str.splice(1, 1);
    return findLongestWordLength(str.join(" "));
  }

  //if the second element's length is greater thant the first element's start
  //call the function past the first element
  if (str[0].length <= str[1].length) {
    // from the first element to the last element inclusive.
    return findLongestWordLength(str.slice(1, str.length).join(" "));
  }
```

## 例子

```js
function findLongestWordLength(str) {
  return str.split(' ')
      .reduce((length,val) => Math.max(length, val.length), 0);
}

findLongestWordLength("The quick brown fox jumped over the lazy dog");



function findLongestWordLength(str) {
  return Math.max(...str.split(' ').map(val => val.length));
}

findLongestWordLength("The quick brown fox jumped over the lazy dog");
```

# 4. 返回数组中最大的数字

- 返回一个数组，它要由给出的所有子数组中的最大值组成。

## 1. `map, reduce`

```js
// 双重数组
//返回一个数组，它要由给出的所有子数组中的最大值组成。简单起见，给出的数组总会包含4个子数组。
// 1.map + reduce比较

function largestOfFour(arr) {
  return arr.map(function(group) {
    return group.reduce(function(prev, current) {
      return current > prev ? current : prev;
    });
  });
}
```

## 2. `apply, bind`

```js
// [[1,2,3], [4,5,6]]
// 2.apply, bind 实现
function largestOfFour(arr) {
  return arr.map(Function.apply.bind(Math.max, null));
}
```

### 解释

apply、bind方法解释：

TL;DR: We build a special callback function (using the `Function.bind` method), that works just like `Math.max` but also has Function.prototype.apply's ability to take arrays as its arguments.

- We start by mapping through the elements inside the main array. Meaning each one of the inner arrays.
- Now the need a callback function to find the max of each inner array provided by the map.

So we want to create a function that does the work of Math.max and accepts input as an array (which by it doesn’t by default).

In other words, it would be really nice and simple if this worked by itself:

Math.max([9, 43, 20, 6]); // Resulting in 43

Alas, it doesn’t.

- To do the work of accepting arguments in the shape of an array, there is this Function.prototype.apply method, but it complicates things a bit by invoking the context function.

i.e. Math.max.apply(null, [9, 43, 20, 6]); would invoke something like a Max.max method. What we’re looking for… almost.

Here we’re passing null as the context of the Function.prototype.apply method as Math.max doesn’t need any context.

- Since arr.map expects a callback function, not just an expression, we create a function out of the previous expression by using the Function.bind method.
- Since, Function.prototype.apply is a static method of the same Function object, we can call Function.prototype.bind on Function.prototype.apply i.e. Function.prototype.apply.bind.
- Now we pass the context for the Function.prototype.apply.bind call (in this case we want Math.maxso we can gain its functionality).
- Since the embedded Function.prototype.apply method will also require a context as it’s 1st argument, we need to pass it a bogus context.

- - So, we pass null as the 2nd param to Function.prototype.apply.bind which gives a context to the Math.max method.
  - Since, Math.max is independent of any context, hence, it ignores the bogus context given by Function.prototype.apply method call.
  - Thus, our Function.prototype.apply.bind(Math.max, null) makes a new function accepting the arr.map values i.e. the inner arrays.

### `call, apply, bind`用法

![img](.\img\call.png)

![img](.\img\applybind.png)

## 3. 递归

```js
// 3.递归
function largestOfFour(arr, finalArr = []) {
  return !arr.length
    ? finalArr
    : largestOfFour(arr.slice(1), finalArr.concat(Math.max(...arr[0])))
}
```

# 5. 检查字符串的结尾

- 检查一个字符串（第一个参数， `str`）是否以给定的字符串（第二个参数 target）结束。

## 1. `slice, substring`

```js
// 1.slice or substring
function confirmEnding(str, target) {
  // "Never give up and good luck will find you."
  // -- Falcor

  return str.slice(str.length - target.length) === target;
  
  // return str.substring(str.length - target.length) === target;
}

confirmEnding("He has to give me a new name", "name");

```

## 2. `regexp`

```js
// 2.regexp
function confirmEnding(str, target) {
  // "Never give up and good luck will find you."
  // -- Falcor

  let re = new RegExp(target + "$", "i");

  return re.test(str);
}

console.log(confirmEnding("Bastian", "n"));
```

# 6. 重复字符串

- 将一个给定的字符串（第一个参数， str)重复 num（第二个参数）次。如果 num不是一个正数，返回一个空字符串。

## 1. `array, fill, join`

```js
// 1. Array, fill, join
function multiStr(str, num){
	return num > 0
		? (new Array(num).fill(str).join(""))
		: "";
}

```

## 2. 递归

```js
// 2.递归-if判断
function repeatStringNumTimes(str, num) {
  if (num < 1) {
    return "";
  } else if (num === 1) {
    return str;
  } else {
    return str + repeatStringNumTimes(str, num - 1);
  }
}
```

## 3. 递归， 三目

```js
//3.递归-三目
function repeatStringNumTimes(str, num) {
  return num > 0 ? str + repeatStringNumTimes(str, num - 1) : '';
}
```

# 7. 截断字符串

- 如果一个字符串（第一个参数）的长度大于给出的值（第二个参数），则截断它并在其后加上 `...`。返回被截断的字符串。

## 1. `.length`

```js
// 1.第一个.length > 第二个.length
function strLong(str, num) {
	return (num > 0 && num < str.length)
		? str.slice(0, num) + "..."
		: str;
}
```

## 2. `if`

```js
// 2.if
function truncateString(str, num) {
  // Clear out that junk in your trunk
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}
```

# 8. 发现者和看护者

- 写一个函数来检查一个数组（第一个参数）中的元素，并返回数组中第一个通过校验测试（第二个参数，一个接受一个参数并返回一个布尔值的函数）的元素。如果没有元素通过测试，则返回 `undefined`。

## 1. `map, lambda`

```js
// 1.map + lambda + 三目（返回数组）
function findElement(arr, func) {

  return arr.map(
		(num) => {return func(num) ? num : "undefine";}
	);
}

findElement([1, 2, 3, 4], num => num % 2 === 0);
```

## 2. `find`

```js
// 2.find
//find() 方法返回通过测试（函数内判断）的数组的第一个元素的值。
//find() 方法为数组中的每个元素都调用一次函数执行：
//当数组中的元素在测试条件时返回 true 时, find() 返回符合条件的元素，
//之后的值不会再调用执行函数。
//如果没有符合条件的元素返回 undefined
//注意: find() 对于空数组，函数是不会执行的。
//注意: find() 并没有改变数组的原始值。
function findElement(arr, func) {
  return arr.find(func);
}
```

## 3. `map, indexOf`

```js
//3. map + indexOf
function findElement(arr, func) {
  return arr[arr.map(func).indexOf(true)];
}
```

# 9. 真假测试

- 检查一个值是否是原始的布尔值（boolean）类型。返回 true 或者 false。
- 布尔值原始类型为 true 或者 false。

## 1. `typeof`

```js
// 1.typeof

function booWho(bool) {
  return typeof bool === "boolean";
}

// test here
booWho(null);
```

## 2. `return`

```js
// 2.return 
function booWho(bool) {
  return (bool === true || bool === false);
}
```

# 10. 单词的首字母大写

- 将给出的字符串中所有单词的第一个字母变成大写，并返回得到的字符串。请确保其余的字母是小写的。

## 1. `prototype`

```js
// 1.prototype
//prototype 属性使您有能力向对象添加属性和方法。
//object.prototype.name=value
String.prototype.replaceAt = function(index, character) {
  return (
    this.substr(0, index) + character + this.substr(index + character.length)
  );
};

function titleCase(str) {
  var newTitle = str.split(" ");
  var updatedTitle = [];
  for (var st in newTitle) {
    updatedTitle[st] = newTitle[st]
      .toLowerCase()
      .replaceAt(0, newTitle[st].charAt(0).toUpperCase());
  }
  return updatedTitle.join(" ");
}
```

## 2. `chartAt`

```js
// 2.charAt
//charAt() 方法可返回指定位置的字符。
//请注意，JavaScript 并没有一种有别于字符串类型的字符数据类型，
//所以返回的字符是长度为 1 的字符串。
function titleCase(str) {
  var convertToArray = str.toLowerCase().split(" ");
  var result = convertToArray.map(function(val) {
    return val.replace(val.charAt(0), val.charAt(0).toUpperCase());
  });
  return result.join(" ");
}

titleCase("I'm a little tea pot");
```

## 3. `regex`

```js
// 3.正则替换
function titleCase(str) {
  return str.toLowerCase().replace(/(^|\s)\S/g, L => L.toUpperCase());
}
```

# 11. 复制到第二个数组中

- 请利用数组的 slice和 splice方法，将第一个数组中的所有元素依次复制到第二个数组中。
- 请从第二个数组中索引值为 n的地方开始插入。
- 返回插入元素后的数组。输入的两个数组在函数执行前后要保持不变。

## 1. `splice`

```js
// 1.splice(location, num, insert);
function frankenSplice(arr1, arr2, n) {
  // It's alive. It's alive!
  let localArray = arr2.slice();
  for (let i = 0; i < arr1.length; i++) {
    localArray.splice(n, 0, arr1[i]);
    n++;
  }
  return localArray;
}
```

## 2. `...`

```js
// 2.全部参数
function frankenSplice(arr1, arr2, n) {
  // It's alive. It's alive!
  let localArr = arr2.slice();
  localArr.splice(n, 0, ...arr1);
  return localArr;
}
```

# 12. 去除数组中的假值

- 从一个数组中移除所有假值（falsy values）。
- JavaScript 中的假值有 false、null、0、""、undefined和 NaN。
- 提示：请尝试将每一个值转换为一个布尔值（boolean）。

## 1. `filter`

```js
// 1.filter
function bouncer(arr) {
  return arr.filter(Boolean);
}
```

## 2. `for`

```js
// 2.for
function bouncer(arr) {
  let newArray = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) newArray.push(arr[i]);
  }
  return newArray;
}
```

# 13. 返回索引

- 返回数组（第一个参数）被排序后，将一个值（第二个参数）插入到该数组中而使数组保持有序的最小的索引。返回的值应该是一个数字。
- 例如，getIndexToIns([1,2,3,4], 1.5)应该返回 1因为 1.5 大于 1（索引为 0），但小于 2（索引为 1）。
- 同样地，getIndexToIns([20,3,5], 19)应该返回 2因为数组被排序后会变成 [3,5,20]，而 19小于 20（索引为 2）且大于 5（索引为 1）。

## 1. `sort`

```js
// 1.sort
//sort() 方法用于对数组的元素进行排序。
//若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。
//若 a 等于 b，则返回 0。
//若 a 大于 b，则返回一个大于 0 的值。
function getIndexToIns(arr, num) {
  arr.sort(function(a, b) {
    return a - b;
  });

  for (var a = 0; a < arr.length; a++) {
    if (arr[a] >= num) return a;
  }

  return arr.length;
}
```

## 2. `for`

```js
// 2.for
function getIndexToIns(arr, num) {
  // Find my place in this sorted array.
  var times = arr.length; 
  // runs the for loop once for each thing in the array
  var count = 0;
  for (var i = 0; i < times; i++) {
    if (num > arr[i]) {
      count++;
    }
  } // counts how many array numbers are smaller than num
  return count; 
  // the above equals num's position in a sorted array
}

getIndexToIns([40, 60], 50);


```

## 3. 排序，定序

```js
// 3.排序+定序
function getIndexToIns(arr, num) {
  arr.sort(function(a, b) {
    return a - b;
  });

  var i = 0;
  while (num > arr[i]) {
    i++;
  }

  return i;
}
```

## 4. `push, sort, indexOf`

```js
// 4.push + sort + indexOf
function getIndexToIns(arr, num) {
  arr.push(num);
  arr.sort(function(a, b) {
    return a - b;
  });
  return arr.indexOf(num);
}
```

## 5. `findIndex`

```js
// 5.findindex
//indIndex() 方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置。
//findIndex() 方法为数组中的每个元素都调用一次函数执行：
//当数组中的元素在测试条件时返回 true 时,
// findIndex() 返回符合条件的元素的索引位置，之后的值不会再调用执行函数。
//如果没有符合条件的元素返回 -1
//注意: findIndex() 对于空数组，函数是不会执行的。
//注意: findIndex() 并没有改变数组的原始值。
function getIndexToIns(arr, num) {
  // sort and find right index
  var index = arr
    .sort((curr, next) => curr - next)
    .findIndex(currNum => num <= currNum);
  // Returns proper answer
  return index === -1 ? arr.length : index;
}

getIndexToIns([40, 60], 500);
```

## 6. `concat, sort, indexOf`

```js
// 6.concat + sort + indexOf
function getIndexToIns(arr, num) {
  return arr
    .concat(num)
    .sort((a, b) => a - b)
    .indexOf(num);
}

getIndexToIns([1, 3, 4], 2);
```

## 7. `filter`

```js
// 7.filter
//filter() 方法创建一个新的数组，
//新数组中的元素是通过检查指定数组中符合条件的所有元素。
//注意： filter() 不会对空数组进行检测。
//注意： filter() 不会改变原始数组。
function getIndexToIns(arr, num) {
  return arr.filter(val => num > val).length;
}
```

# 14. 集合之间的关系

- 输入参数是一个有两个字符串元素的数组。如果第一个字符串中包含了第二个字符串中的所有字母，则返回 true。
- 例如，["hello", "Hello"]应该返回 true 因为第一个字符串中包含了第二个字符串中出现的所有字母（忽略大小写）。
- 而 ["hello", "hey"]应该返回 false 因为第一个字符串 "hello" 没有包含字母 "y"。
- 最后，["Alien", "line"], 应该返回 true，因为 "line" 中的所有字母都被包含在 "Alien" 中。
- `mutation(["zyxwvutsrqponmlkjihgfedcba", "qrstu"])`应该返回 true。

## 1. `map, split, indexOf, every`

```js
// 1.map + split + indexOf + every
// 1-1. str[0].split(""),str[1].split("")
// 1-2. str[1].split("").map(Function.apply.bind(indexOf, null))
function mutation(arr) {
  return arr[1]
          .toLowerCase()
          .split("")
          .map(val => arr[0].toLowerCase().indexOf(val) != -1)
          .every( val => val != false);
}
//0,1,-1
```

## 2. `indexOf`

```js
// 2.indexOf
function mutation(arr) {
  var test = arr[1].toLowerCase();
  var target = arr[0].toLowerCase();
  for (var i = 0; i < test.length; i++) {
    if (target.indexOf(test[i]) < 0) return false;
  }
  return true;
}
```

## 3. `every`

```js
// 3.every
//every() 方法用于检测数组所有元素是否都符合指定条件（通过函数提供）。
//every() 方法使用指定函数检测数组中的所有元素：
//如果数组中检测到有一个元素不满足，则整个表达式返回 false ，
//且剩余的元素不会再进行检测。
//如果所有元素都满足条件，则返回 true。
//注意： every() 不会对空数组进行检测。
//注意： every() 不会改变原始数组。
//array.every(function(currentValue,index,arr), thisValue)
function mutation(arr) {
  return arr[1]
    .toLowerCase()
    .split("")
    .every(function(letter) {
      return arr[0].toLowerCase().indexOf(letter) != -1;
    });
}
```

## 4. `includes, 递归`

```js
// 3.includes + 递归
//includes() 方法用于判断字符串是否包含指定的子字符串。
//如果找到匹配的字符串则返回 true，否则返回 false。
//注意： includes() 方法区分大小写。
function mutation([ target, test ], i = 0) {
  target = target.toLowerCase();
  test = test.toLowerCase();
  return i >= test.length
    ? true
    : !target.includes(test[i])
      ? false
      : mutation([ target, test ], i + 1);
}
```

# 15. 数组分割

- 请写一个函数，将一个数组（第一个参数）分割成一组长度为 size（第二个参数）的数组，然后在一个二维数组中返回这些结果。

## 1. `for, push`

```js
// 1. 
 function chunkArrayInGroups(arr, size) {
  var temp = [];
  var result = [];

  for (var a = 0; a < arr.length; a++) {
    if (a % size !== size - 1) temp.push(arr[a]);
    else {
      temp.push(arr[a]);
      result.push(temp);
      temp = [];
    }
  }

  if (temp.length !== 0) result.push(temp);
  return result;
}

```

## 2. `push, slice`

```js
// 2.
function chunkArrayInGroups(arr, size) {
  // Break it up.
  var arr2 = [];
  for (var i = 0; i < arr.length; i += size) {
    arr2.push(arr.slice(i, i + size));
  }
  return arr2;
}
```

## 3. `push, slice`

```js
// 3.
function chunkArrayInGroups(arr, size) {
  // Break it up.
  var newArr = [];
  var i = 0;

  while (i < arr.length) {
    newArr.push(arr.slice(i, i + size));
    i += size;
  }
  return newArr;
}
chunkArrayInGroups(["a", "b", "c", "d"], 2);
```

## 4. `push, splice`

```js
// 4.
function chunkArrayInGroups(arr, size) {
  var newArr = [];
  while (arr.length) {
    newArr.push(arr.splice(0, size));
  }
  return newArr;
}
```

## 5. `concat, 递归`

```js
// 5.concat
function chunkArrayInGroups(arr, size) {
  if (arr.length <= size) {
    return [arr];
  } else {
    return [arr.slice(0, size)].concat(
      chunkArrayInGroups(arr.slice(size), size)
    );
  }
}
```

# 16. 范围内的数字求和

- 给出一个含有两个数字的数组，我们需要写一个函数，让它返回这两个数字间所有数字（包含这两个数字）的总和。
- 注意，较小数不一定总是出现在数组的第一个元素。

## 1. `for`

```js
//1.for
function sumAll(arr) {
  var max = Math.max(arr[0], arr[1]);
  var min = Math.min(arr[0], arr[1]);
  var temp = 0;
  for (var i = min; i <= max; i++) {
    temp += i;
  }
  return temp;
}

sumAll([1, 4]);
```

## 2. `(start+end)*num /2`

```js
//2.arrow func
const sumAll = arr => {
  // Buckle up everything to one!
  const startNum = arr[0];
  const endNum = arr[1];

  // Get the count of numbers between the two numbers by subtracting them and add 1 to the absolute value.
  // ex. There are |1-4| + 1 = 4, (1, 2, 3, 4), 4 numbers between 1 and 4.
  const numCount = Math.abs(startNum - endNum) + 1;

  // Using Arithmetic Progression summing formula
  const sum = ((startNum + endNum) * numCount) / 2;
  return sum;
};
```

## 3. `for, spread operator`

```js
//3.for + spread operator
function sumAll(arr) {
  var sum = 0;
  for (var i = Math.min(...arr); i <= Math.max(...arr); i++) {
    sum += i;
  }
  return sum;
}

sumAll([1, 4]);
```

## 4. `func, []`

```js
//4.func +  []
function sumAll([ first, last ] ) {
 const step = first - last < 0 ? 1 : -1;
 return first !== last
   ? first + sumAll([ first + step, last ])
   : first;
}
```

# 17. 区分两个数组

- 我们需要写一个函数，比较两个数组，返回一个新的数组。
- 这个新数组需要包含传入的两个数组所有元素中，仅在其中一个数组里出现的元素。
- 如果某个元素同时出现在两个数组中，则不应包含在返回的数组里。
- 换言之，我们需要返回这两个数组的对称差。

## 1. `for`

```js
//1.loop
function diffArray(arr1, arr2) {
  var newArr = [];

  function onlyInFirst(first, second) {
    // Looping through an array to find elements that don't exist in another array
    for (var i = 0; i < first.length; i++) {
      if (second.indexOf(first[i]) === -1) {
        // Pushing the elements unique to first to newArr
        newArr.push(first[i]);
      }
    }
  }

  onlyInFirst(arr1, arr2);
  onlyInFirst(arr2, arr1);

  return newArr;
}

diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);

```

## 2. `concat, includes, filter`

```js
//2.concat + includes + filter
function diffArray(arr1, arr2) {
  return arr1
    .concat(arr2)
    .filter(item => !arr1.includes(item) || !arr2.includes(item));
}

diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);
```

## 3. `filter`

```js
//3.filter + sperad
function diffArray(arr1, arr2) {
  return [...diff(arr1, arr2), ...diff(arr2, arr1)];

  function diff(a, b) {
    return a.filter(item => b.indexOf(item) === -1);
  }
}
```

# 18. 删除数组中的指定元素

- 传给它的第一个参数是数组，我们称他为初始数组。后续的参数数量是不确定的，可能有一个或多个。你需要做的是，从初始数组中移除所有与后续参数相等的元素，并返回移除元素后的数组。
- 注意：你可以使用arguments对象，也可以使用...，即“剩余参数”（Rest Parameters）语法。

## 1. `prototype, call, filter`

```js
//1.prototype + call + filter
function destroyer(arr) {
  var args = Array.prototype.slice.call(arguments);

  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < args.length; j++) {
      if (arr[i] === args[j]) {
        delete arr[i];
      }
    }
  }
  return arr.filter(Boolean);
}
```

## 2. `from, filter, includes`

```js
//2.from + filter + includes
function destroyer(arr) {
  var args = Array.from(arguments).slice(1);
  return arr.filter(function(val) {
    return !args.includes(val);
  });
}
```

## 3. `includes`

```js
//3.includes
const destroyer = (arr, ...valsToRemove) => arr.filter(elem => !valsToRemove.includes(elem));
```

# 19. 从对象数组中找出包含指定值

- 要写一个函数，它接收两个参数：第一个参数是对象数组，第二个参数是一个对象。
- 我们需要从对象数组中找出与第二个参数相等或包含第二个参数的所有对象，并以对象数组的形式返回。
- 其中，相等的意思是原数组中的对象与第二个参数中对象的所有键值对完全相等；
- 包含的意思是只要第二个参数中对象的所有键存在于原数组对象中，且它们对应的值相同即可。
- 比如，如果第一个参数是[{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }]，第二个参数是{ last: "Capulet" }。那么你需要以对象数组的形式返回第一个参数中的第三个元素，因为它包含第二个参数中定义的键last，且对应的值"Capulet"相同

## 1. `filter, hasownproperty`

```js
//1.filter + hasownproperty
function whatIsInAName(collection, source) {
  // "What's in a name? that which we call a rose
  // By any other name would smell as sweet.”
  // -- by William Shakespeare, Romeo and Juliet
  var srcKeys = Object.keys(source);

  // filter the collection
  return collection.filter(function(obj) {
    for (var i = 0; i < srcKeys.length; i++) {
      if (
        !obj.hasOwnProperty(srcKeys[i]) ||
        obj[srcKeys[i]] !== source[srcKeys[i]]
      ) {
        return false;
      }
    }
    return true;
  });
}

// test here
whatIsInAName(
  [
    { first: "Romeo", last: "Montague" },
    { first: "Mercutio", last: null },
    { first: "Tybalt", last: "Capulet" }
  ],
  { last: "Capulet" }
);


```

## 2. `filter, every, hasownproperty`

```js
//2.filter + every + hasownProperty
function whatIsInAName(collection, source) {
  // "What's in a name? that which we call a rose
  // By any other name would smell as sweet.”
  // -- by William Shakespeare, Romeo and Juliet
  var srcKeys = Object.keys(source);

  return collection.filter(function(obj) {
    return srcKeys.every(function(key) {
      return obj.hasOwnProperty(key) && obj[key] === source[key];
    });
  });
}

// test here
whatIsInAName(
  [
    { first: "Romeo", last: "Montague" },
    { first: "Mercutio", last: null },
    { first: "Tybalt", last: "Capulet" }
  ],
  { last: "Capulet" }
);

```

## 3. `filter, map, reduce`

```js
//3.filter + map + reduce
function whatIsInAName(collection, source) {
  // "What's in a name? that which we call a rose
  // By any other name would smell as sweet.”
  // -- by William Shakespeare, Romeo and Juliet
  var srcKeys = Object.keys(source);

  // filter the collection
  return collection.filter(function(obj) {
    return srcKeys
      .map(function(key) {
        return obj.hasOwnProperty(key) && obj[key] === source[key];
      })
      .reduce(function(a, b) {
        return a && b;
      });
  });
}

// test here
whatIsInAName(
  [
    { first: "Romeo", last: "Montague" },
    { first: "Mercutio", last: null },
    { first: "Tybalt", last: "Capulet" }
  ],
  { last: "Capulet" }
);

```

## 4. `filter, every`

```js
//4.lambda
function whatIsInAName(collection, source) {
  // What's in a name?
  var arr = Object.keys(source);
  // 请把你的代码写在这条注释以下
  
  return collection.filter(obj => arr.every(key => obj.hasOwnProperty(key) && obj[key] === source[key]));
  // 请把你的代码写在这条注释以上
}

whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });
```

