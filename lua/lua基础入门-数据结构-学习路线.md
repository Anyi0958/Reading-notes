Lua基础入门 目录
[TOC]
***
# 推荐阅读
- [原作者博客](http://sunxiunan.com/?p=1515)
- 《游戏脚本高级教程》
- 《Lua设计与实现》
- 《自己动手实现Lua》
- 《Programming in Lua 4th Edition》
- 《The Implementation Of Lua5》
- 《A No Frill Intro To Lua5.1 VM Instructions》
- 《Lua Bytecode Reference 5.3》
- 《The Evolution Of Lua》

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

# 常见数据结构
## 1. 链表
```lua
list = nil
for i =1, 10 do
	list = {next = list, value = i}
end

local l = list
while l do
	print (l.value)
	print(l.list)
	l = l.next
end

```

## 2. 队列
```lua
List = {}

-- create
function List.new()
	return {first = 0, last = -1}
end

-- insert in head
function List.pushFront(list, value)
	local first = list.first - 1
	list.first = first
	list[first] = value
end

-- pop in head
function List.popFront(list)
	local first = list.first
	
	-- judge whether it's empty
	if first > list.last then
		error("List is empty")
	end
	
	local value = list[first]
	list[first] = nil
	list.first = first + 1
	return value
end

-- pop in tail
function List.popBack(list)
	local last = list.last
	if list.first > last then
		error("List is empty")
	end
	
	local value = list[last]
	list[last] = nil
	list.last = last - 1
	
	return value
end

-- test
local testList = {first = 0, last = -1}
local tableTest = 12

List.pushFront(testList, tableTest)
print(List.popFront(testList))
	
```

## 3.栈实现
```lua
local stackMng = {}
stackMng._index = stackMng

-- create stack
function stackMng:new()
	local temp = {}
	setmetatable(temp,stackMng)
	return temp
end

-- initial List
function stackMng:init()
	self.stackList = {}
end

-- reset list
function stackMng:reset()
	self:init()
end

-- clear list
function stackMng:clear()
	self.stackList = {}
end

-- pop one value
function stackMng:pop()
	-- stack is empty
	if #self.stackList == 0 then
		return
	end
	
	-- not empty
	if self.stackList[1] then
		print(self.stackList[1])
	end
	
	return table.remove(self.stackList, 1)
end

-- push one in stack
function stackMng:push(t)
	table.insert(self.stackList, t)
end

-- count list
function stackMng:count()
	return #self.stackList
end

-- main
object = stackMng:new()
object:init()
object:pop()
		
```

## 4.集合
```lua
reserved = {
	["white"] = true,
	["end"] = true,
	["function"] = true,
	["local"] = true,
}

for k, v in pairs(reserved) do
	print(k, "->", v)
end
```

# Lua学习路线
## 首次阅读
- 《游戏脚本高级教程》
## 掌握技能
- 掌握C和Lua编程语言
- 掌握编译原理
- 实现一个json解析器
- 实现lua解释器
## 编译原理程度
- 了解编译器大概如何工作（龙书第2章）
- 词法分析
- 语法分析的LL算法
- 代码生成

## 推荐资料
- 《Lua设计与实现》
- 《自己动手实现Lua》
- 《Programming in Lua 4th Edition》
- 《The Implementation Of Lua5》
- 《A No Frill Intro To Lua5.1 VM Instructions》
- 《Lua Bytecode Reference 5.3》
- 《The Evolution Of Lua》

## 路线详细总结

[原作者博客](http://sunxiunan.com/?p=1515)

### 1，学习lua需要什么基础？
很显然，lua不适合作为你第一个编程语言，因为它需要比较深的c语言编程基础，而且对于数据结构有一定的了解，最关键的是它的功能函数并不完整，需要很多额外第三方支持，比如最基本的socket。所以学习lua最好有c或者c++的基础。
### 2，学习lua应该看什么文档？
最好从Programming In Lua （简称PIL）中文版看起，非常有帮助，最好是逐字逐句的看。文档在这里可以下载：http://groups.google.com/group/lua5 或者 http://sunxiunan.com/?p=1512
在Lua for windows这个整合安装包中包含了PIL和Lua manual这两个文档的英文版。
### 3，如何在windows下使用lua？
可以在Luaforge上找到编译好的Lua lib/dll/exe。
windows下最好是使用Lua for windows http://luaforge.net/projects/luaforwindows/，里面会包含一些常用的模块，比如luasocket，luasql，sqlite等。而且还包含了一个编辑器Scite，可以通过它来对lua脚本进行简单的调试，不需要额外安装什么IDE了。
如果你要自己编译Lua，可以在lua.org下载Lua的源代码，解压以后，参考readme文件，里面介绍的很详细。如果使用VC2008，也可以直接下载lua_vc2008.rar
### 4，lua如何进行网络编程？
通过luasocket这个扩展库。具体信息可以在http://luasocket.luaforge.net/ 找到，另外Lua for windows附带了luasocket，安装后可以直接使用。、
### 5.1，lua可不可以与c交互？
在PIL以及Lua manual上介绍了如何使用c语言编写lua的第三方扩展，另外可以参考我的文章与示例代码http://sunxiunan.com/?p=1498
c语言中调用lua也非常方便，可以静态调用（通过lib），也可以动态调用（通过dll），使用lua增强c语言这样静态编译语言的能力是非常有趣的。
### 5.2，lua可不可以与c++交互？
c++可以通过c语言的方式与lua交互。另外c++可以通过luabind或者luaplus这样的第三方库支暴露类与类成员信息给lua使用，可以方便（？）c++开发者。
我个人对于c++与lua交互的看法可以参考勿用屠龙来杀猪-论如何正确整合Lua与C++
### 5.3，lua可不可以与dotnet交互？
可以通过luainterface这个项目在lua中使用dotnet platform，或者在c# 中使用Lua，但是这个项目的稳定度与成熟度都还达不到可用的标准。
### 5.4，lua可不可以直接调用windows api？
通过lua alien这个扩展库
### 6，lua除了编写魔兽世界的插件，还能做什么？
可以用lua来写一些常用的程序，比如操作excel，比如定制一些查找。还可以把lua作为一种配置方式（类似ini文件或者cfg文件），因为lua的表，可以达到非常复杂的配置功能，另外lua的解析速度要比xml快多了。当然lua主要用处还是作为游戏的脚本支持语言。
### 7，lua可以调用windows api么？可以调用COM组件么？
可以自己编写一个dll封装对windows api的调用，或者用alien这个模块。可以通过luacom来调用COM组件。BTW，通过COM组件调用可以实现对excel或者word的操作。
云风介绍了一种windows api调用的方法：http://blog.codingnow.com/cloud/LuaApiCall
### 8，学习、使用lua有什么必须知道的网站么？
http://lua-users.org
http://lua.org
http://luaforge.org
http://lua-faq.org
http://www.keplerproject.org/
另外在云风http://blog.codingnow.com/的博客上也有不少关于Lua的好文章。
### 9，C/C++调用lua（比如使用dofile）常见的问题？
C++调用lua，必须用绝对路径（c:\aaa\bbb.lua）而不是相对路径。否则Lua虚拟机找不到这个文件。
### 10，Lua可以编译后执行么？
可以通过luac将lua代码编译成Lua的虚拟机指令集。这样可以隐藏原来代码，在一些内存或者CPU受限的环境下直接使用编译后的虚拟机也可节省硬件资源。
### 11，Lua能面向对象么？
Lua为什么没有类？Lua为什么没有多态？Lua为什么没有C++或者Java或者C#的这种那种特性？
Lua是一种单独的语言！在语言的特性以及实现上，Lua设计者有他们的取舍。高效、简洁、方便是Lua的特点。Lua的面向对象特性类似Javascript，都是基于原型机制（而非类机制）实现。类不是面向对象的必要特性。Lua的变量没有类型定义（值value有），所以也不存在多态这种机制，就如同c++不容易实现duck typing一样，取舍取舍，取了这样自然要舍弃那样。
在Lua中实现OO特性，可以参考下面的链接：http://lua-users.org/wiki/ObjectOrientedProgramming
或者在luaforge上搜索object，可以找到很多相关项目，如LOOP。
另外在PIL中也介绍了如何实现OO的方法。也可以参考云风的实现方式：http://blog.codingnow.com/cloud/LuaOO
### 12，Lua是否支持Unicode字符串？
Lua字符串可以容纳任何字符（包括0），所以如果想把unicode字符存到Lua字符串中没有任何问题，但是Lua的string标准库只能处理单字节，所以想编程使用Unicode，需要另外支持，如icu4lua，详细信息参考：
http://lua-users.org/wiki/LuaUnicode
### 13，a.f(x)与a:f(x)有什么区别？
简单的说，a:f(x)是a.f(a, x)的一种简写形式，更方便函数调用。
### 14，require与dofile有什么区别？
这两个函数都会载入并且运行lua脚本，区别是，require只需要指定模块名字（不需要加入.lua .dll这样后缀），而dofile需要指定文件的完整的实际路径。
在windows下输入以下命令lua -e "print(package.path)"来显示package查找路径。第二个区别是require会记住load过的信息，重复调用不会导致模块被重新载入（reload）。（我们可以通过dofile这种特性来实现热更新）
第三个区别是require可以载入二进制模块，如c语言编写的动态库，可以通过package.cpath来显示动态库查找的路径信息。
如果你想载入的动态库是在某个子目录下，如c:\lua\5.1\lib\luasockets\core，可以通过点号形式来require，如require “socket.core”
### 15，如何显式载入一个二进制动态库（dll）？
可以通过package.loadlib来实现。
### 16，Lua有什么优化技巧么？
可以通过LuaProfiler来查看你程序中的瓶颈http://luaprofiler.luaforge.net，另外Lua gems中有篇文章非常值得参考Lua Performance Tips
也可以到http://lua-users.org/wiki/OptimisationCodingTips 来查看他人的经验。
### 17，Lua有exception机制么？
没有内置的，但是可以通过pcall来间接实现。
```lua
local status,err = pcall(function()

t.alpha = 2.0 — will throw an error if t is nil or not a table

end)

if not status then

print(err)

end
```
### 18，Lua与C交互时，能否管理用户对象的生存期？
在The Implementation of Lua5.0中有介绍，userdata可以认为是用户指定的一块内存指针，分两种：Heavy userdata是由Lua来做内存分配并且管理GC的，而Light userdata完全由用户掌控内存分配销毁。
也可以参考云风的一篇文章：http://blog.codingnow.com/2007/10/lua_c_object_reference.html
### 19，优化的尾调用optimized tail calls可以做什么？
状态机实现：
```lua
– Define State A

function A()

dosomething”in state A”

if somecondition() then return B() end

if done() then return end

return A()

end

– Define State B

function B()

dosomething”in state B”

if othercondition() then return A() end

return B()

end

– Run the FSM, starting in State A

A()
```
### 20，我想把lua打包成exe，如何做？
可以使用srlua、L-Bia这样的lua项目，另外可以使用lua2c这个工具把lua代码编译成c语言代码，然后通过include在c语言中直接使用。
### 21，什么是函数环境Function Environments？
简单的说，函数环境就是全局表global table。可以用来实现sandbox沙箱功能。
```lua
function test ()

return A + 2*B

end

t = { A = 10; B = 20 }

setfenv(test,t)

print(test())

=>

50
```
### 22，如何实现命名参数named parameters？
```lua
function named(t)

local name = t.name or 'anonymous’

local os = t.os or '’

local email = t.email or t.name..’@’..t.os

…

end

named {name = 'bill’, os = 'windows’}
```
### 23，Lua有没有Ruby gem这种机制？
如果想自动安装更新第三方模块，可以使用luarocks。
### 24，Lua支持字符串正则查找替换么？
支持，参考string标准库。也可以使用lpeg这个第三方模块。
### 25，如何在c语言中遍历一个Lua table？
```lua
/* table is in the stack at index 't’ */

lua_pushnil(L); /* first key */

while (lua_next(L, t) != 0) {

/* uses 'key’ (at index -2) and 'value’ (at index -1) */

printf(“%s – %s\n”,

lua_typename(L, lua_type(L, -2)),

lua_typename(L, lua_type(L, -1)));

/* removes 'value’; keeps 'key’ for next iteration */

lua_pop(L, 1);

}
```
### 26 使用Lua stack需要注意的地方？
在 C 函数中，不能随意的时候 lua_State 中的虚拟机堆栈，如果需要大量使用堆栈，应该先调用 lua_checkstack 。少量使用堆栈，（在 LUA_MINSTACK 20 ）之下时则没有问题。（from云风blog）
### 27 参数
当从 lua 调用 C 函数时，当参数数量不足的时候，并不会填入 nil 作为缺省参数。比如，写了一个 C 函数，接受两个参数。当 lua 中调用这个 C 函数时，如果仅传入一个参数，那么在 C 中 stack 上 index 2 位置的值并不一定是 nil 。这个时候我们应该用 lua_gettop 得到准确的参数个数以做适当的处理，或者直接在进入 C 函数时调用一次 lua_settop(L,2) 强制堆栈扩展到两个。

### 28 上限
在生成 cclosure 的时候，upvalue 不能超过 255 个。而这一点并没在文档中说明，运行时压入超过 255 个 upvalue 也不会报错。
以上3条来自http://blog.codingnow.com/2006/09/lua_cclosure_upvalue.html

### 29 判断一个字符串的前缀是不是 “@”
有三个方案：

1. 比较直观的是 string.sub(str,1,1) == “@”

2. 感觉效率比较高的是 string.byte(str) == 64

3. 或者是 string.find(str,”@”) == 1

### 30 演示功能
http://www.lua.org/demo.html 这个演示功能怎么实现的？

http://www.tecgraf.puc-rio.br/~lhf/ftp/lua/，查找“demo”能看到它的源代码。

31 mav · An experimental tool for memory allocation visualization. Need to add

32 树形打印table，类似php的print_r

from http://blog.codingnow.com/cloud/LuaPrintR
```lua
local print = print

local tconcat = table.concat

local tinsert = table.insert

local srep = string.rep

local type = type

local pairs = pairs

local tostring = tostring

local next = next

function print_r(root)

local cache = { [root] = “.” }

local function _dump(t,space,name)

local temp = {}

for k,v in pairs(t) do

local key = tostring(k)

if cache[v] then

tinsert(temp,”+” .. key .. ” {” .. cache[v]..”}”)

elseif type(v) == “table” then

local new_key = name .. “.” .. key

cache[v] = new_key

tinsert(temp,”+” .. key .. _dump(v,space .. (next(t,k) and “|” or ” ” ).. srep(” “,#key),new_key))

else

tinsert(temp,”+” .. key .. ” [" .. tostring(v).."]“)

end

end

return tconcat(temp,”\n”..space)

end

print(_dump(root, “”,”"))

end
```
### 33 如何可以安全的迭代一个table

http://blog.codingnow.com/2009/03/safe_set.html

### 34 lua编译时计算实现

http://blog.codingnow.com/2008/08/compile_time_calculation_in_lua.html

### 35 如何通过closure模拟table

from http://blog.codingnow.com/2006/03/closure_table.html
```lua
function point (x,y)

return function () return x,y end

end

可以用 point(1,2) 构造一个 point 。它比 {1,2} 轻量。

还可以有一个更复杂一点的实现：

function point (x,y)

return function (idx)

if idx==”x” then return x

elseif idx==”y” then return y

else return x,y end

end

end
```