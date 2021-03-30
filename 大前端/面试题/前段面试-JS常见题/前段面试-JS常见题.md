ǰ������-JS������ Ŀ¼
[TOC]
***

# ǰ��

- һ������
- ���¼��ࣺ
  - �㷨��
  - ԭ����
  - Ӧ����

# �Ƽ��Ķ�

- [����������](https://leetcode-cn.com/circle/discuss/SVKmhR/)

# 1. ��дAlgorithm

## 1. ��������
```js
/**
 * --- �������� ---
 *
 * ���룺[1, 34, 5, 76, 8, 6, 9, 7, 6, 3]
 * �����[1, 3, 5, 6, 6, 7, 8, 9, 34, 76]
 *
 * --- ˵�� ---
 * 
 * ˼���������������ȶ�����
 * ���base ��ÿ��ѡ�񣬻ᵼ�¿����ǲ��ȶ�����
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

## 2. ð������
```js
/**
 * --- �������� ---
 *
 * ���룺[5, 2, 4, 7, 9, 8, 3, 6, 3, 8, 3]
 * �����[2, 3, 3, 3, 4, 5, 6, 7, 8, 8, 9]
 *
 * --- ˵�� ---
 * 
 * ˼����ð���������ȶ�����
 * ����ȶ�����ȵ�Ԫ�ز���������
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

## 3. ѡ������
```js
/**
 * --- �������� ---
 *
 * ���룺[6, 45, 3, 2, 5, 6, 8, 4, 3, 4, 56, 67, 5]
 * �����[2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 45, 56, 67]
 *
 * --- ˵�� ---
 * 
 * ˼����ѡ���������ȶ�����
 * ���Ҫ�����������ʵ�ֵģ��ڱ����������н����������ǲ��ȶ�����
 */

const selectSort = nums => {
    let idx; //��Сֵ����
    
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

# 2. `URL`�������
## 1. ��Ŀһ

```js
/**
 * --- ��Ŀ���� ---
 * 
 * ʵ��һ�����������Զ� url �е� query ��������⣬����һ�� key: value ��ʽ�� object  
 * 
 * --- ʵ�� ---
 * 
 * ���룺'http://sample.com/?a=1&e&b=2&c=xx&d#hash' 
 * �����{a: 1, b: 2, c: 'xx', d: ''}  
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

## 2. ��Ŀ��

```js
/**
 * --- ��Ŀ���� ---
 *
 * ʵ��һ�� parseParem �������� url ת��Ϊָ�����
 *
 * --- �������� ---
 *
 * ���룺url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled'
 * �����
{
 user:'anonymous',
 id:[123,456],// �ظ����ֵ� key Ҫ��װ�����飬�ܱ�ת�����ֵľ�ת����������
 city:'����',// ���������
 enabled: true // δָ��ֵ�� key ��Լ��Ϊ true
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

# 3. �� `HTTP header` ת���� `js` ����

```js
/**
 * --- ��Ŀ���� ---
 *
 * ʵ��һ���������� HTTP �ı���ʽ(�ַ���)�� header ת���� JS ����
 * 
 * --- �������� ---
 * 
 * ���룺
 * `Accept-Ranges: bytes 
 * Cache-Control: max-age=6000, public
 * Connection: keep-alive
 * Content-Type: application/javascript`
 * �����
 * {
 *   "Accept-Ranges": "bytes",
 *   "Cache-Control": "max-age=6000, public",
 *   Connection: "keep-alive",
 *   "Content-Type": "application/javascript"
 * }
 *
 * --- ����˼· ---
 *
 * 1. ���Ƚ�ÿ��������Ϊ�����һ��Ԫ��
 * 2. ��ÿ��Ԫ��ʹ��ð�ŷָǰ��Ϊ `key`������Ϊ `value`��
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

# 4. ������ת��Ϊ���νṹ

��ʼʱ�������е�ÿ��Ԫ�ؾ��� 4 �����ԣ������� id �� parent_id������������Ҫ���������� id ֮��Ĺ�ϵ�����һ�� children ���ԣ�ʹ֮��Ϊһ�����Ľṹ��

�������������ݣ�

```js
var menu_list = [{
    id: '1',
    menu_name: '����',
    menu_url: 'setting',
    parent_id: 0
   }, {
    id: '1-1',
    menu_name: 'Ȩ������',
    menu_url: 'setting.permission',
    parent_id: '1'
   }, {
    id: '1-1-1',
    menu_name: '�û������б�',
    menu_url: 'setting.permission.user_list',
    parent_id: '1-1'
   }, {
    id: '1-1-2',
    menu_name: '�û���������',
    menu_url: 'setting.permission.user_add',
    parent_id: '1-1'
   }, {
    id: '1-1-3',
    menu_name: '��ɫ�����б�',
    menu_url: 'setting.permission.role_list',
    parent_id: '1-1'
   }, {
    id: '1-2',
    menu_name: '�˵�����',
    menu_url: 'setting.menu',
    parent_id: '1'
   }, {
    id: '1-2-1',
    menu_name: '�˵��б�',
    menu_url: 'setting.menu.menu_list',
    parent_id: '1-2'
   }, {
    id: '1-2-2',
    menu_name: '�˵����',
    menu_url: 'setting.menu.menu_add',
    parent_id: '1-2'
   }, {
    id: '2',
    menu_name: '����',
    menu_url: 'order',
    parent_id: 0
   }, {
    id: '2-1',
    menu_name: '�������',
    menu_url: 'order.orderreview',
    parent_id: '2'
   }, {
    id: '2-2',
    menu_name: '�˿����',
    menu_url: 'order.refundmanagement',
    parent_id: '2'
   }
 ]
```

