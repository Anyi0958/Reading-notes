JavaScript�߼�������Ƶ��İ� Ŀ¼
[TOC]
***
# ǰ��

��������ԴΪ����JavaScript�߼�������ơ������İ棩�����л��ᣬ������������Ϊ����

## ע��

- <p style="color:red;">���Ĳ��漰�����﷨��������Ҫ�ɹۿ�<a href="https://www.runoob.com/js/js-tutorial.html">����̳�</a></p>

# �Ƽ�

- ��JavaScript�߼�������ơ������İ棩
- ��JavaScriptѧϰָ�ϡ�

# 1. ʲô��JavaScript

## DOm
�ĵ�����ģ��(DOM):��һ��Ӧ�ñ�̽ӿ�(API)
```html
<html>
<head>
	<title>xxx</title>
</head>
<body>
<p>xxxx</p>
</body>
</html>
```

ͼ����
![1-DOM.png][01]

# 2. HTML�е�JavaScript

## `<script>`Ԫ��
### ����
- async���������ؽű�
- charset��ָ���Ĵ����ַ���
- crossorigin������Դ��������
- defer�����ĵ���������ʾ��ɺ���ִ�нű�
- integrity������ȶԽ��յ�����Դ��ָ���ļ���ǩ��������֤����Դ�������ԡ�����CDN
- language
- src
- type��������нű����Ե��������͡������`module`���򱻵���ES6ģ��

## ��̬���ؽű�
```javascript
let script = document.createElement('script');
script.src = 'test.js'
document.head.appendChild(script);
```
## XHTML�еı仯
XHTML�ǽ�HTML��ΪXML���°�װ�Ľ����
### ����
- XHTMLʹ��JavaScript����ָ��`type=text/javascript`
- �����ϸ�
- �Ѿ�����
- `//<!CDATA //]]>`��

# 3. ���Ի���
## ���ݸ���
- �﷨
- ��������
- �������
- ����

<p style="color:red;">���Ĳ��漰�����﷨���ɹۿ�����̳�</p>

## �ϸ�ģʽ
- �����淶д��
- `use strict`

## Symbol����
`ECMAScript6`������������
- ������ԭʼֵ
- ����ʵ��ʱΨһ�����ɱ��
- ����ȷ����������ʹ��Ψһ��ʶ����������ֳ�ͻ

### ���ŵĻ����÷�
#### Symbol()������ʼ��
```js
let sym = Symbol();
console.log(typeof sym);	// symbol
```
#### �����ַ����Է�������
```js
let genericSymbol = Symbol();
let otherGenericSymbol = Symbol();

let foolSymbol = Symbol('foo');
let otherFoolSymbol = Symbol('foo');

console.log(genericSymbol == otherGenericSymbol);
console.log(foolSymbol == otherFoolSymbol);
```

#### Symbol���������������캯��
- ���ܺ�`new`һ��ʹ��

### ȫ�ַ���ע��� - symbol.for
�������ʱ�Ĳ�ͬ������Ҫ��������÷���ʵ����
- ��һ���ַ�����Ϊ��
- ȫ�ַ���ע����д��������÷���
- `Symbol.for()`����
```js
// �����·���
let fooGlobalSymbol = Symbol.for('foo');
// �������з���
let otherFooGlobalSymbol = Symbol.for('foo');

console.log(fooGlobalSymbol === otherFooGlobalSymbol);  // true
```
#### symbol.for
- ��ÿ���ַ�������ִ���ݵȲ���
- ��һ��ʹ��ĳ���ַ�������ʱ������ȫ������ʱע���
- ��������ڶ�Ӧ�ķ��ţ�������һ���·���ʵ������ӵ�ע�����
- ����ʹ����ͬ���ַ�������ʱ�����ȼ��ע������ֶ�Ӧ�ķ��ŷ��ظ÷���ʵ��
- ȫ��ע����еķ��ű���Ϊ�ַ������κ�ֵ���ᱻת��Ϊ�ַ���
- <p style="color:red;">���������ģʽ�еĵ���ģʽ</p>
- symbol��symbol.for����Ľ���ǲ�ͬ��
```js
let test1 = Symbol('foo');
let test2 = Symbol.for('foo');

console.log(test1 === test2);   // false
```
#### ��ѯȫ��ע��� - symbol.keyFor
- ���շ��ţ����ظ�ȫ�ַ��Ŷ�Ӧ���ַ�����
- �����ѯ�Ĳ���ȫ�ַ��ţ���᷵��`undefined`
```js
// create global symbol
let s = Symbol.for('foo');
console.log(Symbol.keyFor(s));  // foo

// create ordinary symbol
let s2 = Symbol('bar');
console.log(Symbol.keyFor(s2)); // undefined

// type error
console.log(Symbol.keyFor(123));
```
### ʹ�÷�����Ϊ����
�������ַ���������ֵ��Ϊ���Եĵط���������ʹ�÷��š�
������
- �������������ԣ�ֻ���ڼ��������﷨��ʹ�÷�����Ϊ����
- `Object.defineProperty()`
- `Object.definedProperties()`
```js
let s1 = Symbol('foo'),
    s2 = Symbol('bar'),
    s3 = Symbol('baz'),
    s4 = Symbol('qux');

let o = {
    [s1]: 'foo val'
};

console.log(o);

o[s2] = 'foo val2';
console.log(o);
```
![2-symbol][02]

#### ��ȡ����ʵ���������÷�
- `Object.getOwnPropertyNames()`�����ض���ʵ���ĳ�����������
- `Object.getOwnPropertySymbols()`�����ض���ʵ���ķ�����������
- `Object.getOwnPropertyDescriptors()`������ͬʱ��������ͷ��������������Ķ���
- `Reflect.ownKeys()`�������������͵ļ�
```js
console.log(Object.getOwnPropertyNames(o));
console.log(Object.getOwnPropertySymbols(o));
console.log(Object.getOwnPropertyDescriptor(o));
console.log(Reflect.ownKeys(o));
```
##### ע��
- ���������Ƕ��ڴ��з��ŵ�һ������
- ֱ�Ӵ������������Եķ��Ų��ᶪʧ
- ���û����ʽ�ر�����Щ���Ե����ã����������������з������Բ����ҵ���Ӧ�����Լ�
```js
let o = {
    [Symbol('foo')]: 'foo val',
    [Symbol('bar')]: 'bar val'
};

console.log(o);

let barSymbol = Object.getOwnPropertySymbols(o)
                .find((symbol) => 
                    symbol.toString().match(/bar/)
                );

console.log(barSymbol);
```

### �������÷���
- ���ڱ�¶�����ڲ���Ϊ������ֱ�ӷ��ʡ���д��ģ����Щ��Ϊ
- ����Symbol���������ַ������Ե���ʽ����
- ���������¶��壬�ı�ԭ���ṹ����Ϊ
#### ע��
- ���÷����ڹ淶�е����ƣ�ǰ׺Ϊ`@@`����`@@iterator`ָ�ľ���`Symbol.iterator`

### Symbol.asyncIterator
- �÷������ض���Ĭ�ϵ�`AsyncIterator`����`for-await-of`ʹ��
- ������ű�ʾʵ���첽������API�ĺ���
- `for-await-of`ѭ��ʱ��ִ���첽����������������`Symbol.asyncIterator`Ϊ���ĺ���������һ��ʵ�ֵ�������API����
- ������ʵ��API��`AsyncGenerator`
```js
class Foo {
    async *[Symbol.asyncIterator]() {}
}

let f = new Foo();

console.log(f[Symbol.asyncIterator]());
```
- �����`Symbol.asyncIterator`���ɵĶ���Ӧ��ͨ����`next()`����½������`Promise`ʵ��
- �ȿ���ͨ����ʾ����`next()`�������أ�Ҳ����ͨ����ʽ�����첽��������������



[01]: ./img/1-DOM.png "1-DOM"
[02]: ./img/2-symbol.png "2-symbol"