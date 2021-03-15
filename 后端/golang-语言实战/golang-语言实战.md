golang-����ʵս Ŀ¼
[TOC]
***

# ǰ��



# �Ƽ��Ķ�

- ��Go ����ʵս��

# 0. �﷨����

## 0. ����

1. ��װ�����أ�[Go](https://golang.org/dl/)

## `UNIX/Linux/Mac OS`

```shell
tar -C /usr/local -xzf go1.4.linux-amd64.tar.gz

export PATH=$PATH:/usr/local/go/bin
```



## 1. ���б���

```shell
// run
go run hello.go

// build���ɶ�����
go build hello.go
./hello
```

## �����﷨

```go
package main
import "fmt"
func main() {
    fmt.Println("Google" + "Runoob")
}
```

## �ؼ���

| break    | default     | func   | interface | select |
| -------- | ----------- | ------ | --------- | ------ |
| case     | defer       | go     | map       | struct |
| chan     | else        | goto   | package   | switch |
| const    | fallthrough | if     | range     | type   |
| continue | for         | import | return    | var    |

�������Ͻ��ܵ���Щ�ؼ��֣�Go ���Ի��� 36 ��Ԥ�����ʶ����

| append | bool    | byte    | cap     | close  | complex | complex64 | complex128 | uint16  |
| ------ | ------- | ------- | ------- | ------ | ------- | --------- | ---------- | ------- |
| copy   | false   | float32 | float64 | imag   | int     | int8      | int16      | uint32  |
| int32  | int64   | iota    | len     | make   | new     | nil       | panic      | uint64  |
| print  | println | real    | recover | string | true    | uint      | uint8      | uintptr |

## �ո��

- `go`���������������ÿո����: `var age int`

## ��ʽ���ַ���

```go
package main

import (
    "fmt"
)

func main() {
   // %d ��ʾ�������֣�%s ��ʾ�ַ���
    var stockcode=123
    var enddate="2020-12-31"
    var url="Code=%d&endDate=%s"
    var target_url=fmt.Sprintf(url,stockcode,enddate)
    fmt.Println(target_url)
}
```

> Code=123&endDate=2020-12-31

## ��������

| 1    | **������** �����͵�ֵֻ�����ǳ��� true ���� false��һ���򵥵����ӣ�var b bool = true�� |
| ---- | ------------------------------------------------------------ |
| 2    | **��������** ���� int �͸����� float32��float64��Go ����֧�����ͺ͸��������֣�����֧�ָ���������λ��������ò��롣 |
| 3    | **�ַ�������:** �ַ�������һ���̶����ȵ��ַ������������ַ����С�Go ���ַ������ɵ����ֽ����������ġ�Go ���Ե��ַ������ֽ�ʹ�� UTF-8 �����ʶ Unicode �ı��� |
| 4    | **��������:** ������(a) ָ�����ͣ�Pointer��(b) ��������(c) �ṹ������(struct)(d) Channel ����(e) ��������(f) ��Ƭ����(g) �ӿ����ͣ�interface��(h) Map ���� |

## ���Ա���

### 1. ָ������

- `var v_name v_type`��û��ָ��Ĭ��Ϊ0
- `var a = "xx"`

### 2. �Զ��ж�

- `var v_name = value`
- `var d = true`

### 3. ʡ��`var`������`:=`

- `v_name := value`

### 4. ���������

- `var vname1, vname2, vname3 type`
- `var vname1, vname2 vname3 = v1, v2, v3`
- `vname1, vname2, vname3 := v1, v2, v3`
- `var a string = "abc"`



## ֵ���ͺ���������

- `&i`��ȡ�ڴ��ַ����`0xf8400000040`

## �հױ�ʶ��������ֵ

- `_, b = b, a`
- �»���������ֵ

## ����

- `const vname type = value`

### `iota`

- `const`�����е�������
- iota �� const�ؼ��ֳ���ʱ��������Ϊ 0(const �ڲ��ĵ�һ��֮ǰ)��const ��ÿ����һ�г���������ʹ iota ����һ��

```go
package main

import "fmt"

func main() {
    const (
            a = iota   //0
            b          //1
            c          //2
            d = "ha"   //����ֵ��iota += 1
            e          //"ha"   iota += 1
            f = 100    //iota +=1
            g          //100  iota +=1
            h = iota   //7,�ָ�����
            i          //8
    )
    fmt.Println(a,b,c,d,e,f,g,h,i)
}
```

## �����

- `&i`��ȡ��ַ
- `p *int`ָ�����

## ���������

- `go`û����Ŀ���������֧��`xx ? a:b`

## ѭ�����

- ֻ��`for`

## ����

- ���Է��ض��ֵ

```go
/* �������������������ֵ */
func max(num1, num2 int) int {
   /* ����ֲ����� */
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

## ����

- `var variable_name [SIZE] variable_type`
- `var balance [10] float32`

### ��ʼ������

- `var balance = [5]float32{1000.0, 2.0, 3.4, 7.0, 50.0}`
- `balance := [5]float32{1000.0, 2.0, 3.4, 7.0, 50.0}`

```go
var balance = [...]float32{1000.0, 2.0, 3.4, 7.0, 50.0}
��
balance := [...]float32{1000.0, 2.0, 3.4, 7.0, 50.0}
```

```go
//  ������Ϊ 1 �� 3 ��Ԫ�س�ʼ��
balance := [5]float32{1:2.0,3:7.0}
```

## ָ��

- `printf("%x", &a) `ȡ��ַ
- `printf("%n", *a)`ȡֵ

## �ṹ��

```go
type struct_variable_type struct {
   member definition
   member definition
   ...
   member definition
}

variable_name := structure_variable_type {value1, value2...valuen}
��
variable_name := structure_variable_type { key1: value1, key2: value2..., keyn: valuen}

    // Ҳ����ʹ�� key => value ��ʽ
    fmt.Println(Books{title: "Go ����", author: "www.runoob.com", subject: "Go ���Խ̳�", book_id: 6495407})
```

- `�ṹ��.��Ա��`�����ʽṹ���Ա



## ��Ƭ

- ��Ƭ�Ƕ�����ĳ���
- �����������Ƭ�ĳ����ǲ��̶��ģ�����׷��Ԫ�أ���׷��ʱ����ʹ��Ƭ����������

- `var identifier []type`

```go
var slice1 []type = make([]type, len)

Ҳ���Լ�дΪ

slice1 := make([]type, len)
```

### ��Ƭ��ʼ��

- `s :=[] int {1,2,3 } `
- `s := arr[:] `
- `s := arr[startIndex:endIndex] `
- `numbers1 := make([]int,0,5)`

- `append(), copy()`��������Ƭ�����������Ǳ��봴��һ���µĸ������Ƭ����ԭ��Ƭ�����ݶ���������

## `Range`

- `range `�ؼ�������` for `ѭ���е�������(array)����Ƭ(slice)��ͨ��(channel)�򼯺�(map)��Ԫ�ء����������Ƭ��������Ԫ�ص�������������Ӧ��ֵ���ڼ����з��� key-value ��

```go
for _, num := range nums {
    sum += num
}
```

## `map`����

- `Map` ��һ������ļ�ֵ�Եļ���

- `var map_variable map[key_data_type]value_data_type`
- `map_variable := make(map[key_data_type]value_data_type)`

```go
var countryCapitalMap map[string]string /*�������� */
countryCapitalMap = make(map[string]string)
```

## ����ת��

- `type_name(expression)`
- `mean = float32(sum)/float32(count)`

## �ӿ�

- �ṩ������һ���������ͼ��ӿڣ��������еľ��й��Եķ���������һ���κ���������ֻҪʵ������Щ��������ʵ��������ӿ�

```go
/* ����ӿ� */
type interface_name interface {
   method_name1 [return_type]
   method_name2 [return_type]
   method_name3 [return_type]
   ...
   method_namen [return_type]
}


/* ����ṹ�� */
type struct_name struct {
   /* variables */
}


/* ʵ�ֽӿڷ��� */
func (struct_name_variable struct_name) method_name1() [return_type] {
   /* ����ʵ�� */
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



## ����

- `go`����`goroutine`
- `go ������( �����б� )`
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

## ͨ��

- �������������ݵ�һ�����ݽṹ
- ���������� goroutine ֮��ͨ������һ��ָ�����͵�ֵ��ͬ�����к�ͨѶ
- ������ `<-` ����ָ��ͨ���ķ��򣬷��ͻ���ա����δָ��������Ϊ˫��ͨ��

```go
ch <- v    // �� v ���͵�ͨ�� ch
v := <-ch  // �� ch ��������
           // ����ֵ���� v
```

- `ch := make(chan int)`
- `ch := make(chan int, 100)`ͨ�� make �ĵڶ�������ָ����������С
- `close(c)`

```go
package main

import "fmt"

func sum(s []int, c chan int) {
        sum := 0
        for _, v := range s {
                sum += v
        }
        c <- sum // �� sum ���͵�ͨ�� c
}

func main() {
        s := []int{7, 2, 8, -9, 4, 0}

        c := make(chan int)
        go sum(s[:len(s)/2], c)
        go sum(s[len(s)/2:], c)
        x, y := <-c, <-c // ��ͨ�� c �н���

        fmt.Println(x, y, x+y)
}
```

## �����Ƽ�

- [GoLand](https://www.jetbrains.com/go/)
- [LiteIDE-files](http://sourceforge.net/projects/liteide/files/)
- [LitelDE-github](https://github.com/visualfc/liteide)

# 1. `Go`����

- �������ö���ģ���Ч���ô���
- `Go`ʹ���˸������ܵı�����������˱����ٶ�
  - ֻ���ע��Щֱ�ӱ����õĿ⣬������`java,c/c++`���������������������Ŀ�
- ��������ǿ
  - `goroutine`�����̣߳�����ռ���ڴ�Զ�����߳�
  - `channel`���û��ڲ�ͬ��`goroutine`֮��ͬ�����;������͵���Ϣ

## 1. `goroutine`

- ���Ժ�����`goroutine`����ִ�еĺ�����Ҳ�����������ڣ�����ִ��
- ��`Go`��ʹ��ͬһ���߳���ִ�ж��`goroutine`

```go
func log(msg string) {
    ...
}

go log("terrible")
```

![image-20210315124659226](.\img\0-goroutine.png)

## 2. ͨ��

- һ�����ݽṹ����`goroutine`֮����а�ȫ������ͨ�ţ����ⳣ���Ĺ����ڴ���ʵ�����
- �����ѵ㣺ȷ�������������еĽ��̡��̡߳�`goroutine`�����޸��û�������
- ���Ҫʹ��ȫ�ֱ������߹����ڴ棬����ʹ�ø��ӵ�������
- ͨ����֤ͬһʱ��ֻ����һ��`goroutine`�޸�����

## 3. ����ϵͳ

- ������ģʽ
  - ֻҪ��һ������Ƕ�뵽��һ�����ͣ����ܸ������еĹ���

Ѽ������

- һ������ʵ����һ���ӿڣ�ִ��һ���ض�����Ϊ�������������
- ��������Ѽ�ӣ������񣬾���Ѽ��

�ӿڣ�

```java
interface User {
    public void login();
    public void logout();
}
```

- `Go`�Ľӿ��ṩ��һ���򵥷���

```go
type Reader interface {
    Read(p []byte) (n int, err error)
}
```

## 4. �ڴ����

- `Go`����Ҫ����Ա�����ڴ����

## 5. �������

```go
//Go ������֯�ɰ�
package main

// import�ⲿ����
// fmt�����ڸ�ʽ�����������
import "fmt"

// ���
func main() {
    fmt.Println("Hello World!");
}
```

## 6. �ܽ�

- ���öԲ�����֧��
- ʹ�ýӿ���Ϊ���븴�õĻ���ģ��

# 2. `Go`����

## 1. ����ܹ�

![image-20210315133258106](.\img\1-bridge.png)

��Ŀ�ṹ��

```shell
cd $GOPATH/src/github.com/goinaction/code/chapter2

- sample
    - data
        data.json -- ����һ������Դ
     - matchers
        rss.go -- ���� rss Դ��ƥ����
     - search
        default.go -- ���������õ�Ĭ��ƥ����
        feed.go -- ���ڶ�ȡ json �����ļ�
        match.go -- ����֧�ֲ�ͬƥ�����Ľӿ�
        search.go -- ִ���������������߼�
    main.go -- ��������
```

## 2. `main`��

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

- һ��������һ�������Ĵ��룬���������ռ�3

- `_ "xxx"`ǰ����»�����`Go`�԰�����ʼ��������������ʹ�ð���ı�ʶ��
- `Go`���������������ȱ��ʹ�ã��»��������벻ʹ��

## 3. �������� - `GOROOT, GOPATH`

```go
GOROOT="/Users/me/go"
GOPATH="/Users/me/spaces/go/projects"

var matches = make(map[string]Matcher)
```

- `map`��һ���������ͣ���Ҫ��`make`����

### ����������

```go
func Run(searchTerm string)
```
### ��Ƭ��

```go
feeds, err := RetrieveFeeds()
if err != nil {
    log.Fatal(err)
}
```

- `Feed`������Ƭ����̬�������������
- `err`����ֵ���Զ�����`Fatal`
- һ���������ض������ֵ������ֵ�ʹ���ֵ
  - ����������󣬲���ʹ����һ��ֵ

- `:=`�����������������������ͬʱ����ֵ����`var`����û������

### `make`��

```go
result := make(chan *Result)
```

- `make`��������һ���޻����ͨ��

### ����`goroutine`��

```go
var waitGroup sync.WaitGroup
waitGroup.Add(len(feeds))
```

- `waitGroup`�����ź���

### `for-range`ѭ����

```go
for _, feed := range feeds{}
```

- `_`��ռλ��������`range`���÷��ص�����ֵ�ı���
- Ҫ���ú������ض��ֵ������Ҫ���е�ĳ��ֵ������`_`������Ե�

### ����������ָ�룺

```go
// ����һ������������ִ��
go func(matcher Matcher, feed *Feed){}(matcher, feed)
```

- ָ����������ں���֮�乲������
- �ؼ���`go`����һ��`goroutine`��������������
- `(matcher, feed)`����������ֵ������������

### `Go`֧�ֱհ���

- ������������ֱ�ӷ�����㺯������������Щû����Ϊ��������ı���

### ��ȡ`data.json`����Դ��

```go
package search

import (
	"encoding/json"
    "os"
)

const dataFile = "data/data.json"
```

- `josn`���ṫ�����`JSON`����
- `os`�ṩ���ʲ���ϵͳ����
- `go`���������Ը��ݸ�ֵ������ұߵ�ֵ���Ƶ����ͣ�����������ʱ����Ҫָ�����ͣ�ֻ���ڱ�����ʹ��

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

### һ���ṹ��ɵ���Ƭ��

```go
type Feed struct {
    Name	string	`json"site"`
    URI	string	`json:"link"`
    Type	string	`json:"type"`
}
```

- `Feed`�ṹ���ͻ���Ⱪ¶
- ��������Ĳ��ֱ���Ϊ��ǣ�������`JSON`�����Ԫ���ݣ�ÿ����ǽ��ṹ��������ֶζ�Ӧ��`JSON`�ĵ���ָ�����ֵ��ֶ�

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

- `defer`���������ĺ��������ں�������ʱִ��

### `interface`

```go
func (dec *Decoder) Decode(v interface{}) error
```

### �ӿ�

```go
type Matcher interface {
    Search(feed *Feed, searchTerm string) ([]*result, error)
}
```

����ӿ�ʱ��

- ����ӿ�����ֻ����һ������������������`er`��β
- ����ڲ������˶��������������Ҫ����Ϊ����

### `defaultMatcher`

```go
type defaultMatcher struct{}
```

- �սṹ�����ڴ���ʵ��ʱ����������κ��ڴ棬���ʺϴ���û���κ�״̬������

