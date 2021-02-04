web5deployVue3 目录
[TOC]
***
# 推荐阅读
- [txm-原文](https://juejin.cn/post/6924180659829211143 "掘金")

# 前言

- 造轮子理解原理
- 理解原理后，脚手架提高效率
- 利用`webpack5`搭建一个完整的`vue3`的开发环境

# 初始化目录
***
## 1. 初始化`webpack.config.js`
`npm init -y`
效果：
![1.init][01]

## 2. 安装`webpack`
`npm install webpack webpack-cli -D`
### 注意

1. `-D`等价于`--save-dev`，开发环境时所需依赖
2. `-S`等价于`--save`，生产环境时所需依赖
![2-webpack][02]

- 注意更改源

## 3. 初始化目录和文件
- 创建`webpack.config.js`文件用于编写`webpack`
```javascript
// webpack.config.js
const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	}
}
```
- 创建`src`目录存放源代码
```javascript
// src/index.js
console.log('test webpack');
```
- 修改`package.json`中的`scripts`字段
```json
  "scripts": {
    "build": "webpack"
  },
```
- 打包`js`
	1. 项目根目录输入`npm run build`或者只输入`webpack`
	2. 打包成功后，会在项目的根目录创建一个`dist`文件夹，打包后的文件就是`main.js`

<span style="color:red;">效果</span>
![3-npmrunbuild][03]

![4-webpackbundle][04]

## 总结
1. npm初始化
2. webpack
3. 修改`package.json`和`webpack.config.js`
4. `npm run build` or `webpack`

***

# 配置核心功能

***
## 问题
由于存在一些浏览器无法使用`ES6+`的高级语法，因此需要转换为`ES5`
## 1. 安装依赖
`cnpm install @babel/core babel-loader @babel/preset-env -D`

## 2. 修改`webpack.config.js`配置
```javascript
// webpack.config.js
const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	}
	
}
```
## 注意
如果不想将配置写在配置文件中，可以在根目录创建`babel.config.js`或者`babelrc.js`
***
## 处理样式
- `webpack`默认只能打包`commonJS`规范的`js`文件
- 处理其他文件都需要相对应的处理器进行处理

### 1. 安装依赖
`cnpm install style-loader css-loader less less-loader -D`

### 2. 修改`webpack.config.js`配置
```javascript
// webpack.config.js
const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					'less-loader'
				]
			}
		]
	}
	
}
```
### 注意
`loader`的配置有很多能优化的地方

***
## 处理图片等静态资源
除`js`文件的其他文件打包，`webpack`都需要特定的处理器进行处理

### 1. 安装依赖
`npm install url-loader file-loader -D`

### 2. 修改`webapck.config.js`配置
```javascript
			{
				test: /\.(jpg|png|jpeg|gif|bmp)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 1024,
						fallback: {
							loader: 'file-loader',
							options: {
								name: '[name].[ext]'
							}
						}
					}
				}
			},
			{
				test: /\.(mp4|ogg|mp3|wav)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit:1024,
						fallback: {
							loader: 'file-loader',
							options: {
								name: '[name].[ext]'
							}
						}
					}
				}
			}
```

***
## 创建html文件
令打包的`js`文件自动插入到`html`模板中

### 1. 安装依赖
`cnpm install html-webpack-plugin -D`
### 2.修改`webpack`配置
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
// ...
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			title: 'vue3 + TS -> web App'
		})
	]
```
### 注意
配置动态网页标题时，需要将模板中的`<title>`标签里的内容换成`<%= htmlWebpackPlugin.options.title %>`
- 此处使用`webpack`会报错
![5-plugin][05]
结果
![6-webpackplugin][06]
- 使用`npm run build`则会不同，但是title不会改变
![7-buildwebpack][07]
结果:没有变成title
![8-buildrun][08]

***
## 开发服务器
每次打包后，都需要手动点击`dist`目录下的`index.html`看效果，因此，可以设置`webpack`将打包后的文件自动在浏览器打开

### 1. 安装依赖
`cnpm install webpack-dev-server -D`

### 2.修改`webpack`配置
```javascript
module.exports = {
//...
	devServer: {
		port: 3000,
		hot: true,
		open: true,
		contentBase: '../dist'
	},
//...
}
```

***
## 清除打包文件
- 如果打包的文件加了`hash`，那每次打包生成的文件都会在`dist`目录保留
- 我们可以使用此清楚插件在打包前先清理以前的打包文件

### 1. 安装依赖
`cnpm install clean-webpack-plugin -D`

### 2.修改`webpack`配置
```javascript
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

plugins: [
	new CleanWebPackPlugin()
]
```
### 注意
- 此处直接`build`会报错
![9-clean][09]

***
## 设置环境变量
### 设置环境变量常见方式
1. 命令式
2. 配置式
3. 创建`.env`文件
4. `cross-env`

### 设置
以`cross-env`的方式来设置环境变量：可以跨终端进行设置
1. 安装依赖
`cnpm install cross-env -D`
2. 修改`package.json`配置
```javascript
  "scripts": {
    "build": "webpack",
	"webpack": "cross-env NODE_ENV=development webpack"
  },
```
***
## 分环境打包
- 在平时项目开发中，会分为三种环境：
	1. 开发环境
	2. 测试环境
	3. 生产环境
- 如何配置一个多环境打包？

### 打包压缩
开发一个项目的最终要求就是要达到功能完备的情况下，打包体积最小，保证用户体验
#### 1. 压缩`html`文件
	- 修改`webpack`配置
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    // ...
    plugins: [
        new HtmlWebpackPlugin({
            // ...
+            minify: {
+                collapseWhitespace: true, // 去掉空格
+                removeComments: true // 去掉注释
+            }
        }),
        // ...
    ]
}

```
#### 2. 压缩`css`文件
	1. 安装依赖
`cnpm install mini-css-extract-plugin optimize-css-assets-webpack-plugin -D`
	2. 修改`webpack`配置文件
```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
  
module.exports = {
    // ...
    module: {
        rules: [
            // ...
            {
                test: /\.css$/,
                use: [
                   MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
 					MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
            // ...
        ]
    },
    plugins: [
        // ...
        new OptimizeCssAssetsWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        })
    ]
}
```
##### 注意
`purgecss-webpack-plugin`用于清除无用的`css`

#### 3. 压缩`js`文件
	1. 安装依赖
`cnpm install terser-webpack-plugin -D`
	2. 修改`webpack`配置
```javascript
const TerserWebpackPlugin = require('terser-webpack-plugin');
  
module.exports = {
    // ...
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin()
        ]
    },
    // ...
}
```
##### 注意
`uglifyjs-webpack-plugin`不支持压缩`ES6`语法的代码

#### 4. 压缩图片
1. 安装依赖
`cnpm install image-webpack-loader -D`
2. 修改`webpack`文件
```javascript
module.exports = {
    // ...
    module: {
        rules: [
            // ...
            {
                test: /\.(jpg|png|jpeg|gif|bmp)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: '[name].[ext]'
                                }
                            }
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            // ...
        ]
    },
    // ...
}
```
##### 注意
在安装`image-webpack-loader`依赖时，采用`cnpm`安装，`npm`会报错
***
# 集成TypeScript

***
- 前端工程师必备技能：`TypeScript`
- `Vue3`源码全部采用`TS`重写
- 需要掌握的核心概念：泛型、枚举、接口、类、函数等等

## 配置环境
### 1. 安装依赖
`cnpm install typescript ts-loader -D`
### 2. 修改`webpack`配置
```typescript
module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'ts-loader'
                ]
            },
            // ...
        ]
    },
    // ...
}
```
### 3. 初始化`tsconfig.json`文件
`tsc --init`


### 注意
`tsc --init`报错没有此命令时，需要先在全局安装`npm install -g typescript`
安装成功：
![10-tscinit][10]

## 重点内容
- 泛型
- 接口
- 函数
- ……

***
# 识别`.Vue`文件
***
## 1. 安装依赖
`cnpm install vue@next -S`
`cnpm install vue-loader@next @vue/compiler-sfc`

### 注意
如果使用的是`Vue2.x`，需要安装的是`vue-template-complier`

## 2. 修改`webpack`文件
```javascript
const { VueLoaderPlugin } = require('vue-loader/dist/index');

module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}
```
## 3. `index.js`文件中引入`vue`
```javscript
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app')
```
新增`App.vue`文件
```vue
//App.vue
<template>
    <div>
        <div>解析vue文件</div>
        <p>{{name}}</p>
    </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
    setup() {
        const name = ref('txm');

        return {
            name
        }
    }
})
</script>
```
### 注意
`defineComponent`只是为了在使用`vue3`时有会很好的语法提示

## Composition API
- `vue3`受到`React Hooks`的启发，将以前的`options API`改写成`函数式API`
- 优点是将代码进行解耦便于`tree-shaking`，提高代码的复用率
### vue2缺失
- `Minxin`可以完成公共逻辑代码的抽离，但是`Mixin`存在诸多缺点
- 命名冲突、同名的方法和计算属性会被覆盖、同名的生命周期都会执行且`minxin`里的先执行等等

### 常用的`Composition API`
- reactive
- ref
- effect
- watch
- compited
- 生命周期
- h函数
- toRefs
- ……
### 深入推荐阅读
- [Vue 组合式API](https://vue3js.cn/vue-composition-api/ "Vue 组合式API")

### 响应式系统
- `vue2.x`的响应式底层核心是采用`Object.defineProperty`来劫持对象的每个属性的`getter`和`setter`，方法是`defineReactive`
- 在获取属性时做依赖收集
- 在更新属性时触发更新

#### `vue2.x`核心原理
```javascript
// src\core\observer\index.js

if (Array.isArray(value)) {
   this.observeArray(value)
} else {
   this.walk(value)
}
// 处理对象
walk (obj: Object) {
   const keys = Object.keys(obj)
   for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
   }
}
// 处理数组
observeArray (items: Array<any>) {
   for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
   }
}

export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  const dep = new Dep()

  let childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        dep.depend() // 收集依赖
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = !shallow && observe(newVal)
      dep.notify() // 通知更新
    }
  })
}

```
- 处理`array`和`Object`时，进行判断，然后分别处理
- 如果多层结构直接进行`递归`操作，且对象每个属性都劫持，性能会变差

#### `vue2.x`总结
缺点：
- 对象属性的新增和删除无法检测。	解决办法：`Vue.$set`和`Vue.delete()`
- 修改数组的索引和`length`属性无法检测	解决办法：`splice`

#### `Vue3`核心原理
采用了`proxy`作为底层响应式的核心`API`
```javascript
// packages\reactivity\src\reactive.ts

function createReactiveObject(
  target: Target,
  isReadonly: boolean,
  baseHandlers: ProxyHandler<any>,
  collectionHandlers: ProxyHandler<any>
) {
  const proxy = new Proxy(
    target,
    targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers
  )
  return proxy
}

```
### `vue3`总结
- `createReactiveObject`方法是创建响应式的核心方法
- `proxy`直接监听整个对象，没有对数组和对象进行分开处理
注意：
- 学习源码时，需要掌握好`set`, `weakset`, `map`, `weakmap`, `reflect`等`ES6`的新特性
***
# 集成 `Vue-Router`
***
## 基本使用
### 1. 安装依赖
`npm install vue-router@4 -S`

### 2. 创建`Home.vue`和`Me.vue`
```vue
// Home.vue
// Home.vue
<template>
    <div>
        首页
    </div>
</template>

<script>
import { defineComponent, ref } from "vue";
export default {
    name: 'Home'
}
</script>

// Me.vue
// Me.vue
<template>
  <div>
      我的页面
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default {
    name: 'Me'
}
</script>
```
### 3. 创建`router.js`文件
```javascript
import { createRouter, createWebHistory } from "vue-router";
import Home from './Home.vue';
import Me from './Me.vue';

const routerHistory = createWebHistory();
const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/home',
            name: 'Home',
            component: Home
        },
        {
            path: '/me',
            name: 'Me',
            component: Me
        }
    ]
});

export default router;
```

### 4. 修改`index.js`文件
```javascript
console.log('test webpack');
import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';

createApp(App).use(router).mount('#app')
```
***
# 集成Vuex
***
## 基本使用
### 1. 安装依赖
`cnpm install vuex@next -S`
### 2. 创建`store.js`文件
```javscript
import { createStore } from "vuex";

const store = createStore({
    state: {
        name: 'vuex'
    },
    getters: {},
    actions: {},
    mutations: {},
    modules: {}
});

export default store;
```
### 3. 修改`index.js`文件
```javascript
console.log('test webpack');
import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';
import store from "./store.js";

createApp(App).use(router).use(store).mount('#app')
```
### 4. 在`App.vue`中获取`vuex`中的数据
```javascript
<template>
    <div>
        <!-- ... -->
        <p>获取vuex里面的数据{{count}}</p>
        <!-- ... -->
    </div>
</template>
<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
    setup() {
        const store = useStore();
        const count = computed(() => store.state.count)

        return {
            count
        }
    }
})
</script>

```
#### 注意
1. 用`computed`从`store`中获取数据，保证数据的响应式
2. 不熟悉，推荐阅读：[Vue3快速入门](https://juejin.cn/post/6919010318561116167 "Vue3快速掌握")
***
# 集成Vant
***
## 1.安装依赖
`cnpm install vant@next -S`

## 2.按需引入
### 1. 依赖
`cnpm i babel-plugin-import ts-import-plugin -D`
### 2.修改配置
```javascript
> JS
// babel.config.js
module.exports = {
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true,
      },
      'vant',
    ],
  ]
};

```
>TS
```typescript
const tsImportPluginFactory = require('ts-import-plugin');
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [
                  tsImportPluginFactory({
                    libraryName: 'vant',
                    libraryDirectory: 'es',
                    style: (name) => `${name}/style/less`,
                  }),
                ],
              }),
              compilerOptions: {
                module: 'es2015',
              },
            }
          },
        ],
        exclude: /node_modules/
      },
      // ...
    ],
  }
};

```
***
# Rem布局适配
***
## 1. 安装依赖
`cnpm install lib-flexible -S`
`cnpm install postcss-pxtorem -D`

## 2. 添加`.postcssrc.js`
```javascript
module.exports = {
    plugins:{
        // autoprefixer: {
        //     browsers: ['Android >= 4.0', 'iOS >= 8']
        // },
        'postcss-pxtorem': {
            // rootValue: 37.5, // Vant 官方根字体大小是 37.5
            rootValue({file}) {
                return file.indexOf('vant') !== -1 ? 37.5 : 75
            },
            propList: ['*'],
            selectorBlackList: ['.norem'] // 过滤掉.norem-开头的class，不进行rem转换
        }
    },
}

```
### 注意
browsers 选项需配置在 package.json，不然打包会有警告
```json
// package.json
{
  // ...
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead",
    "Android >= 4.0",
    "iOS >= 8"
  ]
}
```

## 3. 引入和使用
```javascript
// index.js
import { createApp } from 'vue';
+ import 'lib-flexible/flexible';
import App from './App.vue';
import router from './router.js';
import store from './store.js';

createApp(App).use(router).use(store).mount('#app')

// Home.vue
<template>
  <div>
    首页
    <v-button plain hairline type="primary">细边框按钮</v-button>
    <v-button plain hairline type="primary">细边框按钮</v-button>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { Button } from "vant";
export default defineComponent({
  name: "Home",
  components: {
    "v-button": Button
  }
});
</script>

```
***
# 优化
***
- 项目的重点部分
- 保证功能完整的情况下，打包体积大大缩小
常见优化手段：
## 1. 规划目录结构
`webpack5`将各个环境配置好后，规范一下项目的目录结构
`tree -I "node_modules"`

```shell
├─dist
│  ├─css
│  └─js
|  |-favicon.ico
|  |-index.html
├─node_modules
├─public
|  |-index.html
|  |-favicon.ico
└─src
|  ├─api
|  ├─components
|  ├─hooks
|  ├─router
|  ├─store
|  ├─utils
|  └─views
|  |-App.vue
|  |-main.ts
|-.gitigore
|-babel.config.js
|-package.json
|-shims-vue.d.ts
|-tsconfig.json
|-webpack.config.js
```
- 此目录类似`vue`脚手架生成的项目目录

### 注意
由于`typescript`只能理解`.ts`文件，无法理解`.vue`文件，需要在根目录创建一个后缀名为`.d.ts`文件
```javascript
// shims-vue.d.ts

declare module '*.vue' {
    import { ComponentOptions } from 'vue';
    const componentOptions: ComponentOptions;
    export default componentOptions;
}

```
## 2. 打包友好提示
### 1. 安装依赖
`cnpm install friendly-errors-webapck-plugin node-notifier -D`

### 2.修改`webpack`配置
```js
const path = require('path');
+ const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
+ const notifier = require('node-notifier');
+ const icon = path.join(__dirname, 'public/icon.jpg');
module.exports = {
  // ...
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      onErrors: (severity, errors) => {
        notifier.notify({
          title: 'webpack 编译失败了~',
          message: `${severity} ${errors[0].name}`,
          subtitle: errors[0].file || '',
          icon,
        });
      },
    }),
    // ...
  ],
};


```
## 3. 分析打包文件大小
### 1. 依赖
`cnpm install webpack-bundle-analyzer -D`
### 2. 修改`webpack`配置
```js
+ const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
module.exports = {
  // ...
  plugins: [
    new BundleAnalyzerPlugin(),
    // ...
  ],
};


```

### 3. 修改`package.json`
```json
{
    "scripts": {
     // ...
    "analyzer": "webpack --progress"
  },
}

```
#### 技巧
- 控制台执行`npm run analyzer`，系统自动启动打包报告的HTTP服务器
- 不想启动，可以生成`state.json`文件，后续查看
```javascript
+ const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
module.exports = {
  // ...
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true
    }),
    // ...
  ],
};

```
- `package.json`
```json
{
    "scripts": {
     // ...
+    "analyzers": "webpack-bundle-analyzer --port 3000 ./dist/stats.json"
  },
}

```
- 通过打包报告可以很直观的知道哪些依赖包大，则可以做做针对性的修改。

## 4. 打包速度
此插件可以直观显示每个依赖打包所花费的时间
### 1.安装依赖
`cnpm install speed-measure-webpack5-plugin -D`
#### 注意
- `webpack5`配置此包会报错
![11-speed][11]
### 2. 修改`webpack`配置
```js
const SpeedMeasureWebpack5Plugin = require('speed-measure-webpack5-plugin');
const smw = new SpeedMeasureWebpack5Plugin();

module.exports = smw({
	// options
})

```
## 5.缩小打包范围
- exclude：排除某些文件，类似黑名单
- include：包含文件，类似白名单
- 优先度：exclude >>> include
```js
const path = require('path');

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src')
      },
      // ...
    ],
  },
};

```
## 6. 缓存
- 默认`babel-loader`中可以配置缓存
- 其他`loader`如果要缓存，需要下载`cache-loader`
### 1. 安装依赖
`cnpm install cache-loader -D`
### 2. 修改`webpack`配置
```js
const path = require('path');

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
+            cacheDirectory: true
          },
        },
        // ...
      },
      {
        test: /\.css$/,
        use: ['cache-loader', 'style-loader', 'css-loader'],
      }
      // ...
    ],
  },
};

```
### 其他
- resolve
- external
- optimization
- 等等

***
# 统一代码规范
***
统一代码规范:
- 代码校验
- 代码格式化
- `git`提交前校验
- 编辑器配置
## Eslint
代码检查工具
1. 新增`.eslintrc.js`
```js
module.exports = {
  root: true, // 此项是用来告诉eslint找当前配置文件不能往父级查找
  env: {
    node: true, // 此项指定环境的全局变量，下面的配置指定为node环境
  },
  extends: ['plugin:vue/recommended', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-v-html': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
    parser: 'babel-eslint',
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      // 添加ES特性支持，使之能够识别ES6语法
      jsx: true,
    },
  },
  overrides: [],
};
```

2. 新增`.eslintignore`文件
```yaml
# .eslintignore 不需要检查的文件
  
src/assets
src/icons
public
dist
node_modules
```

## Perttier
代码格式化工具
1. 新增`prettier.config.js`文件
```js
module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'always',
  htmlWhitespaceSensitivity: 'ignore',
  vueIndentScriptAndStyle: true,
  endOfLine: 'lf',
}

```
## stylelint
规范化`css`的书写，风格统一，减少错误
1. 新增 `.stylelintrc.js` 文件
```js
module.exports = {
  extends: ['stylelint-config-recess-order', 'stylelint-config-prettier'],
}

```
## EditorConfig
1. 新增`.editorconfig`文件
```json
root = true
  
[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true
  
[*.md]
trim_trailing_whitespace = false

```

***
# 配置Git Message
***
## 1. 依赖
```shell
npm install -g commitizen cz-conventional-changelog
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```
- 安装结束后，可以直接使用`git cz`来取代`git commit`
`yarn add husky @commitlint/config-conventional @commitlint/cli -D`
- `commit`：负责对`commit message`进行格式检验
- `husky`：负责提供更易用的`git hook`

## 2. 创建`commit.config.js`
```shell
echo 'module.exports = {extends: ["@commitlint/config-conventional"]};' > ./commitlint.config.js
```
- `utf-8`格式，否则报错

## 3. `package.json`文件中引入`husky`
```json
"husky": {
    "hooks": {
      "commit-msg": "commitlint -e $GIT_PARAMS"
    }
}

```

## 4. 使用

- `git add .`
- `git cz` 选择并输入
- `git push -u origin branchname`

***
自动化发布
***
`CI/CD` 自动化测试发布
```js
let client = require('scp2');
const ora = require('ora');
const chalk = require('chalk');
const spinner = ora(chalk.green('正在发布到服务器...'))

spinner.start()
client.scp('./dist', { // 本地打包的路径
    'host': 'xxx.xxx.x.xxx', // 服务器的IP地址
    'post': '22', // 服务器的IP地址
    'username': 'xxxx', // 用户名
    'password': '*****', // 密码
    'path': '/opt/stu_app_website' // 项目需要部署到服务器的位置
}, err => {
    spinner.stop();
    if(!err) {
        console.log(chalk.green('项目发布完毕'))
    } else {
        console.log('err', err)
    }
})

```

***
总结
***
- 熟悉整体流程
- 自我提升


[01]: ./img/1.init.png "1.init"
[02]: ./img/2-webpack.png "2-webpack"
[03]: ./img/3-npmrunbuild.png "3-npmrunbuild"
[04]: ./img/4-webpackbundle.png "4-webpackbundle"
[05]: ./img/5-plugin.png "5-plugin"
[06]: ./img/6-webpackplugin.png "6-webpackplugin"
[07]: ./img/7-buildwebpack.png "7-buildwebpack"
[08]: ./img/8-buildrun.png "8-buildrun"
[09]: ./img/9-clean.png "9-clean"
[10]: ./img/10-tscinit.png "10-tscinit"
[11]:./img/11-speed.png "11-speed"