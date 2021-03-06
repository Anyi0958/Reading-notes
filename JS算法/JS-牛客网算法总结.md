JS-ţ�����㷨�ܽ� Ŀ¼
[TOC]
***

# ǰ��

# �Ƽ��Ķ�

- leetcode
- ţ����

# 1. �������

����������� arr ������Ԫ�ص��ܺ�

## ����

```
[ 1, 2, 3, 4 ]
```

## ���

```
10
```

## ʵ��

### 1. �ݹ�

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

//����
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





# 2. �Ƴ������е�Ԫ��

[ �㷨֪ʶ��Ƶ���� ](https://www.nowcoder.com/courses/semester/2021algorithm-medium) 

У��ʱ������ҵ���Խ���ֹ���������ҳ�棬Ϊ��ǰ��Ӧ����ϰʱ��ʹ�������Բ⣬���Ǳ���IDE�� 

## ��Ŀ����

�Ƴ����� arr �е�����ֵ�� item ��ȵ�Ԫ�ء���Ҫֱ���޸����� arr����������µ�����

ʾ��1 

## ����

```
[1, 2, 3, 4, 2], 2
```

## ���

```
[1, 3, 4]
```

## ʵ��

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

# 3. �Ƴ��������е�Ԫ��

## ��Ŀ����

�Ƴ����� arr �е�����ֵ�� item ��ȵ�Ԫ�أ�ֱ���ڸ����� arr �����Ͻ��в����������������

ʾ��1 

## ����



```
[1, 2, 2, 3, 4, 2, 2], 2
```

## ���



```
[1, 3, 4]
```

## ʵ��

### 1. ���з�

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

# 4. ���Ԫ��

## ��Ŀ����

������ arr ĩβ���Ԫ�� item����Ҫֱ���޸����� arr����������µ�����

ʾ��1 

## ����



```
[1, 2, 3, 4],  10
```

## ���



```
[1, 2, 3, 4, 10]
```

## ʵ��

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
    var newArr = arr.slice(0);  // slice(start, end)ǳ��������
    newArr.push(item);
    return newArr;
};

```

# 5. ɾ���������һ��Ԫ��

## ��Ŀ����

ɾ������ arr ���һ��Ԫ�ء���Ҫֱ���޸����� arr����������µ�����

ʾ��1 

## ����

```
[1, 2, 3, 4]
```

## ���

```
[1, 2, 3]
```

## ʵ��

### 1. `slice`

```js
//����slice
function truncate(arr) {
    return arr.slice(0,-1);
}
```

### 2. `filter`

```js

//����filter
function truncate(arr) {
    return arr.filter(function(v,i,ar) {
        return i!==ar.length-1;
    });
}

```

### 3. `apply`

```js
//����push.apply+pop
function truncate(arr) {
    var newArr=[];
    [].push.apply(newArr, arr);
    newArr.pop();
    return newArr;
}

```

### 4. `join, split, pop`

```js
//����join+split+pop    ע�⣡�������������ͻ����ַ���
function truncate(arr) {
    var newArr = arr.join().split(',');
    newArr.pop();
    return newArr;
}

```

### 5. `concat`

```js
//����concat+pop 
function truncate(arr) {
    var newArr = arr.concat();
    newArr.pop();
    return newArr;
}

```

### 6. `for`

```js
//��ͨ�ĵ�������
function truncate(arr, item) {
    var newArr=[];
    for(var i=0;i<arr.length-1;i++){
        newArr.push(arr[i]);
    }
    return newArr;
}

```

# 6. ���Ԫ��

## ��Ŀ����

������ arr ��ͷ���Ԫ�� item����Ҫֱ���޸����� arr����������µ�����

ʾ��1 

## ����



```
[1, 2, 3, 4], 10
```

## ���



```
[10, 1, 2, 3, 4]
```

## ʵ��

### 1. `concat`

```js
//����concat
function prepend(arr, item) {
    return [item].concat(arr);
}

```

### 2. `push, apply`

```js
//ʹ��push.apply
function prepend(arr, item) {
    var newArr=[item];
    [].push.apply(newArr, arr);
    return newArr;
}


```

### 3. `slice, unshift/splice`

```js
//����slice+unshift/splice
function prepend(arr, item) {
    var newArr=arr.slice(0);
    newArr.unshift(item);//newArr.splice(0,0,item);
    return newArr;
}

```

### 4. `join, split, unshift`

```js
//ʹ��join+split+unshift/splice���
function prepend(arr, item) {
    var newArr=arr.join().split(',');
    newArr.unshift(item);//newArr.splice(0,0,item);
    return newArr;
}

```

### 5. `for`

```js
//��ͨ�ĵ�������
function prepend(arr, item) {
    var newArr=[];
    for(var i=0;i<arr.length;i++){
        newArr.push(arr[i]);
    }
    newArr.unshift(item);
    return newArr;
}
```

# 7. ɾ�������һ��Ԫ��

## ��Ŀ����

ɾ������ arr ��һ��Ԫ�ء���Ҫֱ���޸����� arr����������µ�����

ʾ��1 

## ����



```
[1, 2, 3, 4]
```

## ���



```
[2, 3, 4]
```

## ʵ��

### 1. `slice`

```js
//����slice
function curtail(arr) {
    return arr.slice(1);
}

```

### 2. `filter`

```js
//����filter
function curtail(arr) {
    return arr.filter(function(v,i) {
        return i!==0;
    });
}

```

### 3. `push, apply, shift`

```js
//����push.apply+shift
function curtail(arr) {
    var newArr=[];
    [].push.apply(newArr, arr);
    newArr.shift();
    return newArr;
}

```

### 4. `join, split, shift`

```js
//����join+split+shift    ע�⣡�������������ͻ����ַ���
function curtail(arr) {
    var newArr = arr.join().split(',');
    newArr.shift();
    return newArr;
}

```

### 5. `concat, shift`

```js
//����concat+shift 
function curtail(arr) {
    var newArr = arr.concat();
    newArr.shift();
    return newArr;
}

```

### 6. `for`

```js
//��ͨ�ĵ�������
function curtail(arr) {
    var newArr=[];
    for(var i=1;i<arr.length;i++){
        newArr.push(arr[i]);
    }
    return newArr;
}

```

# 8. ����ϲ�

## ��Ŀ����

�ϲ����� arr1 ������ arr2����Ҫֱ���޸����� arr����������µ�����

ʾ��1 

## ����



```
[1, 2, 3, 4], ['a', 'b', 'c', 1]
```

## ���



```
[1, 2, 3, 4, 'a', 'b', 'c', 1]
```

## ʵ��

### 1. `concat`

```js
//����concat
function concat(arr1, arr2) {
    return arr1.concat(arr2);
}

```

### 2. `slice, push.apply`

```js
//����slice+push.apply 
function concat(arr1, arr2) {
    var newArr=arr1.slice(0);
    [].push.apply(newArr, arr2);
    return newArr;
}

```

### 3. `slice, push`

```js
//����slice+push 
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
//��ͨ�ĵ�������
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

# 9. ���������Ԫ��

## ��Ŀ����

������ arr �� index �����Ԫ�� item����Ҫֱ���޸����� arr����������µ�����

ʾ��1 

## ����



```
[1, 2, 3, 4], 'z', 2
```

## ���



```
[1, 2, 'z', 3, 4]
```

## ʵ��

### 1. `slice, concat`

```js
//����slice+concat
function insert(arr, item, index) {
    return arr.slice(0,index).concat(item,arr.slice(index));
}

```

2. `concat, splice`

```js
//����concat +splice
function insert(arr, item, index) {
    var newArr=arr.concat();
    newArr.splice(index,0,item);
    return newArr;
}

```

### 3. `slice, splice`

```js
//����slice+splice
function insert(arr, item, index) {
    var newArr=arr.slice(0);
    newArr.splice(index,0,item);
    return newArr;
}

```

### 4. `push.apply, splice`

```js
//����push.apply+splice
function insert(arr, item, index) {
    var newArr=[];
    [].push.apply(newArr, arr);
    newArr.splice(index,0,item);
    return newArr;
}

```

### 5. `for`

```js
//��ͨ�ĵ�������
function insert(arr, item, index) {
    var newArr=[];
    for(var i=0;i<arr.length;i++){
        newArr.push(arr[i]);
    }
    newArr.splice(index,0,item);
    return newArr;
}

```

# 10. ����

## ��Ŀ����

ͳ������ arr ��ֵ���� item ��Ԫ�س��ֵĴ���

ʾ��1

## ����



```
[1, 2, 4, 4, 3, 4, 3], 4
```

## ���



```
3
```

## ʵ��

### 1. `filter`

```js
//filter()-->����ָ���ĺ���ȷ���Ƿ��ڷ��ص������а���ĳһ��
        function count(arr, item) {
            var count = arr.filter(function(a) {
                return a === item;   //����true������ɵ�����
            });
            return count.length;
        }
```

### 2. `map`

```js
//map()-->�������е�ÿһ����и���������
//����ÿ�κ������õĽ����ɵ����飻
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
//forѭ��
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
//reduce()-->������ĵ�һ�ʼ��������������
function count(arr, item) {
    var count = arr.reduce(function(prev, curr) {
        return curr === item ? prev+1 : prev;
    }, 0);
    return count;
}
```

### 5. `forEach`

```js
//forEach()-->�������е�ÿһ�����д���ĺ���
function count(arr, item) {
    var count = 0;
    arr.forEach(function(a) {
        a === item ? count++ : 0;
    });
    return count;
}
```

# 11. �����ظ�Ԫ��

## ��Ŀ����

�ҳ����� arr ���ظ����ֹ���Ԫ��

ʾ��1 

## ����



```
[1, 2, 4, 4, 3, 3, 1, 5, 3]
```

## ���



```
[1, 3, 4]
```

## ʵ��

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

### 2. `for`ǰ�����

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

# 12. ����η�

## ��Ŀ����

Ϊ���� arr �е�ÿ��Ԫ������η�����Ҫֱ���޸����� arr����������µ�����

ʾ��1 

## ����



```
[1, 2, 3, 4]
```

## ���



```
[1, 4, 9, 16]
```

## ʵ��

### 1. `map`

```js
function square(arr) {
    return arr.map(val => val * val);
}
```

# 13. ����Ԫ��λ��

## ��Ŀ����

������ arr �У�����ֵ�� item ��ȵ�Ԫ�س��ֵ�����λ��

ʾ��1 

## ����



```
['a','b','c','d','e','f','a','b','c'] 'a'
```

## ���



```
[0, 6]
```

## ʵ��

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

### 14. ��ȷ�ĺ�������

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

# 14. ��ֵת��

- ֻҪ���֣�����`12px`����ȡ`12`
- `parseInt(num,10)`
- `parseFloat(num)`
- `regex = /^\d+/;regex.exec(num)[0]`

# 15. ����ʱ��

## ��Ŀ����

ʵ��һ������ʱ����Ҫ��
1���� start �� end������ start �� end����ÿ�� 100 ���� console.log һ�����֣�ÿ����������Ϊ 1
 2�����صĶ�������Ҫ����һ�� cancel ����������ֹͣ��ʱ����
3����һ������Ҫ�������

## ʵ��

### 1. `setInterval`

```js
function count(start, end) {
  //���������һ��ֵ
  console.log(start++);
     var timer = setInterval(function(){
         if(start <= end){
             console.log(start++);
         }else{
             clearInterval(timer);
         }
     },100);
    //����һ������
     return {
         cancel : function(){
             clearInterval(timer);
         }
     };
 }

```

### 2. `setTimeout`�͵ݹ�

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

- һ������¶��Ƕ�����ú��������˴��Ǻ��������������,��call(), apply()��
- ��һ�������Ǵ�����ǰ�������󡣵���call()��Ҫ�����������г���applyֱ�Ӵ����������

- ��JavaScript�У�������һ�ֶ������������ǿ��Ա仯�ģ���Ӧ�ģ������ڵ�thisҲ�ǿ��Ա仯�ģ�����������Ϊһ������ķ�����Ҳ����ͬʱ��Ϊ��һ������ķ���������ͨ��Function�����е�call����apply�������޸ĺ����������ģ������е�thisָ�뽫���滻Ϊcall����apply�ĵ�һ��������������   fn ��ִ�������ĸ�Ϊ obj ����ֻ��Ҫ��obj��Ϊcall����apply�ĵ�һ���������뼴�ɡ�
- `fn.apply(obj), fn.call(obj), fn.bind(obj)()` 

# 17. �������ﻯ

## ��Ŀ����

ʵ�ֺ��� functionFunction������֮����������������
1������ֵΪһ������ f
 2�����÷��صĺ��� f������ֵΪ���յ���˳��Ĳ���ƴ�ӣ�ƴ���ַ�ΪӢ�Ķ��ż�һ���ո񣬼� ', '
3�����к����Ĳ�������Ϊ 1���Ҿ�Ϊ String ����

ʾ��1 

## ����



```
functionFunction('Hello')('world')
```

## ���



```
Hello, world
```

## ʵ��

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



# 18. ʹ�ñհ�

## ��Ŀ����

ʵ�ֺ��� makeClosures������֮����������������
1������һ���������� result�������� arr ��ͬ
2������ result �е� i ���������� result[i]()������� fn(arr[i]) ��ͬ

ʾ��1 

## ����



```
[1, 2, 3], function (x) { 
	return x * x; 
}
```

## ���



```
4
```

## ʵ��

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
//ʹ��ES5��bind()����
function makeClosures(arr, fn) {
    var result = new Array();
    for(var i=0;i<arr.length;i++){
        result[i] = fn.bind(null,arr[i]);
    }
    return result;
}

```

# 19. ���η�װ����

## ��Ŀ����

��֪���� fn ִ����Ҫ 3 ����������ʵ�ֺ��� partial������֮����������������
1������һ������ result���ú�������һ������
2��ִ�� result(str3) �����صĽ���� fn(str1, str2, str3) һ��

ʾ��1 

## ����



```
var sayIt = function(greeting, name, punctuation) {     return greeting + ', ' + name + (punctuation || '!'); };  partial(sayIt, 'Hello', 'Ellie')('!!!');
```

## ���



```
Hello, Ellie!!!
```

## ʵ��
- call��apply������ʽ�ص���str3������ִ��
- bind��������ִ�У�δ����str3ʱ����δִ�У�ֻ�Ƿ���һ���������ȴ���������
- this���������Ĳ�ȷ�������

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
 
// ���bind������һ���º���������, ����str1, str2������������, str3δ����, һ������ͻ�ִ��
function partial(fn, str1, str2) {
    return fn.bind(this, str1, str2); // �� return fn.bind(null, str1, str2);
}

// bindͬ��, ����һ��, ��str3����Ĺ���д����һ����������, 
// ����һ������Ҳ��str1, str2����
// �˷����ֶ��һ�ٵĸо������Ǳ�ʾ���˺����ĵ��á�
function partial(fn, str1, str2) {
    function result(str3) {
        return fn.bind(this, str1, str2)(str3);
    }
 
    return result;
}

```
### 4. ����
```js
// ����������Ĭ��this��global����bind�ĵ�һ������ΪthisʱЧ��һ����
function partial(fn, str1, str2) {
    return function(str3) {
        return fn(str1, str2, str3);
    }
}

```

### 5. `ES6`
```js
// ES6��thisָ��undefined.
const partial = (fn, str1, str2) => str3 => fn(str1, str2, str3);

```
# 20. ʹ��`arguments`

## ��Ŀ����

���� useArguments ���Խ��� 1 �������ϵĲ�������ʵ�ֺ��� useArguments���������е��ò�����Ӻ�Ľ��������Ĳ��Բ���ȫ��Ϊ Number ���ͣ����迼�ǲ���ת����

ʾ��1 

## ����



```
1, 2, 3, 4
```

## ���



```
10
```

## ʵ��

### 1. `Array.prototype.slice.call(arguments,0)`

- ������һ��������arguments
- ʹ��`Array.prototype`��������ת��Ϊԭ������
- ��������û��slice()�����ģ���Ҫ��������ת��Ϊԭ��������ܵ���slice()�������
- slice() �����ɴ����е������з���ѡ����Ԫ�ء� �﷨ `arrayObject.slice(start,end)`���ڱ����е���˼��Ҫȥ��������
- call() �������壺����һ������ķ���������һ�������滻��ǰ�������������˼��ž��ǵ���ԭ������ķ�������ԭ��������浱ǰ���������飩������`args`�������ȫ�������������
- ���ʾ���arguments�������ʹ���������slice����������õ��˲������ɵ����飨Ҳ������apply��

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
   ��Ϊ�������������������Ȼ�ȡ��������arguments.length
   Ȼ��ѭ����ֵ
  */
  //����һ�������������ս��
  var sum = 0;
  //ѭ����ֵ
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
    var arr=Array.prototype.slice.call(arguments)//��arguments������ת��Ϊ����
    return eval(arr.join("+"));//���
}
```

# 21. `apply`���ú���

## ��Ŀ����

ʵ�ֺ��� callIt������֮��������������
1�����صĽ��Ϊ���� fn ֮��Ľ��
2��fn �ĵ��ò���Ϊ callIt �ĵ�һ������֮���ȫ������

ʾ��1 

## ����



```
��
```

## ���



```
��
```

## ʵ��

### 1. `[], slice, call, apply`

```js
function callIt(fn) {
    return fn.apply(this,[].slice.call(arguments,1));
    //return fn.apply(this, Array.prototype.slice.call(arguments,1));
}

```

### 2. `apply, null`

- �˴�`this, null`Ч��һ��

```js
function callIt(fn) {
    //��argumentsת��Ϊ����󣬽�ȡ��һ��Ԫ��֮�������Ԫ��
    var args = Array.prototype.slice.call(arguments,1);
    //����fn
    var result = fn.apply(null,args);
    return result;
}

```

# 22. ���η�װ����

## ��Ŀ����

ʵ�ֺ��� `partialUsingArguments`������֮����������������
1������һ������ result
 2������ `result` ֮�󣬷��صĽ������ú��� `fn` �Ľ��һ��
3��`fn` �ĵ��ò���Ϊ `partialUsingArguments` �ĵ�һ������֮���ȫ�������Լ� result �ĵ��ò���

ʾ��1 

## ����



```
��
```

## ���



```
��
```

## ʵ��

### 1. `unshift, apply`

- `unshift`��������ǰ�����Ԫ��
- `bind`��`apply`�ĵ�һ���������Ǹı亯����`this`��ָ���������`null`�ͻ�ָ��`window`
- `apply`�ĵڶ�������Ϊ�����α���飬�����ǽ������Ԫ����Ϊ`fn.bind`�Ĳ������롣

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
     //�Ȼ�ȡp������һ������֮���ȫ������
     var args = Array.prototype.slice.call(arguments,1);
     //����result����
     var result = function(){
         //ʹ��concat�ϲ��������������е�Ԫ��
         return fn.apply(null, args.concat([].slice.call(arguments)));
     }
     return result;
 }
```

# 23. ���ﻯ

## ��Ŀ����

��֪ fn Ϊһ��Ԥ���庯����ʵ�ֺ��� curryIt������֮����������������
1������һ������ a��a �� length ����ֵΪ 1������ʽ���� a ����һ��������
2������ a ֮�󣬷���һ������ b, b �� length ����ֵΪ 1
 3������ b ֮�󣬷���һ������ c, c �� length ����ֵΪ 1
 4������ c ֮�󣬷��صĽ������� fn �ķ���ֵһ��
5��fn �Ĳ�������Ϊ���� a, b, c �ĵ��ò���

ʾ��1 

## ����



```
var fn = function (a, b, c) {return a + b + c}; curryIt(fn)(1)(2)(3);
```

## ���



```
6
```

## ʵ��

- ���ﻯ�ǰѽ��ܶ�������ĺ����任�ɽ���һ����һ����(��������ĵ�һ������)�ĺ��������ҷ��ؽ������µĲ����ҷ��ؽ�����º����ļ���
- �������Ŀ��˼������ָ�����ǽ�Ԥ����ĺ����Ĳ�����һ���뵽curryIt�У�������ȫ������֮�󣬾�ִ��Ԥ���庯��
- ���ǣ���������Ҫ���Ԥ���庯���Ĳ�������fn.length��Ȼ������һ��������ȥ�����Щ����
- ����һ�������������ղ�����ִ�У�����������С��fn.length�����ٴη��ظ������������������ղ�����ִ�У�ֱ��������������fn.length
- ��󣬵���applyִ��Ԥ���庯����

### 1. `callee`

```js
function curryIt(fn) {
     //��ȡfn����������
     var n = fn.length;
     //����һ������args
     var args = [];
     //����һ����������
     return function(arg){
         //��curryIt���������еĲ�����������
         args.push(arg);
         //���args�еĲ�������С��fn�����Ĳ���������
         //��ִ��arguments.callee�������������õ�ǰ����ִ�еĺ����������Ƿ��صĵ�ǰ������������
         //���򣬷���fn�ĵ��ý��
         if(args.length < n){
            return arguments.callee;
         }else return fn.apply("",args);
     }
 } 
```

### 2. ֱ��

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

# 24. ������ģ��

## ��Ŀ����

��ɺ��� createModule������֮����������Ҫ��
1������һ������
2������� greeting ����ֵ���� str1�� name ����ֵ���� str2
 3���������һ�� sayIt �������÷������ص��ַ���Ϊ greeting����ֵ + ', ' + name����ֵ

## ʵ��

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

# 25. ��ȡָ��������λ

## ��Ŀ����

��ȡ���� num ��������ʽ�� bit λ��ֵ��ע�⣺
1��bit �� 1 ��ʼ
2������ 0 �� 1
 3��������2 �Ķ�����Ϊ 10���� 1 λΪ 0���� 2 λΪ 1

ʾ��1 

## ����



```
128, 8
```

## ���



```
1
```

## ʵ��

### 1. `>>, &1`

```js
function valueAtBit(num, bit) {
    return (num >> (bit -1)) & 1;
}

```

### 2. `toString`

- ͨ��`num.toString(2)`��ֱ�ӽ�`num`ת��Ϊ2��������ʽ���ַ����������±���ܽ���Ӧֵȡ����
- ���ص������Ǵ�����������±�Ϊ����

```js
function valueAtBit(num, bit) {
  var s = num.toString(2);
     return s[s.length - bit];
 }

//2.
function valueAtBit(num, bit) {
    //toStringת��Ϊ�����ƣ�split��������ת��Ϊ���飬reverse()������ߵ�˳��
    var arr = num.toString(2).split("").reverse();
    return arr[bit-1];
}
```



# 26. ������ת��ʮ����

## ��Ŀ����

�����������ַ��������任��ɶ�Ӧ��ʮ��������

ʾ��1 

## ����



```
'11000000'
```

## ���



```
192
```

## ʵ��

### 1. `parseInt`

```js
function base10(str) {
    /**
        ��������תʮ����
        parseInt(str,2)
        parseInt(str,8)
        parseInt(str,16)
    */
    return parseInt(str,2);
}
```

### 2. `<<`

```js
//��ʹ���ڲ�����,һ���������
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

# 27. ʮ����ת��Ϊ�����Ʋ�`0`

## ��Ŀ����

����������ת���ɶ������ַ���������ַ������Ȳ��� 8 λ������ǰ�油 0 ����8λ��

ʾ��1 

## ����



```
65
```

## ���



```
01000001
```

## ʵ��

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

������Ϊ��Ӧ�ÿ��ǵ�����2�İ˴η���256����num
function convertToBinary(num) {
var a=num.toString(2).split("");    
    while(a.length%8!=0)
    {
        a.unshift("0");
    }
    return a.join("");    
}

```

# 28. �˷���������

## ��Ŀ����

�� a �� b ��˵�ֵ��a �� b ������С������Ҫע�����ľ�������

ʾ��1 

## ����



```
3, 0.0001
```

## ���



```
0.0003
```



## ʵ��

- ֱ��ʹ��`a*b`����־�������`0.30000000000000004`

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

# 29. �ı�������

## ��Ŀ����

������ fn ��ִ�������ĸ�Ϊ obj������ fn ִ�к��ֵ

ʾ��1 

## ����



```
alterContext(function() {return this.greeting + ', ' + this.name + '!'; }, {name: 'Rebecca', greeting: 'Yo' })
```

## ���



```
Yo, Rebecca!
```

## ʵ��

### 1. `bind`

```js
function alterContext(fn, obj) {
  return fn.bind(obj)();//.bind()���ص���һ��������������Ҫ����ִ�С� }
 

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

# 30. ԭ��������

## ��Ŀ����

����һ�����캯�� constructor������� alterObjects �������� constructor ������ʵ���� greeting ����ָ������� greeting ������

ʾ��1 

## ����



```
var C = function(name) {this.name = name; return this;}; 
var obj1 = new C('Rebecca'); 
alterObjects(C, 'What\'s up'); obj1.greeting;
```

## ���



```
What's up
```

## ʵ��

- ����ԭ��������
- ����һ������ķ������������ԣ����Ȼ��ڸö�����Ѱ�ң�����ҵ��򷵻�
- ���û�ҵ���������ԭ������������Ѱ�ң�ֱ����ԭ�ͣ��绹δ�ҵ����򷵻�undefined
- ��constructor ������ʵ���� greeting ����ָ������� greeting
  ������ֻ��Ҫ��constructor��ԭ���������greeting���ԣ���ָ��ֵ�� 

### 1. `prototype`

```js
function alterObjects(constructor, greeting) {
  constructor.prototype.greeting = greeting;
 }
```

# 31. ���Ա���

## ��Ŀ����

�ҳ����� obj ����ԭ�����ϵ�����(ע������������ӵ�ð�ź���Ҳ��һ���ո�~)
1���������飬��ʽΪ key: value
  2��������鲻Ҫ��˳��

ʾ��1 

## ����



```
var C = function() {this.foo = 'bar'; this.baz = 'bim';}; 
C.prototype.bop = 'bip'; 
iterate(new C());
```

## ���



```
["foo: bar", "baz: bim"]
```

## ʵ��

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

# 32. ����

## ��Ŀ����

�����ַ��� str��������Ƿ�������֣��������� true�����򷵻� false

ʾ��1 

## ����



```
'abc123'
```

## ���



```
true
```

## ʵ��

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

# 33. ������

## ��Ŀ����

�����ַ��� str��������Ƿ���������ظ�����ĸ��a-zA-Z������������ true�����򷵻� false

ʾ��1 

## ����



```
'rattler'
```

## ���



```
true
```

## ʵ��

### 1. `()\1, test`

```js
function containsRepeatingLetter(str) {
    let reg = /([a-zA-Z])\1/;
    return reg.test(str);
}
```

# 34. ��ȡָ���ַ���

## ��Ŀ����

�����ַ��� str��������Ƿ���� ����3������ 
1������������������ȳ��ֵ� 3 �����ֵ��ַ���
2����������������� false

ʾ��1 

## ����



```
'9876543'
```

## ���



```
987
```

## ʵ��

### 1. `\d{3} || false`

```js
function captureThreeNumbers(str) {
    return str.match(/\d{3}/) || false;
}
```

# 35. �绰��������

## ��Ŀ����

�����ַ��� str��������Ƿ�������¸�ʽ
1��XXX-XXX-XXXX
 2������ X Ϊ Number ����

ʾ��1 

## ����



```
'800-555-1212'
```

## ���



```
true
```

## ʵ��

### 1. `test, (\d{3}-){2}`

```js
function matchesPattern(str) {
    return (/^(\d{3}-){2}\d{4}$/).test(str);
}
```

# 36. `USD`��ʽ

## ��Ŀ����

�����ַ��� str��������Ƿ������Ԫ��д��ʽ
1���� $ ��ʼ
2���������֣��Ӹ�λ���� 3 �������� , �ָ�
3�����ΪС������С�����ֳ���Ϊ 2
 4����ȷ�ĸ�ʽ�磺$1,023,032.03 ���� $2.03������ĸ�ʽ�磺$3,432,12.12 ���� $34,344.3

ʾ��1 

## ����



```
'$20,933,209.93'
```

## ���



```
true
```

## ʵ��

### 1. `regex, ?, .,*`

```js
function isUSD(str) {
    return (/^\$\d{1,3}(\,\d{3})*(\.\d{2})?$/).test(str);
}
```



# 37. �޸�`this`ָ��

## ��Ŀ����

��װ���� f��ʹ f �� this ָ��ָ���Ķ���

ʾ��1 

## ����



```
��
```

## ���



```
��
```

## ʵ��

- ʹf��thisָ��ָ������?��������ʱ��ʹ��ִ��������Ϊ����?ʹ���󽫺�����Ϊ�䷽������
- �����ڵ��ú���ʱ����Ҫ���뺯��������β� 

### 1. `apply`

```js
// ����һ��apply
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
// ��������call
function bindThis(f, oTarget) {
    return function() {
        let args = [].slice.call(arguments)
        return f.call(oTarget,...args)
    }   
}

```

## 3. `bind`

```js
// ��������bind
function bindThis(f, oTarget) {
    return f.bind(oTarget)
}

```

## 4. ������Ϊ����ķ�������

```js
// �����ģ���������Ϊ����ķ�������
function bindThis(f, oTarget) {
    // ʹ��call��apply��bind����ʱ���ú�������ӵ�����ԭ���ϵ�
    // oTarget.__proto__.fn = f
    oTarget.fn = f
    return function(){
        let args = [].slice.call(arguments)
        return oTarget.fn(...args)
    }
}

```

# 38. ����`url`

## ��Ŀ����

��ȡ url �еĲ���
\1. ָ���������ƣ����ظò�����ֵ ���� ���ַ���
\2. ��ָ���������ƣ�����ȫ���Ĳ������� ���� {}
\3. ������ڶ��ͬ���������򷵻�����

ʾ��1 

## ����



```
http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe key
```

## ���



```
[1, 2, 3]
```

## ʵ��

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

# 39. `dom`������

## ��Ŀ����

���������ڵ�������һ����ͬ���ڵ㣬���԰����ڵ�����

## ��������:

```
oNode1 �� oNode2 ��ͬһ�ĵ��У��Ҳ���Ϊ��ͬ�Ľڵ�
```

## ʵ��

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

### 2. �ݹ�

```js
function commonParentNode(oNode1, oNode2) {
    if(oNode1.contains(oNode2)){
        return oNode1;
    }else{
        return commonParentNode(oNode1.parentNode,oNode2);
    }
}

```

# 40. ���ݰ�������ָ���ռ��д�������

## ��Ŀ����

���ݰ�������ָ���ռ��д�������

## ��������:

```
namespace({a: {test: 1, b: 2}}, 'a.b.c.d')
```

## �������:

```
{a: {test: 1, b: {c: {d: {}}}}}
```

 ## ʵ��

### 1. `split, for, if-in`

```js
function namespace(oNamespace, sPackage) {
    var arr = sPackage.split('.');
    var res = oNamespace;	// ������ԭʼ���������

    for(var i = 0, len = arr.length; i < len; i++) {
    	if(arr[i] in oNamespace) {	// �ռ����ڶ�����
    		if(typeof oNamespace[arr[i]] !== "object") {	// Ϊԭʼֵ	
    			oNamespace[arr[i]] = {};    // ����������Ϊ�ն���			
    		}	
    	} else {	// �ռ������ڶ����У������˿ռ������ԣ���ֵΪ��
    		oNamespace[arr[i]] = {};
    	}
        
    	oNamespace = oNamespace[arr[i]];	// ��ָ��ָ����һ���ռ������ԡ�
    }

    return res;

}

```

### 2. �ݹ�

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

# 41. ����ȥ��

## ��Ŀ����

Ϊ Array �������һ��ȥ���ظ���ķ���

ʾ��1 

## ����



```
[false, true, undefined, null, NaN, 0, 1, {}, {}, 'a', 'a', NaN]
```

## ���



```
[false, true, undefined, null, NaN, 0, 1, {}, {}, 'a']
```

## ʵ��

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
           if(this[i] != this[i]){   //�ų� NaN
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

# 42. ʱ���ʽ�����

## ��Ŀ����

��������ʱ���ʽ���ָ����ʱ��
 ��ʽ˵��
 ���� 2014.09.05 13:14:20
 yyyy: ��ݣ�2014
 yy: ��ݣ�14
 MM: �·ݣ�������λ��09
 M: �·�, 9
 dd: ���ڣ�������λ��05
 d: ����, 5
 HH: 24��Сʱ��������λ��13
 H: 24��Сʱ��13
 hh: 12��Сʱ��������λ��01
 h: 12��Сʱ��1
 mm: ���ӣ�������λ��14
 m: ���ӣ�14
 ss: �룬������λ��20
 s: �룬20
 w: ���ڣ�Ϊ ['��', 'һ', '��', '��', '��', '��', '��'] �е�ĳһ������ demo ���Ϊ ��

ʾ��1 

## ����



```
formatDate(new Date(1409894060000), 'yyyy-MM-dd HH:mm:ss ����w')
```

## ���



```
2014-09-05 13:14:20 ������
```

## ʵ��

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
        w: ['��', 'һ', '��', '��', '��', '��', '��'][oDate.getDay()]
    };
    return sFormation.replace(/([a-zA-Z]+)/g,function($1){
        return $1.length===2&&$1!=='yy' ? ('0'+obj[$1.slice(1)]).slice(-2) : obj[$1];
    });
}
```

# 43. ��ȡ�ַ�������

## ��Ŀ����

����ڶ������� bUnicode255For1 === true���������ַ�����Ϊ 1
��������ַ� Unicode ���� > 255 �򳤶�Ϊ 2

ʾ��1 

## ����



```
'hello world, ţ��', false
```

## ���



```
17
```

 

## ʵ��

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

# 44. ��ɫ�ַ���ת��

## ��Ŀ����

�� rgb ��ɫ�ַ���ת��Ϊʮ�����Ƶ���ʽ���� rgb(255, 255, 255) תΪ #ffffff
 \1. rgb ��ÿ�� , ����Ŀո��������̶�
\2. ʮ�����Ʊ��ʽʹ����λСд��ĸ
\3. ������벻���� rgb ��ʽ������ԭʼ����

ʾ��1 

## ����



```
'rgb(255, 255, 255)'
```

## ���



```
#ffffff
```

## ʵ��

### 1. ����

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

# 45. �ַ�������ͳ��

## ��Ŀ����

ͳ���ַ�����ÿ���ַ��ĳ���Ƶ�ʣ�����һ�� Object��key Ϊͳ���ַ���value Ϊ����Ƶ��
\1. ������ key ��˳��
\2. ������ַ�����������Ϊ��
\3. ���Կհ��ַ�

ʾ��1 

## ����



```
'hello world'
```

## ���



```
{h: 1, e: 1, l: 3, o: 2, w: 1, r: 1, d: 1}
```

## ʵ��

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

