Lua基础入门 目录
[TOC]
***
# 前言
其设计目的是为了嵌入应用程序中，从而为应用程序提供灵活的扩展和定制功能。

## Lua 特性
- 轻量级: 它用标准C语言编写并以源代码形式开放，编译后仅仅一百余K，可以很方便的嵌入别的程序里。
- 可扩展: Lua提供了非常易于使用的扩展接口和机制：由宿主语言(通常是C或C++)提供这些功能，Lua可以使用它们，就像是本来就内置的功能一样。
- 其它特性:
	- 支持面向过程(procedure-oriented)编程和函数式编程(functional programming)；
	- 自动内存管理；只提供了一种通用类型的表（table），用它可以实现数组，哈希表，集合，对象；
	- 语言内置模式匹配；闭包(closure)；函数也可以看做一个值；提供多线程（协同进程，并非操作系统所支持的线程）支持；
	- 通过闭包和table可以很方便地支持面向对象编程所需要的一些关键机制，比如数据抽象，虚函数，继承和重载等。

## 应用场景
- 游戏开发
- 独立应用脚本
- Web 应用脚本
- 扩展和数据库插件如：MySQL Proxy 和 MySQL WorkBench
- 安全系统，如入侵检测系统

### 示例脚本
```lua
#!/usr/local/bin/lua

print("Hello World")
print("www.baidu.com")
```

## 注释
- `--`单行
- `--[[xxx--]]`多行

## 关键词
- 以下列出了 Lua 的保留关键词。保留关键字不能作为常量或变量或其他用户自定义标示符：
|||
:-:|:-:|:-:|:-:
and|break|do|else
elseif|end|false|for
function|if|in|local
nil|not|or|repeat
return|then|true|until
while|goto		
- 一般约定，以下划线开头连接一串大写字母的名字（比如` _VERSION`）被保留用于 Lua 内部全局变量。

## 全局变量
- 默认变量是全局的
- 全局不需要声明
- 未声明访问：nil
- 删除：`b = nil` or `print(b) --> nil`


# Lua数据特性
## 独特地方
- nil, 表示无效值，相当于false
- number, 双精度
- function, C / lua编写的函数
- userdata, 任意存储在变量中的c数据结构
- thread, 执行的独立线路，用于执行协同程序
- table, 关联数组
```lua
tab1 = { key1 = "val1", key2 = "val2", "val3" }
for k, v in pairs(tab1) do
    print(k .. " - " .. v)
end
 
tab1.key1 = nil
for k, v in pairs(tab1) do
    print(k .. " - " .. v)
end
```
- `#`计算字符串长度，`print(#"xxxx)`

### table
```lua
local tbl1 = {}
local tbl2 = {"apple", "pear", "orange", "grape"}
```
- table 不会固定长度大小，有新数据添加时 table 长度会自动增长，没初始的 table 都是 nil
```lua
-- table_test.lua 脚本文件
a = {}
a["key"] = "value"
key = 10
a[key] = 22
a[key] = a[key] + 11
for k, v in pairs(a) do
    print(k .. " : " .. v)
end
```

### function
```lua
-- function_test.lua 脚本文件
function factorial1(n)
    if n == 0 then
        return 1
    else
        return n * factorial1(n - 1)
    end
end
print(factorial1(5))
factorial2 = factorial1
print(factorial2(5))

// anonymous func
testFun(tab,
function(key,val)--匿名函数
        return key.."="..val;
end
);
```

### thread（线程）
- 在 Lua 里，最主要的线程是协同程序（coroutine）。它跟线程（thread）差不多，拥有自己独立的栈、局部变量和指令指针，可以跟其他协同程序共享全局变量和其他大部分东西。
- 线程跟协程的区别：线程可以同时多个运行，而协程任意时刻只能运行一个，并且处于运行状态的协程只有被挂起（suspend）时才会暂停。
### userdata（自定义类型）
- userdata 是一种用户自定义数据，用于表示一种由应用程序或 C/C++ 语言库所创建的类型，可以将任意 C/C++ 的任意数据类型的数据（通常是 struct 和 指针）存储到 Lua 变量中调用。


# Lua 变量
- 变量三种类型： 全局，局部，表中的域
- 默认为全局
- 默认值为nil

## 赋值的特殊之处
- `a, b = 10, 2*x` 同于`a = 10; b = 2*x`
- 当变量个数和值的个数不一致时
	- a. 变量个数 > 值的个数             按变量个数补足nil
	- b.变量个数 < 值的个数             多余的值会被忽略

## 索引
- `table[i]`=`table.i`

# 循环
- while
- for
- repeat...until
- 循环嵌套

**循环与shell相似**

```lua
while(condition)
do
	xxx
end
```

## for
### 数值for循环
```lua
//exp1->exp2, step exp3
for var=exp1,exp2,exp3 do  
    <执行体>  
end 
```
```lua
#!/usr/local/bin/lua
function f(x)
	print("function")
	return x * 2
end

for i = 1,f(5) do print(i)
end
```

### 泛型for循环
- 通过迭代器函数遍历所有值，类似foreach
```lua
--打印数组a的所有值  
a = {"one", "two", "three"}
for i, v in ipairs(a) do
    print(i, v)
end 
```

## repeat...until
- 在当前循环结束后判断，类似do...while
```lua
repeat
   statements
until( condition )
```

# if
- 与shell相同
```lua
if( 布尔表达式 1)
then
   --[ 布尔表达式 1 为 true 时执行该语句块 --]
   if(布尔表达式 2)
   then
      --[ 布尔表达式 2 为 true 时执行该语句块 --]
   end
end
```

# 函数
- 声明
```lua
local function Name( argument1, argument2, argument3..., argumentn)
    statement
    return value
end
```
- 返回值可以是多个`return m1, m2`

## 可变参数
- 接受可变数目的参数
- `...`表示函数有可变参数
- `function add(...)`
- `select('#', …)` 返回可变参数的长度
- `select(n, …)` 用于返回 `n` 到 `select('#',…)` 的参数
sample:
```lua
function average(...)
   result = 0
   local arg={...}
   for i,v in ipairs(arg) do
      result = result + v
   end
   print("总共传入 " .. select("#",...) .. " 个数")
   return result/select("#",...)
end

print("平均值为",average(10,5,3,4,5,6))
```

# 逻辑运算符
- `~=`不等于


# 字符串表示
- 单引号
- 双引号
- `[[xx]]`

# Lua迭代器
## 泛型for迭代器
- 泛型 for 在自己内部保存迭代函数，实际上它保存三个值：迭代函数、状态常量、控制变量。
```lua
for k, v in pairs(t) do
    print(k, v)
end
```
- k, v为变量列表；pairs(t)为表达式列表。

## 无状态的迭代器
- 无状态的迭代器是指不保留任何状态的迭代器，因此在循环中我们可以利用无状态迭代器避免创建闭包花费额外的代价。
- 每一次迭代，迭代函数都是用两个变量（状态常量和控制变量）的值作为参数被调用，一个无状态的迭代器只利用这两个值可以获取下一个元素。
```lua
function square(iteratorMaxCount,currentNumber)
   if currentNumber<iteratorMaxCount
   then
      currentNumber = currentNumber+1
   return currentNumber, currentNumber*currentNumber
   end
end

for i,n in square,3,0
do
   print(i,n)
end

function iter (a, i)
    i = i + 1
    local v = a[i]
    if v then
       return i, v
    end
end
 
function ipairs (a)
    return iter, a, 0
end
```
## 多状态的迭代器
- 很多情况下，迭代器需要保存多个状态信息而不是简单的状态常量和控制变量，最简单的方法是使用闭包，还有一种方法就是将所有的状态信息封装到 table 内，将 table 作为迭代器的状态常量，因为这种情况下可以将所有的信息存放在 table 内，所以迭代函数通常不需要第二个参数。
```lua
array = {"Google", "Runoob"}

function elementIterator (collection)
   local index = 0
   local count = #collection
   -- 闭包函数
   return function ()
      index = index + 1
      if index <= count
      then
         --  返回迭代器的当前元素
         return collection[index]
      end
   end
end

for element in elementIterator(array)
do
   print(element)
end
```

# Lua模块与包
- Lua 的模块是由变量、函数等已知元素组成的 table，因此创建一个模块很简单，就是创建一个 table，然后把需要导出的常量、函数放入其中，最后返回这个 table 就行
```lua
-- 文件名为 module.lua
-- 定义一个名为 module 的模块
module = {}
 
-- 定义一个常量
module.constant = "这是一个常量"
 
-- 定义一个函数
function module.func1()
    io.write("这是一个公有函数！\n")
end
 
local function func2()
    print("这是一个私有函数！")
end
 
function module.func3()
    func2()
end
 
return module
```

## require 函数
- require的函数用来加载模块
- 要加载一个模块，只需要简单地调用就可以了
- `require("<模块名>")` or `require "<模块名>"`
```lua
-- test_module.lua 文件
-- module 模块为上文提到到 module.lua
require("module")
 
print(module.constant)
 
module.func3()
```

## 加载机制
- require 用于搜索 Lua 文件的路径是存放在全局变量 package.path 中，当 Lua 启动后，会以环境变量 LUA_PATH 的值来初始这个环境变量。如果没有找到该环境变量，则使用一个编译时定义的默认路径来初始化。
- 当然，如果没有 LUA_PATH 这个环境变量，也可以自定义设置，在当前用户根目录下打开 .profile 文件（没有则创建，打开 .bashrc 文件也可以），例如把 "~/lua/" 路径加入 LUA_PATH 环境变量里`export LUA_PATH="~/lua/?.lua;;"`

## C包
- 与Lua中写包不同，C包在使用以前必须首先加载并连接，在大多数系统中最容易的实现方式是通过动态连接库机制。
- 与Lua中写包不同，C包在使用以前必须首先加载并连接，在大多数系统中最容易的实现方式是通过动态连接库机制。
```lua
local path = "/usr/local/lua/lib/libluasocket.so"
local f = loadlib(path, "luaopen_socket")
```
- loadlib 函数加载指定的库并且连接到 Lua，然而它并不打开库（也就是说没有调用初始化函数），反之他返回初始化函数作为 Lua 的一个函数，这样我们就可以直接在Lua中调用他。
- 如果加载动态库或者查找初始化函数时出错，loadlib 将返回 nil 和错误信息。我们可以修改前面一段代码，使其检测错误然后调用初始化函数：
```lua
local path = "/usr/local/lua/lib/libluasocket.so"
-- 或者 path = "C:\\windows\\luasocket.dll"，这是 Window 平台下
local f = assert(loadlib(path, "luaopen_socket"))
f()  -- 真正打开库
```

# 协同程序coroutine

- 当create一个coroutine的时候就是在新线程中注册了一个事件。
- 当使用resume触发事件的时候，create的coroutine函数就被执行了，当遇到yield的时候就代表挂起当前线程，等候再次resume触发事件。

```lua
-- coroutine_test.lua 文件
co = coroutine.create(
    function(i)
        print(i);
    end
)
 
coroutine.resume(co, 1)   -- 1
print(coroutine.status(co))  -- dead
 
print("----------")
 
co = coroutine.wrap(
    function(i)
        print(i);
    end
)
 
co(1)
 
print("----------")
 
co2 = coroutine.create(
    function()
        for i=1,10 do
            print(i)
            if i == 3 then
                print(coroutine.status(co2))  --running
                print(coroutine.running()) --thread:XXXXXX
            end
            coroutine.yield()
        end
    end
)
 
coroutine.resume(co2) --1
coroutine.resume(co2) --2
coroutine.resume(co2) --3
 
print(coroutine.status(co2))   -- suspended
print(coroutine.running())
 
print("----------")
```

## 生产者、消费者问题
```lua
local newProductor

function productor()
     local i = 0
     while true do
          i = i + 1
          send(i)     -- 将生产的物品发送给消费者
     end
end

function consumer()
     while true do
          local i = receive()     -- 从生产者那里得到物品
          print(i)
     end
end

function receive()
     local status, value = coroutine.resume(newProductor)
     return value
end

function send(x)
     coroutine.yield(x)     -- x表示需要发送的值，值返回以后，就挂起该协同程序
end

-- 启动程序
newProductor = coroutine.create(productor)
consumer()
```

# I/O
- Lua I/O 库用于读取和处理文件。分为简单模式（和C一样）、完全模式。
	- 简单模式（simple model）拥有一个当前输入文件和一个当前输出文件，并且提供针对这些文件相关的操作。
	- 完全模式（complete model） 使用外部的文件句柄来实现。它以一种面对对象的形式，将所有的文件操作定义为文件句柄的方法
	- `file = io.open (filename [, mode])`

# 错误处理
- assert 和 error 来处理错误
- pcall 和 xpcall、debug
```lua
if pcall(function_name, ….) then
-- 没有错误
else
-- 一些错误
end
```
