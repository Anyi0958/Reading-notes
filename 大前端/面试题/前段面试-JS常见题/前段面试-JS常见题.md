前段面试-JS常见题 目录
[TOC]
***

# 前言

- 一次整理
- 以下几类：
  - 算法类
  - 原理类
  - 应用类

# 推荐阅读

- [常见面试题](https://leetcode-cn.com/circle/discuss/SVKmhR/)

# 1. 手写Algorithm

## 1. 快速排序
```js
/**
 * --- 测试用例 ---
 *
 * 输入：[1, 34, 5, 76, 8, 6, 9, 7, 6, 3]
 * 输出：[1, 3, 5, 6, 6, 7, 8, 9, 34, 76]
 *
 * --- 说明 ---
 * 
 * 思考：快速排序是稳定的吗？
 * 解答：base 的每次选择，会导致快排是不稳定排序。
 */
 
const quickSort = nums => {
    if(nums.length < 2) {
        return nums;
    } else {
        let left = [],
            right = [],
            pivot = Math.floor(nums.length / 2),
            base = nums.splice(pivot, 1)[0];
        
        for(let i = 0; i < nums.length; i++) {
            if(nums[i] < base)  left.push(nums[i]);
            else    right.push(nums[i]);
        }
    }
    
    return quickSort(left).concat([base], quickSort(right));
};
```

## 2. 冒泡排序
```js
/**
 * --- 测试用例 ---
 *
 * 输入：[5, 2, 4, 7, 9, 8, 3, 6, 3, 8, 3]
 * 输出：[2, 3, 3, 3, 4, 5, 6, 7, 8, 8, 9]
 *
 * --- 说明 ---
 * 
 * 思考：冒泡排序是稳定的吗？
 * 解答：稳定。相等的元素不发生交换
 */

const bubbleSOrt = nums => {
    for(let i = 0; i < nums.length; i++){
        for(let j = 0; j < nums.length -1 - i; j++) {
            if(nums[i] > nums[j]){
                let tmp = nums[j];
                nums[j] = nums[j];
                nums[j] = tmp;
            }
        }
    }
    
    return nums;
};
```

## 3. 选择排序
```js
/**
 * --- 测试用例 ---
 *
 * 输入：[6, 45, 3, 2, 5, 6, 8, 4, 3, 4, 56, 67, 5]
 * 输出：[2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 45, 56, 67]
 *
 * --- 说明 ---
 * 
 * 思考：选择排序是稳定的吗？
 * 解答：要看代码是如何实现的，在本例中由于有交换，所以是不稳定排序。
 */

const selectSort = nums => {
    let idx; //最小值索引
    
    for(let i = 0; i < num.length - 1; i++){
        idx = i;
        for(let j = i + 1; j < nums.length; j++){
            if(nums[j] < nums[idx])  idx = j;
        }
        if(nums[i] > nums[idx]){
            let tmp = nums[idx];
            nums[idx] = nums[i];
            nums[i] = tmp;
        }
    }
    return nums;
};

```

# 2. `URL`拆解问题
## 1. 题目一

```js
/**
 * --- 题目描述 ---
 * 
 * 实现一个函数，可以对 url 中的 query 部分做拆解，返回一个 key: value 形式的 object  
 * 
 * --- 实例 ---
 * 
 * 输入：'http://sample.com/?a=1&e&b=2&c=xx&d#hash' 
 * 输出：{a: 1, b: 2, c: 'xx', d: ''}  
 */
function getQueryObj(url){
    let url = Array.prototype.slice.call(arguments, 0),
        arr = url.split(?)[1].split('#')[0].split('&');
	const res = {};
    
    arr.map(val => {
        const [key, value] = val.split('=');
        if(!value)	res[key] = '';
        else	res[key] = value;
    });
    
    return res;
}
```

## 2. 题目二

```js
/**
 * --- 题目描述 ---
 *
 * 实现一个 parseParem 函数，将 url 转化为指定结果
 *
 * --- 测试用例 ---
 *
 * 输入：url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled'
 * 输出：
{
 user:'anonymous',
 id:[123,456],// 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
 city:'北京',// 中文需解码
 enabled: true // 未指定值的 key 与约定为 true
}
 */
const parseParam = url => {
    const arr = url.split('?')[1].split('&');
    const res = {};
    
    arr.map(val => {
        let [key,value] = val.split('=');
        if(value === undefined)	res[key] = true;
        else{
            if(key in res){
                Array.isArray(res[key]) ? res[key].push(value) : res[key] = [res[key]].concat(value);
            }else{
                res[key] = decodeURI(value);
            }
        }
    });
    return res;
};
```

# 3. 将 `HTTP header` 转换成 `js` 对象

```js
/**
 * --- 题目描述 ---
 *
 * 实现一个方法，把 HTTP 文本形式(字符串)的 header 转换成 JS 对象。
 * 
 * --- 测试用例 ---
 * 
 * 输入：
 * `Accept-Ranges: bytes 
 * Cache-Control: max-age=6000, public
 * Connection: keep-alive
 * Content-Type: application/javascript`
 * 输出：
 * {
 *   "Accept-Ranges": "bytes",
 *   "Cache-Control": "max-age=6000, public",
 *   Connection: "keep-alive",
 *   "Content-Type": "application/javascript"
 * }
 *
 * --- 解题思路 ---
 *
 * 1. 首先将每行数据作为数组的一个元素
 * 2. 将每个元素使用冒号分割，前面为 `key`，后面为 `value`。
 */
const result = str => {
    const res = {};
    const arr = str.split("\n");
    
    arr.map(val => {
        let [key,value] = val.split(':');
        res[key] = value;
    });
    return res;
};
```

# 4. 将数组转化为树形结构

初始时，数组中的每个元素具有 4 个属性，其中有 id 和 parent_id，现在我们需要根据这两个 id 之间的关系，添加一个 children 属性，使之成为一棵树的结构。

比如有如下数据：

```js
var menu_list = [{
    id: '1',
    menu_name: '设置',
    menu_url: 'setting',
    parent_id: 0
   }, {
    id: '1-1',
    menu_name: '权限设置',
    menu_url: 'setting.permission',
    parent_id: '1'
   }, {
    id: '1-1-1',
    menu_name: '用户管理列表',
    menu_url: 'setting.permission.user_list',
    parent_id: '1-1'
   }, {
    id: '1-1-2',
    menu_name: '用户管理新增',
    menu_url: 'setting.permission.user_add',
    parent_id: '1-1'
   }, {
    id: '1-1-3',
    menu_name: '角色管理列表',
    menu_url: 'setting.permission.role_list',
    parent_id: '1-1'
   }, {
    id: '1-2',
    menu_name: '菜单设置',
    menu_url: 'setting.menu',
    parent_id: '1'
   }, {
    id: '1-2-1',
    menu_name: '菜单列表',
    menu_url: 'setting.menu.menu_list',
    parent_id: '1-2'
   }, {
    id: '1-2-2',
    menu_name: '菜单添加',
    menu_url: 'setting.menu.menu_add',
    parent_id: '1-2'
   }, {
    id: '2',
    menu_name: '订单',
    menu_url: 'order',
    parent_id: 0
   }, {
    id: '2-1',
    menu_name: '报单审核',
    menu_url: 'order.orderreview',
    parent_id: '2'
   }, {
    id: '2-2',
    menu_name: '退款管理',
    menu_url: 'order.refundmanagement',
    parent_id: '2'
   }
 ]
```

