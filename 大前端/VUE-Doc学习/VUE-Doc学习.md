VUE-Doc学习 目录
[TOC]
***

# 前言

- 官网doc阅读记录
- 笔记阅读

# 推荐阅读

- [VUE Doc](https://cn.vuejs.org/v2/guide/)

***

# 起步

- [安装](https://cn.vuejs.org/v2/guide/installation.html)
- 生产环境

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
```

- 开发

```html
<!-- 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```

## NPM安装

```shell
# 最新稳定版
npm install vue
cd node_modules/vue
npm install
npm run build
```



## 开发版本

**重要**：GitHub 仓库的 `/dist` 文件夹只有在新版本发布时才会提交。如果想要使用 GitHub 上 Vue 最新的源码，你需要自己构建！

```shell
git clone https://github.com/vuejs/vue.git node_modules/vue
cd node_modules/vue
npm install
npm run build
```

## 声明式渲染

- Vue.js 的核心是一个允许采用简洁的模板语法来声明式地将数据渲染进 DOM 的系统：

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

注意:

- 不再和 HTML 直接交互了
- 一个 Vue 应用会将其挂载到一个 DOM 元素上 (对于这个例子是 `#app`) 然后对其进行完全控制
- 那个 HTML 是我们的入口，但其余都会发生在新创建的 Vue 实例内部

## 绑定`attribute` - `v-bind:title`

```html
<div id="app-2">
  <span v-bind:title="message">
    鼠标悬停几秒钟查看此处动态绑定的提示信息！
  </span>
</div>
```

```js
var app2 = new Vue({
  el: '#app-2',
  data: {
    message: '页面加载于 ' + new Date().toLocaleString()
  }
})
```

-  <span style="color:red">`v-bind`</span> attribute 被称为**指令**
- 指令带有前缀 `v-`，以表示它们是 Vue 提供的特殊 attribute
- 会在渲染的 DOM 上应用特殊的响应式行为
- 该指令的意思是：“将这个元素节点的 `title` attribute 和 Vue 实例的 `message` property 保持一致”。如果你再次打开浏览器的 JavaScript 控制台，输入 `app2.message = '新消息'`，就会再一次看到这个绑定了 `title` attribute 的 HTML 已经进行了更新。

## 条件 - `v-if`

```html
<div id="app-3">
  <p v-if="seen">现在你看到我了</p>
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

## 循环 - `v-for`

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
      { text: '学习 JavaScript' },
      { text: '学习 Vue' },
      { text: '整个牛项目' }
    ]
  }
})
```

