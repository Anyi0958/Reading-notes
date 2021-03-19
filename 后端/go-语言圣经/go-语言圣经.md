go-����ʥ�� Ŀ¼
[TOC]
***

# ǰ��

- �Ķ��ʼ�

��Ҫ���ݣ�

1. ��Go�������ʵ�����ƶ�д�ļ����ı���ʽ��������ͼ������ͻ��˺ͷ�����ͨѶ���ճ�����
2. ��Ϲ���
3. ������panic��recover������defer���
4. ˳��ͨ�Ž���`CSP`�Ĳ�����̣�`goroutine, channels`
5. ����

# �Ƽ��Ķ�

- [Go����ʥ��](https://studygolang.com/book/42)
- ���д������ӣ�[gopl](http://gopl.io)
- [����](https://golang.org)

# ����

- [Go install](https://golang.org/doc/install )

```shell
$ export GOPATH=$HOME/gobook    # ѡ����Ŀ¼
$ go get gopl.io/ch1/helloworld # ��ȡ/����/��װ
$ $GOPATH/bin/helloworld        # ���г���
Hello, ����                     # ��������
```

# 1. �������

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello World")
}
```

- `go run hello.go`
- `go build hello.go`

## `for`

```go
package main

import (
	"fmt"
	"os"
)

func main() {
    var s, sep string
    for i := 1; i < len(o.Args); i++ {
        s += sep + os.Args[i]
        sep = " "
    }
    fmt.Println(s)
}
```

## `for-range`

```go
package main

import (
	"fmt"
    "os"
)

func main() {
    s, sep := "", ""
    for _, arg := range os.Args[1:] {
        s += sep + arg
        sep = " "
    }
    
    fmt.Println(s)
}
```

## `Join`

```go
func main() {
    fmt.Println(strings.Join(os.Args[1:], " "))
}
```

## ϰ��

### 1

 �޸�`echo`����ʹ���ܹ���ӡ`os.Args[0]`������ִ������������

```go
package main

import (
	"fmt"
    "os"
)

func main() {
    s := ""
    fmt.Println(s + os.Args[0])
}
```

### 2

�޸�`echo`����ʹ���ӡÿ��������������ֵ��ÿ��һ�С�

```go
package main

import(
	"fmt"
	"os"
)

func main() {
	for index, val := range os.Args[0:] {
		fmt.Println(index, val)
	}
}
```

### 3

��ʵ�����Ǳ�ڵ�Ч�İ汾��ʹ����`strings.Join`�İ汾������ʱ����졣��1.6�ڽ����˲���`time`����11.4��չʾ�����д��׼���Գ����Եõ�ϵͳ�Ե��������⡣��

```go

```



## �����ظ���

- ���ļ�����������ӡ������������ͳ�ƻ���������ĳ�����һ�����ĳ���ṹ
- `bufio`��ʹ�����������������ָ�Ч

```shell
%d          ʮ��������
%x, %o, %b  ʮ�����ƣ��˽��ƣ�������������
%f, %g, %e  �������� 3.141593 3.141592653589793 3.141593e+00
%t          ������true��false
%c          �ַ���rune�� (Unicode���)
%s          �ַ���
%q          ��˫���ŵ��ַ���"abc"��������ŵ��ַ�'c'
%v          ��������Ȼ��ʽ��natural format��
%T          ����������
%%          �����ϵİٷֺű�־���޲�������
```



### 1 - `bufio, input.Scan()`

```go
package main

import (
	"fmt"
	"os"
	"bufio"
)

func main() {
	counts := make(map[string]int)
	input := bufio.NewScanner(os.Stdin)

	for input.Scan() {
		counts[input.Text()]++
	}

	for line, n := range counts {
		if n > 1 {
			fmt.Println("%d\t%s\n", n, line)
		}
	}
}
```

### 2 - `Fprintf, os.Open`

```go
package main

import (
	"fmt"
	"bufio"
	"os"
)

func main() {
	counts := make(map[string]int)
	files := os.Args[1:]

	if len(files) == 0 {
		countLines(os.Stdin, counts)
	} else {
		for _, arg := range files {
			f, err := os.Open(arg)
			if err != nil {
				fmt.Fprintf(os.Stderr, "dup2: %v\n", err)
				continue
			}

			countLines(f, counts)
			f.Close()
		}
	}

	for line, n := range counts {
		if n > 1 {
			fmt.Println("%d\t%s\n", n, line)
		}
	}
}

func countLines(f *os.File, counts map[string]int){
	input := bufio.NewScanner(f)

	for input.Scan() {
		counts[input.Text()]++
	}
}
```

### 3

```go
package main

import (
	"fmt"
	"os"
	"strings"
	"io/ioutil"
)

func main() {
	counts := make(map[string]int)

	for _, filename := range os.Args[1:] {
		data, err := ioutil.ReadFile(filename)

		if err != nil {
			fmt.Fprintf(os.Stderr, "dup3: %v\n", err)
			continue
		}

		for _, line := range strings.Split(string(data), "\n") {
			counts[line]++
		}
	}

	for line, n := range counts {
		if n > 1 {
			fmt.Println("%d\t%s\n", n, line)
		}
	}
}
```



## ϰ��

### 4

�޸�`dup2`�������ظ�����ʱ��ӡ�ļ����ơ�

## `GIF`����

- `const, >, struct`

```go
// Lissajous generates GIF animations of random Lissajous figures.
package main

import (
    "image"
    "image/color"
    "image/gif"
    "io"
    "math"
    "math/rand"
    "os"
    "time"
)

var palette = []color.Color{color.White, color.Black}

const (
    whiteIndex = 0 // first color in palette
    blackIndex = 1 // next color in palette
)

func main() {
    // The sequence of images is deterministic unless we seed
    // the pseudo-random number generator using the current time.
    // Thanks to Randall McPherson for pointing out the omission.
    rand.Seed(time.Now().UTC().UnixNano())
    lissajous(os.Stdout)
}

func lissajous(out io.Writer) {
    const (
        cycles  = 5     // number of complete x oscillator revolutions
        res     = 0.001 // angular resolution
        size    = 100   // image canvas covers [-size..+size]
        nframes = 64    // number of animation frames
        delay   = 8     // delay between frames in 10ms units
    )

    freq := rand.Float64() * 3.0 // relative frequency of y oscillator
    anim := gif.GIF{LoopCount: nframes}
    phase := 0.0 // phase difference
    for i := 0; i < nframes; i++ {
        rect := image.Rect(0, 0, 2*size+1, 2*size+1)
        img := image.NewPaletted(rect, palette)
        for t := 0.0; t < cycles*2*math.Pi; t += res {
            x := math.Sin(t)
            y := math.Sin(t*freq + phase)
            img.SetColorIndex(size+int(x*size+0.5), size+int(y*size+0.5),
                blackIndex)
        }
        phase += 0.1
        anim.Delay = append(anim.Delay, delay)
        anim.Image = append(anim.Image, img)
    }
    gif.EncodeAll(out, &anim) // NOTE: ignoring encoding errors
}
```

- �������������ж��ǿ��Թ����
- `[]color.Color{...}, gif.GIF{...}`����������

## ϰ��

### 5

�޸�ǰ���`Lissajous`������ĵ�ɫ�壬�ɺ�ɫ��Ϊ��ɫ�����ǿ�����`color.RGBA{0xRR, 0xGG, 0xBB, 0xff}`���õ�`#RRGGBB`���ɫֵ������ʮ�����Ƶ��ַ����ֱ����졢�̡�������

```go

```

### 6

�޸�`Lissajous`�����޸����ɫ�������ɸ��ḻ����ɫ��Ȼ���޸�`SetColorIndex`�ĵ�����������������ʾ����ɡ�

```go

```

## ��ȡ`URL`

- չʾ����`HTTP`��ȡ��Ϣ�ķ�ʽ

```shell
$ go build gopl.io/ch1/fetch
$ ./fetch http://gopl.io
```

```go
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
)


func main() {
	for _, url := range os.Args[1:] {
		resp, err := http.Get(url)
		if err != nil {
			fmt.Fprintf(os.Stderr, "fetch: %v\n", err)
			os.Exit(1)
		}

		b, err := ioutil.ReadAll(resp.Body)
		resp.Body.Close()

		if err != nil {
			fmt.Fprintf(os.Stderr, "fetch: reading %s: %v\n", url, err)
			os.Exit(1)
		}

		fmt.Printf("%s", b)
	}
}
```

- `resp.Body`������һ���ɶ��ķ�������Ӧ��
- `ioutil.ReadAll`��`response`�ж�ȡȫ��������
- `resp.Body.Close`�ر�`resp`��`Body`������ֹ��Դй¶��`Printf`�����Ὣ���bд������׼�������
- `os.Exit(1)`���������Զ��Ƴ�

## ϰ��

### 7

 ��������io.Copy(dst, src)���src�ж�ȡ���ݣ����������Ľ��д�뵽dst�У�ʹ�������������������е�ioutil.ReadAll��������Ӧ�ṹ�嵽os.Stdout����������һ���������������е�b�����洢���ǵô���io.Copy���ؽ���еĴ���

```go

```

### 8

�޸�fetch�����������������url����û�� `http://` ǰ׺�Ļ���Ϊ���url���ϸ�ǰ׺������ܻ��õ�strings.HasPrefix�������

```go

```

### 9

�޸�fetch��ӡ��HTTPЭ���״̬�룬���Դ�resp.Status�����õ���״̬�롣

```go

```

## ������ȡ���`URL`

�����ַ��

```shell
$ go build gopl.io/ch1/fetchall
$ ./fetchall https://golang.org http://gopl.io https://godoc.org
0.14s     6852  https://godoc.org
0.16s     7261  https://golang.org
0.48s     2475  http://gopl.io
0.48s elapsed
```





```go
// Fetchall fetches URLs in parallel and reports their times and sizes.
package main

import (
    "fmt"
    "io"
    "io/ioutil"
    "net/http"
    "os"
    "time"
)

func main() {
    start := time.Now()
    ch := make(chan string)
    for _, url := range os.Args[1:] {
        go fetch(url, ch) // start a goroutine
    }
    for range os.Args[1:] {
        fmt.Println(<-ch) // receive from channel ch
    }
    fmt.Printf("%.2fs elapsed\n", time.Since(start).Seconds())
}

func fetch(url string, ch chan<- string) {
    start := time.Now()
    resp, err := http.Get(url)
    if err != nil {
        ch <- fmt.Sprint(err) // send to channel ch
        return
    }
    nbytes, err := io.Copy(ioutil.Discard, resp.Body)
    resp.Body.Close() // don't leak resources
    if err != nil {
        ch <- fmt.Sprintf("while reading %s: %v", url, err)
        return
    }
    secs := time.Since(start).Seconds()
    ch <- fmt.Sprintf("%.2fs  %7d  %s", secs, nbytes, url)
}
```

- `channel`��`goroutine`֮����в�������
- `main`����Ҳ������һ��`goroutine`

## ϰ��

### 10

��һ���������Ƚϴ����վ���ñ�С���еĳ��������վ�Ļ�����ԣ���ÿ��URLִ���������󣬲鿴����ʱ���Ƿ��нϴ�Ĳ�𣬲���ÿ�λ�ȡ������Ӧ�����Ƿ�һ�£��޸ı����еĳ��򣬽���Ӧ���������Ա��ڽ��жԱȡ�

```go
package main

import (
	"fmt"
	"io"
	_ "io/ioutil"
	"net/http"
	"os"
	"time"
)

func main() {
	start := time.Now()

	ch := make(chan string)
	ch2 := make(chan string)
	for _, url := range os.Args[1:] {
		go fetch(url, ch)
		go fetch(url, ch2)
	}

	for range os.Args[1:]{
		fmt.Println(<-ch)
		fmt.Println(<-ch2)
	}

	fmt.Printf("%.2fs elapsed\n", time.Since(start).Seconds())
}

func fetch(url string, ch chan<- string) {
	start := time.Now()
	resp, err := http.Get(url)

	if err != nil {
		ch <- fmt.Sprint(err)
		return
	}

	var body io.Writer
	nbytes, err := io.Copy(body, resp.Body)
	resp.Body.Close()

	if err != nil {
		ch <- fmt.Sprintf("while reading %s : %v", url, err)
		return
	}

	secs := time.Since(start).Seconds()
	ch <- fmt.Sprintf("%.2fs %7d %s", secs, nbytes, url)
}
```

### 11

 ��`fetchall`�г���ʹ�ó�һЩ�Ĳ����б�����ʹ����alexa.com���ϰ�����վ��������ǰ�ġ����һ����վû�л�Ӧ�����򽫲�ȡ��������Ϊ����Section8.9 ����������������µ�Ӧ�Ի��ƣ���

```go

```

## `web`����

```shell
$ go run src/gopl.io/ch1/server1/main.go &

$ go build gopl.io/ch1/fetch
$ ./fetch http://localhost:8000
URL.Path = "/"
$ ./fetch http://localhost:8000/help
URL.Path = "/help"
```

```go
// Server1 is a minimal "echo" server.
package main

import (
    "fmt"
    "log"
    "net/http"
)

func main() {
    http.HandleFunc("/", handler) // each request calls handler
    log.Fatal(http.ListenAndServe("localhost:8000", nil))
}

// handler echoes the Path component of the request URL r.
func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "URL.Path = %q\n", r.URL.Path)
}
```

- ͳ�Ʊ����ʵ��ܴ���

```go
// Server2 is a minimal "echo" and counter server.
package main

import (
    "fmt"
    "log"
    "net/http"
    "sync"
)

var mu sync.Mutex
var count int

func main() {
    http.HandleFunc("/", handler)
    http.HandleFunc("/count", counter)
    log.Fatal(http.ListenAndServe("localhost:8000", nil))
}

// handler echoes the Path component of the requested URL.
func handler(w http.ResponseWriter, r *http.Request) {
    mu.Lock()
    count++
    mu.Unlock()
    fmt.Fprintf(w, "URL.Path = %q\n", r.URL.Path)
}

// counter echoes the number of calls so far.
func counter(w http.ResponseWriter, r *http.Request) {
    mu.Lock()
    fmt.Fprintf(w, "Count %d\n", count)
    mu.Unlock()
}
```

- ������ÿһ�ν���������ʱ��������һ��goroutine�������������Ϳ���ͬһʱ�䴦��������Ȼ���ڲ�������£������������������ͬһʱ��ȥ����count����ô���ֵ���ܲ����ᱻ��ȷ�����ӣ����������ܻ�����һ�����ص�bug����̬����
- Ϊ�˱���������⣬���Ǳ��뱣֤ÿ���޸ı��������ֻ����һ��goroutine����Ҳ���Ǵ������`mu.Lock()`��`mu.Unlock()`���ý��޸�count��������Ϊ�����м��Ŀ��

��ӡ`http`ͷ��`form`����

```go
package main

import (
	"fmt"
	"net/http"
	"log"
	"sync"
)

var count int
var mu sync.Mutex

func main() {
	http.HandleFunc("/", handler)
	http.HandleFunc("/count", counter)
	log.Fatal(http.ListenAndServe("localhost:8000", nil))
}

func handler(w http.ResponseWriter, r *http.Request){
	fmt.Fprintf(w, "%s %s %s\n", r.Method, r.URL, r.Proto)

	for k, v := range r.Header {
		fmt.Fprintf(w, "Header[%q] = %q\n", k, v)
	}

	fmt.Fprintf(w, "Host = %q\n", r.Host)
	fmt.Fprintf(w, "RemoteAddr = %q\n", r.RemoteAddr)
	if err := r.ParseForm(); err != nil {
		log.Print(err)
	}

	for k, v := range r.Form {
		fmt.Fprintf(w, "Form[%q] = %q\n", k, v)
	}
}

func counter(w http.ResponseWriter, r *http.Request) {
    mu.Lock()
    fmt.Fprintf(w, "Count %d\n", count)
    mu.Unlock()
}

```

```shell
GET / HTTP/1.1
Header["User-Agent"] = ["Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36 Edg/89.0.774.54"]
Header["Sec-Fetch-User"] = ["?1"]
Header["Accept-Encoding"] = ["gzip, deflate, br"]
Header["Connection"] = ["keep-alive"]
Header["Cache-Control"] = ["max-age=0"]
Header["Upgrade-Insecure-Requests"] = ["1"]
Header["Accept"] = ["text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"]
Header["Sec-Fetch-Site"] = ["none"]
Header["Sec-Fetch-Mode"] = ["navigate"]
Header["Sec-Fetch-Dest"] = ["document"]
Header["Accept-Language"] = ["zh-CN,zh;q=0.9,en;q=0.8,ja;q=0.7,en-GB;q=0.6,en-US;q=0.5,fr;q=0.4"]
Host = "127.0.0.1:8000"
RemoteAddr = "127.0.0.1:54446"
```

- ǰ���fetch���򣬰�HTTP����Ӧ���ݿ�������os.Stdout��lissajous�����������������һ���ļ���fetchall��������ȫ���Ե���HTTP����ӦBody��ֻ�Ǽ�����һ����ӦBody�Ĵ�С����������а���ӦBody��������ioutil.Discard���ڱ��ڵ�web������������������fmt.Fprintfֱ��д����http.ResponseWriter�С�

���ֱ�����ʽ��

```go
handler := func(w http.ResponseWriter, r *http.Request) {
    lissajous(w)
}
http.HandleFunc("/", handler)

http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    lissajous(w)
})
```

## ϰ��

### 12

�޸�Lissajour���񣬴�URL��ȡ��������������Է��� http://localhost:8000/?cycles=20 ���URL���������ʿ��Խ��������cyclesĬ�ϵ�5�޸�Ϊ20���ַ���ת��Ϊ���ֿ��Ե���strconv.Atoi�������������godoc��鿴strconv.Atoi����ϸ˵����

```go

```

# 2. ����

## `new`����

- ���ʽnew(T)������һ��T���͵�������������ʼ��ΪT���͵���ֵ��Ȼ�󷵻ر�����ַ�����ص�ָ������Ϊ`*T`

```go
p := new(int)   // p, *int ����, ָ�������� int ����
fmt.Println(*p) // "0"
*p = 2          // ���� int ����������ֵΪ 2
fmt.Println(*p) // "2"

// ��ͬ
func newInt() *int {
    return new(int)
}

func newInt() *int {
    var dummy int
    return &dummy
}
```

## ��������

- Go���Ե��Զ������ռ��������֪��һ�������Ǻ�ʱ���Ա����յ��أ�
- �������ǿ��Աܿ������ļ���ϸ�ڣ�������ʵ��˼·�ǣ���ÿ�������ı�����ÿ����ǰ���к�����ÿһ���ֲ�������ʼ��ͨ��ָ������õķ���·���������Ƿ�����ҵ��ñ�������������������ķ���·������ô˵���ñ����ǲ��ɴ�ģ�Ҳ����˵���Ƿ���ڲ�����Ӱ���������ļ�������

## �����ļ�

- һ������Դ���뱣����һ��������.goΪ�ļ���׺����Դ�ļ��У�ͨ��һ��������Ŀ¼·���ĺ�׺�ǰ��ĵ���·��

```go
// Package tempconv performs Celsius and Fahrenheit conversions.
package tempconv

import "fmt"

type Celsius float64
type Fahrenheit float64

const (
    AbsoluteZeroC Celsius = -273.15
    FreezingC     Celsius = 0
    BoilingC      Celsius = 100
)

func (c Celsius) String() string    { return fmt.Sprintf("%g��C", c) }
func (f Fahrenheit) String() string { return fmt.Sprintf("%g��F", f) }
```

```go
package tempconv

// CToF converts a Celsius temperature to Fahrenheit.
func CToF(c Celsius) Fahrenheit { return Fahrenheit(c*9/5 + 32) }

// FToC converts a Fahrenheit temperature to Celsius.
func FToC(f Fahrenheit) Celsius { return Celsius((f - 32) * 5 / 9) }
```

## ϰ��

### 2.1

**��ϰ 2.1��** ��tempconv��������͡������ͺ�����������Kelvin�����¶ȵ�ת����Kelvin ���������?273.15��C��Kelvin�����¶�1K�����϶�1��C�ĵ�λ�����һ���ġ�

```go

```





## �����

```go
// Cf converts its numeric argument to Celsius and Fahrenheit.
package main

import (
    "fmt"
    "os"
    "strconv"

    "gopl.io/ch2/tempconv"
)

func main() {
    for _, arg := range os.Args[1:] {
        t, err := strconv.ParseFloat(arg, 64)
        if err != nil {
            fmt.Fprintf(os.Stderr, "cf: %v\n", err)
            os.Exit(1)
        }
        f := tempconv.Fahrenheit(t)
        c := tempconv.Celsius(t)
        fmt.Printf("%s = %s, %s = %s\n",
            f, tempconv.FToC(f), c, tempconv.CToF(c))
    }
}
```

### 2.2

дһ��ͨ�õĵ�λת������������cf����ķ�ʽ�������ж�ȡ���������ȱʡ�Ļ����Ǵӱ�׼�����ȡ������Ȼ��������Celsius��Fahrenheit�ĵ�λת�������ȵ�λ���Զ�ӦӢ�ߺ��ף�������λ���Զ�Ӧ���͹���ȡ�

### 2.3

��дPopCount��������һ��ѭ�����浥һ�ı��ʽ���Ƚ������汾�����ܡ���11.4�ڽ�չʾ���ϵͳ�رȽ�������ͬʵ�ֵ����ܡ���

### 2.4 

����λ�㷨��дPopCount������ÿ�β������ұߵ�1bit��Ȼ��ͳ���������ȽϺͲ���㷨�����ܲ��졣

### 2.5

���ʽ`x&(x-1)`���ڽ�x����͵�һ�������bitλ���㡣ʹ������㷨��дPopCount������Ȼ��Ƚ����ܡ�

# 3. ��������

- ���ڸ���������ɵ�ͼ��

```go
// Surface computes an SVG rendering of a 3-D surface function.
package main

import (
    "fmt"
    "math"
)

const (
    width, height = 600, 320            // canvas size in pixels
    cells         = 100                 // number of grid cells
    xyrange       = 30.0                // axis ranges (-xyrange..+xyrange)
    xyscale       = width / 2 / xyrange // pixels per x or y unit
    zscale        = height * 0.4        // pixels per z unit
    angle         = math.Pi / 6         // angle of x, y axes (=30��)
)

var sin30, cos30 = math.Sin(angle), math.Cos(angle) // sin(30��), cos(30��)

func main() {
    fmt.Printf("<svg xmlns='http://www.w3.org/2000/svg' "+
        "style='stroke: grey; fill: white; stroke-width: 0.7' "+
        "width='%d' height='%d'>", width, height)
    for i := 0; i < cells; i++ {
        for j := 0; j < cells; j++ {
            ax, ay := corner(i+1, j)
            bx, by := corner(i, j)
            cx, cy := corner(i, j+1)
            dx, dy := corner(i+1, j+1)
            fmt.Printf("<polygon points='%g,%g %g,%g %g,%g %g,%g'/>\n",
                ax, ay, bx, by, cx, cy, dx, dy)
        }
    }
    fmt.Println("</svg>")
}

func corner(i, j int) (float64, float64) {
    // Find point (x,y) at corner of cell (i,j).
    x := xyrange * (float64(i)/cells - 0.5)
    y := xyrange * (float64(j)/cells - 0.5)

    // Compute surface height z.
    z := f(x, y)

    // Project (x,y,z) isometrically onto 2-D SVG canvas (sx,sy).
    sx := width/2 + (x-y)*cos30*xyscale
    sy := height/2 + (x+y)*sin30*xyscale - z*zscale
    return sx, sy
}

func f(x, y float64) float64 {
    r := math.Hypot(x, y) // distance from (0,0)
    return math.Sin(r) / r
}
```

![img](http://books.studygolang.com/gopl-zh/images/ch3-01.png)

## ϰ��

### **��ϰ 3.1** 

���f�������ص��������Ƶ�float64ֵ����ôSVG�ļ����������Ч�Ķ����Ԫ�أ���Ȼ���SVG��Ⱦ�������ƴ����������⣩���޸ĳ���������Ч�Ķ���Ρ�

### **��ϰ 3.2��** 

����math����������������Ⱦͼ�Ρ����Ƿ������һ��egg box��moguls��a saddleͼ��?

### **��ϰ 3.3** 

���ݸ߶ȸ�ÿ���������ɫ��������ֵ�����Ǻ�ɫ��#ff0000�����Ȳ�������ɫ��#0000ff����

### **��ϰ 3.4��** 

�ο�1.7��Lissajous���ӵĺ���������һ��web�����������ڼ��㺯������Ȼ�󷵻�SVG���ݸ��ͻ��ˡ���������������Content-Typeͷ����

```Go
w.Header().Set("Content-Type", "image/svg+xml")
```

����һ����Lissajous�����в��Ǳ���ģ���Ϊ������ʹ�ñ�׼��PNGͼ���ʽ�����Ը���ǰ���512���ֽ��Զ������Ӧ��ͷ����������ͻ���ͨ��HTTP����������ø߶ȡ���Ⱥ���ɫ�Ȳ�����

## ����

- Go�����ṩ�����־��ȵĸ������ͣ�complex64��complex128���ֱ��Ӧfloat32��float64���ָ��������ȡ����õ�complex�������ڹ����������ڽ���real��imag�����ֱ𷵻ظ�����ʵ�����鲿��

```go
var x complex128 = complex(1, 2) // 1+2i
var y complex128 = complex(3, 4) // 3+4i
fmt.Println(x*y)                 // "(-5+10i)"
fmt.Println(real(x*y))           // "-5"
fmt.Println(imag(x*y))           // "10"
```

### `complex128`����`Mandelbrot`ͼ

```go
// Mandelbrot emits a PNG image of the Mandelbrot fractal.
package main

import (
    "image"
    "image/color"
    "image/png"
    "math/cmplx"
    "os"
)


func main() {
    const (
        xmin, ymin, xmax, ymax = -2, -2, +2, +2
        width, height          = 1024, 1024
    )

    img := image.NewRGBA(image.Rect(0, 0, width, height))
    for py := 0; py < height; py++ {
        y := float64(py)/height*(ymax-ymin) + ymin
        for px := 0; px < width; px++ {
            x := float64(px)/width*(xmax-xmin) + xmin
            z := complex(x, y)
            // Image point (px, py) represents complex value z.
            img.Set(px, py, mandelbrot(z))
        }
    }
    png.Encode(os.Stdout, img) // NOTE: ignoring errors
}

func mandelbrot(z complex128) color.Color {
    const iterations = 200
    const contrast = 15

    var v complex128
    for n := uint8(0); n < iterations; n++ {
        v = v*v + z
        if cmplx.Abs(v) > 2 {
            return color.Gray{255 - contrast*n}
        }
    }
    return color.Black
}
```

## ϰ��

### ��ϰ 3.5

ʵ��һ����ɫ��Mandelbrotͼ��ʹ��image.NewRGBA����ͼ��ʹ��color.RGBA��color.YCbCr������ɫ

### **��ϰ 3.6��** 

�������������Խ���ÿ�����ضԼ�����ɫֵ��ƽ��ֵ��Ӱ�졣�򵥵ķ����ǽ�ÿ�����طֳ��ĸ������أ�ʵ������

### **��ϰ 3.7��** 

��һ�����ɷ���ͼ��ķ�ʽ��ʹ��ţ�ٷ������һ���������̣�����$z^4-1=0$��ÿ����㵽�ĸ����ĵ���������Ӧ��Ӱ�ĻҶȡ����̸���Ӧ�ĵ�����ɫ��ʾ��

### **��ϰ 3.8��** 

ͨ����߾��������ɸ��༶��ķ��Ρ�ʹ�����ֲ�ͬ�������͵�����ʵ����ͬ�ķ��Σ�complex64��complex128��big.Float��big.Rat������������������math/big��������Float����ָ���޾��ȵĸ�������Rat�����޾��ȵ��������������Ǽ�����ܺ��ڴ�ʹ�öԱ���Σ�����Ⱦͼ�ɼ�ʱ���ŵļ����Ƕ��٣�

### **��ϰ 3.9��** 

��дһ��web�����������ڸ��ͻ������ɷ��ε�ͼ�����пͻ���ͨ��HTTP����ָ��x��y��zoom������

## �ַ�����`Byte`��Ƭ

```go
// basename removes directory components and a .suffix.
// e.g., a => a, a.go => a, a/b/c.go => c, a/b.c.go => b.c
func basename(s string) string {
    // Discard last '/' and everything before.
    for i := len(s) - 1; i >= 0; i-- {
        if s[i] == '/' || s[i] == '\\' {
            s = s[i+1:]
            break
        }
    }
    // Preserve everything before last '.'.
    for i := len(s) - 1; i >= 0; i-- {
        if s[i] == '.' {
            s = s[:i]
            break
        }
    }
    return s
}
```

## ϰ��

**��ϰ 3.10��** ��дһ���ǵݹ�汾��comma������ʹ��bytes.Buffer�����ַ������Ӳ�����

**��ϰ 3.11��** ����comma��������֧�ָ����������һ����ѡ�������ŵĴ���

**��ϰ 3.12��** ��дһ���������ж������ַ����Ƿ����໥���ҵģ�Ҳ����˵����������ͬ���ַ������Ƕ�Ӧ��ͬ��˳��

## `iota`

```go
type Weekday int

const (
    Sunday Weekday = iota
    Monday
    Tuesday
    Wednesday
    Thursday
    Friday
    Saturday
)
```

- ���ս���Ӧ0����һΪ1����˵ȵȡ�





# 4. ������������

- ����ͽṹ���Ǿۺ����ͣ����ǵ�ֵ�����Ԫ�ػ��Ա�ֶε�ֵ���
- ��������ͬ����Ԫ����ɣ�ÿ������Ԫ�ض�����ȫ��ͬ������
- �ṹ���������칹��Ԫ����ɵ�
- ����ͽṹ�嶼���й̶��ڴ��С�����ݽṹ
- slice��map���Ƕ�̬�����ݽṹ�����ǽ�������Ҫ��̬����

## ϰ��

**��ϰ 4.1��** ��дһ����������������SHA256��ϣ���в�ͬbit����Ŀ�����ο�2.6.2�ڵ�PopCount������)

**��ϰ 4.2��** ��дһ������Ĭ������´�ӡ��׼�����SHA256���룬��֧��ͨ��������flag���ƣ����SHA384��SHA512��ϣ�㷨��

**��ϰ 4.3��** ��дreverse������ʹ������ָ�����slice��

**��ϰ 4.4��** ��дһ��rotate������ͨ��һ��ѭ�������ת��

**��ϰ 4.5��** дһ��������ԭ���������[]string�������ظ����ַ����Ĳ�����

**��ϰ 4.6��** ��дһ��������ԭ�ؽ�һ��UTF-8�����[]byte���͵�slice�����ڵĿո񣨲ο�unicode.IsSpace���滻��һ���ո񷵻�

**��ϰ 4.7��** �޸�reverse��������ԭ�ط�תUTF-8�����[]byte���Ƿ���Բ��÷��������ڴ棿

## `map`

```go
// Charcount computes counts of Unicode characters.
package main

import (
    "bufio"
    "fmt"
    "io"
    "os"
    "unicode"
    "unicode/utf8"
)

func main() {
    counts := make(map[rune]int)    // counts of Unicode characters
    var utflen [utf8.UTFMax + 1]int // count of lengths of UTF-8 encodings
    invalid := 0                    // count of invalid UTF-8 characters

    in := bufio.NewReader(os.Stdin)
    for {
        r, n, err := in.ReadRune() // returns rune, nbytes, error
        if err == io.EOF {
            break
        }
        if err != nil {
            fmt.Fprintf(os.Stderr, "charcount: %v\n", err)
            os.Exit(1)
        }
        if r == unicode.ReplacementChar && n == 1 {
            invalid++
            continue
        }
        counts[r]++
        utflen[n]++
    }
    fmt.Printf("rune\tcount\n")
    for c, n := range counts {
        fmt.Printf("%q\t%d\n", c, n)
    }
    fmt.Print("\nlen\tcount\n")
    for i, n := range utflen {
        if i > 0 {
            fmt.Printf("%d\t%d\n", i, n)
        }
    }
    if invalid > 0 {
        fmt.Printf("\n%d invalid UTF-8 characters\n", invalid)
    }
}
```

## ϰ��

**��ϰ 4.8��** �޸�charcount����ʹ��unicode.IsLetter����صĺ�����ͳ����ĸ�����ֵ�Unicode�в�ͬ���ַ����

**��ϰ 4.9��** ��дһ������wordfreq���򣬱��������ı���ÿ�����ʳ��ֵ�Ƶ�ʡ��ڵ�һ�ε���Scanǰ�ȵ���input.Split(bufio.ScanWords)�������������԰����ʶ����ǰ������롣

## `json`

```go
type Movie struct {
    Title  string
    Year   int  `json:"released"`
    Color  bool `json:"color,omitempty"`
    Actors []string
}

var movies = []Movie{
    {Title: "Casablanca", Year: 1942, Color: false,
        Actors: []string{"Humphrey Bogart", "Ingrid Bergman"}},
    {Title: "Cool Hand Luke", Year: 1967, Color: true,
        Actors: []string{"Paul Newman"}},
    {Title: "Bullitt", Year: 1968, Color: true,
        Actors: []string{"Steve McQueen", "Jacqueline Bisset"}},
    // ...
}
```

## ϰ��

**��ϰ 4.10��** �޸�issues���򣬸��������ʱ����з��࣬���粻��һ���µġ�����һ��ġ�����һ�ꡣ

**��ϰ 4.11��** ��дһ�����ߣ������û��������д�������ȡ�����º͹ر�GitHub�ϵ�issue������Ҫ��ʱ���Զ����û�Ĭ�ϵı༭�����������ı���Ϣ��

**��ϰ 4.12��** ���е�web��������xkcdҲ�ṩ��JSON�ӿڡ����磬һ�� https://xkcd.com/571/info.0.json ���󽫷���һ���ܶ���ϲ����571��ŵ���ϸ����������ÿ�����ӣ�ֻ����һ�Σ�Ȼ�󴴽�һ��������������дһ��xkcd���ߣ�ʹ����Щ������������ӡ������������ļ�������ƥ���������URL��

**��ϰ 4.13��** ʹ�ÿ��ŵ�Ӱ���ݿ��JSON����ӿڣ���������������� https://omdbapi.com/ �ϵ�Ӱ�����ֺͶ�Ӧ�ĺ���ͼ�񡣱�дһ��poster���ߣ�ͨ������������ĵ�Ӱ���֣����ض�Ӧ�ĺ�����

**��ϰ 5.1��** �޸�findlinks�����б���n.FirstChild����Ĳ��֣���ѭ������visit���ĳɵݹ���á�

**��ϰ 5.2��** ��д��������¼��HTML���г��ֵ�ͬ��Ԫ�صĴ�����

**��ϰ 5.3��** ��д�����������text�������ݡ�ע�ⲻҪ����`<script>`��`<style>`Ԫ�أ���Ϊ��ЩԪ�ض�������ǲ��ɼ��ġ�

**��ϰ 5.4��** ��չvisit������ʹ���ܹ������������͵Ľ�㣬��images��scripts��style sheets��

**��ϰ 5.5��** ʵ��countWordsAndImages�����ο���ϰ4.9��ηִʣ�

**��ϰ 5.6��** �޸�gopl.io/ch3/surface����3.2���е�corner������������ֵ��������ʹ��bare return��

**��ϰ 5.7��** ����startElement��endElement������ʹ���Ϊͨ�õ�HTML�������Ҫ�����ע�ͽ�㣬�ı�����Լ�ÿ��Ԫ�ص����ԣ�< a href='...'>����ʹ�ü��Ը�ʽ���û�к��ӽ���Ԫ�أ�����`<img/>`����`<img></img>`������д���ԣ���֤��������ĸ�ʽ��ȷ�������11�£�

**��ϰ 5.8��** �޸�pre��post������ʹ�䷵�ز������͵ķ���ֵ������falseʱ����ֹforEachNoded�ı�����ʹ���޸ĺ�Ĵ����дElementByID�����������û������id���ҵ�һ��ӵ�и�idԪ�ص�HTMLԪ�أ����ҳɹ���ֹͣ������

```Go
func ElementByID(doc *html.Node, id string) *html.Node
```

**��ϰ 5.9��** ��д����expand����s�е�"foo"�滻Ϊf("foo")�ķ���ֵ��

```Go
func expand(s string, f func(string) string) string
```

# 5. ����

## ��������

```go
// squares����һ������������
// ����������ÿ�α�����ʱ���᷵����һ������ƽ����
func squares() func() int {
    var x int
    return func() int {
        x++
        return x * x
    }
}
func main() {
    f := squares()
    fmt.Println(f()) // "1"
    fmt.Println(f()) // "4"
    fmt.Println(f()) // "9"
    fmt.Println(f()) // "16"
}
```

- ��������

```go
// prereqs��¼��ÿ���γ̵�ǰ�ÿγ�
var prereqs = map[string][]string{
    "algorithms": {"data structures"},
    "calculus": {"linear algebra"},
    "compilers": {
        "data structures",
        "formal languages",
        "computer organization",
    },
    "data structures":       {"discrete math"},
    "databases":             {"data structures"},
    "discrete math":         {"intro to programming"},
    "formal languages":      {"discrete math"},
    "networks":              {"operating systems"},
    "operating systems":     {"data structures", "computer organization"},
    "programming languages": {"data structures", "computer organization"},
}
```





## ϰ��

**��ϰ5.10��** ��дtopoSort��������map������Ƭ���Ƴ���key��������롣��֤�������ȷ�ԣ������Ψһ����

**��ϰ5.11��** �������Դ�������ʦ��΢������Ϊ��ǰ�ÿγ̡�����topSort��ʹ���ܼ������ͼ�еĻ���

**��ϰ5.12��** gopl.io/ch5/outline2��5.5�ڣ���startElement��endElement������ȫ�ֱ���depth���������޸�Ϊ����������ʹ�乲��outline�еľֲ�������

**��ϰ5.13��** �޸�crawl��ʹ���ܱ��淢�ֵ�ҳ�棬��Ҫʱ�����Դ���Ŀ¼��������Щҳ�档ֻ��������ԭʼ�����µ�ҳ�档�����ʼҳ����golang.org�£��Ͳ�Ҫ����vimeo.com�µ�ҳ�档

**��ϰ5.14��** ʹ��breadthFirst�����������ݽṹ�����磬topoSort�����еĿγ�������ϵ������ͼ�������˼�������ļ���νṹ�������������ڳ��еĹ����������·������ͼ����

**��ϰ5.15��** ��д����sum�Ŀɱ��������max��min�����ǲ�����ʱ��max��min����δ����ٱ�д���ٽ���1�������İ汾��

**��ϰ5.16��**��д������汾��strings.Join��

**��ϰ5.17��**��д������汾��ElementsByTagName����������һ��HTML������Լ����������ı�ǩ������������Щ��ǩ��ƥ�������Ԫ�ء����������2�����ӣ�

```Go
func ElementsByTagName(doc *html.Node, name...string) []*html.Node
images := ElementsByTagName(doc, "img")
headings := ElementsByTagName(doc, "h1", "h2", "h3", "h4")
```

## �ɱ����

- ���������ɱ�ĺ���

```go
func sum(vals ...int) int {
    total := 0
    for _, val := range vals {
        total += val
    }
    return total
}
```



## `Deferred`����

```go
func title(url string) error {
    resp, err := http.Get(url)
    if err != nil {
        return err
    }
    // Check Content-Type is HTML (e.g., "text/html;charset=utf-8").
    ct := resp.Header.Get("Content-Type")
    if ct != "text/html" && !strings.HasPrefix(ct,"text/html;") {
        resp.Body.Close()
        return fmt.Errorf("%s has type %s, not text/html",url, ct)
    }
    doc, err := html.Parse(resp.Body)
    resp.Body.Close()
    if err != nil {
        return fmt.Errorf("parsing %s as HTML: %v", url,err)
    }
    visitNode := func(n *html.Node) {
        if n.Type == html.ElementNode && n.Data == "title"&&n.FirstChild != nil {
            fmt.Println(n.FirstChild.Data)
        }
    }
    forEachNode(doc, visitNode, nil)
    return nil
}
```

