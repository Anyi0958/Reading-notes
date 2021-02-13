React 目录：

[TOC]

***

# 前言

React是很好的前端资源库

## 推荐阅读

- [React官网](https://react.docschina.org/tutorial/tutorial.html "React官网")
- [工具链](https://react.docschina.org/docs/create-a-new-react-app.html#create-react-app "工具链")

## 整个部分
1. 环境准备
2. 概论：React-组件，props和state
3. 游戏完善：了解常用技术
4. 时间旅行：了解React的独特优势

***

# 搭建本地环境

## 1. 安装`Node.JS`

官网：[NodeJS](https://nodejs.org/en/ "NodeJS")

## 2. 创建一个新的React项目
### React工具链的作用
帮助完成任务：
- 扩展文件和组件的规模
- 使用来自npm的第三方库
- 尽早发现常见错误
- 在开发中实时编辑`CSS`和`JS`
- 优化生产输出

### 不使用工具链
不习惯使用`JavaScript`工具，可以把`React`作为普通的`<script>`标记添加到`HTML`页面上，以及使用可选的`JSX`

### 推荐的工具链
- 创建一个新的单页应用：`Create React App`
- 用`Node.js`构建服务端渲染的网站：`Next.js`
- 构建面向内容的静态网站：`Gatsby`
- 打造组件库或将`React`集成到现有代码仓库：后面更灵活的工具链

#### Create React App
- 用于学习React的舒适环境
- 创建新的单页应用的最佳方式
- 要求：`Node >= 8.10`和`npm >= 5.6`
创建项目：
```js
npx create-react-app my-app
cd my-app
npm start
```
- `npx`是运行工具
- `Create React App`：
    - 不会处理后端逻辑或者操纵数据库
    - 创建一个前端构建流水线(Build Pipeline)，可以搭配任何后端
    - 在内部使用`Babel`和`webpack`
- 部署好后，执行：`npm run build`
- `build`文件夹内会生成应用的优化版本
- 可以从`ReadMe`了解更多详细设置
#### Next.js
- 推荐阅读：[Next](https://nextjs.org/learn/basics/create-nextjs-app "Next.js官网")
- 轻量级框架，用于配合`React`打造静态化和服务端渲染应用
- 以`Node.js`为服务器环境，包含样式和路由方案

#### Gatsby
- 推荐阅读：
    - [Gatsby](https://www.gatsbyjs.org/docs/ "Gatsby官网")
    - [演示示例](https://www.gatsbyjs.com/starters/? "入门示例")
- 创建静态网站的最佳方式
- 保证可以使用React组件
- 输出预渲染的`HTML`和`CSS`以保证最快的加载速度

#### 更灵活的工具链
适合更有经验的使用者
- `Neutrino`把`Webpack`的强大功能和简单预设结合在一起，并包含了应用和组件的预设
- `Nx`是针对全栈`monorepo`的开发工具包，内置了`React`, `Next.js`, `Express`等
- `Parcel`是快速，零配置的网页应用打包器
- `Razzle`是一个无需配置的服务端渲染框架，提供了比`Next.js`更多的灵活性

### 从头开始打造工具链
组成：
- 一个`Package`管理器：比如`Yarn`和`npm`，管理三方库
- 一个打包器：`Webpack`和`Parcel`，组合成模块，优化加载时间
- 一个编译器：`Babel`，编写最新版本的代码，旧版浏览器依然能使用


## 3. 删除新项目中的`src`所有文件
- 不要删除`src`文件夹，而只删除里面的源文件
- 在`src/`文件夹中创建`index.css`, `index.js`
```css
body {
  font: 14px "Century Gothic", Futura, sans-serif;
  margin: 20px;
}

ol, ul {
  padding-left: 30px;
}

.board-row:after {
  clear: both;
  content: "";
  display: table;
}

.status {
  margin-bottom: 10px;
}

.square {
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
}

.square:focus {
  outline: none;
}

.kbd-navigation .square:focus {
  background: #ddd;
}

.game {
  display: flex;
  flex-direction: row;
}

.game-info {
  margin-left: 20px;
}


```
```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {/* TODO */}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


```
## 4. 运行
- 运行：`npm start`
- 访问：`localhost:3000`

# React 入门

# 性能优化
### 针对生产环境进行正确配置
#### 使用生产版本
- 推荐开发应用时使用开发模式，为用户部署时使用生产模式
确保使用压缩后的生产版本：
- 对`React`应用进行`BenchMark`
- 性能问题
检查是否使用生产版本：
- [Chrome的React开发者工具](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi "检查工具")
##### Create React App
通过`Create react app`构建的项目：
- 生产运行：`npm run build`
    - 将在`build/`目录中生成对应的生产版本
    - 只有在生产部署前才需要执行这个命令
- 开发运行：`npm start`

##### 单文件构建
生产环境使用的单文件版：
```js
<script src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
```
- 只有`.production.min.js`适用于生产

##### Brunch
安装`terser-brunch`插件，获取最高效的生产构建：
```js
# 如果使用npm
npm install --save-dev terser-brunch

# 如果使用Yarn
yarn add --dev terser-brunch
```
创建生产构建：
`brunch build -p`
- 开发中使用，则会变得卡慢

##### Browserify
高效生产构建的插件：
```js
# 如果使用npm
npm install --save-dev envify terser uglifyify

# Yarn
yarn add --dev envify terser uglifyify
```
- `envify`转换器用于设置正确的环境变量，全局设置`-g`
- `uglifyify`转换器移除开发相关的引用代码，全局`-g`
sample：
```js
browserify ./index.js ¥
    -g [ envify --NODE_ENV production ] ¥
    -g uglifyify ¥
    | terser --compress --mangle > ./bundle.js
```

##### webpack
- 推荐阅读：[webpack官方文档](https://webpack.js.org/guides/production/ "webpack doc")
```js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    optimization: {
        minimizer: [new TerserPlugin({ /* addtional options here */})]
    }
};
```


