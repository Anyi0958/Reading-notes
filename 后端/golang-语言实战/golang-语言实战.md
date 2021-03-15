golang-语言实战 目录
[TOC]
***

# 前言



# 推荐阅读

- 《Go 语言实战》

# 0. 语法介绍

## 0. 环境

1. 安装包下载：[Go](https://golang.org/dl/)

## `UNIX/Linux/Mac OS`

```shell
tar -C /usr/local -xzf go1.4.linux-amd64.tar.gz

export PATH=$PATH:/usr/local/go/bin
```



## 1. 运行编译

```shell
// run
go run hello.go

// build生成二进制
go build hello.go
./hello
```

## 基础语法

```go
package main
import "fmt"
func main() {
    fmt.Println("Google" + "Runoob")
}
```

## 关键字

| break    | default     | func   | interface | select |
| -------- | ----------- | ------ | --------- | ------ |
| case     | defer       | go     | map       | struct |
| chan     | else        | goto   | package   | switch |
| const    | fallthrough | if     | range     | type   |
| continue | for         | import | return    | var    |

除了以上介绍的这些关键字，Go 语言还有 36 个预定义标识符：

| append | bool    | byte    | cap     | close  | complex | complex64 | complex128 | uint16  |
| ------ | ------- | ------- | ------- | ------ | ------- | --------- | ---------- | ------- |
| copy   | false   | float32 | float64 | imag   | int     | int8      | int16      | uint32  |
| int32  | int64   | iota    | len     | make   | new     | nil       | panic      | uint64  |
| print  | println | real    | recover | string | true    | uint      | uint8      | uintptr |

## 空格符

- `go`变量的声明必须用空格隔开: `var age int`

## 格式化字符串

```go
package main

import (
    "fmt"
)

func main() {
   // %d 表示整型数字，%s 表示字符串
    var stockcode=123
    var enddate="2020-12-31"
    var url="Code=%d&endDate=%s"
    var target_url=fmt.Sprintf(url,stockcode,enddate)
    fmt.Println(target_url)
}
```

> Code=123&endDate=2020-12-31

## 数据类型

| 1    | **布尔型** 布尔型的值只可以是常量 true 或者 false。一个简单的例子：var b bool = true。 |
| ---- | ------------------------------------------------------------ |
| 2    | **数字类型** 整型 int 和浮点型 float32、float64，Go 语言支持整型和浮点型数字，并且支持复数，其中位的运算采用补码。 |
| 3    | **字符串类型:** 字符串就是一串固定长度的字符连接起来的字符序列。Go 的字符串是由单个字节连接起来的。Go 语言的字符串的字节使用 UTF-8 编码标识 Unicode 文本。 |
| 4    | **派生类型:** 包括：(a) 指针类型（Pointer）(b) 数组类型(c) 结构化类型(struct)(d) Channel 类型(e) 函数类型(f) 切片类型(g) 接口类型（interface）(h) Map 类型 |

## 语言变量

### 1. 指定命名

- `var v_name v_type`，没有指定默认为0
- `var a = "xx"`

### 2. 自动判定

- `var v_name = value`
- `var d = true`

### 3. 省略`var`，采用`:=`

- `v_name := value`

### 4. 多变量声明

- `var vname1, vname2, vname3 type`
- `var vname1, vname2 vname3 = v1, v2, v3`
- `vname1, vname2, vname3 := v1, v2, v3`
- `var a string = "abc"`



## 值类型和引用类型

- `&i`获取内存地址，如`0xf8400000040`

## 空白标识符和抛弃值

- `_, b = b, a`
- 下划线是抛弃值

## 常量

- `const vname type = value`

### `iota`

- `const`语句块中的行索引
- iota 在 const关键字出现时将被重置为 0(const 内部的第一行之前)，const 中每新增一行常量声明将使 iota 计数一次

```go
package main

import "fmt"

func main() {
    const (
            a = iota   //0
            b          //1
            c          //2
            d = "ha"   //独立值，iota += 1
            e          //"ha"   iota += 1
            f = 100    //iota +=1
            g          //100  iota +=1
            h = iota   //7,恢复计数
            i          //8
    )
    fmt.Println(a,b,c,d,e,f,g,h,i)
}
```

## 运算符

- `&i`获取地址
- `p *int`指针变量

## 条件运算符

- `go`没有三目运算符，不支持`xx ? a:b`

## 循环语句

- 只有`for`

## 函数

- 可以返回多个值

```go
/* 函数返回两个数的最大值 */
func max(num1, num2 int) int {
   /* 定义局部变量 */
   var result int

   if (num1 > num2) {
      result = num1
   } else {
      result = num2
   }
   return result
}

func swap(x, y string) (string, string) {
   return y, x
}
```

## 数组

- `var variable_name [SIZE] variable_type`
- `var balance [10] float32`

### 初始化数组

- `var balance = [5]float32{1000.0, 2.0, 3.4, 7.0, 50.0}`
- `balance := [5]float32{1000.0, 2.0, 3.4, 7.0, 50.0}`

```go
var balance = [...]float32{1000.0, 2.0, 3.4, 7.0, 50.0}
或
balance := [...]float32{1000.0, 2.0, 3.4, 7.0, 50.0}
```

```go
//  将索引为 1 和 3 的元素初始化
balance := [5]float32{1:2.0,3:7.0}
```

## 指针

- `printf("%x", &a) `取地址
- `printf("%n", *a)`取值

## 结构体

```go
type struct_variable_type struct {
   member definition
   member definition
   ...
   member definition
}

variable_name := structure_variable_type {value1, value2...valuen}
或
variable_name := structure_variable_type { key1: value1, key2: value2..., keyn: valuen}

    // 也可以使用 key => value 格式
    fmt.Println(Books{title: "Go 语言", author: "www.runoob.com", subject: "Go 语言教程", book_id: 6495407})
```

- `结构体.成员名`：访问结构体成员



## 切片

- 切片是对数组的抽象
- 与数组相比切片的长度是不固定的，可以追加元素，在追加时可能使切片的容量增大

- `var identifier []type`

```go
var slice1 []type = make([]type, len)

也可以简写为

slice1 := make([]type, len)
```

### 切片初始化

- `s :=[] int {1,2,3 } `
- `s := arr[:] `
- `s := arr[startIndex:endIndex] `
- `numbers1 := make([]int,0,5)`

- `append(), copy()`想增加切片的容量，我们必须创建一个新的更大的切片并把原分片的内容都拷贝过来

## `Range`

- `range `关键字用于` for `循环中迭代数组(array)、切片(slice)、通道(channel)或集合(map)的元素。在数组和切片中它返回元素的索引和索引对应的值，在集合中返回 key-value 对

```go
for _, num := range nums {
    sum += num
}
```

## `map`集合

- `Map` 是一种无序的键值对的集合

- `var map_variable map[key_data_type]value_data_type`
- `map_variable := make(map[key_data_type]value_data_type)`

```go
var countryCapitalMap map[string]string /*创建集合 */
countryCapitalMap = make(map[string]string)
```

## 类型转换

- `type_name(expression)`
- `mean = float32(sum)/float32(count)`

## 接口

- 提供了另外一种数据类型即接口，它把所有的具有共性的方法定义在一起，任何其他类型只要实现了这些方法就是实现了这个接口

```go
/* 定义接口 */
type interface_name interface {
   method_name1 [return_type]
   method_name2 [return_type]
   method_name3 [return_type]
   ...
   method_namen [return_type]
}


/* 定义结构体 */
type struct_name struct {
   /* variables */
}


/* 实现接口方法 */
func (struct_name_variable struct_name) method_name1() [return_type] {
   /* 方法实现 */
}


type Phone interface {
    call()
}

type NokiaPhone struct {
}

func (nokiaPhone NokiaPhone) call() {
    fmt.Println("I am Nokia, I can call you!")
}

```



## 并发

- `go`启动`goroutine`
- `go 函数名( 参数列表 )`
- `go f(x, y, z)`

```go
package main

import (
        "fmt"
        "time"
)

func say(s string) {
        for i := 0; i < 5; i++ {
                time.Sleep(100 * time.Millisecond)
                fmt.Println(s)
        }
}

func main() {
        go say("world")
        say("hello")
}
```

## 通道

- 是用来传递数据的一个数据结构
- 可用于两个 goroutine 之间通过传递一个指定类型的值来同步运行和通讯
- 操作符 `<-` 用于指定通道的方向，发送或接收。如果未指定方向，则为双向通道

```go
ch <- v    // 把 v 发送到通道 ch
v := <-ch  // 从 ch 接收数据
           // 并把值赋给 v
```

- `ch := make(chan int)`
- `ch := make(chan int, 100)`通过 make 的第二个参数指定缓冲区大小
- `close(c)`

```go
package main

import "fmt"

func sum(s []int, c chan int) {
        sum := 0
        for _, v := range s {
                sum += v
        }
        c <- sum // 把 sum 发送到通道 c
}

func main() {
        s := []int{7, 2, 8, -9, 4, 0}

        c := make(chan int)
        go sum(s[:len(s)/2], c)
        go sum(s[len(s)/2:], c)
        x, y := <-c, <-c // 从通道 c 中接收

        fmt.Println(x, y, x+y)
}
```

## 工具推荐

- [GoLand](https://www.jetbrains.com/go/)
- [LiteIDE-files](http://sourceforge.net/projects/liteide/files/)
- [LitelDE-github](https://github.com/visualfc/liteide)

# 1. `Go`介绍

- 可以利用多核心，高效复用代码
- `Go`使用了更加智能的编译器，提高了编译速度
  - 只会关注那些直接被引用的库，而不想`java,c/c++`遍历依赖链中所有依赖的库
- 并发能力强
  - `goroutine`类似线程，但是占用内存远少于线程
  - `channel`让用户在不同的`goroutine`之间同步发送具有类型的消息

## 1. `goroutine`

- 可以和其他`goroutine`并行执行的函数，也会和主程序（入口）并行执行
- 在`Go`中使用同一个线程来执行多个`goroutine`

```go
func log(msg string) {
    ...
}

go log("terrible")
```

![image-20210315124659226](.\img\0-goroutine.png)

## 2. 通道

- 一种数据结构，让`goroutine`之间进行安全的数据通信，避免常见的共享内存访问的问题
- 并发难点：确保其他并发运行的进程、线程、`goroutine`不会修改用户的数据
- 如果要使用全局变量或者共享内存，必须使用复杂的锁规则
- 通道保证同一时刻只会有一个`goroutine`修改数据

## 3. 类型系统

- 组合设计模式
  - 只要将一个类型嵌入到另一个类型，就能复用所有的功能

鸭子类型

- 一个类型实现了一个接口，执行一组特定的行为，就是这个类型
- 叫起来像鸭子，看着像，就是鸭子

接口：

```java
interface User {
    public void login();
    public void logout();
}
```

- `Go`的接口提供了一个简单方法

```go
type Reader interface {
    Read(p []byte) (n int, err error)
}
```

## 4. 内存管理

- `Go`不需要程序员关心内存管理

## 5. 程序介绍

```go
//Go 程序组织成包
package main

// import外部代码
// fmt包用于格式化并输出数据
import "fmt"

// 入口
func main() {
    fmt.Println("Hello World!");
}
```

## 6. 总结

- 内置对并发的支持
- 使用接口作为代码复用的基础模块

# 2. `Go`程序

## 1. 程序架构

![image-20210315133258106](.\img\1-bridge.png)

项目结构：

```shell
cd $GOPATH/src/github.com/goinaction/code/chapter2

- sample
    - data
        data.json -- 包含一组数据源
     - matchers
        rss.go -- 搜索 rss 源的匹配器
     - search
        default.go -- 搜索数据用的默认匹配器
        feed.go -- 用于读取 json 数据文件
        match.go -- 用于支持不同匹配器的接口
        search.go -- 执行搜索的主控制逻辑
    main.go -- 程序的入口
```

## 2. `main`包

```go
package main

import (
	"log"
	"os"

	_"github.com/goinaction/code/chapter2/sample/matchers"
	 "github.com/goinaction/code/chapter2/sample/search"
)

func init() {
	log.SetOutput(os.Stdout);
}

func main() {
	search.Run("president");
}
```

- 一个包定义一组编译过的代码，类似命名空间3

- `_ "xxx"`前面的下划线让`Go`对包做初始化操作，但并不使用包里的标识符
- `Go`不允许声明导入包缺不使用，下划线允许导入不使用

## 3. 环境变量 - `GOROOT, GOPATH`

```go
GOROOT="/Users/me/go"
GOPATH="/Users/me/spaces/go/projects"

var matches = make(map[string]Matcher)
```

- `map`是一种引用类型，需要用`make`构造

### 函数声明：

```go
func Run(searchTerm string)
```
### 切片：

```go
feeds, err := RetrieveFeeds()
if err != nil {
    log.Fatal(err)
}
```

- `Feed`类型切片，动态数组的引用类型
- `err`错误值，自动调用`Fatal`
- 一个函数返回多个返回值：数据值和错误值
  - 如果发生错误，不能使用另一个值

- `:=`简化声明运算符，声明变量，同时赋初值，与`var`声明没有区别

### `make`：

```go
result := make(chan *Result)
```

- `make`函数创建一个无缓冲的通道

### 跟踪`goroutine`：

```go
var waitGroup sync.WaitGroup
waitGroup.Add(len(feeds))
```

- `waitGroup`计数信号量

### `for-range`循环：

```go
for _, feed := range feeds{}
```

- `_`：占位符，保存`range`调用返回的索引值的变量
- 要调用函数返回多个值，不需要其中的某个值，就用`_`将其忽略掉

### 匿名函数和指针：

```go
// 启动一个匿名函数来执行
go func(matcher Matcher, feed *Feed){}(matcher, feed)
```

- 指针变量可以在函数之间共享数据
- 关键字`go`启动一个`goroutine`，并作并发调度
- `(matcher, feed)`两个变量的值传入匿名函数

### `Go`支持闭包：

- 匿名函数可以直接访问外层函数作用域中那些没有作为参数传入的变量

### 读取`data.json`数据源：

```go
package search

import (
	"encoding/json"
    "os"
)

const dataFile = "data/data.json"
```

- `josn`包提公编解码`JSON`功能
- `os`提供访问操作系统功能
- `go`编译器可以根据赋值运算符右边的值来推导类型，声明常量的时候不需要指定类型，只能在本包内使用

```json
[ 
    { 
   "site" : "npr",
   "link" : "http://www.npr.org/rss/rss.php?id=1001",
   "type" : "rss"},
   { 
   "site" : "cnn",
   "link" : "http://rss.cnn.com/rss/cnn_world.rss",
   "type" : "rss"
   },
    { 
   "site" : "foxnews",
   "link" : "http://feeds.foxnews.com/foxnews/world?format=xml",
   "type" : "rss"
   },
    { 
   "site" : "nbcnews",
   "link" : "http://feeds.nbcnews.com/feeds/topstories",
   "type" : "rss"
    } 
] 
```

### 一个结构组成的切片里

```go
type Feed struct {
    Name	string	`json"site"`
    URI	string	`json:"link"`
    Type	string	`json:"type"`
}
```

- `Feed`结构类型会对外暴露
- 反引号里的部分被称为标记，描述了`JSON`解码的元数据，每个标记将结构类型里的字段对应到`JSON`文档里指定名字的字段

### `defer`

```go
package search

import (
	"encoding/json"
	"os"
)

const dataFile = "data/data.json"

type Feed struct {
	Name string `json:"site"`
	URI string `json:"link"`
	Type string `json:"type"`
}

func RetrieveFeeds() ([]*Feed, error) {
	file, err := os.Open(dataFile)
	if err != nil {
		return nil, err
	}

	defer file.Close()

	var feeds []*Feed
	err = json.NewDecoder(file).Decode(&feeds)

	return feeds, err
}
```

- `defer`：安排随后的函数调用在函数返回时执行

### `interface`

```go
func (dec *Decoder) Decode(v interface{}) error
```

### 接口

```go
type Matcher interface {
    Search(feed *Feed, searchTerm string) ([]*result, error)
}
```

命令接口时：

- 如果接口类型只包含一个方法，类型名字以`er`结尾
- 如果内部声明了多个方法，名字需要与行为关联

### `defaultMatcher`

```go
type defaultMatcher struct{}
```

- 空结构类型在创建实例时，不会分配任何内存，很适合创建没有任何状态的类型

