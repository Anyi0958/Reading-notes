JS声明二维数组常见办法 目录
[TOC]
***

# 前言

- 目前论坛常见的办法代码质量奇差，因此针对这个问题进行整理

# `new Array`和`fill`

```javascript
console.log(new Array(20).fill(new Array(10).fill(0)));
```

结果：
![0-arr][01]


- 此办法将会生成二维数组

# `fill`灵活插入

```js
console.log(new Array(20).fill([1,2,3],0,2));
```

- 将会在`0-2`插入`[1,2,3]`

# `for`笨办法

```js
let arr = new Array(10);
for(let i = 0; i < arr.length; i++)	arr[i] = new Array(10);
```

***
[01]:./img/0-arr.png "0-arr"

