js-Event Loop�������� Ŀ¼
[TOC]
***

# ǰ��

- `Event Loop`���¼�ѭ������ָ�������`Node`��һ�ֽ��`javaScript`���߳�����ʱ����������һ�ֻ��ƣ�Ҳ�������Ǿ���ʹ��**�첽**��ԭ��
- ���ò�˵������������������ø�

# �Ƽ��Ķ�

- [һ��Ū��Event Loop�����׽�������������⣩](https://juejin.cn/post/6844903764202094606)

# ѧϰEvent Loop��ԭ��

- ��Ҫ�����Լ���������ȣ�Ҳ���Ƕ���`JavaScript`�����л��ơ�
- ������ǰ��������ּ������������յײ�ԭ���������Լ��Բ��䣬Ӧ��䡣
- Ӧ�Ը���������˾�����ԣ�����ԭ����Ŀ���䷢�ӡ�

# �ѣ�ջ������

![img](https://user-gold-cdn.xitu.io/2019/1/17/16859c984806c78d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### �ѣ�Heap��

**��**��һ�����ݽṹ����������ȫ������ά����һ�����ݣ�**��**��Ϊ���֣�һ��Ϊ���**��**��һ��Ϊ**��С��**�������ڵ�**���**��**��**����**����**��**�����**�����ڵ�**��С**��**��**����**��С��**��**С����**��
**��**��**�������ݽṹ**���൱��**һά����**����Ψһ��̡�

������

![img](https://user-gold-cdn.xitu.io/2019/1/17/16859dbb5b9c7ca1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### ջ��Stack��

**ջ**�ڼ������ѧ�����޶�����**��β**����**����**��**ɾ��**���������Ա� **ջ**��һ�����ݽṹ��������**����ȳ�**��ԭ��洢���ݣ�**�Ƚ���**�����ݱ�ѹ��**ջ��**��**��������**��**ջ��**����Ҫ�����ݵ�ʱ���**ջ��**��ʼ**��������**��
**ջ**��ֻ����**ĳһ�˲���**��**ɾ��**��**�������Ա�**��

![img](https://user-gold-cdn.xitu.io/2019/1/17/16859ed4f6143043?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### ���У�Queue��

����֮��������ֻ�����ڱ��ǰ�ˣ�`front`������**ɾ��**���������ڱ�ĺ�ˣ�`rear`������**����**��������**ջ**һ����**����**��һ�ֲ��������Ƶ����Ա�
 ����**����**�����Ķ˳�Ϊ**��β**������**ɾ��**�����Ķ˳�Ϊ**��ͷ**��  ������û��Ԫ��ʱ����Ϊ**�ն���**��

**����**������Ԫ���ֳ�Ϊ**����Ԫ��**���ڶ����в���һ������Ԫ�س�Ϊ**���**����**����**��**ɾ��**һ������Ԫ�س�Ϊ**����**����Ϊ����**ֻ����**��һ��**����**������һ��**ɾ��**������ֻ��**����**����**����**��Ԫ��**�������ȴӶ�����**ɾ�����ʶ����ֳ�Ϊ**�Ƚ��ȳ�**��`FIFO��first in first out`��

![img](https://user-gold-cdn.xitu.io/2019/1/17/16859f2f4f5da2a8?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

# Event Loop

��`JavaScript`�У����񱻷�Ϊ���֣�һ�ֺ�����`MacroTask`��Ҳ��`Task`��һ�ֽ�΢����`MicroTask`����

## `MacroTask`��������

- `script`ȫ�����롢`setTimeout`��`setInterval`��`setImmediate`���������ʱ��֧�֣�ֻ��IE10֧�֣�����ɼ�[`MDN`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setImmediate)����`I/O`��`UI Rendering`��

## `MicroTask`��΢����

- `Process.nextTick��Node���У�`��`Promise`��`Object.observe(����)`��`MutationObserver`������ʹ�÷�ʽ�鿴[����](http://javascript.ruanyifeng.com/dom/mutationobserver.html)��

# ������е�Event Loop

`Javascript` ��һ�� `main thread` ���̺߳� `call-stack` ����ջ(ִ��ջ)�����е����񶼻ᱻ�ŵ�����ջ�ȴ����߳�ִ�С�

## JS����ջ

JS����ջ���õ��Ǻ���ȳ��Ĺ��򣬵�����ִ�е�ʱ�򣬻ᱻ��ӵ�ջ�Ķ�������ִ��ջִ����ɺ󣬾ͻ��ջ���Ƴ���ֱ��ջ�ڱ���ա�

## ͬ��������첽����

`Javascript`���߳����񱻷�Ϊ**ͬ������**��**�첽����**��ͬ��������ڵ���ջ�а���˳��ȴ����߳�����ִ�У��첽��������첽�������˽���󣬽�ע��Ļص�����������������еȴ����߳̿��е�ʱ�򣨵���ջ����գ�������ȡ��ջ�ڵȴ����̵߳�ִ�С�

![img](https://user-gold-cdn.xitu.io/2019/1/18/1685f03d7f88792b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

�������`Task Queue`�������У���һ���Ƚ��ȳ���һ�����ݽṹ��

![img](https://user-gold-cdn.xitu.io/2019/1/18/1685f037d48da0de?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

# �¼�ѭ���Ľ���ģ��

- ѡ��ǰҪִ�е�������У�ѡ��������������Ƚ������������������Ϊ�ռ�`null`����ִ����ת��΢����`MicroTask`����ִ�в��衣
- ���¼�ѭ���е���������Ϊ��ѡ������
- ִ������
- ���¼�ѭ���е�ǰ������������Ϊnull��
- ���Ѿ�������ɵ���������������ɾ����
- microtasks���裺����microtask���㡣
- ���½�����Ⱦ��
- ���ص�һ����

# ִ�н���microtask����ʱ���û������ִ�����²���

- ����microtask�����־Ϊtrue��
- ���¼�ѭ��`microtask`ִ�в�Ϊ��ʱ��ѡ��һ�����Ƚ����`microtask`���е�`microtask`�����¼�ѭ����`microtask`����Ϊ��ѡ���`microtask`������`microtask`�����Ѿ�ִ����ɵ�`microtask`Ϊ`null`���Ƴ�`microtask`�е�`microtask`��
- ����IndexDB����
- ���ý���microtask����ı�־Ϊfalse��

�������ܲ�̫����⣬��ͼ��������һ��ͼƬ��

![img](https://user-gold-cdn.xitu.io/2019/1/18/1686078c7a2f63e5?imageslim)

ִ��ջ��ִ����**ͬ������**�󣬲鿴**ִ��ջ**�Ƿ�Ϊ�գ����ִ��ջΪ�գ��ͻ�ȥ���**΢����**(`microTask`)�����Ƿ�Ϊ�գ����Ϊ�յĻ�����ִ��`Task`�������񣩣������һ����ִ��������΢����
 ÿ�ε���**������**ִ����Ϻ󣬼��**΢����**(`microTask`)�����Ƿ�Ϊ�գ������Ϊ�յĻ����ᰴ��**������**���Ĺ���ȫ��ִ����**΢����**(`microTask`)������**΢����**(`microTask`)����Ϊ`null`��Ȼ����ִ��**������**�����ѭ����

# ����

```js
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});
console.log('script end');

/*script start
script end
promise1
promise2
setTimeout*/
```

�������ǻ��ּ������ࣺ

## ��һ��ִ�У�

```js
Tasks��run script�� setTimeout callback

Microtasks��Promise then	

JS stack: script	
Log: script start��script end��

```

ִ��ͬ�����룬��������`Tasks`����΢����(`Microtasks`)���ֵ����Զ����С�

## �ڶ���ִ�У�

```js
Tasks��run script�� setTimeout callback

Microtasks��Promise2 then	

JS stack: Promise2 callback	
Log: script start��script end��promise1��promise2

```

ִ�к�����󣬼�⵽΢����(`Microtasks`)�����в�Ϊ�գ�ִ��`Promise1`��ִ�����`Promise1`�󣬵���`Promise2.then`������΢����(`Microtasks`)�����У���ִ��`Promise2.then`��

## ������ִ�У�

```js
Tasks��setTimeout callback

Microtasks��	

JS stack: setTimeout callback
Log: script start��script end��promise1��promise2��setTimeout

```

��΢����(`Microtasks`)������Ϊ��ʱ��ִ�к�����`Tasks`����ִ��`setTimeout callback`����ӡ��־��

## ���Ĵ�ִ�У�

```js
Tasks��setTimeout callback

Microtasks��	

JS stack: 
Log: script start��script end��promise1��promise2��setTimeout
```

���**Tasks**���к�`JS stack`��

����ִ��֡�������Բ鿴[Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
��������ͼҲ�������Щ��

![img](https://user-gold-cdn.xitu.io/2019/1/18/16860ae5ad02f993?imageslim)

# ��2

```js
console.log('script start')

async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end') 
}
async1()

setTimeout(function() {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise')
  resolve()
})
  .then(function() {
    console.log('promise1')
  })
  .then(function() {
    console.log('promise2')
  })

console.log('script end')

/*
script start
async2 end
Promise
script end
promise1
promise2
async1 end
setTimeout
*/
```

������Ҫ�����`async/await`��

`async/await` �ڵײ�ת������ `promise` �� `then` �ص�������
 Ҳ����˵������ `promise` ���﷨�ǡ�
 ÿ������ʹ�� `await`, ������������һ�� `promise` ����Ȼ���ʣ�µ� `async` �����еĲ����ŵ� `then` �ص������С�
 `async/await` ��ʵ�֣��벻�� `Promise`����������˼����⣬`async` �ǡ��첽���ļ�д���� `await` �� `async wait` �ļ�д������Ϊ�ǵȴ��첽����ִ����ɡ�

## **����73���°汾��73�汾������**

- ���ϰ汾�汾���£���ִ��`promise1`��`promise2`����ִ��`async1`��
- ��73�汾����ִ��`async1`��ִ��`promise1`��`promise2`��

**��Ҫԭ������Ϊ�ڹȸ�(��˿ȸ)73�汾�и����˹淶������ͼ��ʾ��**


![img](https://user-gold-cdn.xitu.io/2019/1/21/1686eb29a6a19658?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- ��������`RESOLVE(thenable)`��֮�������`Promise.resolve(thenable)`��

## **���ϰ汾��**

- ���ȣ����ݸ� `await` ��ֵ��������һ�� `Promise` �С�Ȼ�󣬴�����򸽼ӵ������װ�� `Promise`���Ա��� `Promise` ��Ϊ `fulfilled` ��ָ��ú�����������ִͣ���첽������һ�� `promise` ��Ϊ `fulfilled`���ָ��첽������ִ�С�
- ÿ�� `await` ������봴����������� Promise����ʹ�Ҳ��Ѿ���һ�� `Promise`����������Ҫ�������� `microtask` ���� `ticks`��`tick`Ϊϵͳ�����ʱ�䵥λ��Ҳ����Ϊϵͳ��ʱ������Դ�ڶ�ʱ�����������жϣ�������壩��һ���жϱ�ʾһ��`tick`��Ҳ������һ����ʱ�ӵδ𡱡�ʱ�ꡣ����

## **���ú���ʦ֪���ϵ�һ������**

```js
async function f() {
  await p
  console.log('ok')
}
```

�����Ϊ��

```js
function f() {
  return RESOLVE(p).then(() => {
    console.log('ok')
  })
}
```

- ��� `RESOLVE(p)` ���� `p` Ϊ `promise` ֱ�ӷ��� `p` �Ļ�����ô `p`�� `then` �����ͻᱻ���ϵ��ã���ص����������� `job` ���С�
- ����� `RESOLVE(p)` �ϸ��ձ�׼��Ӧ���ǲ���һ���µ� `promise`�����ܸ� `promise`ȷ���� `resolve` Ϊ `p`����������̱������첽�ģ�Ҳ�������ڽ��� `job` ���е����� `promise` �� `resolve`���̣����Ը� `promise` �� `then` ���ᱻ�������ã���Ҫ�ȵ���ǰ `job` ����ִ�е�ǰ�� `resolve` ���̲Żᱻ���ã�Ȼ����ص���Ҳ���Ǽ��� `await` ֮�����䣩�ż��� `job` ���У�����ʱ���Ͼ����ˡ�

## **�ȸ裨��˿ȸ��73�汾��**

- ʹ�ö�`PromiseResolve`�ĵ���������`await`�����壬�Լ����ڹ���`awaitPromise`����µ�ת��������
- ������ݸ� `await` ��ֵ�Ѿ���һ�� `Promise`����ô�����Ż��������ٴδ��� `Promise` ��װ��������������£����Ǵ��������� `microtick` ��ֻ��һ�� `microtick`��

## **��ϸ���̣�**

**73���°汾**

- ���ȣ���ӡ`script start`������`async1()`ʱ������һ��`Promise`�����Դ�ӡ����`async2 end`��
- ÿ�� `await`�����²���һ��`promise`,��������̱������첽�ģ����Ը�`await`���治���������á�
- ����ִ��ͬ�����룬��ӡ`Promise`��`script end`����`then`��������**΢����**�����еȴ�ִ�С�
- ͬ��ִ�����֮�󣬼��**΢����**�����Ƿ�Ϊ`null`��Ȼ���������ȳ���������ִ�С�
- Ȼ����ִ�д�ӡ`promise1`,��ʱ`then`�Ļص���������`undefinde`����ʱ����`then`����ʽ���ã��ַ���**΢����**�����У��ٴδ�ӡ`promise2`��
- �ٻص�`await`��λ��ִ�з��ص� `Promise` �� `resolve` ���������ֻ�� `resolve` ����΢��������У���ӡ`async1 end`��
- ��**΢����**����Ϊ��ʱ��ִ�к�����,��ӡ`setTimeout`��

**�ȸ裨��˿ȸ73�汾��**

- ������ݸ� `await` ��ֵ�Ѿ���һ�� `Promise`����ô�����Ż��������ٴδ��� `Promise` ��װ��������������£����Ǵ��������� `microtick` ��ֻ��һ�� `microtick`��
- ���治����ҪΪ `await` ���� `throwaway Promise` - �ھ��󲿷�ʱ�䡣
- ���� `promise` ָ����ͬһ�� `Promise`�������������ʲôҲ����Ҫ����Ȼ�������������ǰһ�������� `throwaway Promise`������ `PromiseReactionJob` �� `microtask` ���е���һ�� `tick` �ϻָ��첽��������ִͣ�иú�����Ȼ�󷵻ظ������ߡ�

��������鿴��[����](https://v8.js.cn/blog/fast-async/)����

# NodeJS��Event Loop

![img](https://user-gold-cdn.xitu.io/2019/1/18/16860f35d3a3e50d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

`Node`�е�`Event Loop`�ǻ���`libuv`ʵ�ֵģ���`libuv`�� `Node` ���¿�ƽ̨����㣬libuvʹ���첽���¼������ı�̷�ʽ���������ṩ`i/o`���¼�ѭ�����첽�ص���libuv��`API`������ʱ�䣬�����������磬�첽�ļ��������ӽ��̵ȵȡ� `Event Loop`������`libuv`��ʵ�ֵġ�

![img](https://user-gold-cdn.xitu.io/2019/1/18/16860f8f8f7f053d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## `Node`��`Event loop`һ����Ϊ6���׶Σ�ÿ��ϸ�ھ������£�

- `timers`: ִ��`setTimeout`��`setInterval`�е��ڵ�`callback`��
- `pending callback`: ��һ��ѭ����������`callback`�������һ�׶�ִ�С�
- `idle, prepare`: �����ڲ�ʹ�á�
- `poll`: ����Ҫ�Ľ׶Σ�ִ��`pending callback`�����ʵ�������»�����������׶Ρ�
- `check`: ִ��`setImmediate`(`setImmediate()`�ǽ��¼����뵽�¼�����β�������̺߳��¼����еĺ���ִ�����֮������ִ��`setImmediate`ָ���Ļص�����)��`callback`��
- `close callbacks`: ִ��`close`�¼���`callback`������`socket.on('close'[,fn])`����`http.server.on('close, fn)`��

����ϸ�����£�

### timers

ִ��`setTimeout`��`setInterval`�е��ڵ�`callback`��ִ�������߻ص���Ҫ����һ������������������˵��Ӧ����ʱ��һ��������ִ��callback�ص�����������`system`�ĵ��ȿ��ܻ���ʱ���ﲻ��Ԥ��ʱ�䡣
 �����ǹ����ĵ����͵����ӣ�

```js
const fs = require('fs');

function someAsyncOperation(callback) {
  // Assume this takes 95ms to complete
  fs.readFile('/path/to/file', callback);
}

const timeoutScheduled = Date.now();

setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;

  console.log(`${delay}ms have passed since I was scheduled`);
}, 100);


// do someAsyncOperation which takes 95 ms to complete
someAsyncOperation(() => {
  const startCallback = Date.now();

  // do something that will take 10ms...
  while (Date.now() - startCallback < 10) {
    // do nothing
  }
});

```

�������¼�ѭ��ʱ������һ���ն��У�`fs.readFile()`��δ��ɣ�����˶�ʱ�����ȴ�ʣ���������������95msʱ��`fs.readFile()`��ɶ�ȡ�ļ������������Ҫ10����Ļص�����ӵ���ѯ���в�ִ�С�
 ���ص�����ʱ�������в����лص�������¼�ѭ���������Ѵﵽ��춨ʱ����**��ֵ**��Ȼ��ص�**timers�׶�**��ִ�ж�ʱ���Ļص���

�ڴ�ʾ���У������������ڵ��ȵļ�ʱ��������ִ�еĻص�֮������ӳٽ�Ϊ105���롣

**�������Ҳ���ʱ�䣺**

![img](https://user-gold-cdn.xitu.io/2019/1/19/16864b8177c25eaf?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### pending callbacks

�˽׶�ִ��ĳЩϵͳ����������TCP�������ͣ��Ļص���  ���磬���`TCP socket ECONNREFUSED`�ڳ���connectʱreceives����ĳЩ* nixϵͳϣ���ȴ�������� �⽫��`pending callbacks`�׶�ִ�С�

### poll

**��poll�׶���������Ҫ���ܣ�**

- ִ��`I/O`�ص���
- ������ѯ�����е��¼���

**���¼�ѭ������`poll`�׶β�����`timers`��û�п���ִ�ж�ʱ��ʱ�������������������֮һ**

- ���`poll`���в�Ϊ�գ����¼�ѭ����������ͬ��ִ�����ǵ�`callback`���У�ֱ������Ϊ�գ����ߴﵽ`system-dependent`��ϵͳ������ƣ���

**���`poll`����Ϊ�գ���ᷢ�������������֮һ**

- �����`setImmediate()`�ص���Ҫִ�У��������ִֹͣ��`poll`�׶β�����ִ��`check`�׶���ִ�лص���
- ���û��`setImmediate()`�ص���Ҫִ�У�poll�׶ν��ȴ�`callback`����ӵ������У�Ȼ������ִ�С�

**��Ȼ�趨�� timer �Ļ��� poll ����Ϊ�գ�����ж��Ƿ��� timer ��ʱ������еĻ���ص� timer �׶�ִ�лص���**

### check

**�˽׶�������Ա��poll�׶���ɺ�����ִ�лص���**
 ���`poll`�׶����ò���`script`���Ŷ�`setImmediate()`�����¼�ѭ������check�׶�ִ�ж����Ǽ����ȴ���

`setImmediate()`ʵ������һ������ļ�ʱ���������¼�ѭ����һ�������׶����С���ʹ��`libuv API`��������`poll`�׶���ɺ�ִ�еĻص���

ͨ���������뱻ִ��ʱ���¼�ѭ�����ս��ﵽ`poll`�׶Σ������ȴ��������ӣ�����ȡ�
 ���ǣ�����Ѿ������˻ص�`setImmediate()`��������ѯ�׶α�Ϊ���У��������������ҵ���`check`�׶Σ������ǵȴ�`poll`�¼���

```js
console.log('start')
setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(function() {
    console.log('promise1')
  })
}, 0)
setTimeout(() => {
  console.log('timer2')
  Promise.resolve().then(function() {
    console.log('promise2')
  })
}, 0)
Promise.resolve().then(function() {
  console.log('promise3')
})
console.log('end')

```

���`node`�汾Ϊ`v11.x`�� �����������һ�¡�

```js
start
end
promise3
timer1
promise1
timer2
promise2
```

����������Բ鿴��[�ֱ�node��eventloop���ˣ������node�Ĺ�](https://juejin.im/post/6844903761979113479)����

���v10�汾��������������������

- ���time2��ʱ���Ѿ���ִ�ж�������

```js
start
end
promise3
timer1
timer2
promise1
promise2
```

- ���time2��ʱ��û����ִ�ж����У�ִ�н��Ϊ

```js
start
end
promise3
timer1
promise1
timer2
promise2

```

����������Բο�`poll`�׶ε����������

����ͼ���ܸ�����⣺

![img](https://user-gold-cdn.xitu.io/2019/1/19/1686530bcd4e456a?imageslim)

# setImmediate() ��setTimeout()������

**`setImmediate`��`setTimeout()`�����Ƶģ����������Ǳ����õ�ʱ���Բ�ͬ�ķ�ʽ���֡�**

- `setImmediate()`��������ڵ�ǰ`poll`�׶���ɺ�check�׶�ִ�нű� ��
- `setTimeout()` �����ھ�����С��ms�������еĽű�����`timers`�׶�ִ�С�

## ����


```js
setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
});

```

**ִ�ж�ʱ����˳�򽫸��ݵ������ǵ������Ķ�������ͬ�� �������ģ���е������ߣ���ôʱ�佫�ܵ��������ܵ����ơ�**

**����Ҳ��һ��**

**�����`I / O`�������ƶ��������ã���ʼ������ִ�������ص���**

```js
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});

```

��������ȷ��һ����`immediate => timeout`��
 ��Ҫԭ������`I/O�׶�`��ȡ�ļ����¼�ѭ�����Ƚ���`poll`�׶Σ�������`setImmediate`��Ҫִ�У�����������`check`�׶�ִ��`setImmediate`�Ļص���

Ȼ���ٽ���`timers`�׶Σ�ִ��`setTimeout`����ӡ`timeout`��

```js
   ����������������������������������������������������������
����>��           timers          ��
��  �����������������������������Щ���������������������������
��  �����������������������������ة���������������������������
��  ��     pending callbacks     ��
��  �����������������������������Щ���������������������������
��  �����������������������������ة���������������������������
��  ��       idle, prepare       ��
��  �����������������������������Щ���������������������������      ����������������������������������
��  �����������������������������ة���������������������������      ��   incoming:   ��
��  ��           poll            ��<������������  connections, ��
��  �����������������������������Щ���������������������������      ��   data, etc.  ��
��  �����������������������������ة���������������������������      ����������������������������������
��  ��           check           ��
��  �����������������������������Щ���������������������������
��  �����������������������������ة���������������������������
��������      close callbacks      ��
   ����������������������������������������������������������

```

# Process.nextTick()

**`process.nextTick()`��Ȼ�����첽API��һ���֣���δ��ͼ����ʾ��������Ϊ`process.nextTick()`�Ӽ����Ͻ����������¼�ѭ����һ���֡�**

- `process.nextTick()`������ `callback` ��ӵ�`next tick`���С� һ����ǰ�¼���ѯ���е�����ȫ����ɣ���`next tick`�����е�����`callbacks`�ᱻ���ε��á�

**������ⷽʽ��**

- ��ÿ���׶���ɺ�������� `nextTick` ���У��ͻ���ն����е����лص��������������������� `microtask` ִ�С�

## ����

```js
let bar;

setTimeout(() => {
  console.log('setTimeout');
}, 0)

setImmediate(() => {
  console.log('setImmediate');
})
function someAsyncApiCall(callback) {
  process.nextTick(callback);
}

someAsyncApiCall(() => {
  console.log('bar', bar); // 1
});

bar = 1;

```

��NodeV10����������ִ�п��������ִ𰸣�һ��Ϊ��

```js
bar 1
setTimeout
setImmediate

```

��һ��Ϊ��

```js
bar 1
setImmediate
setTimeout

```

�������֣�ʼ�ն�����ִ��`process.nextTick(callback)`����ӡ`bar 1`��

# �Ƽ��Ķ�

## **����await����ο�����������**

��[promise, async, await, execution order](https://github.com/xianshenglu/blog/issues/60)��
 ��[Normative: Reduce the number of ticks in async/await](https://github.com/tc39/ecma262/pull/1250)��
 ��[async/await ��chrome ������ node ������ ִ�н����һ�£���⣿](https://www.zhihu.com/question/268007969)��
 ��[������첽������ Promise](https://v8.js.cn/blog/fast-async/)��

## �������ݲο��ˣ�

��[JS������¼�ѭ������](https://segmentfault.com/a/1190000015559210)��
 ��[ʲô����������¼�ѭ����Event Loop����](https://segmentfault.com/a/1190000010622146)��
 ��[һƪ���½̻���Event loop�����������Node](https://segmentfault.com/a/1190000013861128)��
 ��[��Ҫ����nodejs��������е�event loop](https://cnodejs.org/topic/5a9108d78d6e16e56bb80882)��
 ��[�������Node���¼�ѭ��(Event Loop)�к�����?](https://juejin.im/post/6844903761949753352)��
 ��[Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)��
 ��[ǰ������֮��](https://juejin.im/book/6844733763675488269/section/6844733763763568654#heading-3)��
 ��[Node.js����5-libuv�Ļ�������](https://www.jianshu.com/p/8e0ad01c41dc)��
 ��[The Node.js Event Loop, Timers, and process.nextTick()](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)��
 ��[node����](http://nodejs.cn/)��

