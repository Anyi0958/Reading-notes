TypeScript Ŀ¼
[TOC]
***
# ǰ��
����Ϊts����
- �ʺ���һ��js�������Ķ�
- �����﷨����ο��Ƽ��Ķ�

# �Ƽ��Ķ�
- [TypeScript�ٷ�doc](https://www.tslang.cn/docs/home.html "�ٷ�DOC")
- [����̳�](https://www.runoob.com/typescript/ts-tutorial.html "����̳�")

# TypeScript��λ
- `TS`���Ŀ���ǿ�������Ӧ�ã����Ա���ɴ�`JavaScript`
- `TS`��һ�ָ�`JavaScript`������Ե�������չ
## ��չ����
- ������ע�ͱ���ʱ���ͼ��
- �����ƶ�
- ���Ͳ���
- �ӿ�
- ö��
- Mixin
- ���ͱ��
- ���ֿռ�
- Ԫ��
- Await
## ��`JavaScript`������
- `TS`�ǳ�������չ���﷨
- `TS`�ɴ������е�`JS`���룬��ֻ�����е�`TS`������б���
![1-ty][01]

sample:
```ts
const hello: string = "Hello World!"
consolr.log(hello);
```
***
# ��װ
> ��Ҫ�õ�npm�����û�У��밲װ

- NPM��װ��`npm install -g typescript`
- �鿴�汾�ţ�`tsc -v`
- ���룺`tsc filename`
![2-typescript_compiler.png][02]
- ���У�`node filename`
## tsc���ñ������
1. --help����ʾ������Ϣ
2. --module��������չģ��
3. --target������ ECMA �汾
4. --declaration����������һ�� .d.ts ��չ�����ļ���
`tsc ts-hw.ts --declaration`������������� ts-hw.d.ts��ts-hw.js �����ļ���
5. --removeComments��ɾ���ļ���ע��
6. --out���������ļ����ϲ���һ��������ļ�
7. --sourcemap������һ�� sourcemap (.map) �ļ���
sourcemap ��һ���洢Դ�������������Ӧλ��ӳ�����Ϣ�ļ���
8. --module noImplicitAny���ڱ��ʽ���������������� any ����ʱ����
9. --watch���ڼ���ģʽ�����б����������������ļ��������Ǹı�ʱ���±��롣

## ���������
```ts
class Site {
    name(): void{
        console.log("test");
    }
}

var obj = new Site();
obj.name();
```

# ��������
- �������ͣ�any
- �������ͣ�number `let test: number = 6;`
- �ַ������ͣ�string
- �������ͣ�boolean
- �������ͣ�`let arr: number[] = [1,2];`
- Ԫ�飺`let x: [string, number];x = ["xx", 1]`
- ö�٣�enum `enum Color {red, Green, Blue}; let c: color = Color.red;`
- never��never ����Ӳ�����ֵ�ֵ

## Any
��Ա��ʱ���Ͳ���ȷ�ı���ʹ�õ�һ���������ͣ������ڣ�
1. ������ֵ�ᶯ̬�ı䣬�����û�����
```ts
let x: any = 1;
x = 'I am';
```
2. �Ƴ����ͼ��
```ts
let x: any = 1;
x.ifItExists(); // ��ȷ����������ʱ���ܴ��ڣ���������
x.toFixed();    //��ȷ
```
3. ����洢�����������ݵ�����
```ts
let arrayList: any[] = [1, false, 'fine'];
arrayList[1] = 100;
```
## ������������
- ���һ�����Ϳ��ܳ���`null`,`undefined`��������`|`��֧�ֶ�������
```ts
let x: number | null | undefined;

x = 1;
x = undefined;
x = null;
```
## never����
- �������͵������ͣ�����Ӳ�����ֵ�ֵ
- never���͵ı���ֻ�ܱ�`never`��������ֵ
- ������Ϊ�׳��쳣���޷�ִ�е���ֹ��
```ts
let x: never;
let y: number;

// ���д����������Ͳ���תΪ never ����
x = 123;

// ������ȷ��never ���Ϳ��Ը�ֵ�� never����
x = (()=>{ throw new Error('exception')})();

// ������ȷ��never ���Ϳ��Ը�ֵ�� ��������
y = (()=>{ throw new Error('exception')})();

// ����ֵΪ never �ĺ����������׳��쳣�����
function error(message: string): never {
    throw new Error(message);
}

// ����ֵΪ never �ĺ����������޷���ִ�е�����ֹ������
function loop(): never {
    while (true) {}
}
```
# ��������
- `var [name]: [type] = value;`
- ������`type`��Ĭ������������
## ���Ͷ���(Type Assertion)
- ���Ͷ��Կ��������ֶ�ָ��һ��ֵ�����ͣ������������һ�����͸���Ϊ��һ������
- `<Type>value` ���� `value as Type`
```ts
var str = "1";
var str2: number = <number><any> str;    // str, str2��string����
console.log(str2);
```
# ����
- `function name(param [:datatype]): return_type{return value;}`
```ts
function add(x:number, y:number): number{
    return x + y;
}

console.log(add(1,2));
```
## ��������
- ��������ͬ��������ͬ������������ͬ��ͬ
- ÿ�����صķ�������������һ����һ�޶��Ĳ��������б�

# Map����
Map ��صĺ��������ԣ�
- map.clear() �C �Ƴ� Map ��������м�/ֵ�� ��
- map.set() �C ���ü�ֵ�ԣ����ظ� Map ����
- map.get() �C ���ؼ���Ӧ��ֵ����������ڣ��򷵻� undefined��
- map.has() �C ����һ������ֵ�������ж� Map ���Ƿ��������Ӧ��ֵ��
- map.delete() �C ɾ�� Map �е�Ԫ�أ�ɾ���ɹ����� true��ʧ�ܷ��� false��
- map.size �C ���� Map �����/ֵ�Ե�������
- map.keys() - ����һ�� Iterator ���� ������ Map ������ÿ��Ԫ�صļ� ��
- map.values() �C ����һ���µ�Iterator���󣬰�����Map������ÿ��Ԫ�ص�ֵ ��

# Ԫ��
����洢��Ԫ���������Ͳ�ͬ������Ҫʹ��Ԫ��

# ��������
ͨ���ܵ�����������Ϊ��������
- `var Type1|Type2|Type3[]`

# �ӿ�
һϵ�г��󷽷������������������ļ���
�ӿڶ��壺
```ts
interface interface_name extends parent1, parent2{
	firstName: string,
	sayHi: ()=>string,
	[index: number]:string
}
```

# ��
- ��֧�ֶ��ؼ̳�
- ֧�ַ�����д��֧��`super`
- ���ڷ��ʿ������η�

# ���������ģ��
```ts
var sites = {
    site1: "Runoob",
    site2: "Google",
    sayHello: function () { } // ����ģ��
};
sites.sayHello = function () {
    console.log("hello " + sites.site1);
};
sites.sayHello();
```
## Ѽ������-��̬
```ts
interface IPoint { 
    x:number 
    y:number 
} 
function addPoints(p1:IPoint,p2:IPoint):IPoint { 
    var x = p1.x + p2.x 
    var y = p1.y + p2.y 
    return {x:x,y:y} 
} 
 
// ��ȷ
var newPoint = addPoints({x:3,y:4},{x:5,y:1})  
 
// ���� 
var newPoint2 = addPoints({x:1},{x:4,y:3})
```
# �����ռ�
- ���壺
```ts
namespace SomeNameSpaceName { 
   export interface ISomeInterfaceName {      }  
   export class SomeClassName {      }  
}
```
- ���ã�`SomeNameSpaceName.SomeClassName;`
- �����ռ��ڵ�����`TypeScript`�ļ������ã�`/// <reference path = "SomeFileName.ts" />`
sample:
```ts
// IShape.ts
namespace Drawing { 
    export interface IShape { 
        draw(); 
    }
}
// Circle.ts
/// <reference path = "IShape.ts" /> 
namespace Drawing { 
    export class Circle implements IShape { 
        public draw() { 
            console.log("Circle is drawn"); 
        }  
    }
}

// Triangle.ts
/// <reference path = "IShape.ts" /> 
namespace Drawing { 
    export class Triangle implements IShape { 
        public draw() { 
            console.log("Triangle is drawn"); 
        } 
    } 
}
```
- ���룺`tsc --out app.js filename`

# ģ��
## ����
```ts
// �ļ��� : SomeInterface.ts 
export interface SomeInterface { 
   // ���벿��
}
```
## ����
`import someInterfaceRef = require("./SomeInterface");`

## ����
`tsc --module amd filename`

# �����ļ�
`declare module Module_Name {}`
���ӣ�
```ts
declare module Runoob { 
   export class Calc { 
      doSum(limit:number) : number; 
   }
}
```

***
[01]: ./img/1-ty "1-ty"
[02]: ./img/2-typescript_compiler.png "2-typescript_compiler.png"