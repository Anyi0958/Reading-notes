VUE-Docѧϰ Ŀ¼
[TOC]
***

# ǰ��

- ����doc�Ķ���¼
- �ʼ��Ķ�

# �Ƽ��Ķ�

- [VUE Doc](https://cn.vuejs.org/v2/guide/)

***

# ��

- [��װ](https://cn.vuejs.org/v2/guide/installation.html)
- ��������

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
```

- ����

```html
<!-- ���������汾���������а����������о��� -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```

## NPM��װ

```shell
# �����ȶ���
npm install vue
cd node_modules/vue
npm install
npm run build
```



## �����汾

**��Ҫ**��GitHub �ֿ�� `/dist` �ļ���ֻ�����°汾����ʱ�Ż��ύ�������Ҫʹ�� GitHub �� Vue ���µ�Դ�룬����Ҫ�Լ�������

```shell
git clone https://github.com/vuejs/vue.git node_modules/vue
cd node_modules/vue
npm install
npm run build
```

## ����ʽ��Ⱦ

- Vue.js �ĺ�����һ��������ü���ģ���﷨������ʽ�ؽ�������Ⱦ�� DOM ��ϵͳ��

```html
<div id="app">
  {{ message }}
</div>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

ע��:

- ���ٺ� HTML ֱ�ӽ�����
- һ�� Vue Ӧ�ûὫ����ص�һ�� DOM Ԫ���� (������������� `#app`) Ȼ����������ȫ����
- �Ǹ� HTML �����ǵ���ڣ������඼�ᷢ�����´����� Vue ʵ���ڲ�

## ��`attribute` - `v-bind:title`

```html
<div id="app-2">
  <span v-bind:title="message">
    �����ͣ�����Ӳ鿴�˴���̬�󶨵���ʾ��Ϣ��
  </span>
</div>
```

```js
var app2 = new Vue({
  el: '#app-2',
  data: {
    message: 'ҳ������� ' + new Date().toLocaleString()
  }
})
```

-  <span style="color:red">`v-bind`</span> attribute ����Ϊ**ָ��**
- ָ�����ǰ׺ `v-`���Ա�ʾ������ Vue �ṩ������ attribute
- ������Ⱦ�� DOM ��Ӧ���������Ӧʽ��Ϊ
- ��ָ�����˼�ǣ��������Ԫ�ؽڵ�� `title` attribute �� Vue ʵ���� `message` property ����һ�¡���������ٴδ�������� JavaScript ����̨������ `app2.message = '����Ϣ'`���ͻ���һ�ο���������� `title` attribute �� HTML �Ѿ������˸��¡�

## ���� - `v-if`

```html
<div id="app-3">
  <p v-if="seen">�����㿴������</p>
</div>
```

```js
var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
})
```

## ѭ�� - `v-for`

```html
<div id="app-4">
  <ol>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ol>
</div>
```

```js
var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: 'ѧϰ JavaScript' },
      { text: 'ѧϰ Vue' },
      { text: '����ţ��Ŀ' }
    ]
  }
})
```

