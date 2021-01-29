学习路线：
[TOC]
***

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