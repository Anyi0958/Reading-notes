[TOC]

---

# 整体内容

## 讲解方向
分为以下5类：

- 页面优化
- 介绍大前端和后端
- 设计模式
- 工作思考
- 推书

## 产品研发流水线
交互设计 =>	视觉设计	=>	前端开发/后台开发	=>	测试	=>	发布

## 项目管理
- 项目管理使用甘特图。
优点：
- 管理时间。
- 管理进度。
- 跨部门协作。

## 项目框架
-目前全栈框架：MEAN
	- MongoDB - Express - Angular - Node.js
- Paas原则
	- platform as a Service
- 全栈工程师接单主流
	- WordPress主题设计、App开发、网站开发。
## 前端学习建议
- 学习内容：先精后广
### 浅入深
- 入手：HTML,CSS,JavaScript
- 深入：性能优化，SEO，多种框架，响应式页面等前端细节。
<span style="color: red;">***仅仅做不够，还要了解背后的原因。***</span>

### 商业目标

- 客户体验。

#### 做事的准则

- 为了解决问题而使用不同的锤子，而不能仅仅是为了锤子而锤子。
- 汇报问题原则
	- 不能以“我做了个工具”，而应该是“我发现了一个问题”。

### 自我提升

- 制作作品集，但不要使用模板。
- 设计四大原则：对齐、对比、距离和重复。
- 每周写总结。
- 时间管理四象限
- 番茄工作法
- 跨界思考
- 预先伪代码
### 常见问题与优化
#### 野生程序员的问题：
<span style="color:red;">对问题不够深入</span>

#### web性能优化问题
	- 压缩CSS和JS。
	- 压缩源码和图片---去掉PNG格式信息
	- 选择合适的图片格式
	- 合并静态资源
	- 开启服务器端的Gzip压缩
	- 使用CDN
	- 延长静态资源缓存时间
	- 把CSS放在页面头部，把JS放在页面底部
	- 高性能网站的关键：缓存
	- 数据库查询缓存
		- query_cache_size = size
		- memcached
	- 文件缓存
	- 浏览器缓存
	- Https头：
		- Cache-Control: no-cache
		- Last-Modified
		- Expires
#### HTTP优化原则：
    - 减少http连接次数
    - 减少体积
    - 提高服务器处理请求能力
    - BigPipe

#### 关系数据库设计问题

### 就职大小公司方向对比
#### 大公司的好处
- 较小的风险
- 技术最佳实践
- 垂直专精的技能
- 服务海量用户的经验
- 软技能
- 人脉
- 心态
#### 小公司
- 接触面广
- 不稳定

### 职业中的规划
- 工作中正确的方法
<span style="color:red;">讲出事实</span>
- 积累作品集

#### 针对推荐
- 设计+编程：Dribbble
- 静态页面：Jekyll -- Hexo
```shell
gem install jekyll
jekyll new my-awesome-site
cd my...
jekyll serve
```

### 未来趋势
#### 大前端：
- 浏览器兼容性
- H/C/J语法和原理
- 编辑器和插件
- 调试工具
- 版本管理软件的熟悉和应用
- 前端库/框架
- 标准/规范
- 代码质量、代码规范
- JS单元测试
- 性能优化的应用
- SEO应用
- 代码部署
- 移动Web
- 代码架构
- 安全
- 自动化测试
- zen-coding/emmet插件--提升效率
#### 前端方法论
- 在使用框架时，应该了解“框架为了解决什么问题”。
- 重构代码时，需要明白与未修改前的优势和更改。
- 行动重于计划
- 自己是自己产品的用户
#### 工具
包管理：
- npm
	- npm install
	- package.json: dependencies
- Bower
- Yeoman: Yo,Grunt,Bower
	- Bowerfile.js
	- Bower.json
- Gulp, Grunt
#### 良好架构的特点
- 有合适的分离粒度
- 最小知识原则
- DRY, Don't Repeat yourself,不要重复自己
- 最小化预先设计，只设计必需的内容
- 通过良好的层级，让文件易于找到
- 在代码层面，有一致且可执行的命名规则

### 设计模式
23种设计模式可以分为：
#### 创建型模式
<span style="color:red;">**创建对象的模式，实例化的过程进行抽象。**</span>
- 单例模式
- 工厂方法、抽象工厂、建造模型、原型模式、对象池模式和多例模式。
#### 结构型模式
<span style="color:red;">**解决类、对象、模块之间的耦合关系**</span>
- 适配器
- 桥接模式、组合模式、装饰模式、外观模式、享元模式和代理模式。
#### 行为模式
<span style="color:red;">**识别对象之间的常用交流模式，并加以实现。**</span>
- 观察者模式。
- 黑板、责任链、命令、解释器、迭代器、中介者、备忘录、空对象、模板方法和访问者。

#### MVC模式
架构模式之王。

### 开发框架推荐
- js: angularJS, backbone.js
- php:cakephp, yii, codeigniter
- objective-c: cocoa
- ruby: ror
- nodejs: sail, total, express

## 推荐阅读
### 网站

[Smashing Magazine](www.smashingmagazine.com "Smashing Magazine")
[tutsplus](tutsplus.com "tutsplus")

### 书籍
- 黑客与画家
- 专业主义
- 重来：更为简单有效的商业思维
- 精益创业
- 禅意花园
- 网页重构
- 超越CSS
- CSS Mastery
- 写给大家看的设计书
- 编程之美：微软技术面试心得
- 打造Facebook
- 你就是极客
- 代码整洁之道
- 你就是极客：软件开发人员生存指南
- 图解Http
- 高性能网站建设进阶指南
- 网站性能检测与优化
- 网站重构（Designing with Web Standards）
- 精通CSS:高级web标准解决方案（第2版）
- 单页web应用：Javascript从前端到后端
- Getting Real
- 从0到1：开启商业与未来的秘密
- Building iphone Apps with HTML, CSS and Javascript
- Pro Git
- Git版本控制管理
- 代码大全
- 代码的未来
- 禅与摩托车维修技术
- 鸟哥的Linux私房菜:基础学习篇
- 只是为了好玩：Linux之父Linus自传
- 设计模式：可复用面向对象软件的基础
- JavaScript设计模式
- 响应式web设计全流程解析
- 写给大家看的设计书



