��΢������¼�loop Ŀ¼
[TOC]
***

# ǰ��

- ���Գ���������
- ��΢��������첽�¼�

# �Ƽ��Ķ�

- [jiasm](https://www.cnblogs.com/jiasm/p/9482443.html)

# ��΢����Ķ���

- `JavaScript`��һ�����̵߳Ľű����ԡ�

Ҳ����˵��һ�д���ִ�еĹ����У���Ȼ�������ͬʱִ�е���һ�д��룬����ʹ��`alert()`�Ժ���з��`console.log`�����û�йرյ��򣬿���̨�ǲ�����ʾ��һ��`log`��Ϣ�ġ�
�������Щ����ִ���˴������㣬�ȷ�˵��ǰ�˱����ƽ�����֮��Ĺ��������ͻᵼ�º�������һֱ�ڵȴ���ҳ�洦�ڼ���״̬����Ϊǰ�ߵĴ��벢û��ִ���ꡣ

���ȫ�����붼��ͬ��ִ�еģ�������������ص����⣬�ȷ�˵����Ҫ��Զ�˻�ȡһЩ���ݣ��ѵ�Ҫһֱѭ������ȥ�ж��Ƿ��õ��˷��ؽ��ô��

����ȥ�����ͣ��϶�����˵�������Ժ��ȥ��������˳��˵ģ��ᱻ��ġ�

���Ǿ������첽�¼��ĸ��ע��һ���ص�����������˵��һ�������������Ǹ���������ȵ����յ����ݺ�֪ͨ�ң�Ȼ�����ǾͿ���ȥ�������������ˡ�

Ȼ�����첽��ɺ󣬻�֪ͨ�����ǣ����Ǵ�ʱ���ܳ������������������飬���Լ�ʹ�첽�����Ҳ��Ҫ��һ�Եȴ����ȵ����������������ʱ��ȥ����Щ�첽�Ѿ�����ˣ�����ȥִ�С�

����˵���˸��������˾���ȵ��ˣ���������ͷ���е������Ҫ������ʱ˾���ǲ������Լ��ȿ��ų��ߵģ�һ��Ҫ�ȵ��㴦�����������˳������ߡ�

- ��΢��������첽�¼�

![img](https://blog.jiasm.org/images/macro-micro-and-event-loop/banner.jpg)

# ��΢���������

���ӣ�

�������ȥ���а�ҵ��һ������Ҫȡ�Ž����źš�

һ���ϱ߶���ӡ�����ƣ������ĺ���ΪXX��ǰ�߻���XX�ˡ���֮���������

��Ϊ��Աͬʱְ�ܴ���һ��������ҵ��Ŀͻ�����ʱÿһ��������ҵ����˾Ϳ�����Ϊ�����й�Ա��һ�������������ڵģ�����Ա�����굱ǰ�ͻ��������Ժ�ѡ��Ӵ���һλ���㲥���ţ�Ҳ������һ��������Ŀ�ʼ��

���Զ�����������һ��Ϳ�����Ϊ˵��һ������������⣬����ǵ�ǰ�����������źŵĿͻ���

- ��������еĶ����Ѿ���ɵ��첽������������˵ע��һ���첽����ͻᱻ����������������

�������������źţ�����е����ʱ���㲻�ڣ���ô�㵱ǰ�ĺ��ƾ������ˣ���Ա��ѡ��ֱ������������һ���ͻ���ҵ������������Ժ���Ҫ����ȡ��

- һ����������ִ�еĹ����У��ǿ������һЩ΢�����

����һ����������ִ�еĹ����У��ǿ������һЩ΢����ģ������ڹ�̨����ҵ����ǰ�ߵ�һλ�ϴ�ү�����ڴ��ڴ�����ҵ��������Ժ󣬹�Ա�����ϴ�ү����û��������Ҫ�����ҵ����ʱ�ϴ�ү����һ�£������P2P�����е���࣬�ǲ���Ҫѡ����һЩ������ء���Ȼ����߹�Ա˵��Ҫ��һЩ��Ƶ�ҵ����ʱ���Ա�϶����ܸ����ϴ�ү˵���������Ϻ��ȡ����ȥ�������Ŷӡ���

���Ա������ֵ���������ҵ�񣬻���Ϊ�ϴ�ү��ʱ��ӵġ�**���ҵ��**���������ơ�

Ҳ���ϴ�ү�ڰ�������Ժ��� **�ٰ�һ�����ÿ�**������ **�����������**��

������ʲô����ֻҪ�ǹ�Ա�ܹ���������ģ������ڴ������ҵ��֮ǰ������Щ���飬��Щ��������Ϊ��΢����

- **�ڵ�ǰ��΢����û��ִ�����ʱ���ǲ���ִ����һ��������ġ�**

## �������Դ���

```js
setTimeout(_ => console.log(4))

new Promise(resolve => {
  resolve()
  console.log(1)
}).then(_ => {
  console.log(3)
})

console.log(2)
```

![image-20210311195317345](.\img\0-task.png)

- `setTimeout`������Ϊ�����������ڵģ���`Promise.then`���Ǿ��д����Ե�΢����
- ���������ִ��˳����ǰ�������������

- **���л������첽����ָ���¼��ص��е��ǲ��ִ���**

- Ҳ����˵`new Promise`��ʵ�����Ĺ�������ִ�еĴ��붼��ͬ�����еģ���`then`��ע��Ļص������첽ִ�е�

- ��ͬ������ִ����ɺ�Ż�ȥ����Ƿ����첽������ɣ���ִ�ж�Ӧ�Ļص�����΢�����ֻ��ں�����֮ǰִ�С�

���Ծ͵õ����������������`1��2��3��4`��

����`setTimeout`�Ѿ��������˶�ʱ�����൱��ȡ�ţ���Ȼ���ڵ�ǰ�������������һЩ`Promise`�Ĵ�����ʱ���ҵ�񣩡�

�������Ǽ�����`Promise`��ʵ����`Promise`���������Ȼ������`setTimeout`�ĺ�����

```js
setTimeout(_ => console.log(4))

new Promise(resolve => {
  resolve()
  console.log(1)
}).then(_ => {
  console.log(3)
  Promise.resolve().then(_ => {
    console.log('before timeout')
  }).then(_ => {
    Promise.resolve().then(_ => {
      console.log('also before timeout')
    })
  })
})

console.log(2)
```



- ʵ������º��ٻ��м򵥵���ô����`Promise`�ģ�һ�㶼����������������첽����,����`fetch`��`fs.readFile`֮��Ĳ���
- ����Щ��ʵ���൱��ע����һ�������񣬶�����΢����

- ��[Promise/A+�Ĺ淶](https://promisesaplus.com/#notes)�У�`Promise`��ʵ�ֿ�����΢����Ҳ�����Ǻ����񣬵����ձ�Ĺ�ʶ��ʾ(����`Chrome`����ô����)��`Promise`Ӧ��������΢������Ӫ��

��Щ�����Ǻ�������Щ��΢����ͱ�úܹؼ�������Ŀǰҵ��Ƚ����е�˵����

# ������

| #                       | ����� | Node |
| ----------------------- | ------ | ---- |
| `I/O`                   | ��      | ��    |
| `setTimeout`            | ��      | ��    |
| `setInterval`           | ��      | ��    |
| `setImmediate`          | ��      | ��    |
| `requestAnimationFrame` | ��      | ��    |

- ��Щ�ط����г���`UI Rendering`��˵���Ҳ�Ǻ����񣬿����ڶ���[HTML�淶�ĵ�](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)�Ժ󣬷��������Ȼ�Ǻ�΢����ƽ�е�һ����������
- `requestAnimationFrame`����Ҳ���Ǻ�����ɣ�`requestAnimationFrame`��[MDN�Ķ���](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)Ϊ���´�ҳ���ػ�ǰ��ִ�еĲ��������ػ�Ҳ����Ϊ�������һ�����������ڵģ��Ҹò�������΢�����ִ��

# ΢����

| #                            | ����� | Node |
| ---------------------------- | ------ | ---- |
| `process.nextTick`           | ��      | ��    |
| `MutationObserver`           | ��      | ��    |
| `Promise.then catch finally` | ��      | ��    |

# `Event-Loop`

`JavaScript`��һ�������̵����ԣ�ͬһʱ�䲻�ܴ������������Ժ�ʱִ�к����񣬺�ʱִ��΢����������Ҫ��������һ���ж��߼����ڡ�

ÿ������һ��ҵ�񣬹�Ա�ͻ��ʵ�ǰ�Ŀͻ����Ƿ���������Ҫ�����ҵ��***����黹��û��΢������Ҫ����***
���ͻ���ȷ��֪˵û�������Ժ󣬹�Ա��ȥ�鿴��߻���û�е��Ű���ҵ����ˡ�***���������κ����񡢼�黹��û�к�������Ҫ����***
<span style="color:red">������Ĺ����ǳ������еģ�ÿ���һ�����񶼻����һ�Σ��������Ĳ����ͱ���Ϊ`Event Loop`��</span>(���Ǹ��ǳ����׵������ˣ�ʵ���ϻḴ�Ӻܶ�)

���Ҿ���ͬ�ϱ���˵�ģ�һ����Աͬһʱ��ֻ�ܴ���һ�����飬������Щ������һ���ͻ�������ģ����Կ�����Ϊ΢����Ҳ����һ�����У�������������һ���߼���

```js
const macroTaskList = [
  ['task1'],
  ['task2', 'task3'],
  ['task4'],
]

for (let macroIndex = 0; macroIndex < macroTaskList.length; macroIndex++) {
  const microTaskList = macroTaskList[macroIndex]

  for (let microIndex = 0; microIndex < microTaskList.length; microIndex++) {
    const microTask = microTaskList[microIndex]

    // ���һ��΢����
    if (microIndex === 1) microTaskList.push('special micro task')

    // ִ������
    console.log(microTask)
  }

  // ���һ��������
  if (macroIndex === 2) macroTaskList.push(['special macro task'])
}

// > task1
// > task2
// > task3
// > special micro task
// > task4
// > special macro task
```

֮����ʹ������`for`ѭ������ʾ������Ϊ��ѭ���ڲ����Ժܷ���Ľ���`push`֮��Ĳ��������һЩ���񣩣��Ӷ�ʹ�����Ĵ�����̬������

�Լ���Ҫ��ȷ���ǣ�`Event Loop`ֻ�Ǹ���������ִ����Щ���񣬻���˵��Щ�ص��������ˣ��������߼������ڽ�����ִ�еġ�

# ��������еı���

���ϱ߼򵥵�˵������������Ĳ���Լ�`Event Loop`�����ã���ô����ʵ�����������ʲô�����أ�
����Ҫ��ȷ��һ���ǣ��������Ȼ����΢����֮���ִ�еģ���Ϊ΢����ʵ�����Ǻ����������һ�����裩

`I/O`��һ��о��е����ͳ����̫��Ķ��������Գ�֮Ϊ`I/O`�����һ��`button`���ϴ�һ���ļ�������������������Щ�����Գ�֮Ϊ`I/O`��

������������һЩ`DOM`�ṹ��

```html
<style>
  #outer {
    padding: 20px;
    background: #616161;
  }

  #inner {
    width: 100px;
    height: 100px;
    background: #757575;
  }
</style>
<div id="outer">
  <div id="inner"></div>
</div>
```

```js
const $inner = document.querySelector('#inner')
const $outer = document.querySelector('#outer')

function handler () {
  console.log('click') // ֱ�����

  Promise.resolve().then(_ => console.log('promise')) // ע��΢����

  setTimeout(_ => console.log('timeout')) // ע�������

  requestAnimationFrame(_ => console.log('animationFrame')) // ע�������

  $outer.setAttribute('data-random', Math.random()) // DOM�����޸ģ�����΢����
}

new MutationObserver(_ => {
  console.log('observer')
}).observe($outer, {
  attributes: true
})

$inner.addEventListener('click', handler)
$outer.addEventListener('click', handler)
```

������`#inner`����ִ��˳��һ���ǣ�`click` -> `promise` -> `observer` -> `click` -> `promise` -> `observer` -> `animationFrame` -> `animationFrame` -> `timeout` -> `timeout`��

��Ϊһ��`I/O`������һ��������Ҳ����˵����������л�ȥ����`handler`��

���մ����е�ע�ͣ���ͬ���Ĵ����Ѿ�ִ�����Ժ���ʱ�ͻ�ȥ�鿴�Ƿ���΢�������ִ�У�Ȼ������`Promise`��`MutationObserver`����΢������ִ��֮��

��Ϊ`click`�¼���ð�ݣ����Զ�Ӧ�����`I/O`�ᴥ������`handler`����(*һ����`inner`��һ����`outer`*)�����Ի�����ִ��ð�ݵ��¼�(*���������ĺ�����*)��Ҳ����˵���ظ��������߼���
��ִ����ͬ��������΢�����Ժ���ʱ������������ľ�к�����

��Ҫע���һ���ǣ���Ϊ���Ǵ�����`setAttribute`��ʵ�����޸���`DOM`�����ԣ���ᵼ��ҳ����ػ棬�����`set`�Ĳ�����ͬ��ִ�еģ�Ҳ����˵`requestAnimationFrame`�Ļص�������`setTimeout`��ִ�С�

ʹ��������ʾ�����룬������ֶ����`DOM`Ԫ�صĴ�����ʽ��Ϊ`$inner.click()`����ô��õ���һ���Ľ����
��`Chrome`�µ����˳������������ģ�
`click` -> `click` -> `promise` -> `observer` -> `promise` -> `animationFrame` -> `animationFrame` -> `timeout` -> `timeout`��

�������ֶ�����`click`��ִ��˳��һ����ԭ���������ģ���Ϊ�������û�ͨ�����Ԫ��ʵ�ֵĴ����¼�����������`dispatchEvent`�����ķ�ʽ���Ҹ��˾��ò���������һ����Ч��`I/O`����ִ����һ��`handler`�ص�ע����΢����ע���˺������Ժ�ʵ������ߵ�`$inner.click()`��û��ִ���ꡣ

������΢����ִ��֮ǰ����Ҫ����ð��ִ����һ���¼���Ҳ����˵�����˵ڶ��ε�`handler`��

��������˵ڶ���`click`���ȵ�������`handler`��ִ����Ϻ�Ż�ȥ�����û��΢������û�к�����

1. `.click()`�����ִ����¼��ķ�ʽ������Ϊ������`dispatchEvent`���������Ϊͬ��ִ�еĴ���

```js
document.body.addEventListener('click', _ => console.log('click'))

document.body.click()
document.body.dispatchEvent(new Event('click'))
console.log('done')

// > click
// > click
// > done
```

2. `MutationObserver`�ļ�������˵ͬʱ������Σ�����޸�ֻ����һ�λص���������

```js
new MutationObserver(_ => {
  console.log('observer')
  // ����������DOM��data-random���ԣ���Ȼ�����һ�ε�ֵ����������
}).observe(document.body, {
  attributes: true
})

document.body.setAttribute('data-random', Math.random())
document.body.setAttribute('data-random', Math.random())
document.body.setAttribute('data-random', Math.random())

// ֻ�����һ�� ovserver
```

# `Node`�еı���

NodeҲ�ǵ��̣߳������ڴ���`Event Loop`�����������΢��Щ��ͬ��������[Node�ٷ��ĵ�](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#event-loop-explained)�ĵ�ַ��

�͵���API����������⣬Node����������������������ʹ�ã�΢�����`process.nextTick`�Լ��������`setImmediate`��

# setImmediate��setTimeout������

�ڹٷ��ĵ��еĶ��壬`setImmediate`Ϊһ��`Event Loop`ִ����Ϻ���á�
`setTimeout`����ͨ������һ���ӳ�ʱ������ִ�С�

����ͬʱ���ᵽ���������������ֱ��ִ�����������������ѱ�֤�ĸ����ȴ�����
��Ϊ�������������ע������������Ȼ��ִ�еĴ����ʱ����`XXs`������ʱ��ʱ���Ѿ����ڿ�ִ�лص���״̬�ˡ�

���Ի���ִ�ж�ʱ������ִ���궨ʱ���Ժ���ǽ�����һ��`Event Loop`����ʱ�Ż�ִ��`setImmediate`��

```js
setTimeout(_ => console.log('setTimeout'))
setImmediate(_ => console.log('setImmediate'))
```

![img](https://blog.jiasm.org/images/macro-micro-and-event-loop/test-exec.png)

����������һЩ�����Ժ󣬾Ϳ��Ա�֤`setTimeout`һ������`setImmediate`֮ǰ�����ˣ�

```js
setTimeout(_ => console.log('setTimeout'))
setImmediate(_ => console.log('setImmediate'))

let countdown = 1e9

while(countdonn--) { } 
// ����ȷ�����ѭ����ִ���ٶȻᳬ����ʱ���ĵ���ʱ����������ѭ��û�н���ʱ��setTimeout�Ѿ�����ִ�лص��ˣ����Ի���ִ��`setTimeout`�ٽ�����һ��ѭ����Ҳ����˵��ʼִ��`setImmediate`
```

�������һ���������У���Ȼ��`setImmediate`��ִ�У�

```js
require('fs').readFile(__dirname, _ => {
  setTimeout(_ => console.log('timeout'))
  setImmediate(_ => console.log('immediate'))
})

// ���ʹ��һ���������ӳٵ�setTimeoutҲ����ʵ����ͬ��Ч��
```

# `process.nextTick`

�����ϱ�˵�ģ����������Ϊ��һ��������`Promise`��`MutationObserver`��΢����ʵ�֣��ڴ���ִ�еĹ����п�����ʱ����`nextTick`�����һᱣ֤����һ��������ʼ֮ǰ��ִ�С�

��ʹ�÷����һ����������Ӿ���һЩ�¼�����Ĳ�����

```js
class Lib extends require('events').EventEmitter {
  constructor () {
    super()

    this.emit('init')
  }
}

const lib = new Lib()

lib.on('init', _ => {
  // ���ｫ��Զ����ִ��
  console.log('init!')
})
```

��Ϊ�����Ĵ�����ʵ����`Lib`����ʱ��ͬ��ִ�еģ���ʵ��������Ժ����������`init`�¼���
����ʱ������������û�п�ʼִ�е�`lib.on('init')`�����¼�����һ����
���Իᵼ�·����¼�ʱû�лص����ص�ע����¼������ٴη��͡�

���ǿ��Ժ����ɵ�ʹ��`process.nextTick`�����������⣺

```js
class Lib extends require('events').EventEmitter {
  constructor () {
    super()

    process.nextTick(_ => {
      this.emit('init')
    })

    // ͬ��ʹ��������΢����
    // ����Promise.resolve().then(_ => this.emit('init'))
    // Ҳ����ʵ����ͬ��Ч��
  }
}
```

�������������̵Ĵ���ִ����Ϻ󣬳������ʱ����`Event Loop`���̲�����û��΢����Ȼ���ٷ���`init`�¼���

*������Щ�������ᵽ�ģ�ѭ������`process.nextTick`�ᵼ�±����������Ĵ�����Զ���ᱻִ�У����ǶԵģ��μ��ϱ�ʹ�õ�˫��ѭ��ʵ�ֵ�`loop`���ɣ��൱����ÿ��`for`ѭ��ִ���ж������������`push`����������ѭ����ԶҲ�������*

# `async/await`����

��Ϊ��`async/await`�����ϻ��ǻ���`Promise`��һЩ��װ����`Promise`������΢�����һ�֡�������ʹ��`await`�ؼ�����`Promise.then`Ч�����ƣ�

```js
setTimeout(_ => console.log(4))

async function main() {
  console.log(1)
  await Promise.resolve()
  console.log(3)
}

main()

console.log(2)
```

- **`async`������await֮ǰ�Ĵ��붼��ͬ��ִ�еģ��������Ϊawait֮ǰ�Ĵ�������`new Promise`ʱ����Ĵ��룬await֮������д��붼����`Promise.then`�еĻص�**

# С��

�Ƽ���ƪ���ĵ����£�

- - [tasks-microtasks-queues-and-schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules)
  - [understanding-js-the-event-loop](https://hackernoon.com/understanding-js-the-event-loop-959beae3ac40)
  - [���Node.js���process.nextTick()](https://www.oschina.net/translate/understanding-process-next-tick)
  - [������е�EventLoop˵���ĵ�](https://html.spec.whatwg.org/multipage/webappapis.html)
  - [Node�е�EventLoop˵���ĵ�](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick)
  - [requestAnimationFrame | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)
  - [MutationObserver | MDN](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)

