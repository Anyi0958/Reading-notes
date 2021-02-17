Golang目录：
[TOC]
***
# 初阶
## Go开发环境
安装GO
从Linux上安装GO
在Windows上安装GO
在MacOS上安装Go
基于源码编译和安装Go
Go安装目录的结构
Go环境变量配置
GOROOT
GOPATH
GOPROXY
GO111MODULE
查看GO环境变量
安装gccgo
基于IDE的GO开发环境
GoLand
基于文本编辑器的GO开发环境
VS Code
vscode-go
Vim
Vim-go
Emacs
常用命令
go version
go help
go get
go build
go run
## Go语言基础
程序结构
标识符
命名
导出/非导出
包
包导入
注释
声明
变量声明
常规声明
短声明
类型声明
变量
var
常量
const
iota
类型
init函数
赋值
作用域
简单输出
print
println
基本类型
布尔类型bool
true
false
数值类型
整型
int
uint
int8
uint8
int16
uint16
int32
uint32
int64
浮点型
float32
float64
复数类型
complex64
complex128
字节类型byte
字符类型rune
指针值类型uintptr
字符串类型string
不可变性
字典序比较（<和>)
字符串连接（+）
复合类型
数组类型
切片类型
结构体类型
Map类型
Channel类型
指针类型
类型声明
类型定义
类型别名（type alias)
操作符
优先级
算数操作符
```js
+、+=
-、-=
*、*=
/、/=
++
--
```
逻辑操作符
```js
==
!=
<
<=
>
>=
位操作符
一元位操作符
^
<<
>>
二元位操作符
&
|
^
&^
```
赋值操作符
控制结构
条件语句
if语句
switch语句
fallthrough
break
type switch
select语句
break
循环语句
for语句
for…range
break
continue
跳转语句
goto语句
数组和切片
数组
数组声明
元素类型
数组长度
数组元素访问
多维数组
数组类型
数组初始化
复合字面量赋值
切片
make创建
nil切片与空切片
切片元素访问
append与copy
切片长度len
切片容量cap
重制切片reslicing
多维切片
切片元素迭代
字节切片与字符串的相互转换
map
make创建
当前元素数量（len)
map元素迭代
随机无序
map操作
插入数据
删除数据
更新数据
查询数据
“comma ok”模式
函数
函数类型
一等公民（first-class citizen）
函数原型
参数列表
具名参数
变长参数列表
传值vs传引用
返回值
具名返回值
多返回值列表
内置函数
new
make
append
copy
len
cap
delete
print/println
recover
panic
匿名函数
闭包
递归
defer
defer语句的求值
defer函数的调用
panic与recover
结构体与方法
结构体
结构体定义
访问结构体成员
结构体初始化
new
复合字面量赋值
结构体嵌入
嵌入结构体类型
方法的定义
嵌入接口类型
方法receiver类型的选择
方法的”继承”
方法的重写
method expression
method value
结构体类型的方法集合（method set）
结构体类型实现接口
接口
接口类型
接口值
接口的方法集合
接口嵌入
空接口（interface{}）
类型断言（type assertion）
包与module
包的概念
定义包
包名
包的导入路径
包的初始化顺序
main包
init函数
module的概念
go.mod
module root
main module
goroutine与channel
goroutine
启动goroutine
goroutine的终止
goroutine间的通信机制
GOMAXPROCS
channel
声明channel
make
带缓冲channel
无缓冲channel
nil channel
closed channel
只写channel
只读channel
channel多路复用（select）
## Go标准库
fmt
输出系列
FprintXXX
PrintXXX
输入系列
FsacnXXX
ScanXXX
Errorf
strings
查找
替换
比较
拆分
拼接
修建
变换
快速创建实现io.Reader接口的实例
bytes
查找
替换
比较
拆分
拼接
修剪
变换
快速创建实现io.Reader接口的实例
io
Reader系列接口
Writer系列接口
os
errors
New
As
Is
Unwrap
log
flag
testing
单元测试
性能基准测试
样例测试
net
tcp
udp
net/http
bufio
带缓冲的Read
带缓冲的Write
带缓冲的Scan
container
heap
list
ring
encoding
json
xml
hex
binary
bese64
sort
常见基本类型的切片排序
自定义类型的切片排序
strconv
time
Time
Ticker
Timer
text/template
regexp
## Go初级工程实践
格式化代码
goimports
gofmt
构建管理
gomodule
vendor
单元测试
## Go工具链
gofmt
go test
go doc
godoc

## 相关学习资源
Go 开发环境
安装GO
https://tip.golang.org/doc/install
https://tip.golang.org/doc/tutorial/getting-started
基于IDE的GO开发环境
https://www.jetbrains.com/help/go/quick-start-guide-goland.html
基于文本编辑器的GO开发环境
VS Code vscode-go
Vim Vim-go
Emacs
常用命令
https://tip.golang.org/cmd/go/
Go 语言基础
程序结构
《Go程序设计语言》第二章
https://tip.golang.org/ref/spec
基本类型
《Go程序设计语言》第三章
复合类型
《Go程序设计语言》第四章

https://tip.golang.org/ref/spec#Array_types
https://tip.golang.org/ref/spec#Slice_types
https://tip.golang.org/ref/spec#Struct_types
https://tip.golang.org/ref/spec#Map_types
https://tip.golang.org/ref/spec#Channel_types
指针类型
https://tip.golang.org/ref/spec#Pointer_types
类型声明
https://tip.golang.org/ref/spec#Type_declarations
操作符
https://tip.golang.org/ref/spec#Operators
控制结构
https://tip.golang.org/doc/effective_go.html#control-structures
条件语句
https://tip.golang.org/ref/spec#If_statements
https://tip.golang.org/ref/spec#Switch_statements
https://tip.golang.org/ref/spec#Select_statements
循环语句
https://tip.golang.org/ref/spec#For_statements
跳转语句
https://tip.golang.org/ref/spec#Goto_statements
数组和切片
《Go程序设计语言》4.1和4.2

https://tip.golang.org/doc/effective_go.html#slices
https://tip.golang.org/doc/effective_go.html#arrays
map
《Go程序设计语言》4.3
函数
《Go程序设计语言》第5章
函数类型
内置函数
https://tip.golang.org/ref/spec#Built-in_functions
defer
《Go程序语言设计》5.8
结构体与方法
《Go程序设计语言》4.4和第六章

https://tip.golang.org/ref/spec#Struct_types
https://tip.golang.org/ref/spec#Method_sets
https://tip.golang.org/ref/spec#Method_expressions
https://tip.golang.org/ref/spec#Method_values
接口
《Go程序设计语言》第7章

https://tip.golang.org/ref/spec#Interface_types
https://tip.golang.org/doc/effective_go.html#interfaces
包与module
定义包
《Go程序设计语言》第10章
module的概念
https://tip.golang.org/cmd/go/#hdr-Module_maintenance
goroutine与channel
goroutine
https://tip.golang.org/ref/spec#Go_statements
channel
《Go程序设计语言》8.4.2
Go标准库
fmt
https://tip.golang.org/pkg/fmt/
strings
https://tip.golang.org/pkg/strings/
bytes
https://tip.golang.org/pkg/bytes
io
https://tip.golang.org/pkg/io
os
https://tip.golang.org/pkg/os
errors
https://tip.golang.org/pkg/errors
log
https://tip.golang.org/pkg/log
flag
https://tip.golang.org/pkg/flag
testing
https://tip.golang.org/pkg/testing
net
https://tip.golang.org/pkg/net
net/http
https://tip.golang.org/pkg/net/http

bufio
https://tip.golang.org/pkg/bufio

container
https://tip.golang.org/pkg/container

encoding
https://tip.golang.org/pkg/encoding

sort
https://tip.golang.org/pkg/sort

strconv
https://tip.golang.org/pkg/strconv

time
https://tip.golang.org/pkg/time
https://tonybai.com/2016/12/21/how-to-use-timer-reset-in-golang-correctly
text/template
https://tip.golang.org/pkg/text/template

regexp
https://tip.golang.org/pkg/regexp

Go 初级工程实践
格式化代码
https://tip.golang.org/doc/effective_go.html#formatting

构建管理
https://tip.golang.org/cmd/go/#hdr-Compile_and_run_Go_program

gomodule
https://tonybai.com/2018/07/15/hello-go-module/

vendor
https://tonybai.com/2015/07/31/understand-go15-vendor/

单元测试
https://tip.golang.org/cmd/go/#hdr-Test_packages

Go 工具链
go test
https://tip.golang.org/cmd/go/#hdr-Test_packages

# 中阶
Go进阶
代码风格
Go项目结构设计
统一Go代码风格
标识符命名规范
一致的Go变量声明形式
基础语法
使用无类型常量简化代码
如何定义”枚举常量“
定义”零值可用“的类型
高效运用切片
函数和方法
init函数用途
巧用作为”一等公民“的函数
用defer简化代码逻辑
Go方法的本质
方法集合与接口实现
变长参数的妙用
接口高级用法
Go接口定义的惯例
空接口的”禁忌“
利用接口提升代码”可测性“
并发设计
Go并发模型与常见并发模式
channel的常见使用模式
正确使用sync包
恰当使用atomic包
错误处理
Go的错误处理模式
消除过多的“if err != nil"
panic不是错误（panic is not an error）
测试与调试
单元测试源码包名的选择
测试代码组织设计
采用“表驱动”的测试用例组织方法
管理测试依赖的外部数据文件的惯例
Fake、Stub、Mock测试
建立性能测试基准
性能剖析利器pprof
Go调试利器delve
与C的互操作
cgo的原理与使用
c中调用go代码
go中调用c代码
了解使用cgo的成本
跨平台静态编译
反射与unsafe
反射
ValueOf
TypeOf
Elem
Interface
unsafe
unsafe包使用的六个原则
标准库
实现https通信
tls
x509
Socket网络编程模型
net
字符集编码转换
unicode/utf8
crypto下的密码学包
cipher
aes
sha256
hamac
ecdsa
标准库读写模型
io
工具链与工程实践
go module进阶
最小版本选择（MVS）
go module与vendor
go mod vendor
go build-mod=vendor
go.sum
go.mod
replace
exclude
go mod tidy
go module相关环境变量
GOPROXY
GOSUMDB
GONOPROXY
GOPRIVATE
GONOSUMB
go module升级major版本号
定制个性化包导入路径
Go工具链高级应用
获取与安装
go get
go install
检视module/包
go list
构建
go build
gcflags
ldflags
tag
race
跨平台交叉编译
静态代码检查
go vet
golangci-lint
运行与诊断
GOGC
GODEBUG
重构
gofmt
gorename
gomvpkg
代码导航与洞察
gopls
代码生成
go generate
Go设计哲学
Go的起源与演化
Go各个发布版本的特性
Go设计哲学
简单
组合
并发
面向工程，自带“电池”
Go原理
Goroutine调度原理
GPM模型
抢占式调度
Channel调度原理
Go内存管理
Go内存模型
垃圾回收机制
连续栈原理
编译器优化
逃逸分析
内联优化
Go各种原生类型在运行时的表示
数组
切片
字符串
map
channel
接口
空接口
非空接口
cgo原理
反射原理
## 相关学习资源
Go 进阶
代码风格
Go项目结构设计
付费：《参考Go项目布局设计你的项目结构》
统一Go代码风格
Gofmt’s style is no one’s favorite, yet gofmt is everyone’s favorite
付费：gofmt：Go代码风格的唯一标准
标识符命名规范
https://talks.golang.org/2014/names.slide
付费：Go标识符的命名惯例
一致的Go变量声明形式
https://talks.golang.org/2014/names.slide
付费：变量声明形式尽量保持一致
基础语法
使用无类型常量简化代码
https://www.callicoder.com/golang-typed-untyped-constants/
付费：无类型常量让代码更简化
如何定义”枚举常量“
https://splice.com/blog/iota-elegant-constants-golang/
https://tip.golang.org/ref/spec#Constants
定义”零值可用“的类型
make the zero value useful
https://dave.cheney.net/2013/01/19/what-is-the-zero-value-and-why-is-it-useful
高效运用切片
https://tip.golang.org/ref/spec#Slice_types
付费：深入理解和高效运用切片(slice)
函数和方法
init函数用途
https://tip.golang.org/doc/effective_go.html#init
付费：init函数的妙用
巧用作为”一等公民“的函数
https://tip.golang.org/doc/codewalk/functions/
付费：Go函数是“一等公民”
用defer简化代码逻辑
https://tip.golang.org/doc/effective_go.html#defer
付费：defer让你的代码更清晰
Go方法的本质
https://tonybai.com/2018/03/20/the-analysis-of-output-results-of-a-go-code-snippet/
方法集合与接口实现
https://tonybai.com/2015/09/17/7-things-you-may-not-pay-attation-to-in-go/
变长参数的妙用
https://www.digitalocean.com/community/tutorials/how-to-use-variadic-functions-in-go
付费：变长参数函数的妙用
接口高级用法
Go接口定义的惯例
The bigger the interface, the weaker the abstraction
付费:定义小接口是Go的惯例
空接口的”禁忌“
interface{} says nothing
付费：不要在函数参数中使用空接口(interface{})
利用接口提升代码”可测性“
https://talks.golang.org/2014/testing.slide
并发设计
Go并发模型与常见并发模式
[Concurrency is not parallelism.](https://www.youtube.com/watch?v=PAAkCSZUG1c&t=3m42s http://talks.golang.org/2012/waza.slide)
付费: Go并发模型和常见并发模式
channel的常见使用模式
https://tonybai.com/2014/09/29/a-channel-compendium-for-golang/
正确使用sync包
https://tip.golang.org/pkg/sync/
https://draveness.me/golang-sync-primitives.html
付费:sync包的正确使用姿势
恰当使用atomic包
https://talks.golang.org/2015/tricks.slide#1
https://tip.golang.org/pkg/sync/atomic/
错误处理
Go的错误处理模式
https://blog.golang.org/error-handling-and-go
付费: 别笑！这就是Go的错误处理哲学
消除过多的“if err != nil"
Errors are values
Go语言错误处理
Go语言的有效错误处理
panic不是错误
don’t panic
https://blog.golang.org/defer-panic-and-recover
https://tonybai.com/2019/04/04/notes-about-fixing-a-go-panic-problem/
测试与调试
单元测试源码包名的选择
https://tip.golang.org/cmd/go/#hdr-Test_packages
https://segment.com/blog/5-advanced-testing-techniques-in-go/
付费:一文告诉你测试包的包名要不要带“_test”后缀
测试代码组织设计
https://dave.cheney.net/2016/05/10/test-fixtures-in-go
采用“表驱动”的测试用例组织方法
https://dave.cheney.net/2019/05/07/prefer-table-driven-tests
管理测试依赖的外部数据文件的惯例
https://dave.cheney.net/2016/05/10/test-fixtures-in-go
付费：Go惯例：将测试依赖的外部数据文件放在testdata下面
Fake、Stub、Mock测试
https://martinfowler.com/articles/mocksArentStubs.html#TheDifferenceBetweenMocksAndStubs
http://xunitpatterns.com/Test%20Double.html
https://www.red-gate.com/simple-talk/dotnet/software-testing/go-unit-tests-tips-from-the-trenches
建立性能测试基准
benchmark test
性能剖析利器pprof
https://tonybai.com/2015/08/25/go-debugging-profiling-optimization
https://blog.golang.org/profiling-go-programs
https://tip.golang.org/doc/diagnostics.html
https://talks.godoc.org/github.com/davecheney/presentations/seven.slide#1
Go调试利器delve
https://github.com/go-delve/delve
https://golangnews.org/2020/04/debugging-with-delve/
https://speakerdeck.com/aarzilli/internal-architecture-of-delve
付费:掌握Go代码调试利器：delve
与C的互操作
cgo is not go
cgo的原理与使用
了解使用cgo的成本
跨平台静态编译
反射与unsafe
反射
reflection is never clear
https://blog.golang.org/laws-of-reflection
付费：谨慎使用reflect包提供的能力
unsafe
With the unsafe package there are no guarantees.
https://tip.golang.org/pkg/unsafe/#Pointer
https://tip.golang.org/ref/spec#Package_unsafe
https://blog.gopheracademy.com/advent-2017/unsafe-pointer-and-system-calls/
标准库
实现https通信
https://tonybai.com/2015/04/30/go-and-https/
Socket网络编程模型
https://tonybai.com/2015/11/17/tcp-programming-in-golang/
https://github.com/tumregels/Network-Programming-with-Go
字符集编码转换
https://tonybai.com/2019/11/07/non-ascii-character-encoding-illustrated/
crypto下的密码学包
https://github.com/golang/proposal/blob/master/design/cryptography-principles.md
https://www.infoq.com/presentations/go-crypto-library
标准库读写模型
https://tip.golang.org/pkg/io
工具链与工程进阶
go module进阶
Go语言包管理简史
Go modules：最小版本选择
Go module机制下升级major版本号的实践
Go modules：最小版本选择
初窥Go module
Go module机制下升级major版本号的实践
定制个性化包导入路径
使用govanityurls让私有代码仓库中的go包支持go get
定制Go Package的Go Get导入路径
go工具链高级应用
http://dave.cheney.net/2014/09/14/go-list-your-swiss-army-knife
https://www.alexedwards.net/blog/an-overview-of-go-tooling
https://rakyll.org/go-tool-flags/
付费：利其器！Go常用工具大检阅
Go设计哲学
Go的起源与演化
Go coding in go way
Go语言的前生今世
Go各个发布版本的特性
Go 1.15中值得关注的几个变化
Go 1.14中值得关注的几个变化
Go 1.13中值得关注的几个变化
Go 1.12中值得关注的几个变化
Go 1.11中值得关注的几个变化
Go 1.10中值得关注的几个变化
Go 1.9中值得关注的几个变化
Go 1.8中值得关注的几个变化
Go 1.7中值得关注的几个变化
Go 1.6中值得关注的几个变化
Go 1.5中值得关注的几个变化
Go 1.4中值得关注的几个变化
Go设计哲学
简单
组合
并发
面向工程，自带“电池”
https://talks.golang.org/2012/waza.slide#1
付费 https://www.imooc.com/read/87/article/2341
Go原理
Goroutine调度原理
https://tonybai.com/2020/03/21/illustrated-tales-of-go-runtime-scheduler/
https://tonybai.com/2017/06/23/an-intro-about-goroutine-scheduler/
https://tonybai.com/2017/11/23/the-simple-analysis-of-goroutine-schedule-examples/
https://github.com/golang-design/under-the-hood/tree/master/book/zh-cn/part2runtime/ch06sched
《Go语言学习笔记》GPM模型
Channel调度原理
《Go语言学习笔记》
https://draveness.me/golang/docs/part3-runtime/ch06-concurrency/golang-channel/
https://github.com/changkun/talks/blob/master/201908/channel.pdf
Go内存管理
《Go语言学习笔记》
https://draveness.me/golang/docs/part3-runtime/ch07-memory/golang-memory-allocator/
https://github.com/golang-design/under-the-hood/blob/master/book/zh-cn/part2runtime/ch07alloc
https://github.com/golang-design/under-the-hood/blob/master/book/zh-cn/part2runtime/ch08GC
编译器优化
https://draveness.me/golang/docs/part1-prerequisite/ch02-compile/golang-compile-intro/
《Go语言学习笔记》
Go各种原生类型在运行时的表示
[《Go语言学习笔记》]https://book.douban.com/subject/26832468/
切片
https://tip.golang.org/blog/go-slices-usage-and-internals
付费： https://www.imooc.com/read/87/article/2383
字符串
付费:https://www.imooc.com/read/87/article/2384
map
https://draveness.me/golang/docs/part2-foundation/ch03-datastructure/golang-hashmap/
channel
https://draveness.me/golang/docs/part3-runtime/ch06-concurrency/golang-channel/
接口
https://research.swtch.com/interfaces
https://www.airs.com/blog/archives/277
cgo原理
《Go语言高级编程》
反射原理
https://draveness.me/golang/docs/part2-foundation/ch04-basic/golang-reflect/
https://blog.golang.org/laws-of-reflection
付费：谨慎使用reflect包提供的能力

# 高阶
Go Web
Web框架
Beego
Gin
Iris
echo
revel
go-zero
静态建站
gohugo
WebServer/反向代理/负载均衡器
Caddy
Traefik
Baidu BFE
Go爬虫
colly
ferret
云原生
容器化基础设施
容器
moby(docker)
pouch
containerd
kata container
容器编排
Kubernetes
镜像仓库
harbor
Dragonfly
函数即服务
FaaS
服务网格
istio
mosn
PaaS
OpenShift
KubeSphere
Go微服务
微服务框架
kit
TarsGo
dubbo-go
Kratos
micro
分布式配置/服务发现
etcd
consul
密钥安全
vault
DevOps/持续交付
Git托管服务/Git库
gitea
gogs
go-git
CI/CD
drone
argo-cd
测试
goreplay
go-fuzz
testify
运维
Rancher
Promethus
Nightingale
Terraform
中间件
队列
nsq
nats
日志
logrus
zap
rpc
grpc
ProtoBuf
跟踪
OpenTelemetry
Jaeger
命令行
cobra
cli
存储引擎
分布式关系数据库
TiDB
CockroachDB
时序数据库
InfluxDB
key-value数据库
bolt
badger
图数据库
Dgraph
文件/对象存储
MinIO
SeaweedFS
ChubaoFS
其他工具
CODIS
Vitness
区块链
公链
Ethereum
Filecoin
联盟链
Fabric
基础设施
IPFS
XuperChain
物联网
物联网平台
Mainflux
人工智能
gonum
golearn
Gorgonia
onnx-go
Prophecis
流媒体
WebRTC
游戏引擎
pixel
OpenDiablo2
engo
g3n/engine
GUI框架
fyne
gocui
嵌入式
tinygo
gobot
periph
终端
gomobile
## 相关学习资源
Go Web
Web框架
Beego
Gin
Iris
echo
revel
go-zero
静态建站
gohugo
WebServer/反向代理/负载均衡器
Caddy
Traefik
Baidu BFE
Go爬虫
colly
ferret
云原生
容器化基础设施
容器

moby(docker)
pouch
containerd
kata container
容器编排

Kubernetes
镜像仓库

harbor
Dragonfly
函数即服务

faas
服务网格

istio
mosn
PaaS

OpenShift
KubeSphere
Go微服务
微服务框架

kit
TarsGo
dubbo-go
Kratos
micro
分布式配置/服务发现

etcd
consul
密钥安全

vault
DevOps/持续交付
Git托管服务/Git库

gitea
gogs
go-git
CI/CD

drone
argo-cd
测试

goreplay
go-fuzz
testify
运维

Rancher
Promethus
Nightingale
Terrafrom
中间件
队列
nsq
nats
日志
logrus
zap
rpc
grpc
protobuf
跟踪
opentelemetry
jaeger
命令行
cobra
cli
存储引擎
分布式关系数据库
TiDB
cockroachdb
时序数据库
influxdb
key-value数据库
bolt
badger
图数据库
dgraph
文件/对象存储
minio
seaweedfs
chubaofs
其他工具
codis
vitness
区块链
公链
ethereum
filecoin
联盟链
fabric
基础设施
ipfs
xuperchain
物联网平台
mainflux
人工智能
gonum
golearn
gorgonia
onnx-go
Prophecis
流媒体
webrtc
游戏引擎
pixel
OpenDiablo2
engo
g3n/engine
GUI 框架
fyne
gocui
嵌入式
tinygo
gobot
periph
终端
gomobile