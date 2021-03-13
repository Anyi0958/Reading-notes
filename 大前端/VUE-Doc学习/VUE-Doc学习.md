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

# ��������

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

- �ڿ���̨����� `app4.todos.push({ text: '����Ŀ' })`����ᷢ���б���������һ������Ŀ��

## �����û����� - `v-on`

```html
<div id="app-5">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">��ת��Ϣ</button>
</div>
```

```js
var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})
```

## ����Ӧ��״̬��˫��� - `v-model`

```html
<div id="app-6">
  <p>{{ message }}</p>
  <input v-model="message">
</div>
```

```js
var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue!'
  }
})
```

## �����

- �� Vue �һ�������������һ��ӵ��Ԥ����ѡ���һ�� Vue ʵ��

```js
// ������Ϊ todo-item �������
Vue.component('todo-item', {
  template: '<li>���Ǹ�������</li>'
})

var app = new Vue(...)
```

����������һ�����ģ�壺

```html
<ol>
  <!-- ����һ�� todo-item �����ʵ�� -->
  <todo-item></todo-item>
</ol>
```

�Ӹ����������ݴ��������:

```js
Vue.component('todo-item', {
  // todo-item ������ڽ���һ��
  // "prop"��������һ���Զ��� attribute��
  // ��� prop ��Ϊ todo��
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
```

ʹ��`v-bind`

```html
<div id="app-7">
  <ol>
    <!--
      ��������Ϊÿ�� todo-item �ṩ todo ����
      todo �����Ǳ������������ݿ����Ƕ�̬�ġ�
      ����Ҳ��ҪΪÿ������ṩһ����key�����Ժ���
      ����ϸ���͡�
    -->
    <todo-item
      v-for="item in groceryList"
      v-bind:todo="item"
      v-bind:key="item.id"
    ></todo-item>
  </ol>
</div>
```

```js
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { id: 0, text: '�߲�' },
      { id: 1, text: '����' },
      { id: 2, text: '�������ʲô�˳ԵĶ���' }
    ]
  }
})
```

- �ӵ�Ԫͨ�� `prop` �ӿ��븸��Ԫ���������õĽ���
- ���ڿ��Խ�һ���Ľ� `<todo-item>` ������ṩ��Ϊ���ӵ�ģ����߼���������Ӱ�쵽����Ԫ��

# VUEʵ��

## ����һ��ʵ��

```js
var vm = new Vue({
  // ѡ��
})
```

- `MVVM`ģ��
- һ�� Vue Ӧ����һ��ͨ�� `new Vue` ������**�� Vue ʵ��**���Լ���ѡ��Ƕ�׵ġ��ɸ��õ���������

�������

```shell
��ʵ��
���� TodoList
   ���� TodoItem
   ��  ���� TodoButtonDelete
   ��  ���� TodoButtonEdit
   ���� TodoListFooter
      ���� TodosButtonClear
      ���� TodoListStatistics
```

## �����뷽��

- ��һ�� Vue ʵ��������ʱ������ `data` �����е����е� property ���뵽 Vue ��**��Ӧʽϵͳ**��
- ����Щ property ��ֵ�����ı�ʱ����ͼ�����������Ӧ������ƥ�����Ϊ�µ�ֵ��

```js
// ���ǵ����ݶ���
var data = { a: 1 }

// �ö��󱻼��뵽һ�� Vue ʵ����
var vm = new Vue({
  data: data
})

// ������ʵ���ϵ� property
// ����Դ�����ж�Ӧ���ֶ�
vm.a == data.a // => true

// ���� property Ҳ��Ӱ�쵽ԭʼ����
vm.a = 2
data.a // => 2

// ������֮��Ȼ
data.a = 3
vm.a // => 3
```

## `Object.freeze()`

```js
var obj = {
  foo: 'bar'
}

Object.freeze(obj)

new Vue({
  el: '#app',
  data: obj
})
```

```html
<div id="app">
  <p>{{ foo }}</p>
  <!-- ����� `foo` ������£� -->
  <button v-on:click="foo = 'baz'">Change it</button>
</div>
```

- �������� property��Vue ʵ������¶��һЩ���õ�ʵ�� property �뷽��
- ���Ƕ���ǰ׺ `$`���Ա����û������ property ���ֿ���

```js
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // => true
vm.$el === document.getElementById('example') // => true

// $watch ��һ��ʵ������
vm.$watch('a', function (newValue, oldValue) {
  // ����ص����� `vm.a` �ı�����
})
```

## ʵ���������ڹ���

```js
new Vue({
  data: {
    a: 1
  },
  created: function () {
    // `this` ָ�� vm ʵ��
    console.log('a is: ' + this.a)
  }
})
// => "a is: 1"
```

# ģ���﷨

- ue.js ʹ���˻��� HTML ��ģ���﷨��������������ʽ�ؽ� DOM �����ײ� Vue ʵ�������ݡ����� Vue.js ��ģ�嶼�ǺϷ��� HTML�������ܱ���ѭ�淶��������� HTML ������������
- �ڵײ��ʵ���ϣ�Vue ��ģ���������� DOM ��Ⱦ�����������Ӧϵͳ��Vue �ܹ����ܵؼ����������Ҫ������Ⱦ������������� DOM ���������������١�
- �������Ϥ���� DOM ����ƫ�� JavaScript ��ԭʼ��������Ҳ���Բ���ģ�壬[ֱ��д��Ⱦ (render) ����](https://cn.vuejs.org/v2/guide/render-function.html)��ʹ�ÿ�ѡ�� JSX �﷨��

## �ı� - `{{msg}}`

```html
<span>Message: {{ msg }}</span>
```

## ԭʼHTML - `v-html`

```html
<p>Using mustaches: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

## `v-bind` - `Attribute`

```html
<div v-bind:id="dynamicId"></div>
```

## `JS`���ʽ

```html
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
```

## ���� - `v-bind:href, v-on`

```html
<a v-bind:href="url">...</a>

<a v-on:click="doSomething">...</a>
```

## ��̬����

```html
<!--
ע�⣬�������ʽ��д������һЩԼ������֮��ġ��Զ�̬�������ʽ��Լ�����½�������
-->
<a v-bind:[attributeName]="url"> ... </a>

<a v-on:[eventName]="doSomething"> ... </a>
```

## ���η�

```html
<form v-on:submit.prevent="onSubmit">...</form>
```

# �������Ժͼ�����

## ��������

```html
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
```

## ��������

```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // �������Ե� getter
    reversedMessage: function () {
      // `this` ָ�� vm ʵ��
      return this.message.split('').reverse().join('')
    }
  }
})
```

## ���� - `watch`

```html
<div id="demo">{{ fullName }}</div>
```

```js
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```

```js
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```

## �����`setter`

```js
// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```

## ������

```html
<div id="watch-example">
  <p>
    Ask a yes/no question:
    <input v-model="question">
  </p>
  <p>{{ answer }}</p>
</div>
```

```js
<!-- ��Ϊ AJAX ���ͨ�ù��ߵ���̬�Ѿ��൱�ḻ��Vue ���Ĵ���û���ظ� -->
<!-- �ṩ��Щ�����Ա��־�����Ҳ������������ѡ���Լ�����Ϥ�Ĺ��ߡ� -->
<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
<script>
var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    // ��� `question` �����ı䣬��������ͻ�����
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
  created: function () {
    // `_.debounce` ��һ��ͨ�� Lodash ���Ʋ���Ƶ�ʵĺ�����
    // ����������У�����ϣ�����Ʒ��� yesno.wtf/api ��Ƶ��
    // AJAX ����ֱ���û�������ϲŻᷢ������Ҫ�˽�������
    // `_.debounce` ���� (������� `_.throttle`) ��֪ʶ��
    // ��ο���https://lodash.com/docs#debounce
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },
  methods: {
    getAnswer: function () {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)'
        return
      }
      this.answer = 'Thinking...'
      var vm = this
      axios.get('https://yesno.wtf/api')
        .then(function (response) {
          vm.answer = _.capitalize(response.data.answer)
        })
        .catch(function (error) {
          vm.answer = 'Error! Could not reach the API. ' + error
        })
    }
  }
})
</script>
```

# `class`��`Style`��

- �ڽ� `v-bind` ���� `class` �� `style` ʱ��Vue.js ����ר�ŵ���ǿ�����ʽ��������ͳ����ַ���֮�⣬�������Ƕ��������

## `class`��

```html
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>
```

```js
data: {
  isActive: true,
  hasError: false
}
```

�����

```html
<div class="static active"></div>
```

## �����﷨

```html
<div v-bind:class="[activeClass, errorClass]"></div>
```

```js
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

�����

```html
<div class="active text-danger"></div>
```

## ���������

���������

```vue
Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})
```

```html
<my-component class="baz boo"></my-component>
```

�����

```html
<p class="foo bar baz boo">Hi</p>
```

## ��������ʽ - `v-bind:style`

```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

```js
data: {
  activeColor: 'red',
  fontSize: 30
}
```

���ߣ�

```html
<div v-bind:style="styleObject"></div>
```

```js
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

## �����﷨

```html
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```

# ������Ⱦ

## `v-if, v-else`

```html
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no ?</h1>
```

## ��`<template>`Ԫ����ʹ��`v-if`

```html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

## `v-else`

```html
<div v-if="Math.random() > 0.5">
  Now you see me
</div>
<div v-else>
  Now you don't
</div>
```

- `v-else` Ԫ�ر�������ڴ� `v-if` ���� `v-else-if` ��Ԫ�صĺ��棬�����������ᱻʶ��

## `v-else-if`

```html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

## `key`����ɸ���Ԫ��

```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```

## `v-show`

- ���ڸ�������չʾԪ�ص�ѡ���� `v-show` ָ��

```html
<h1 v-show="ok">Hello!</h1>
```

## ����

- `v-if` �ǡ���������������Ⱦ����Ϊ����ȷ�����л��������������ڵ��¼���������������ʵ��ر����ٺ��ؽ���
- `v-if` Ҳ��**���Ե�**������ڳ�ʼ��Ⱦʱ����Ϊ�٣���ʲôҲ��������ֱ��������һ�α�Ϊ��ʱ���ŻῪʼ��Ⱦ�����顣
- ���֮�£�`v-show` �ͼ򵥵öࡪ�����ܳ�ʼ������ʲô��Ԫ�����ǻᱻ��Ⱦ������ֻ�Ǽ򵥵ػ��� CSS �����л���
- һ����˵��`v-if` �и��ߵ��л��������� `v-show` �и��ߵĳ�ʼ��Ⱦ��������ˣ������Ҫ�ǳ�Ƶ�����л�����ʹ�� `v-show` �Ϻã����������ʱ�������ٸı䣬��ʹ�� `v-if` �Ϻá�



# �б���Ⱦ

## `v-for`

```html
<ul id="example-1">
  <li v-for="item in items" :key="item.message">
    {{ item.message }}
  </li>
</ul>
```

```js
var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```

## `v-for index`

```html
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```

```js
var example2 = new Vue({
  el: '#example-2',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```

## `v-for in object`

```html
<ul id="v-for-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>
```

```js
new Vue({
  el: '#v-for-object',
  data: {
    object: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    }
  }
})
```

