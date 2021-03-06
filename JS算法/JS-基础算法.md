JS-�����㷨 Ŀ¼
[TOC]
***

# ǰ��

- Դ�ԣ�[freecodecamp](https://learn.freecodecamp.one/ "freecodecamp")

# �Ƽ��Ķ�

- [freecodecamp](https://learn.freecodecamp.one/ "freecodecamp")

# 1. ��ת�ַ��� - `split, reverse, join`

```js
function reverseString(str) {
  return str
    .split("")
    .reverse()
    .join("");
}

//join() �������ڰ������е�����Ԫ�ط���һ���ַ�����
//reverse() �������ڵߵ�������Ԫ�ص�˳��
```



# 2. ���ֵĽ׳� - `�ݹ�, array, reduce, fill`

- ����һ�����������Ľ׳ˡ� 

- �� n ��һ��������n �Ľ׳˾�������С�ڵ��� n ���������ĳ˻��� 
- n �Ľ׳�ͨ���÷��� n!����ʾ�� 
- ���磺 5! = 1 * 2 * 3 * 4 * 5 = 120 
- ֻ�зǸ������ᱻ��Ϊ���������������

## 1. �ݹ�

```js
//1.�ݹ�
function factorialize(num) {
  if (num === 0) {
    return 1;
  }
  return num * factorialize(num - 1);
}

factorialize(5);
```

## 2. �����ݹ�

```js
//2.�ڶ��࣬�����ݹ�
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

# 3. �����ַ�������ĵ���

## 1. `split`

```js
// 1.split�и�󣬱��������жϳ���
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
// 2.reduce�Ƚ����ֵ�������ڱ�ֵ����
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
//map() ��������һ�������飬�����е�Ԫ��Ϊԭʼ����Ԫ�ص��ú���������ֵ��
//map() ��������ԭʼ����Ԫ��˳�����δ���Ԫ�ء�
//ע�⣺ map() ����Կ�������м�⡣
//ע�⣺ map() ����ı�ԭʼ���顣

function findLongestWordLength(str) {
  return Math.max(...str.split(" ").map(word => word.length));
}
```

## 4. `�ݹ�`

```js
// 4.�ݹ�
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

## ����

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

# 4. ������������������

- ����һ�����飬��Ҫ�ɸ����������������е����ֵ��ɡ�

## 1. `map, reduce`

```js
// ˫������
//����һ�����飬��Ҫ�ɸ����������������е����ֵ��ɡ�������������������ܻ����4�������顣
// 1.map + reduce�Ƚ�

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
// 2.apply, bind ʵ��
function largestOfFour(arr) {
  return arr.map(Function.apply.bind(Math.max, null));
}
```

### ����

apply��bind�������ͣ�

TL;DR: We build a special callback function (using the `Function.bind` method), that works just like `Math.max` but also has Function.prototype.apply's ability to take arrays as its arguments.

- We start by mapping through the elements inside the main array. Meaning each one of the inner arrays.
- Now the need a callback function to find the max of each inner array provided by the map.

So we want to create a function that does the work of Math.max and accepts input as an array (which by it doesn��t by default).

In other words, it would be really nice and simple if this worked by itself:

Math.max([9, 43, 20, 6]); // Resulting in 43

Alas, it doesn��t.

- To do the work of accepting arguments in the shape of an array, there is this Function.prototype.apply method, but it complicates things a bit by invoking the context function.

i.e. Math.max.apply(null, [9, 43, 20, 6]); would invoke something like a Max.max method. What we��re looking for�� almost.

Here we��re passing null as the context of the Function.prototype.apply method as Math.max doesn��t need any context.

- Since arr.map expects a callback function, not just an expression, we create a function out of the previous expression by using the Function.bind method.
- Since, Function.prototype.apply is a static method of the same Function object, we can call Function.prototype.bind on Function.prototype.apply i.e. Function.prototype.apply.bind.
- Now we pass the context for the Function.prototype.apply.bind call (in this case we want Math.maxso we can gain its functionality).
- Since the embedded Function.prototype.apply method will also require a context as it��s 1st argument, we need to pass it a bogus context.

- - So, we pass null as the 2nd param to Function.prototype.apply.bind which gives a context to the Math.max method.
  - Since, Math.max is independent of any context, hence, it ignores the bogus context given by Function.prototype.apply method call.
  - Thus, our Function.prototype.apply.bind(Math.max, null) makes a new function accepting the arr.map values i.e. the inner arrays.

### `call, apply, bind`�÷�

![img](.\img\call.png)

![img](.\img\applybind.png)

## 3. �ݹ�

```js
// 3.�ݹ�
function largestOfFour(arr, finalArr = []) {
  return !arr.length
    ? finalArr
    : largestOfFour(arr.slice(1), finalArr.concat(Math.max(...arr[0])))
}
```

# 5. ����ַ����Ľ�β

- ���һ���ַ�������һ�������� `str`���Ƿ��Ը������ַ������ڶ������� target��������

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

# 6. �ظ��ַ���

- ��һ���������ַ�������һ�������� str)�ظ� num���ڶ����������Ρ���� num����һ������������һ�����ַ�����

## 1. `array, fill, join`

```js
// 1. Array, fill, join
function multiStr(str, num){
	return num > 0
		? (new Array(num).fill(str).join(""))
		: "";
}

```

## 2. �ݹ�

```js
// 2.�ݹ�-if�ж�
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

## 3. �ݹ飬 ��Ŀ

```js
//3.�ݹ�-��Ŀ
function repeatStringNumTimes(str, num) {
  return num > 0 ? str + repeatStringNumTimes(str, num - 1) : '';
}
```

# 7. �ض��ַ���

- ���һ���ַ�������һ���������ĳ��ȴ��ڸ�����ֵ���ڶ�������������ض������������� `...`�����ر��ضϵ��ַ�����

## 1. `.length`

```js
// 1.��һ��.length > �ڶ���.length
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

# 8. �����ߺͿ�����

- дһ�����������һ�����飨��һ���������е�Ԫ�أ������������е�һ��ͨ��У����ԣ��ڶ���������һ������һ������������һ������ֵ�ĺ�������Ԫ�ء����û��Ԫ��ͨ�����ԣ��򷵻� `undefined`��

## 1. `map, lambda`

```js
// 1.map + lambda + ��Ŀ���������飩
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
//find() ��������ͨ�����ԣ��������жϣ�������ĵ�һ��Ԫ�ص�ֵ��
//find() ����Ϊ�����е�ÿ��Ԫ�ض�����һ�κ���ִ�У�
//�������е�Ԫ���ڲ�������ʱ���� true ʱ, find() ���ط���������Ԫ�أ�
//֮���ֵ�����ٵ���ִ�к�����
//���û�з���������Ԫ�ط��� undefined
//ע��: find() ���ڿ����飬�����ǲ���ִ�еġ�
//ע��: find() ��û�иı������ԭʼֵ��
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

# 9. ��ٲ���

- ���һ��ֵ�Ƿ���ԭʼ�Ĳ���ֵ��boolean�����͡����� true ���� false��
- ����ֵԭʼ����Ϊ true ���� false��

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

# 10. ���ʵ�����ĸ��д

- ���������ַ��������е��ʵĵ�һ����ĸ��ɴ�д�������صõ����ַ�������ȷ���������ĸ��Сд�ġ�

## 1. `prototype`

```js
// 1.prototype
//prototype ����ʹ�������������������Ժͷ�����
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
//charAt() �����ɷ���ָ��λ�õ��ַ���
//��ע�⣬JavaScript ��û��һ���б����ַ������͵��ַ��������ͣ�
//���Է��ص��ַ��ǳ���Ϊ 1 ���ַ�����
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
// 3.�����滻
function titleCase(str) {
  return str.toLowerCase().replace(/(^|\s)\S/g, L => L.toUpperCase());
}
```

# 11. ���Ƶ��ڶ���������

- ����������� slice�� splice����������һ�������е�����Ԫ�����θ��Ƶ��ڶ��������С�
- ��ӵڶ�������������ֵΪ n�ĵط���ʼ���롣
- ���ز���Ԫ�غ�����顣��������������ں���ִ��ǰ��Ҫ���ֲ��䡣

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
// 2.ȫ������
function frankenSplice(arr1, arr2, n) {
  // It's alive. It's alive!
  let localArr = arr2.slice();
  localArr.splice(n, 0, ...arr1);
  return localArr;
}
```

# 12. ȥ�������еļ�ֵ

- ��һ���������Ƴ����м�ֵ��falsy values����
- JavaScript �еļ�ֵ�� false��null��0��""��undefined�� NaN��
- ��ʾ���볢�Խ�ÿһ��ֵת��Ϊһ������ֵ��boolean����

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

# 13. ��������

- �������飨��һ��������������󣬽�һ��ֵ���ڶ������������뵽�������ж�ʹ���鱣���������С�����������ص�ֵӦ����һ�����֡�
- ���磬getIndexToIns([1,2,3,4], 1.5)Ӧ�÷��� 1��Ϊ 1.5 ���� 1������Ϊ 0������С�� 2������Ϊ 1����
- ͬ���أ�getIndexToIns([20,3,5], 19)Ӧ�÷��� 2��Ϊ���鱻�������� [3,5,20]���� 19С�� 20������Ϊ 2���Ҵ��� 5������Ϊ 1����

## 1. `sort`

```js
// 1.sort
//sort() �������ڶ������Ԫ�ؽ�������
//�� a С�� b���������������� a Ӧ�ó����� b ֮ǰ���򷵻�һ��С�� 0 ��ֵ��
//�� a ���� b���򷵻� 0��
//�� a ���� b���򷵻�һ������ 0 ��ֵ��
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

## 3. ���򣬶���

```js
// 3.����+����
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
//indIndex() �������ش���һ���������������������������������һ��Ԫ��λ�á�
//findIndex() ����Ϊ�����е�ÿ��Ԫ�ض�����һ�κ���ִ�У�
//�������е�Ԫ���ڲ�������ʱ���� true ʱ,
// findIndex() ���ط���������Ԫ�ص�����λ�ã�֮���ֵ�����ٵ���ִ�к�����
//���û�з���������Ԫ�ط��� -1
//ע��: findIndex() ���ڿ����飬�����ǲ���ִ�еġ�
//ע��: findIndex() ��û�иı������ԭʼֵ��
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
//filter() ��������һ���µ����飬
//�������е�Ԫ����ͨ�����ָ�������з�������������Ԫ�ء�
//ע�⣺ filter() ����Կ�������м�⡣
//ע�⣺ filter() ����ı�ԭʼ���顣
function getIndexToIns(arr, num) {
  return arr.filter(val => num > val).length;
}
```

# 14. ����֮��Ĺ�ϵ

- ���������һ���������ַ���Ԫ�ص����顣�����һ���ַ����а����˵ڶ����ַ����е�������ĸ���򷵻� true��
- ���磬["hello", "Hello"]Ӧ�÷��� true ��Ϊ��һ���ַ����а����˵ڶ����ַ����г��ֵ�������ĸ�����Դ�Сд����
- �� ["hello", "hey"]Ӧ�÷��� false ��Ϊ��һ���ַ��� "hello" û�а�����ĸ "y"��
- ���["Alien", "line"], Ӧ�÷��� true����Ϊ "line" �е�������ĸ���������� "Alien" �С�
- `mutation(["zyxwvutsrqponmlkjihgfedcba", "qrstu"])`Ӧ�÷��� true��

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
//every() �������ڼ����������Ԫ���Ƿ񶼷���ָ��������ͨ�������ṩ����
//every() ����ʹ��ָ��������������е�����Ԫ�أ�
//��������м�⵽��һ��Ԫ�ز����㣬���������ʽ���� false ��
//��ʣ���Ԫ�ز����ٽ��м�⡣
//�������Ԫ�ض������������򷵻� true��
//ע�⣺ every() ����Կ�������м�⡣
//ע�⣺ every() ����ı�ԭʼ���顣
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

## 4. `includes, �ݹ�`

```js
// 3.includes + �ݹ�
//includes() ���������ж��ַ����Ƿ����ָ�������ַ�����
//����ҵ�ƥ����ַ����򷵻� true�����򷵻� false��
//ע�⣺ includes() �������ִ�Сд��
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

# 15. ����ָ�

- ��дһ����������һ�����飨��һ���������ָ��һ�鳤��Ϊ size���ڶ��������������飬Ȼ����һ����ά�����з�����Щ�����

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

## 5. `concat, �ݹ�`

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

# 16. ��Χ�ڵ��������

- ����һ�������������ֵ����飬������Ҫдһ�������������������������ּ��������֣��������������֣����ܺ͡�
- ע�⣬��С����һ�����ǳ���������ĵ�һ��Ԫ�ء�

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

# 17. ������������

- ������Ҫдһ���������Ƚ��������飬����һ���µ����顣
- �����������Ҫ���������������������Ԫ���У���������һ����������ֵ�Ԫ�ء�
- ���ĳ��Ԫ��ͬʱ���������������У���Ӧ�����ڷ��ص������
- ����֮��������Ҫ��������������ĶԳƲ

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

# 18. ɾ�������е�ָ��Ԫ��

- �������ĵ�һ�����������飬���ǳ���Ϊ��ʼ���顣�����Ĳ��������ǲ�ȷ���ģ�������һ������������Ҫ�����ǣ��ӳ�ʼ�������Ƴ����������������ȵ�Ԫ�أ��������Ƴ�Ԫ�غ�����顣
- ע�⣺�����ʹ��arguments����Ҳ����ʹ��...������ʣ���������Rest Parameters���﷨��

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

# 19. �Ӷ����������ҳ�����ָ��ֵ

- Ҫдһ��������������������������һ�������Ƕ������飬�ڶ���������һ������
- ������Ҫ�Ӷ����������ҳ���ڶ���������Ȼ�����ڶ������������ж��󣬲��Զ����������ʽ���ء�
- ���У���ȵ���˼��ԭ�����еĶ�����ڶ��������ж�������м�ֵ����ȫ��ȣ�
- ��������˼��ֻҪ�ڶ��������ж�������м�������ԭ��������У������Ƕ�Ӧ��ֵ��ͬ���ɡ�
- ���磬�����һ��������[{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }]���ڶ���������{ last: "Capulet" }����ô����Ҫ�Զ����������ʽ���ص�һ�������еĵ�����Ԫ�أ���Ϊ�������ڶ��������ж���ļ�last���Ҷ�Ӧ��ֵ"Capulet"��ͬ

## 1. `filter, hasownproperty`

```js
//1.filter + hasownproperty
function whatIsInAName(collection, source) {
  // "What's in a name? that which we call a rose
  // By any other name would smell as sweet.��
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
  // By any other name would smell as sweet.��
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
  // By any other name would smell as sweet.��
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
  // �����Ĵ���д������ע������
  
  return collection.filter(obj => arr.every(key => obj.hasOwnProperty(key) && obj[key] === source[key]));
  // �����Ĵ���д������ע������
}

whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });
```

