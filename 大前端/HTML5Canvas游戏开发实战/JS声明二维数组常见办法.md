JS������ά���鳣���취 Ŀ¼
[TOC]
***

# ǰ��

- Ŀǰ��̳�����İ취������������������������������

# `new Array`��`fill`

```javascript
console.log(new Array(20).fill(new Array(10).fill(0)));
```

�����
![0-arr][01]


- ~~�˰취�������ɶ�ά����~~
- �˷������ɵĶ�ά���飬�����꽫��һ��ı�

![image-20210305020516027](.\img\image-20210305020516027.png)

# `fill`������

```js
console.log(new Array(20).fill([1,2,3],0,2));
```

- ������`0-2`����`[1,2,3]`

# `for`���취

```js
let arr = new Array(10);
for(let i = 0; i < arr.length; i++)	arr[i] = new Array(10);
```

***
[01]:./img/0-arr.png "0-arr"

# `Array.from`

```js
Array.from(new Array(n),() => new Array(n).fill(0))
```

