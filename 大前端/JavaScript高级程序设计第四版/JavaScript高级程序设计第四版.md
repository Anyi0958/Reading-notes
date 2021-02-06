JavaScript�߼�������Ƶ��İ� Ŀ¼
[TOC]
***
# ǰ��

��������ԴΪ����JavaScript�߼�������ơ������İ棩�����л��ᣬ������������Ϊ����

## ע��

- <p style="color:red;">���Ĳ��漰�����﷨��������Ҫ�ɹۿ�<a href="https://www.runoob.com/js/js-tutorial.html">����̳�</a></p>

## �������

���İ��Ȿ��������е��ѿС���������ԭ������promise������һ���˽���У������Ķ������е���Ӳ��
node�Ͼ��ǵ��̷߳����������ԣ�Ϊ��ģ����̣߳������async��await���ֶ������������ڻص������ϡ�

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

console.log(f[Symbol.asyncIterator]());	// Object [AsyncGenerator] {}
```
- �����`Symbol.asyncIterator`���ɵĶ���Ӧ��ͨ����`next()`����½������`Promise`ʵ��
- �ȿ���ͨ����ʾ����`next()`�������أ�Ҳ����ͨ����ʽ�����첽��������������
```js
class Emitter {
    constructor(max) {
        this.max = max;
        this.asyncIdx = 0;
    }
    // �첽��������API
    async *[Symbol.asyncIterator] () {
        while(this.asyncIdx < this.max) {
            yield new Promise((resolve) => resolve(this.asyncIdx++));
        }
    }
}

async function asyncCount() {
    let emitter = new Emitter(5);

    // ѭ��ʱ���첽��������
    for await(const x of emitter){
        console.log(x);
    }
}

asyncCount();
```
#### ע��
- `symbol.asyncIterator`ֻ֧��ES2018�淶

### Symbol.hasInstance
- �÷�������һ�������������Ƿ��Ͽ�һ������ʱ����ʵ������`instanceof`������ʹ��
- `instanceof`����������ȷ��һ������ʵ����ԭ�������Ƿ���ԭ��
```js
function Foo() {}
let f = new Foo();
console.log(f instanceof Foo);  // true

class Bar{}
let b = new Bar();
console.log(b instanceof Bar);  // true
```
- `instanceof`��ʹ��`Symbol.hasInstance`ȷ����ϵ

#### Symbol.hasInstanceΪ��
```js
function Foo() {}
let f = new Foo();
console.log(Foo[Symbol.hasInstance](f));  // true

class Bar{}
let b = new Bar();
console.log(Bar[Symbol.hasInstance](b));  // true
```
#### ���¶��庯��
- ������Զ�����`function`ԭ���ϣ�Ĭ�����к��������϶����Ե���
- �����ڼ̳е�����ͨ����̬�������¶����������
```js
class Bar{};
class Baz extends Bar {
    static [Symbol.hasInstance]() {
        return false;
    }
}

let b = new Baz();
console.log(Bar[Symbol.hasInstance](b));  // true
console.log(b instanceof Bar);  //true
console.log(Baz[Symbol.hasInstance](b));  //false
console.log(b instanceof Baz);  //false

```

### Symbol.isConcatSpreadable

- ����ֵ�������`true`����ζ�Ŷ���Ӧ����`Array.prototype.concat()`��ƽ������Ԫ��
- `Array.prototype.concat()`����ݽ��յ��Ķ�������ѡ����ν�һ�����������ƴ�ӳ�����ʵ��
- false: Ĭ��׷�ӵ�����ĩβ
- true: ����ƽ������ʵ��
- �����������������Ķ�����`Symbol.isConcatSpreadable`������Ϊtrue������º���
```js
let initial = ['foo'];

let array = ['bar'];
// false
console.log(array[Symbol.isConcatSpreadable]);  // undefined
console.log(initial.concat(array));  // ['foo', 'bar']
array[Symbol.isConcatSpreadable] = false;
console.log(initial.concat(array));  //['foo', Array(1)]
// true
let arrayLikeObject = { length: 1, 0: 'baz'};
console.log(arrayLikeObject[Symbol.isConcatSpreadable]);  //undefined
console.log(initial.concat(arrayLikeObject));  //['foo', {...}]
arrayLikeObject[Symbol.isConcatSpreadable] = true;
console.log(initial.concat(arrayLikeObject));  //['foo', 'baz']
// set
let otherObject = new Set() . add('qux');
console.log(otherObject[Symbol.isConcatSpreadable]);  //undefined
console.log(initial.concat(otherObject));  // ['foo', Set(1)]
otherObject[Symbol.isConcatSpreadable] = true;
console.log(initial.concat(otherObject));  // ['foo']
```
![3-Symbol.isconcatSpreadable][03]

### Symbol.iterator

- �÷������ض���Ĭ�ϵĵ���������`for-of`ʹ��
```js
class Foo {
    *[Symbol.iterator]() {}
}

let f = new Foo();

console.log(f[Symbol.iterator]);
```
![4-symbol.iterator.js.png][04]

- ��ʾnext()
- ��ʽ����������
```js
class Emitter{
    constructor(max) {
        this.max = max;
        this.idx = 0;
    }

    *[Symbol.iterator]() {
        while(this.idx < this.max){
            yield this.idx++;
        }
    }
}

function count() {
    let emitter = new Emitter(5);

    for (const x of emitter){
        console.log(x);
    }
}

count();
```
### symbol.match
- ������ʽ������������ʽȥƥ���ַ���
- ��`String.prototype.match()`
- `String.prototype.match()`��ʹ��`Symbol.match`Ϊ���ĺ�������������ʽ��ֵ
- ������ʽ��ԭ����Ĭ������������Ķ��壬�������������ʽʵ��Ĭ�������`String`��������Ч����
```js
console.log(RegExp.prototype[Symbol.match]);

console.log('foobar'.match(/bar/));
```
![5-symbolmatch][05]
- ��������������ʽֵ���ᵼ�¸�ֵ��ת��Ϊ`regexp`����
- ���¶���`symbol.match`����ֱ��ʹ��ʵ��
```js
class FooMatcher {
    static [Symbol.match](target){
        return target.includes('foo');
    }
}

console.log('foobar'.match(FooMatcher));    // true
console.log('barbaz'.match(FooMatcher));    //false

class StringMatcher{
    constructor(str){
        this.str = str;
    }

    [Symbol.match](target){
        return target.includes[this.str];
    }
}

console.log('foobar'.match(new StringMatcher('foo')));  // true
console.log('barbaz'.match(new StringMatcher('qux')));  //false
```

### symbol.replace
- �滻һ���ַ�����ƥ����Ӵ�����`String.prototype.replace()`ʹ��
```js
console.log(RegExp.prototype[Symbol.replace]);

console.log('foobarbaz'.replace(/bar/, 'qux'));
```
![6-replace][06]

```js
class FooReplacer {
    static [Symbol.replace] (target, replacement) {
        return target.split('foo').join(replacement);
    }    
}

console.log('barfoobaz'.replace(FooReplacer, 'qux'));

class StringReplacer {
    constructor(str){
        this.str = str;
    }
    
    [Symbol.replace](target, replacement){
        return target.split(this.str).join(replacement);
    }
}

console.log('barfoobaz'.replace(new StringReplacer('foo'), 'qux'));
```
![7-replace2][07]

### Symbol.search
- �����ַ�����ƥ��������ʽ������
```js
class FooSearch {
    static [Symbol.search](target) {
        return target.indexOf('foo');
    }
}

console.log('foobar'.search(FooSearch));    // 0
console.log('barfoo'.search(FooSearch));    // 3
console.log('barbaz'.search(FooSearch));    // -1

class StringSearch {
    constructor(str) {
        this.str = str;
    }

    [Symbol.search](target){
        return target.indexOf(this.str);
    }
}

console.log('foobar'.search(new StringSearch('foo')));  // 0
console.log('barfoo'.search(new StringSearch('foo')));  // 3
console.log('barbaz'.search(new StringSearch('foo')));  // -1
```
![8-search][08]

### symbol.species
- ������������Ĺ��캯��
- ��`symbol.species`���徲̬�Ļ�ȡ��(getter)�������´���ʵ����ԭ�Ͷ���
```js
class Bar extends Array {}
class Baz extends Array {
    static get [Symbol.species]() {
        return Array;
    }
}

let bar = new Bar();
console.log(bar instanceof Array);  // true
console.log(bar instanceof Bar);    // true

bar = bar.concat('bar');
console.log(bar instanceof Array);  // true
console.log(bar instanceof Bar);    // true

let baz = new Baz();
console.log(baz instanceof Array);  // true
console.log(baz instanceof Baz);    // true

baz = baz.concat('baz');
console.log(baz instanceof Array);  // true
console.log(baz instanceof Baz);    // false
```

### symbol.split
- �ú�����Ϊ������������Ĺ��캯��
```js
class FooSplitter {
    static [Symbol.split](target){
        return target.split('foo');
    }
}

console.log('barfoobaz'.split(FooSplitter));

class StringSplitter {
    constructor(str){
        this.str = str;
    }

    [Symbol.split](target){
        return target.split(this.str);
    }
}

console.log('barfoobaz'.split(new StringSplitter('foo')));
```
![9-split][09]

### symbol.toPrimitive
- ������ת��Ϊ��Ӧ��ԭʼֵ
```js
class Foo {}
let foo = new Foo();

console.log(3 + foo);   
console.log(3 - foo);
console.log(String(foo));

class Bar {
    constructor() {
        this[Symbol.toPrimitive] = function(hint) {
            switch(hint) {
                case 'number':
                    return 3;
                case 'string':
                    return 'string bar';
                case 'default':
                default:
                    return 'default bar';
            }
        }
    }
}

let bar = new Bar();

console.log(3 + bar);
console.log(3 - bar);
console.log(String(bar));
```
![10-toPrimitive][10]

### symbol.toStringTag
- ���ַ������ڴ��������Ĭ���ַ�������
- `Object.prototype.toString()`
```js
let s = new Set();

console.log(s);     // Set[0] {}
console.log(s.toString());      // [Object Set]
console.log(s[Symbol.toStringTag]); //Tag

class Foo {}
let foo = new Foo();

console.log(foo);       // Foo {}
console.log(foo.toString());    // [object Object]
console.log(foo[Symbol.toStringTag]);   // undefined

class Bar {
    constructor(){
        this[Symbol.toStringTag] = 'Bar';
    }
}
let bar = new Bar();

console.log(bar);       // Bar {}
console.log(bar.toString());    // [object object]
console.log(bar[Symbol.toStringTag]);   // bar
```
![11-toString][11]

## Object
- ������ʵ����һ�����ݺ͹��ܵļ���
- `let o = new Object()`
- ObjectҲ������������Ļ��࣬Object���������Ժͷ����������Ķ�����ͬ������

### ÿ��Object������Ժͷ���
1. constructor
2. hasOwnProperty(propertyName)���жϵ�ǰ����ʵ���Ƿ���ڸ�������
3. isPrototypeof(object)���жϵ�ǰ�����Ƿ�Ϊ��һ�������ԭ��
4. propertyIsEnumerable(propertyName)���ж������������Ƿ����ʹ��
5. toLocaleString()�����ض�����ַ�����ʾ
6. toString()
7. valueOf()

## for-in ���
- �ϸ�ĵ�����䣬����ö�ٶ����еķǷ��ż�����
- `for (property in expression) statement`

## for-of ���
- ������䣬�����ɵ��������Ԫ��
- `for (property of expression) statement`

## with���
- ����������������Ϊ�ض��Ķ���
- `with (expression) statement`
- ��Ҫ�����һ�����󷴸�����
```js
let qs = location.search.substring(1);
let hostname = location.hostname;
let url = location.href;

with(location) {
    let qs = search.substring(1);
    let hostname = hostname;
    let url = href;
}
```
- �ϸ�ģʽ������ʹ��`with`

## �ϸ�ģʽ������
1. ����������`eval`����`arguments`��Ϊ����
2. �����Ĳ������ܽ���`eval`����`arguments`
3. ���������Ĳ������ܽ�ͬһ������
<p style="color: red;">**���Υ�����Ϲ��򣬽��ᵼ���﷨���󣬴���Ҳ��������**</p>

# 4 ��������������ڴ�
## ԭʼֵ������ֵ
- ԭʼֵ����򵥵����ݣ���ֵ����
- ����ֵ�����ֵ���ɵĶ����Ǳ������ڴ��еĶ���
### ע�⣺�ַ����Ͷ���
- �ںܶ������У��ַ�����ʹ�ö����ʾ�ģ�����Ϊ���������ͣ�����JS����

## ����ֵ
```js
let num1 = 5;
let num2 = num1;
```
- ������ֵ����ȫ������
����ǰ�ı�������
|
:-:|:-:
|
num1|5 (Number����)

���ƺ�ı�������
|
:-:|:-:
num2|5 (Number����)
num1|5 (Number����)

```js
let obj1 = new Object();
let obj2 = obj1;
```
![12-heap][12]

## ִ����������������
- ÿ�������Ķ���һ�������ı������󣬶�����������ж�������б����ͺ��������������������
- ȫ���������������������ģ����ǳ�˵��`window`����
- �������еĴ�����ִ�е�ʱ�򣬻ᴴ�����������һ����������������������������˸����������еĴ����ڷ��ʱ����ͺ���ʱ��˳��

## ����������ǿ
ִ�������ĵ����ࣺ
- ȫ��������
- ����������
- eval()�����ڲ�����

## ��������
```js
var color = 'blue';
function getColor(){
	let color = 'red';
	{
		let color = 'green';
		return color;
	}
}

console.log(getColor());	// green
```
- ���Ҫʹ��ȫ�ֱ���`color`����Ҫʹ��`window.color`

### ��ʶ�����ҵĴ���
- ���ʾֲ������ȷ���ȫ�ֱ���Ҫ�죬��Ϊ�����л�������

## ��������
- JSʹ���������գ�ִ�л��������ڴ���ִ��ʱ�����ڴ�
- �Զ��ڴ����ʵ���ڴ�����������Դ����
- ����˼·��ȷ���ĸ�����������ʹ�ã�Ȼ���ͷ���ռ�õ��ڴ棬ÿ��һ��ʱ��ͻ��Զ�����
- �������ǲ��ԣ������������ü���

### �������
- JS�����������ղ����Ǳ������
![13-marksweep][13]

### ���ü���
- ��ÿ��ֵ����¼�������õĴ���
- ����ֵ�����ü�1��������õı��������ǣ���������1
- �������ճ����´����е�ʱ����ͷ�������Ϊ0��ֵ���ڴ�
#### ��������
```js
function problem() {
	let objectA = new Object();
	let objectB = new Object();
	
	objectA.someOtherObject = objectB;
	objectB.anotherObject = objectA;
}
```
- ��������Զ������0

### ����
- IE����ڸ���ĵط������Ĳ����Ǹ��ݷ������������������ճ������Ƶ��ִ��

### �ڴ����
- �Ż��ڴ�ռ�õ�����ֶ��Ǳ�֤��ִ�д���ʱֻ�����Ҫ������
- ������ã�`variable = null`
- �����һ��ֵ�����ò����Զ���������ڴ汻���գ�ȷ�����������ģ��´���������ʱ������
#### JS�ڴ��ص�
1. ͨ��`const`��`let`������������
2. �������ɾ������
3. �ڴ�й©
4. ��̬����Ͷ����
##### �����
- ����һ������أ���������һ��ɻ��յĶ���
- Ӧ�ó��������������������һ���������������Բ�ʹ�ã�������󻹸������
- ����û�з��������ʼ������������̽�ⲻ�ᷢ���ж�����棬��Ȼ�������ճ��򲻻�Ƶ������
```js
function addVectorRaw(a, b){
    let resultant = new Vector();
    resultant.x = a.x + b.x;
    resultant.y = a.y + b.y;

    return resultant;
}

function addVector(a, b, resultant){
    resultant.x = a.x + b.x;
    resultant.y = a.y + b.y;

    return resultant;
}

// ����ص�αʵ��
// vectorPool�����еĶ����
let v1 = vectorPool.allocate();
let v2 = vectorPool.allocate();
let v3 = vectorPool.allocate();
let v4 = vectorPool.allocate();

v1.x = 10;
v1.y = 5;

v2.x = -3;
v2.y = -6;

addVector(v1, v2, v3);

console.log([v3.x, v3.y]);

vectorPool.free(v1);
vectorPool.free(v2);
vectorPool.free(v3);

// ���������������������������
// ������Ҳ��Ҫ����Щ��������αnull
v1 = null;
v2 = null;
v3 = null;
```
##### ע��
- ��̬�������Ż���һ�ּ�����ʽ

[01]: ./img/1-DOM.png "1-DOM"
[02]: ./img/2-symbol.png "2-symbol"
[03]: ./img/3-Symbol.isconcatSpreadable.png "3-Symbol.isconcatSpreadable"
[04]: ./img/4-symbol.iterator.js.png "4-symbol.iterator.js.png"
[05]: ./img/5-symbolmatch.png "5-symbolmatch"
[06]: ./img/6-replace.png "6-replace"
[07]: ./img/7-replace2.png "7-replace2"
[08]: ./img/8-search.png "8-search"
[09]: ./img/9-split.png "9-split"
[10]: ./img/10-toPrimitive.png "10-toPrimitive"
[11]: ./img/11-toString.png "11-toString"
[12]: ./img/12-heap.png "12-heap"
[13]: ./img/13-marksweep.jpg "13-marksweep"