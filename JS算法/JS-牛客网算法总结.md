JS-牛客网算法总结 目录
[TOC]
***

# 前言

# 推荐阅读

- leetcode
- 牛客网

# 1. 数组求和

计算给定数组 arr 中所有元素的总和

## 输入

```
[ 1, 2, 3, 4 ]
```

## 输出

```
10
```

## 实现

### 1. 递归

```js
function sum(arr) {
    var len = arr.length;
    if(len == 0){
        return 0;
    } else if (len == 1){
        return arr[0];
    } else {
        return arr[0] + sum(arr.slice(1));
    }
}

```

### 2. `for`

```js
function sum(arr) {
    var s = 0;
    for (var i=arr.length-1; i>=0; i--) {
        s += arr[i];
    }
    return s;
}

```



### 3. `map-reduce`

```js
function sum(arr) {
    return arr.reduce((prev,curr) => {return prev+curr} );
}

//或者
return arr.reduce((prev,curr)=> prev + curr);
```

### 4. `forEach`

```js
function sum(arr) {
    var s = 0;
    arr.forEach(function(val, idx, arr) {
        s += val;
    }, 0);
  
    return s;
};

```

### 5. `eval`

```js
function sum(arr) {
    return eval(arr.join("+"));
};

```

### 6. `for-of`

```js
function sum(arr){
    let s = 0;
    for(let i of arr)	s += i;
    return s;
}
```





# 2. 移除数组中的元素

[ 算法知识视频讲解 ](https://www.nowcoder.com/courses/semester/2021algorithm-medium) 

校招时部分企业笔试将禁止编程题跳出页面，为提前适应，练习时请使用在线自测，而非本地IDE。 

## 题目描述

移除数组 arr 中的所有值与 item 相等的元素。不要直接修改数组 arr，结果返回新的数组

示例1 

## 输入

```
[1, 2, 3, 4, 2], 2
```

## 输出

```
[1, 3, 4]
```

## 实现

### 1. `forEach`

```js
function remove(arr, item) {
    const newArr = [];
    arr.forEach(val => {
        if(val != item)    newArr.push(val);
    });
    return newArr;
}
```

### 2. `splice`

```js
function remove(arr,item){
    var newarr = arr.slice(0);
    for(var i=0;i<newarr.length;i++){
        if(newarr[i] == item){
            newarr.splice(i,1);
            i--;
        }
    }
    return newarr;
}
```



### 3. `filter`

```js
function remove(arr, item) {
    return arr.filter(val => val != item);
}
```

# 3. 移除本数组中的元素

## 题目描述

移除数组 arr 中的所有值与 item 相等的元素，直接在给定的 arr 数组上进行操作，并将结果返回

示例1 

## 输入



```
[1, 2, 2, 3, 4, 2, 2], 2
```

## 输出



```
[1, 3, 4]
```

## 实现

### 1. 队列法

```js
function removeWithoutCopy(arr, item) {
	let n = arr.length;
    
    for(let i=0; i < n; i++){
        console.log(`i:${i}, arr[i]:${arr[i]}`);
         if(arr[0]!==item) {
            arr.push(arr[0]);
         }
         arr.shift();          
	}
    console.log(arr);
    return arr;
}
```

### 2. `splice`

```js
function removeWithoutCopy(arr, item) {    
    for(let i=0; i < arr.length; i++) {
        if(arr[i] == item){
            arr.splice(i,1);
            i--;
        }
    }
    console.log(arr);
    return arr;
}
```

### 3. `forEach`

```js
function removeWithoutCopy(arr, item) {    
    arr.forEach((ele,index)=>{
        if(ele=item){
            arr.splice(index,1);
            index--;
        }
        
    }) 

    console.log(arr);
    return arr;
}
```

# 4. 添加元素

## 题目描述

在数组 arr 末尾添加元素 item。不要直接修改数组 arr，结果返回新的数组

示例1 

## 输入



```
[1, 2, 3, 4],  10
```

## 输出



```
[1, 2, 3, 4, 10]
```

## 实现

### 1. `concat`

```js
function append(arr, item) {
    return arr.concat(item);
}
```

### 2. `push new arr`

```js
var append = function(arr, item) {
    var length = arr.length,
        newArr = [];
 
    for (var i = 0; i < length; i++) {
        newArr.push(arr[i]);
    }
 
    newArr.push(item);
 
    return newArr;
};

```

### 3. `slice, push`

```js
var append2 = function(arr, item) {
    var newArr = arr.slice(0);  // slice(start, end)浅拷贝数组
    newArr.push(item);
    return newArr;
};

```

# 5. 删除数组最后一个元素

## 题目描述

删除数组 arr 最后一个元素。不要直接修改数组 arr，结果返回新的数组

示例1 

## 输入

```
[1, 2, 3, 4]
```

## 输出

```
[1, 2, 3]
```

## 实现

### 1. `slice`

```js
//利用slice
function truncate(arr) {
    return arr.slice(0,-1);
}
```

### 2. `filter`

```js

//利用filter
function truncate(arr) {
    return arr.filter(function(v,i,ar) {
        return i!==ar.length-1;
    });
}

```

### 3. `apply`

```js
//利用push.apply+pop
function truncate(arr) {
    var newArr=[];
    [].push.apply(newArr, arr);
    newArr.pop();
    return newArr;
}

```

### 4. `join, split, pop`

```js
//利用join+split+pop    注意！！！：数据类型会变成字符型
function truncate(arr) {
    var newArr = arr.join().split(',');
    newArr.pop();
    return newArr;
}

```

### 5. `concat`

```js
//利用concat+pop 
function truncate(arr) {
    var newArr = arr.concat();
    newArr.pop();
    return newArr;
}

```

### 6. `for`

```js
//普通的迭代拷贝
function truncate(arr, item) {
    var newArr=[];
    for(var i=0;i<arr.length-1;i++){
        newArr.push(arr[i]);
    }
    return newArr;
}

```

# 6. 添加元素

## 题目描述

在数组 arr 开头添加元素 item。不要直接修改数组 arr，结果返回新的数组

示例1 

## 输入



```
[1, 2, 3, 4], 10
```

## 输出



```
[10, 1, 2, 3, 4]
```

## 实现

### 1. `concat`

```js
//利用concat
function prepend(arr, item) {
    return [item].concat(arr);
}

```

### 2. `push, apply`

```js
//使用push.apply
function prepend(arr, item) {
    var newArr=[item];
    [].push.apply(newArr, arr);
    return newArr;
}


```

### 3. `slice, unshift/splice`

```js
//利用slice+unshift/splice
function prepend(arr, item) {
    var newArr=arr.slice(0);
    newArr.unshift(item);//newArr.splice(0,0,item);
    return newArr;
}

```

### 4. `join, split, unshift`

```js
//使用join+split+unshift/splice组合
function prepend(arr, item) {
    var newArr=arr.join().split(',');
    newArr.unshift(item);//newArr.splice(0,0,item);
    return newArr;
}

```

### 5. `for`

```js
//普通的迭代拷贝
function prepend(arr, item) {
    var newArr=[];
    for(var i=0;i<arr.length;i++){
        newArr.push(arr[i]);
    }
    newArr.unshift(item);
    return newArr;
}
```

# 7. 删除数组第一个元素

## 题目描述

删除数组 arr 第一个元素。不要直接修改数组 arr，结果返回新的数组

示例1 

## 输入



```
[1, 2, 3, 4]
```

## 输出



```
[2, 3, 4]
```

## 实现

### 1. `slice`

```js
//利用slice
function curtail(arr) {
    return arr.slice(1);
}

```

### 2. `filter`

```js
//利用filter
function curtail(arr) {
    return arr.filter(function(v,i) {
        return i!==0;
    });
}

```

### 3. `push, apply, shift`

```js
//利用push.apply+shift
function curtail(arr) {
    var newArr=[];
    [].push.apply(newArr, arr);
    newArr.shift();
    return newArr;
}

```

### 4. `join, split, shift`

```js
//利用join+split+shift    注意！！！：数据类型会变成字符型
function curtail(arr) {
    var newArr = arr.join().split(',');
    newArr.shift();
    return newArr;
}

```

### 5. `concat, shift`

```js
//利用concat+shift 
function curtail(arr) {
    var newArr = arr.concat();
    newArr.shift();
    return newArr;
}

```

### 6. `for`

```js
//普通的迭代拷贝
function curtail(arr) {
    var newArr=[];
    for(var i=1;i<arr.length;i++){
        newArr.push(arr[i]);
    }
    return newArr;
}

```

# 8. 数组合并

## 题目描述

合并数组 arr1 和数组 arr2。不要直接修改数组 arr，结果返回新的数组

示例1 

## 输入



```
[1, 2, 3, 4], ['a', 'b', 'c', 1]
```

## 输出



```
[1, 2, 3, 4, 'a', 'b', 'c', 1]
```

## 实现

### 1. `concat`

```js
//利用concat
function concat(arr1, arr2) {
    return arr1.concat(arr2);
}

```

### 2. `slice, push.apply`

```js
//利用slice+push.apply 
function concat(arr1, arr2) {
    var newArr=arr1.slice(0);
    [].push.apply(newArr, arr2);
    return newArr;
}

```

### 3. `slice, push`

```js
//利用slice+push 
function concat(arr1, arr2) {
    var newArr=arr1.slice(0);
    for(var i=0;i<arr2.length;i++){
        newArr.push(arr2[i]);
    }
    return newArr;
}

```

### 4. `for`

```js
//普通的迭代拷贝
function concat(arr1, arr2) {
    var newArr=[];
    for(var i=0;i<arr1.length;i++){
        newArr.push(arr1[i]);
    }
    for(var j=0;j<arr2.length;j++){
        newArr.push(arr2[j]);
    }
    return newArr;
}

```

# 9. 数组内添加元素

## 题目描述

在数组 arr 的 index 处添加元素 item。不要直接修改数组 arr，结果返回新的数组

示例1 

## 输入



```
[1, 2, 3, 4], 'z', 2
```

## 输出



```
[1, 2, 'z', 3, 4]
```

## 实现

### 1. `slice, concat`

```js
//利用slice+concat
function insert(arr, item, index) {
    return arr.slice(0,index).concat(item,arr.slice(index));
}

```

2. `concat, splice`

```js
//利用concat +splice
function insert(arr, item, index) {
    var newArr=arr.concat();
    newArr.splice(index,0,item);
    return newArr;
}

```

### 3. `slice, splice`

```js
//利用slice+splice
function insert(arr, item, index) {
    var newArr=arr.slice(0);
    newArr.splice(index,0,item);
    return newArr;
}

```

### 4. `push.apply, splice`

```js
//利用push.apply+splice
function insert(arr, item, index) {
    var newArr=[];
    [].push.apply(newArr, arr);
    newArr.splice(index,0,item);
    return newArr;
}

```

### 5. `for`

```js
//普通的迭代拷贝
function insert(arr, item, index) {
    var newArr=[];
    for(var i=0;i<arr.length;i++){
        newArr.push(arr[i]);
    }
    newArr.splice(index,0,item);
    return newArr;
}

```

# 10. 计数

## 题目描述

统计数组 arr 中值等于 item 的元素出现的次数

示例1

## 输入



```
[1, 2, 4, 4, 3, 4, 3], 4
```

## 输出



```
3
```

## 实现

### 1. `filter`

```js
//filter()-->利用指定的函数确定是否在返回的数组中包含某一项
        function count(arr, item) {
            var count = arr.filter(function(a) {
                return a === item;   //返回true的项组成的数组
            });
            return count.length;
        }
```

### 2. `map`

```js
//map()-->对数组中的每一项进行给定函数，
//返回每次函数条用的结果组成的数组；
function count(arr, item) {
    var count = 0;
    arr.map(function(a) {
        if(a === item) {
            count++;
        }
    });
    return count;
}
```

### 3. `for`

```js
//for循环
function count(arr, item) {
    var count = 0;
    for(var i=0; i<arr.length; i++) {
        if(arr[i] === item) {
            count++;
        }
    }
    return count;
}
```

### 4. `reduce`

```js
//reduce()-->从数组的第一项开始，逐个遍历到最后；
function count(arr, item) {
    var count = arr.reduce(function(prev, curr) {
        return curr === item ? prev+1 : prev;
    }, 0);
    return count;
}
```

### 5. `forEach`

```js
//forEach()-->对数组中的每一项运行传入的函数
function count(arr, item) {
    var count = 0;
    arr.forEach(function(a) {
        a === item ? count++ : 0;
    });
    return count;
}
```

# 11. 查找重复元素

## 题目描述

找出数组 arr 中重复出现过的元素

示例1 

## 输入



```
[1, 2, 4, 4, 3, 3, 1, 5, 3]
```

## 输出



```
[1, 3, 4]
```

## 实现

### 1.`sort,indexOf,indexOf,push`

```js
function dulplicate(arr){
    let arr2 = arr.sort();
    let b = [];
    return arr2.filter((item, index) => {
        if(b.indexOf(item) == -1 && arr2.lastIndexOf(item) != index){
            b.push(item);
            console.log(b);
            return true;
        }
    });

}
```

### 2. `for`前后遍历

```
function dulplicate(arr){
    let arr2 = [];
    for(let i = 0; i < arr.length - 1; i ++){
        for(let j = i + 1; j < arr.length; j++){
            if(arr[i] === arr[j] && arr2.indexOf(arr[j]) == -1){
                arr2.push(arr[j]);
                break;
            }
        }
    }

    return arr2;
}
```

# 12. 求二次方

## 题目描述

为数组 arr 中的每个元素求二次方。不要直接修改数组 arr，结果返回新的数组

示例1 

## 输入



```
[1, 2, 3, 4]
```

## 输出



```
[1, 4, 9, 16]
```

## 实现

### 1. `map`

```js
function square(arr) {
    return arr.map(val => val * val);
}
```

# 13. 查找元素位置

## 题目描述

在数组 arr 中，查找值与 item 相等的元素出现的所有位置

示例1 

## 输入



```
['a','b','c','d','e','f','a','b','c'] 'a'
```

## 输出



```
[0, 6]
```

## 实现

### 1. `reduce`

```js
let arr2 = [];
arr.reduce((pre, val, index)=>{
    if(val == target) arr2.push(index);
},0);
console.log(arr2);
return arr2;
```

### 2. `filter`

```js
    let arr2 = [];
    arr.filter((item, index) => {
        return item === target && arr2.push(index);
    });
    console.log(arr2);
```

### 3. `for`

```js
//for
function findAllOccurrences(arr, target) {
    var result=[];
    for(var i=0;i<arr.length;i++){
        if(arr[i]===target){
            result.push(i);
        }
    }
    return result;
}

```

### 4. `lastIndexOf, slice, splice`

```js
//lastIndexOf+slice/splice
function findAllOccurrences(arr, target) {
    var result=[],index=arr.lastIndexOf(target);
    while(index>-1){
        result.push(index);
        arr.splice(index,1);//arr=arr.slice(0,index);
        index=arr.lastIndexOf(target);
    }
    return result;
}

```

### 5. `indexOf`

```js
//indexOf
function findAllOccurrences(arr, target) {
    var result=[],index=arr.indexOf(target);
    while(index>-1){
        result.push(index);
        index=arr.indexOf(target,index+1);
    }
    return result;
}

```

### 14. 正确的函数定义

```js
function functions(flag) {
    if (flag) {
       var getValue = function () { return 'a'; }
    } else {
      var getValue = function () { return 'b'; }
    }

    return getValue();
}
```

# 14. 数值转换

- 只要数字，输入`12px`，获取`12`
- `parseInt(num,10)`
- `parseFloat(num)`
- `regex = /^\d+/;regex.exec(num)[0]`

# 15. 打点计时器

## 题目描述

实现一个打点计时器，要求
1、从 start 到 end（包含 start 和 end），每隔 100 毫秒 console.log 一个数字，每次数字增幅为 1
 2、返回的对象中需要包含一个 cancel 方法，用于停止定时操作
3、第一个数需要立即输出

## 实现

### 1. `setInterval`

```js
function count(start, end) {
  //立即输出第一个值
  console.log(start++);
     var timer = setInterval(function(){
         if(start <= end){
             console.log(start++);
         }else{
             clearInterval(timer);
         }
     },100);
    //返回一个对象
     return {
         cancel : function(){
             clearInterval(timer);
         }
     };
 }

```

### 2. `setTimeout`和递归

```js
function count(start, end) {
    if(start <= end){
        console.log(start);
        start++;
        st = setTimeout(function(){count(start, end)}, 100);
    }
    return {
        cancel: function(){clearTimeout(st);}
    }
}

```

# 16. `apply, call`

- 一般情况下都是对象调用函数，但此处是函数调用数组对象,用call(), apply()。
- 第一个参数是传给当前函数对象。但是call()需要将参数挨个列出，apply直接传入数组对象。

- 在JavaScript中，函数是一种对象，其上下文是可以变化的，对应的，函数内的this也是可以变化的，函数可以作为一个对象的方法，也可以同时作为另一个对象的方法，可以通过Function对象中的call或者apply方法来修改函数的上下文，函数中的this指针将被替换为call或者apply的第一个参数。将函数   fn 的执行上下文改为 obj 对象，只需要将obj作为call或者apply的第一个参数传入即可。
- `fn.apply(obj), fn.call(obj), fn.bind(obj)()` 

# 17. 函数柯里化

## 题目描述

实现函数 functionFunction，调用之后满足如下条件：
1、返回值为一个函数 f
 2、调用返回的函数 f，返回值为按照调用顺序的参数拼接，拼接字符为英文逗号加一个空格，即 ', '
3、所有函数的参数数量为 1，且均为 String 类型

示例1 

## 输入



```
functionFunction('Hello')('world')
```

## 输出



```
Hello, world
```

## 实现

```javascript
function functionFunction(str) {
    var ret = Array.prototype.slice.call(arguments).join(', ');
    var temp = function(str) {
        ret = [ret, Array.prototype.slice.call(arguments).join(', ')].join(', ');
        return temp;
    };
    temp.toString = function(){
        return ret;
    };
    return temp;
}

```



# 18. 使用闭包

## 题目描述

实现函数 makeClosures，调用之后满足如下条件：
1、返回一个函数数组 result，长度与 arr 相同
2、运行 result 中第 i 个函数，即 result[i]()，结果与 fn(arr[i]) 相同

示例1 

## 输入



```
[1, 2, 3], function (x) { 
	return x * x; 
}
```

## 输出



```
4
```

## 实现

### 1. `forEach`

```js
function makeClosures(arr, fn) {
  var result = [];
     arr.forEach(function(e){
         result.push(function(num){
             return function(){
                 return fn(num);
             };
         }(e));
     });
     return result;
 }

```

### 2. `bind`

```js
//使用ES5的bind()方法
function makeClosures(arr, fn) {
    var result = new Array();
    for(var i=0;i<arr.length;i++){
        result[i] = fn.bind(null,arr[i]);
    }
    return result;
}

```

# 19. 二次封装函数

## 题目描述

已知函数 fn 执行需要 3 个参数。请实现函数 partial，调用之后满足如下条件：
1、返回一个函数 result，该函数接受一个参数
2、执行 result(str3) ，返回的结果与 fn(str1, str2, str3) 一致

示例1 

## 输入



```
var sayIt = function(greeting, name, punctuation) {     return greeting + ', ' + name + (punctuation || '!'); };  partial(sayIt, 'Hello', 'Ellie')('!!!');
```

## 输出



```
Hello, Ellie!!!
```

## 实现
- call和apply必须显式地调用str3，立即执行
- bind不是立即执行，未传入str3时，并未执行，只是返回一个函数，等待参数传入
- this用于上下文不确定的情况

### 1. `apply`

```js
function partial(fn, str1, str2) {
    function result(str3) {
        return fn.apply(this, [str1, str2, str3]);
    }
 
    return result;
}

```

### 2. `call`
```js
// call
function partial(fn, str1, str2) {
    function result(str3) {
        return fn.call(this, str1, str2, str3);
    }
 
     return result;
}

```

### 3. bind
```js
 
// 这个bind会生成一个新函数（对象）, 它的str1, str2参数都定死了, str3未传入, 一旦传入就会执行
function partial(fn, str1, str2) {
    return fn.bind(this, str1, str2); // 或 return fn.bind(null, str1, str2);
}

// bind同上, 多了一步, 把str3传入的过程写在另一个函数里面, 
// 而另一个函数也有str1, str2参数
// 此法有种多次一举的感觉，但是表示出了后续的调用。
function partial(fn, str1, str2) {
    function result(str3) {
        return fn.bind(this, str1, str2)(str3);
    }
 
    return result;
}

```
### 4. 匿名
```js
// 匿名函数，默认this绑定global，与bind的第一个参数为this时效果一样。
function partial(fn, str1, str2) {
    return function(str3) {
        return fn(str1, str2, str3);
    }
}

```

### 5. `ES6`
```js
// ES6。this指向undefined.
const partial = (fn, str1, str2) => str3 => fn(str1, str2, str3);

```
# 20. 使用`arguments`

## 题目描述

函数 useArguments 可以接收 1 个及以上的参数。请实现函数 useArguments，返回所有调用参数相加后的结果。本题的测试参数全部为 Number 类型，不需考虑参数转换。

示例1 

## 输入



```
1, 2, 3, 4
```

## 输出



```
10
```

## 实现

### 1. `Array.prototype.slice.call(arguments,0)`

- 创建了一个类数组arguments
- 使用`Array.prototype`把类数组转换为原型数组
- 类数组是没有slice()方法的，需要把类数组转换为原型数组才能调用slice()这个方法
- slice() 方法可从已有的数组中返回选定的元素。 语法 `arrayObject.slice(start,end)`，在本句中的意思是要去遍历数组
- call() 方法定义：调用一个对象的方法，以另一个对象替换当前对象，在这里的意思大概就是调用原型数组的方法，用原型数组代替当前对象（类数组），所以`args`数组就完全变成真正的数组
- 本质就是arguments这个对象使用了数组的slice这个方法，得到了参数构成的数组（也可以用apply）

```js
function useArguments() {
    var args = Array.prototype.slice.call(arguments, 0);
    return args.reduce(function(prev, curr, idx, arr) {
        return prev + curr;
    });
}

```

### 2. `for`

```js
function useArguments() {
  /*
   因为参数数量不定，可以先获取参数个数arguments.length
   然后循环求值
  */
  //声明一个变量保存最终结果
  var sum = 0;
  //循环求值
  for(var i = 0; i < arguments.length; i++){
      sum += arguments[i];
  }
  return sum;
 }


// 2.
function useArguments() {
    var result = Array.prototype.reduce.call(arguments,function(a,b){return a+b;});
    return result;
}

```

### 3. `eval`

```js
function useArguments() {
    var arr=Array.prototype.slice.call(arguments)//把arguments类数组转化为数组
    return eval(arr.join("+"));//求和
}
```

# 21. `apply`调用函数

## 题目描述

实现函数 callIt，调用之后满足如下条件
1、返回的结果为调用 fn 之后的结果
2、fn 的调用参数为 callIt 的第一个参数之后的全部参数

示例1 

## 输入



```
无
```

## 输出



```
无
```

## 实现

### 1. `[], slice, call, apply`

```js
function callIt(fn) {
    return fn.apply(this,[].slice.call(arguments,1));
    //return fn.apply(this, Array.prototype.slice.call(arguments,1));
}

```

### 2. `apply, null`

- 此处`this, null`效果一样

```js
function callIt(fn) {
    //将arguments转化为数组后，截取第一个元素之后的所有元素
    var args = Array.prototype.slice.call(arguments,1);
    //调用fn
    var result = fn.apply(null,args);
    return result;
}

```

# 22. 二次封装函数

## 题目描述

实现函数 `partialUsingArguments`，调用之后满足如下条件：
1、返回一个函数 result
 2、调用 `result` 之后，返回的结果与调用函数 `fn` 的结果一致
3、`fn` 的调用参数为 `partialUsingArguments` 的第一个参数之后的全部参数以及 result 的调用参数

示例1 

## 输入



```
无
```

## 输出



```
无
```

## 实现

### 1. `unshift, apply`

- `unshift`是往数组前面插入元素
- `bind`和`apply`的第一个参数都是改变函数中`this`的指向，如果传入`null`就会指向`window`
- `apply`的第二个参数为数组或伪数组，作用是将数组的元素作为`fn.bind`的参数传入。

```js
function partialUsingArguments(fn) {
    var arr = Array.prototype.slice.call(arguments,1);
    arr.unshift(null);
    return fn.bind.apply(fn,arr);
}
```

### 2. `Array.prototype.slice.call, concat`

```js
function partialUsingArguments(fn) {
     //先获取p函数第一个参数之后的全部参数
     var args = Array.prototype.slice.call(arguments,1);
     //声明result函数
     var result = function(){
         //使用concat合并两个或多个数组中的元素
         return fn.apply(null, args.concat([].slice.call(arguments)));
     }
     return result;
 }
```

# 23. 柯里化

## 题目描述

已知 fn 为一个预定义函数，实现函数 curryIt，调用之后满足如下条件：
1、返回一个函数 a，a 的 length 属性值为 1（即显式声明 a 接收一个参数）
2、调用 a 之后，返回一个函数 b, b 的 length 属性值为 1
 3、调用 b 之后，返回一个函数 c, c 的 length 属性值为 1
 4、调用 c 之后，返回的结果与调用 fn 的返回值一致
5、fn 的参数依次为函数 a, b, c 的调用参数

示例1 

## 输入



```
var fn = function (a, b, c) {return a + b + c}; curryIt(fn)(1)(2)(3);
```

## 输出



```
6
```

## 实现

- 柯里化是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术
- 简单理解题目意思，就是指，我们将预定义的函数的参数逐一传入到curryIt中，当参数全部传入之后，就执行预定义函数
- 于是，我们首先要获得预定义函数的参数个数fn.length，然后声明一个空数组去存放这些参数
- 返回一个匿名函数接收参数并执行，当参数个数小于fn.length，则再次返回该匿名函数，继续接收参数并执行，直至参数个数等于fn.length
- 最后，调用apply执行预定义函数。

### 1. `callee`

```js
function curryIt(fn) {
     //获取fn参数的数量
     var n = fn.length;
     //声明一个数组args
     var args = [];
     //返回一个匿名函数
     return function(arg){
         //将curryIt后面括号中的参数放入数组
         args.push(arg);
         //如果args中的参数个数小于fn函数的参数个数，
         //则执行arguments.callee（其作用是引用当前正在执行的函数，这里是返回的当前匿名函数）。
         //否则，返回fn的调用结果
         if(args.length < n){
            return arguments.callee;
         }else return fn.apply("",args);
     }
 } 
```

### 2. 直观

```js
function curryIt(fn) {
    return function a(xa){
        return function b(xb){
            return function c(xc){
                return fn.call(this,xa,xb,xc);
            };
        };
    };
}

// es6
function curryIt(fn) {
    return (a)=>(b)=>(c)=>fn(a,b,c);
}

//
function curryIt(fn) {
   return function a(ele){
       a.length = 1
       return function b(ele1){
           b.length =1
           return function c(ele2){
               c.length=1
               return fn(ele,ele1,ele2)
           }
       }
   }
}
```

### 3. `callee, apply`

```js
function curryIt(fn) {
  var arr=[],l = fn.length;
  return function(x){  
    arr.push(x);
    return arr.length < l ? arguments.callee : fn.apply(null,arr);
  }
}

```

# 24. 字面量模块

## 题目描述

完成函数 createModule，调用之后满足如下要求：
1、返回一个对象
2、对象的 greeting 属性值等于 str1， name 属性值等于 str2
 3、对象存在一个 sayIt 方法，该方法返回的字符串为 greeting属性值 + ', ' + name属性值

## 实现

### 1. `obj, this.property`

```js
function createModule(str1, str2) {

    let obj = {
        greeting: str1,
        name: str2,
        sayIt: function(){
            return `${this.greeting}, ${this.name}`;
        }
    }
    
    return obj;
}
```

# 25. 获取指定二进制位

## 题目描述

获取数字 num 二进制形式第 bit 位的值。注意：
1、bit 从 1 开始
2、返回 0 或 1
 3、举例：2 的二进制为 10，第 1 位为 0，第 2 位为 1

示例1 

## 输入



```
128, 8
```

## 输出



```
1
```

## 实现

### 1. `>>, &1`

```js
function valueAtBit(num, bit) {
    return (num >> (bit -1)) & 1;
}

```

### 2. `toString`

- 通过`num.toString(2)`能直接将`num`转换为2进制数格式的字符串，利用下标就能将对应值取出来
- 返回的数字是从右往左，因此下标为倒数

```js
function valueAtBit(num, bit) {
  var s = num.toString(2);
     return s[s.length - bit];
 }

//2.
function valueAtBit(num, bit) {
    //toString转化为二进制，split将二进制转化为数组，reverse()将数组颠倒顺序
    var arr = num.toString(2).split("").reverse();
    return arr[bit-1];
}
```



# 26. 二进制转换十进制

## 题目描述

给定二进制字符串，将其换算成对应的十进制数字

示例1 

## 输入



```
'11000000'
```

## 输出



```
192
```

## 实现

### 1. `parseInt`

```js
function base10(str) {
    /**
        其它进制转十进制
        parseInt(str,2)
        parseInt(str,8)
        parseInt(str,16)
    */
    return parseInt(str,2);
}
```

### 2. `<<`

```js
//不使用内部方法,一句代码解决。
function base10(str) {
    return str.split('').reduce(function(total,value,index){
        return total + (value << (str.length - 1 - index));
    },0);
}

// reverse
function base10(str) {
    return str.split('').reverse().reduce(function(total,value,index){
        return total += (value << (index));
    },0);
}
```

# 27. 十进制转换为二进制补`0`

## 题目描述

将给定数字转换成二进制字符串。如果字符串长度不足 8 位，则在前面补 0 到满8位。

示例1 

## 输入



```
65
```

## 输出



```
01000001
```

## 实现

### 1. `toString, slice`

```js
function convertToBinary(num) {
    let s = num.toString(2);
    let length = s.length;
    if(length<8){
        let s1 = '00000000';
        let s2 = s1.slice(0,8-length);
        s = s2 + s;
    }
    return s;
}
```

### 2. `toString`

```js
function convertToBinary(num) {
	var str = num.toString(2);
	while(str.length < 8) {
		str = "0" + str;
	}
	
	return str;
}
```

### 3. `slice(-8)`

```js
function convertToBinary(num) {
  return ('00000000' + num.toString(2)).slice(-8);
}
```

### 4. `substr`

```js
function convertToBinary(num) {
  return ('00000000'+num.toString(2)).substr(-8);
}
```

### 5. `unshift, split, join`

```js

个人认为还应该考虑到大于2的八次方（256）的num
function convertToBinary(num) {
var a=num.toString(2).split("");    
    while(a.length%8!=0)
    {
        a.unshift("0");
    }
    return a.join("");    
}

```

# 28. 乘法精度问题

## 题目描述

求 a 和 b 相乘的值，a 和 b 可能是小数，需要注意结果的精度问题

示例1 

## 输入



```
3, 0.0001
```

## 输出



```
0.0003
```



## 实现

- 直接使用`a*b`会出现精度问题`0.30000000000000004`

### 1. `interger, split, parseInt`

```js
function multiply(a, b) {
	var a = a;
    var b = b;
    if(isInteger(a)&&isInteger(b)){
        return a * b;
    }else{
        var ad = a.toString().split(".").length > 1 ? a.toString().split(".")[1].length:0;
        var bd = b.toString().split(".").length > 1 ? b.toString().split(".")[1].length:0;
        return (a * b).toFixed(ad+bd);
    }
    function isInteger(num){
        if(parseInt(num)===num){
            return true;
        }else{
            return false;
        }
    }
}
```

### 2. `toFixed`

```js
function multiply(a, b) {
    var aDec = a.toString().split('.')[1] || ''; 
    var bDec = b.toString().split('.')[1] || ''; 
    var fix = aDec.length  + bDec.length; 
    return (a * b).toFixed(fix); 
}
```

# 29. 改变上下文

## 题目描述

将函数 fn 的执行上下文改为 obj，返回 fn 执行后的值

示例1 

## 输入



```
alterContext(function() {return this.greeting + ', ' + this.name + '!'; }, {name: 'Rebecca', greeting: 'Yo' })
```

## 输出



```
Yo, Rebecca!
```

## 实现

### 1. `bind`

```js
function alterContext(fn, obj) {
  return fn.bind(obj)();//.bind()返回的是一个函数，所以需要立即执行。 }
 

```

### 2. `call`

```js
function alterContext(fn, obj) {
  return fn.call(obj);
}

```

### 3. `apply`

```js
function alterContext(fn, obj) {
  return fn.apply(obj);
}

```

# 30. 原型链问题

## 题目描述

给定一个构造函数 constructor，请完成 alterObjects 方法，将 constructor 的所有实例的 greeting 属性指向给定的 greeting 变量。

示例1 

## 输入



```
var C = function(name) {this.name = name; return this;}; 
var obj1 = new C('Rebecca'); 
alterObjects(C, 'What\'s up'); obj1.greeting;
```

## 输出



```
What's up
```

## 实现

- 这是原型链问题
- 访问一个对象的方法或者是属性，首先会在该对象中寻找，如果找到则返回
- 如果没找到，则在其原型链上面向上寻找，直至基原型，如还未找到，则返回undefined
- 将constructor 的所有实例的 greeting 属性指向给定的 greeting
  变量，只需要在constructor的原型上面添加greeting属性，并指定值。 

### 1. `prototype`

```js
function alterObjects(constructor, greeting) {
  constructor.prototype.greeting = greeting;
 }
```

# 31. 属性遍历

## 题目描述

找出对象 obj 不在原型链上的属性(注意这题测试例子的冒号后面也有一个空格~)
1、返回数组，格式为 key: value
  2、结果数组不要求顺序

示例1 

## 输入



```
var C = function() {this.foo = 'bar'; this.baz = 'bim';}; 
C.prototype.bop = 'bip'; 
iterate(new C());
```

## 输出



```
["foo: bar", "baz: bim"]
```

## 实现

### 1. `Object.keys`

```js
function iterate(obj) {
    return Object.keys(obj).map(function(key) {
        return key + ": " + obj[key];
    });
}

```

### 2. `for-in, hasOwnProperty`

```js
function iterate(obj) {
    const res = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            res.push(prop + ": " + obj[prop]);
        }
    }
    return res;
}

```

### 3. `Object.getOwnPropertyNames`

```js
function iterate(obj) {
    return Object.getOwnPropertyNames(obj).map(function(key) {
        return key + ": " + obj[key];
    });
} 
```

# 32. 正则

## 题目描述

给定字符串 str，检查其是否包含数字，包含返回 true，否则返回 false

示例1 

## 输入



```
'abc123'
```

## 输出



```
true
```

## 实现

### 1. `regex, test`

```js
function containsNumber(str) {
    let reg = /\d/;
    return reg.test(str);
}
```

### 2. `match`

```js
function containsNumber(str) {
    return !!str.match(/\d/);
}
```

# 33. 捕获组

## 题目描述

给定字符串 str，检查其是否包含连续重复的字母（a-zA-Z），包含返回 true，否则返回 false

示例1 

## 输入



```
'rattler'
```

## 输出



```
true
```

## 实现

### 1. `()\1, test`

```js
function containsRepeatingLetter(str) {
    let reg = /([a-zA-Z])\1/;
    return reg.test(str);
}
```

# 34. 获取指定字符串

## 题目描述

给定字符串 str，检查其是否包含 连续3个数字 
1、如果包含，返回最先出现的 3 个数字的字符串
2、如果不包含，返回 false

示例1 

## 输入



```
'9876543'
```

## 输出



```
987
```

## 实现

### 1. `\d{3} || false`

```js
function captureThreeNumbers(str) {
    return str.match(/\d{3}/) || false;
}
```

# 35. 电话号码正则

## 题目描述

给定字符串 str，检查其是否符合如下格式
1、XXX-XXX-XXXX
 2、其中 X 为 Number 类型

示例1 

## 输入



```
'800-555-1212'
```

## 输出



```
true
```

## 实现

### 1. `test, (\d{3}-){2}`

```js
function matchesPattern(str) {
    return (/^(\d{3}-){2}\d{4}$/).test(str);
}
```

# 36. `USD`格式

## 题目描述

给定字符串 str，检查其是否符合美元书写格式
1、以 $ 开始
2、整数部分，从个位起，满 3 个数字用 , 分隔
3、如果为小数，则小数部分长度为 2
 4、正确的格式如：$1,023,032.03 或者 $2.03，错误的格式如：$3,432,12.12 或者 $34,344.3

示例1 

## 输入



```
'$20,933,209.93'
```

## 输出



```
true
```

## 实现

### 1. `regex, ?, .,*`

```js
function isUSD(str) {
    return (/^\$\d{1,3}(\,\d{3})*(\.\d{2})?$/).test(str);
}
```



# 37. 修改`this`指向

## 题目描述

封装函数 f，使 f 的 this 指向指定的对象

示例1 

## 输入



```
无
```

## 输出



```
无
```

## 实现

- 使f的this指向指定对象?函数调用时，使其执行上下文为对象?使对象将函数作为其方法调用
- 对象在调用函数时，需要传入函数所需的形参 

### 1. `apply`

```js
// 方法一：apply
function bindThis(f, oTarget) {
    return function() {
        let args = [].slice.call(arguments)
        return f.apply(oTarget,args)
    }   
}

//
function bindThis(f, oTarget) {
    return function() {
        return f.apply(oTarget,arguments)
    }   
}

```

## 2. `call`

```js
// 方法二：call
function bindThis(f, oTarget) {
    return function() {
        let args = [].slice.call(arguments)
        return f.call(oTarget,...args)
    }   
}

```

## 3. `bind`

```js
// 方法三：bind
function bindThis(f, oTarget) {
    return f.bind(oTarget)
}

```

## 4. 函数作为对象的方法调用

```js
// 方法四：将函数作为对象的方法调用
function bindThis(f, oTarget) {
    // 使用call、apply、bind方法时，该函数是添加到对象原型上的
    // oTarget.__proto__.fn = f
    oTarget.fn = f
    return function(){
        let args = [].slice.call(arguments)
        return oTarget.fn(...args)
    }
}

```

# 38. 处理`url`

## 题目描述

获取 url 中的参数
\1. 指定参数名称，返回该参数的值 或者 空字符串
\2. 不指定参数名称，返回全部的参数对象 或者 {}
\3. 如果存在多个同名参数，则返回数组

示例1 

## 输入



```
http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe key
```

## 输出



```
[1, 2, 3]
```

## 实现

### 1. `regex`

```js
function getUrlParam(sUrl,sKey){
    var result = {};
    sUrl.replace(/\??(\w+)=(\w+)&?/g,function(a,k,v){
        if(result[k] !== void 0){
            var t = result[k];
            result[k] = [].concat(t,v);
        }else{
            result[k] = v;
        }
    });
    if(sKey === void 0){
        return result;
    }else{
        return result[sKey] || '';
    }
}
//
"http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe".replace(/\??(\w+)=(\w+)&/g, (a,k,v)=>console.log(`a:${a}, k:${k}, v:${v}`))
a:?key=1&, k:key, v:1
a:key=2&, k:key, v:2
a:key=3&, k:key, v:3
```

# 39. `dom`结点查找

## 题目描述

查找两个节点的最近的一个共同父节点，可以包括节点自身

## 输入描述:

```
oNode1 和 oNode2 在同一文档中，且不会为相同的节点
```

## 实现

### 1. `parentNode.contains`

```js
function commonParentNode(oNode1, oNode2) {
    for(;oNode1;oNode1=oNode1.parentNode){
        if(oNode1.contains(oNode2)){
            return oNode1;
        }
    }
}

```

### 2. 递归

```js
function commonParentNode(oNode1, oNode2) {
    if(oNode1.contains(oNode2)){
        return oNode1;
    }else{
        return commonParentNode(oNode1.parentNode,oNode2);
    }
}

```

# 40. 根据包名，在指定空间中创建对象

## 题目描述

根据包名，在指定空间中创建对象

## 输入描述:

```
namespace({a: {test: 1, b: 2}}, 'a.b.c.d')
```

## 输出描述:

```
{a: {test: 1, b: {c: {d: {}}}}}
```

 ## 实现

### 1. `split, for, if-in`

```js
function namespace(oNamespace, sPackage) {
    var arr = sPackage.split('.');
    var res = oNamespace;	// 保留对原始对象的引用

    for(var i = 0, len = arr.length; i < len; i++) {
    	if(arr[i] in oNamespace) {	// 空间名在对象中
    		if(typeof oNamespace[arr[i]] !== "object") {	// 为原始值	
    			oNamespace[arr[i]] = {};    // 将此属性设为空对象			
    		}	
    	} else {	// 空间名不在对象中，建立此空间名属性，赋值为空
    		oNamespace[arr[i]] = {};
    	}
        
    	oNamespace = oNamespace[arr[i]];	// 将指针指向下一个空间名属性。
    }

    return res;

}

```

### 2. 递归

```js
function namespace(oNamespace, sPackage) {
   if(sPackage.length <= 0) return;
    // var arr = sPackage.split('.');
    var pointer = oNamespace;
 
        if(sPackage[0] in oNamespace) {
            if(typeof oNamespace[sPackage[0]] !== "object") {
                oNamespace[sPackage[0]] = {};               
            }   
        } else {
            oNamespace[sPackage[0]] = {};
        }
 
        oNamespace = oNamespace[sPackage[0]];
 
        namespace(oNamespace, sPackage.slice(2));
 
         
    return pointer;
 
}

```

# 41. 数组去重

## 题目描述

为 Array 对象添加一个去除重复项的方法

示例1 

## 输入



```
[false, true, undefined, null, NaN, 0, 1, {}, {}, 'a', 'a', NaN]
```

## 输出



```
[false, true, undefined, null, NaN, 0, 1, {}, {}, 'a']
```

## 实现

### 1. `set`

```js
Array.prototype.uniq = function () { 
    return [...new Set(this)];
} 
```

### 2. `indexOf`

```js
Array.prototype.uniq = function () {
   var resArr = [];
   var flag = true;
     
   for(var i=0;i<this.length;i++){
       if(resArr.indexOf(this[i]) == -1){
           if(this[i] != this[i]){   //排除 NaN
              if(flag){
                   resArr.push(this[i]);
                   flag = false;
              }
           }else{
                resArr.push(this[i]);
           }
       }
   }
    return resArr;
}

```

### 3. `includes`

```js
Array.prototype.uniq = function () {
    const arr = []
    this.forEach(ele => {
        if(!arr.includes(ele)) {
            arr.push(ele)
        }
    })
    return arr
}

```

# 42. 时间格式化输出

## 题目描述

按所给的时间格式输出指定的时间
 格式说明
 对于 2014.09.05 13:14:20
 yyyy: 年份，2014
 yy: 年份，14
 MM: 月份，补满两位，09
 M: 月份, 9
 dd: 日期，补满两位，05
 d: 日期, 5
 HH: 24制小时，补满两位，13
 H: 24制小时，13
 hh: 12制小时，补满两位，01
 h: 12制小时，1
 mm: 分钟，补满两位，14
 m: 分钟，14
 ss: 秒，补满两位，20
 s: 秒，20
 w: 星期，为 ['日', '一', '二', '三', '四', '五', '六'] 中的某一个，本 demo 结果为 五

示例1 

## 输入



```
formatDate(new Date(1409894060000), 'yyyy-MM-dd HH:mm:ss 星期w')
```

## 输出



```
2014-09-05 13:14:20 星期五
```

## 实现

### 1. `object`

```js
function formatDate(oDate, sFormation) {
    var obj={
        yyyy: oDate.getFullYear(),
        yy: oDate.getFullYear()%100,
        M: oDate.getMonth()+1,
        d: oDate.getDate(),
        H: oDate.getHours(),
        h: oDate.getHours()%12,
        m: oDate.getMinutes(),
        s: oDate.getSeconds(),
        w: ['日', '一', '二', '三', '四', '五', '六'][oDate.getDay()]
    };
    return sFormation.replace(/([a-zA-Z]+)/g,function($1){
        return $1.length===2&&$1!=='yy' ? ('0'+obj[$1.slice(1)]).slice(-2) : obj[$1];
    });
}
```

# 43. 获取字符串长度

## 题目描述

如果第二个参数 bUnicode255For1 === true，则所有字符长度为 1
否则如果字符 Unicode 编码 > 255 则长度为 2

示例1 

## 输入



```
'hello world, 牛客', false
```

## 输出



```
17
```

 

## 实现

### 1. `charCodeAt`

```js
function strLength(s, bUnicode255For1) {
                var length=s.length;
                if(!bUnicode255For1){
                    for( var i in s){
                        if(s.charCodeAt(i)>255) {
                            length++;
                        }
                    }
                }
                return length;
            }

```

# 44. 颜色字符串转换

## 题目描述

将 rgb 颜色字符串转换为十六进制的形式，如 rgb(255, 255, 255) 转为 #ffffff
 \1. rgb 中每个 , 后面的空格数量不固定
\2. 十六进制表达式使用六位小写字母
\3. 如果输入不符合 rgb 格式，返回原始输入

示例1 

## 输入



```
'rgb(255, 255, 255)'
```

## 输出



```
#ffffff
```

## 实现

### 1. 正则

```js
function rgb2hex(sRGB) {
   return sRGB.replace(/^rgb\((\d+)\s*\,\s*(\d+)\s*\,\s*(\d+)\)$/g, function(a, r, g, b){
       return '#' + hex(r) + hex(g) + hex(b);
   }); 
}
function hex(n){
    return n < 16 ? '0' + (+n).toString(16) : (+n).toString(16);
}

```

# 45. 字符串字数统计

## 题目描述

统计字符串中每个字符的出现频率，返回一个 Object，key 为统计字符，value 为出现频率
\1. 不限制 key 的顺序
\2. 输入的字符串参数不会为空
\3. 忽略空白字符

示例1 

## 输入



```
'hello world'
```

## 输出



```
{h: 1, e: 1, l: 3, o: 2, w: 1, r: 1, d: 1}
```

## 实现

### 1. `replace`

```js
function count(str) {
	var obj = {};
	str.replace(/\S/g,function(s){
		!obj[s]?obj[s]=1:obj[s]++;
	})
	return obj;
}
```

