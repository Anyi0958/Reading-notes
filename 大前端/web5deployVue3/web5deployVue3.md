web5deployVue3 Ŀ¼
[TOC]
***
# �Ƽ��Ķ�
- [txm-ԭ��](https://juejin.cn/post/6924180659829211143 "���")

# ǰ��

- ���������ԭ��
- ���ԭ��󣬽��ּ����Ч��
- ����`webpack5`�һ��������`vue3`�Ŀ�������

# ��ʼ��Ŀ¼
***
## 1. ��ʼ��`webpack.config.js`
`npm init -y`
Ч����
![1.init][01]

## 2. ��װ`webpack`
`npm install webpack webpack-cli -D`
### ע��

1. `-D`�ȼ���`--save-dev`����������ʱ��������
2. `-S`�ȼ���`--save`����������ʱ��������
![2-webpack][02]

- ע�����Դ

## 3. ��ʼ��Ŀ¼���ļ�
- ����`webpack.config.js`�ļ����ڱ�д`webpack`
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
- ����`src`Ŀ¼���Դ����
```javascript
// src/index.js
console.log('test webpack');
```
- �޸�`package.json`�е�`scripts`�ֶ�
```json
  "scripts": {
    "build": "webpack"
  },
```
- ���`js`
	1. ��Ŀ��Ŀ¼����`npm run build`����ֻ����`webpack`
	2. ����ɹ��󣬻�����Ŀ�ĸ�Ŀ¼����һ��`dist`�ļ��У��������ļ�����`main.js`

<span style="color:red;">Ч��</span>
![3-npmrunbuild][03]

![4-webpackbundle][04]

## �ܽ�
1. npm��ʼ��
2. webpack
3. �޸�`package.json`��`webpack.config.js`
4. `npm run build` or `webpack`

***

# ���ú��Ĺ���

***
## ����
���ڴ���һЩ������޷�ʹ��`ES6+`�ĸ߼��﷨�������Ҫת��Ϊ`ES5`
## 1. ��װ����
`cnpm install @babel/core babel-loader @babel/preset-env -D`

## 2. �޸�`webpack.config.js`����
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
## ע��
������뽫����д�������ļ��У������ڸ�Ŀ¼����`babel.config.js`����`babelrc.js`
***
## ������ʽ
- `webpack`Ĭ��ֻ�ܴ��`commonJS`�淶��`js`�ļ�
- ���������ļ�����Ҫ���Ӧ�Ĵ��������д���

### 1. ��װ����
`cnpm install style-loader css-loader less less-loader -D`

### 2. �޸�`webpack.config.js`����
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
### ע��
`loader`�������кܶ����Ż��ĵط�

***
## ����ͼƬ�Ⱦ�̬��Դ
��`js`�ļ��������ļ������`webpack`����Ҫ�ض��Ĵ��������д���

### 1. ��װ����
`npm install url-loader file-loader -D`

### 2. �޸�`webapck.config.js`����
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
## ����html�ļ�
������`js`�ļ��Զ����뵽`html`ģ����

### 1. ��װ����
`cnpm install html-webpack-plugin -D`
### 2.�޸�`webpack`����
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
### ע��
���ö�̬��ҳ����ʱ����Ҫ��ģ���е�`<title>`��ǩ������ݻ���`<%= htmlWebpackPlugin.options.title %>`
- �˴�ʹ��`webpack`�ᱨ��
![5-plugin][05]
���
![6-webpackplugin][06]
- ʹ��`npm run build`��᲻ͬ������title����ı�
![7-buildwebpack][07]
���:û�б��title
![8-buildrun][08]

***
## ����������
ÿ�δ���󣬶���Ҫ�ֶ����`dist`Ŀ¼�µ�`index.html`��Ч������ˣ���������`webpack`���������ļ��Զ����������

### 1. ��װ����
`cnpm install webpack-dev-server -D`

### 2.�޸�`webpack`����
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
## �������ļ�
- ���������ļ�����`hash`����ÿ�δ�����ɵ��ļ�������`dist`Ŀ¼����
- ���ǿ���ʹ�ô��������ڴ��ǰ��������ǰ�Ĵ���ļ�

### 1. ��װ����
`cnpm install clean-webpack-plugin -D`

### 2.�޸�`webpack`����
```javascript
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

plugins: [
	new CleanWebPackPlugin()
]
```
### ע��
- �˴�ֱ��`build`�ᱨ��
![9-clean][09]

***
## ���û�������
### ���û�������������ʽ
1. ����ʽ
2. ����ʽ
3. ����`.env`�ļ�
4. `cross-env`

### ����
��`cross-env`�ķ�ʽ�����û������������Կ��ն˽�������
1. ��װ����
`cnpm install cross-env -D`
2. �޸�`package.json`����
```javascript
  "scripts": {
    "build": "webpack",
	"webpack": "cross-env NODE_ENV=development webpack"
  },
```
***
## �ֻ������
- ��ƽʱ��Ŀ�����У����Ϊ���ֻ�����
	1. ��������
	2. ���Ի���
	3. ��������
- �������һ���໷�������

### ���ѹ��
����һ����Ŀ������Ҫ�����Ҫ�ﵽ�����걸������£���������С����֤�û�����
#### 1. ѹ��`html`�ļ�
	- �޸�`webpack`����
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    // ...
    plugins: [
        new HtmlWebpackPlugin({
            // ...
+            minify: {
+                collapseWhitespace: true, // ȥ���ո�
+                removeComments: true // ȥ��ע��
+            }
        }),
        // ...
    ]
}

```
#### 2. ѹ��`css`�ļ�
	1. ��װ����
`cnpm install mini-css-extract-plugin optimize-css-assets-webpack-plugin -D`
	2. �޸�`webpack`�����ļ�
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
##### ע��
`purgecss-webpack-plugin`����������õ�`css`

#### 3. ѹ��`js`�ļ�
	1. ��װ����
`cnpm install terser-webpack-plugin -D`
	2. �޸�`webpack`����
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
##### ע��
`uglifyjs-webpack-plugin`��֧��ѹ��`ES6`�﷨�Ĵ���

#### 4. ѹ��ͼƬ
1. ��װ����
`cnpm install image-webpack-loader -D`
2. �޸�`webpack`�ļ�
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
##### ע��
�ڰ�װ`image-webpack-loader`����ʱ������`cnpm`��װ��`npm`�ᱨ��
***
# ����TypeScript

***
- ǰ�˹���ʦ�ر����ܣ�`TypeScript`
- `Vue3`Դ��ȫ������`TS`��д
- ��Ҫ���յĺ��ĸ�����͡�ö�١��ӿڡ��ࡢ�����ȵ�

## ���û���
### 1. ��װ����
`cnpm install typescript ts-loader -D`
### 2. �޸�`webpack`����
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
### 3. ��ʼ��`tsconfig.json`�ļ�
`tsc --init`


### ע��
`tsc --init`����û�д�����ʱ����Ҫ����ȫ�ְ�װ`npm install -g typescript`
��װ�ɹ���
![10-tscinit][10]

## �ص�����
- ����
- �ӿ�
- ����
- ����

***
# ʶ��`.Vue`�ļ�
***
## 1. ��װ����
`cnpm install vue@next -S`
`cnpm install vue-loader@next @vue/compiler-sfc`

### ע��
���ʹ�õ���`Vue2.x`����Ҫ��װ����`vue-template-complier`

## 2. �޸�`webpack`�ļ�
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
## 3. `index.js`�ļ�������`vue`
```javscript
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app')
```
����`App.vue`�ļ�
```vue
//App.vue
<template>
    <div>
        <div>����vue�ļ�</div>
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
### ע��
`defineComponent`ֻ��Ϊ����ʹ��`vue3`ʱ�л�ܺõ��﷨��ʾ

## Composition API
- `vue3`�ܵ�`React Hooks`������������ǰ��`options API`��д��`����ʽAPI`
- �ŵ��ǽ�������н������`tree-shaking`����ߴ���ĸ�����
### vue2ȱʧ
- `Minxin`������ɹ����߼�����ĳ��룬����`Mixin`�������ȱ��
- ������ͻ��ͬ���ķ����ͼ������Իᱻ���ǡ�ͬ�����������ڶ���ִ����`minxin`�����ִ�еȵ�

### ���õ�`Composition API`
- reactive
- ref
- effect
- watch
- compited
- ��������
- h����
- toRefs
- ����
### �����Ƽ��Ķ�
- [Vue ���ʽAPI](https://vue3js.cn/vue-composition-api/ "Vue ���ʽAPI")

### ��Ӧʽϵͳ
- `vue2.x`����Ӧʽ�ײ�����ǲ���`Object.defineProperty`���ٳֶ����ÿ�����Ե�`getter`��`setter`��������`defineReactive`
- �ڻ�ȡ����ʱ�������ռ�
- �ڸ�������ʱ��������

#### `vue2.x`����ԭ��
```javascript
// src\core\observer\index.js

if (Array.isArray(value)) {
   this.observeArray(value)
} else {
   this.walk(value)
}
// �������
walk (obj: Object) {
   const keys = Object.keys(obj)
   for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
   }
}
// ��������
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
        dep.depend() // �ռ�����
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
      dep.notify() // ֪ͨ����
    }
  })
}

```
- ����`array`��`Object`ʱ�������жϣ�Ȼ��ֱ���
- ������ṹֱ�ӽ���`�ݹ�`�������Ҷ���ÿ�����Զ��ٳ֣����ܻ���

#### `vue2.x`�ܽ�
ȱ�㣺
- �������Ե�������ɾ���޷���⡣	����취��`Vue.$set`��`Vue.delete()`
- �޸������������`length`�����޷����	����취��`splice`

#### `Vue3`����ԭ��
������`proxy`��Ϊ�ײ���Ӧʽ�ĺ���`API`
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
### `vue3`�ܽ�
- `createReactiveObject`�����Ǵ�����Ӧʽ�ĺ��ķ���
- `proxy`ֱ�Ӽ�����������û�ж�����Ͷ�����зֿ�����
ע�⣺
- ѧϰԴ��ʱ����Ҫ���պ�`set`, `weakset`, `map`, `weakmap`, `reflect`��`ES6`��������
***
# ���� `Vue-Router`
***
## ����ʹ��
### 1. ��װ����
`npm install vue-router@4 -S`

### 2. ����`Home.vue`��`Me.vue`
```vue
// Home.vue
// Home.vue
<template>
    <div>
        ��ҳ
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
      �ҵ�ҳ��
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default {
    name: 'Me'
}
</script>
```
### 3. ����`router.js`�ļ�
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

### 4. �޸�`index.js`�ļ�
```javascript
console.log('test webpack');
import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';

createApp(App).use(router).mount('#app')
```
***
# ����Vuex
***
## ����ʹ��
### 1. ��װ����
`cnpm install vuex@next -S`
### 2. ����`store.js`�ļ�
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
### 3. �޸�`index.js`�ļ�
```javascript
console.log('test webpack');
import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';
import store from "./store.js";

createApp(App).use(router).use(store).mount('#app')
```
### 4. ��`App.vue`�л�ȡ`vuex`�е�����
```javascript
<template>
    <div>
        <!-- ... -->
        <p>��ȡvuex���������{{count}}</p>
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
#### ע��
1. ��`computed`��`store`�л�ȡ���ݣ���֤���ݵ���Ӧʽ
2. ����Ϥ���Ƽ��Ķ���[Vue3��������](https://juejin.cn/post/6919010318561116167 "Vue3��������")
***
# ����Vant
***
## 1.��װ����
`cnpm install vant@next -S`

## 2.��������
### 1. ����
`cnpm i babel-plugin-import ts-import-plugin -D`
### 2.�޸�����
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
# Rem��������
***
## 1. ��װ����
`cnpm install lib-flexible -S`
`cnpm install postcss-pxtorem -D`

## 2. ���`.postcssrc.js`
```javascript
module.exports = {
    plugins:{
        // autoprefixer: {
        //     browsers: ['Android >= 4.0', 'iOS >= 8']
        // },
        'postcss-pxtorem': {
            // rootValue: 37.5, // Vant �ٷ��������С�� 37.5
            rootValue({file}) {
                return file.indexOf('vant') !== -1 ? 37.5 : 75
            },
            propList: ['*'],
            selectorBlackList: ['.norem'] // ���˵�.norem-��ͷ��class��������remת��
        }
    },
}

```
### ע��
browsers ѡ���������� package.json����Ȼ������о���
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

## 3. �����ʹ��
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
    ��ҳ
    <v-button plain hairline type="primary">ϸ�߿�ť</v-button>
    <v-button plain hairline type="primary">ϸ�߿�ť</v-button>
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
# �Ż�
***
- ��Ŀ���ص㲿��
- ��֤��������������£������������С
�����Ż��ֶΣ�
## 1. �滮Ŀ¼�ṹ
`webpack5`�������������úú󣬹淶һ����Ŀ��Ŀ¼�ṹ
`tree -I "node_modules"`

```shell
����dist
��  ����css
��  ����js
|  |-favicon.ico
|  |-index.html
����node_modules
����public
|  |-index.html
|  |-favicon.ico
����src
|  ����api
|  ����components
|  ����hooks
|  ����router
|  ����store
|  ����utils
|  ����views
|  |-App.vue
|  |-main.ts
|-.gitigore
|-babel.config.js
|-package.json
|-shims-vue.d.ts
|-tsconfig.json
|-webpack.config.js
```
- ��Ŀ¼����`vue`���ּ����ɵ���ĿĿ¼

### ע��
����`typescript`ֻ�����`.ts`�ļ����޷����`.vue`�ļ�����Ҫ�ڸ�Ŀ¼����һ����׺��Ϊ`.d.ts`�ļ�
```javascript
// shims-vue.d.ts

declare module '*.vue' {
    import { ComponentOptions } from 'vue';
    const componentOptions: ComponentOptions;
    export default componentOptions;
}

```
## 2. ����Ѻ���ʾ
### 1. ��װ����
`cnpm install friendly-errors-webapck-plugin node-notifier -D`

### 2.�޸�`webpack`����
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
          title: 'webpack ����ʧ����~',
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
## 3. ��������ļ���С
### 1. ����
`cnpm install webpack-bundle-analyzer -D`
### 2. �޸�`webpack`����
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

### 3. �޸�`package.json`
```json
{
    "scripts": {
     // ...
    "analyzer": "webpack --progress"
  },
}

```
#### ����
- ����ִ̨��`npm run analyzer`��ϵͳ�Զ�������������HTTP������
- ������������������`state.json`�ļ��������鿴
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
- ͨ�����������Ժ�ֱ�۵�֪����Щ���������������������Ե��޸ġ�

## 4. ����ٶ�
�˲������ֱ����ʾÿ��������������ѵ�ʱ��
### 1.��װ����
`cnpm install speed-measure-webpack5-plugin -D`
#### ע��
- `webpack5`���ô˰��ᱨ��
![11-speed][11]
### 2. �޸�`webpack`����
```js
const SpeedMeasureWebpack5Plugin = require('speed-measure-webpack5-plugin');
const smw = new SpeedMeasureWebpack5Plugin();

module.exports = smw({
	// options
})

```
## 5.��С�����Χ
- exclude���ų�ĳЩ�ļ������ƺ�����
- include�������ļ������ư�����
- ���ȶȣ�exclude >>> include
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
## 6. ����
- Ĭ��`babel-loader`�п������û���
- ����`loader`���Ҫ���棬��Ҫ����`cache-loader`
### 1. ��װ����
`cnpm install cache-loader -D`
### 2. �޸�`webpack`����
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
### ����
- resolve
- external
- optimization
- �ȵ�

***
# ͳһ����淶
***
ͳһ����淶:
- ����У��
- �����ʽ��
- `git`�ύǰУ��
- �༭������
## Eslint
�����鹤��
1. ����`.eslintrc.js`
```js
module.exports = {
  root: true, // ��������������eslint�ҵ�ǰ�����ļ���������������
  env: {
    node: true, // ����ָ��������ȫ�ֱ��������������ָ��Ϊnode����
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
      // ���ES����֧�֣�ʹ֮�ܹ�ʶ��ES6�﷨
      jsx: true,
    },
  },
  overrides: [],
};
```

2. ����`.eslintignore`�ļ�
```yaml
# .eslintignore ����Ҫ�����ļ�
  
src/assets
src/icons
public
dist
node_modules
```

## Perttier
�����ʽ������
1. ����`prettier.config.js`�ļ�
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
�淶��`css`����д�����ͳһ�����ٴ���
1. ���� `.stylelintrc.js` �ļ�
```js
module.exports = {
  extends: ['stylelint-config-recess-order', 'stylelint-config-prettier'],
}

```
## EditorConfig
1. ����`.editorconfig`�ļ�
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
# ����Git Message
***
## 1. ����
```shell
npm install -g commitizen cz-conventional-changelog
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```
- ��װ�����󣬿���ֱ��ʹ��`git cz`��ȡ��`git commit`
`yarn add husky @commitlint/config-conventional @commitlint/cli -D`
- `commit`�������`commit message`���и�ʽ����
- `husky`�������ṩ�����õ�`git hook`

## 2. ����`commit.config.js`
```shell
echo 'module.exports = {extends: ["@commitlint/config-conventional"]};' > ./commitlint.config.js
```
- `utf-8`��ʽ�����򱨴�

## 3. `package.json`�ļ�������`husky`
```json
"husky": {
    "hooks": {
      "commit-msg": "commitlint -e $GIT_PARAMS"
    }
}

```

## 4. ʹ��

- `git add .`
- `git cz` ѡ������
- `git push -u origin branchname`

***
�Զ�������
***
`CI/CD` �Զ������Է���
```js
let client = require('scp2');
const ora = require('ora');
const chalk = require('chalk');
const spinner = ora(chalk.green('���ڷ�����������...'))

spinner.start()
client.scp('./dist', { // ���ش����·��
    'host': 'xxx.xxx.x.xxx', // ��������IP��ַ
    'post': '22', // ��������IP��ַ
    'username': 'xxxx', // �û���
    'password': '*****', // ����
    'path': '/opt/stu_app_website' // ��Ŀ��Ҫ���𵽷�������λ��
}, err => {
    spinner.stop();
    if(!err) {
        console.log(chalk.green('��Ŀ�������'))
    } else {
        console.log('err', err)
    }
})

```

***
�ܽ�
***
- ��Ϥ��������
- ��������


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