js-防抖和节流 目录
[TOC]
***

# 前言

- 防抖：短时时间内大量触发，但只执行一次
  - 原理：设置定时器，在指定的`x`时间后执行事件处理。期间每次触发事件都会重置定时器。
  - 目的：`n`秒内多次点击视为1次
  - 应用：地图点击
- 节流：隔一段时间执行一次，期间多次触发不反应
  - 原理：设置定时器，在`x`时间后执行事件处理，当事件执行完后清除定时器。
  - 目的：`n`秒内只能点击1次
  - 应用：文本框输入提交

# 推荐阅读

- [手写实现防抖与节流-codee](https://blog.csdn.net/liz9411/article/details/107017467/?spm=1001.2101.3001.4242)
- [JS防抖和节流-Lee](https://blog.csdn.net/weixin_42120780/article/details/106934299)

# 代码展示

## 防抖

```js
function debounce (func, delay) {
	let task = null
	return function () {
		if (task) {
			clearTimeout(task)
		}
		task = setTimeout(() => {
			func.apply(this, arguments)
		}, delay)
	}
}
```

### 多版本

```html
<!DOCTYPE html>
 
<html>
<!-- 防抖 -->
<!-- 防抖就是在n秒内 防止连续触发，在n秒内触发了下一次，那就重新计算 -->
 
<body>
  <div id="content"
    style="height:150px;line-height:150px;text-align:center; color: #fff;background-color:#ccc;font-size:80px;"></div>
  <script>
    let num = 1;
    let content = document.getElementById('content');
    /**
     *非立即执行版
     **/
    function debounceNoAtOnce(func, wait) {
      let timeout;
      return function () {
        let context = this;
        let args = arguments;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          func.apply(context, args)
        }, wait);
      }
    };
 
    /**
     *立即执行版
     **/
    function debounceAtOnce(func, wait) {
      let timeout;
      return function () {
        let context = this;
        let args = arguments;
        debugger
        if (timeout) clearTimeout(timeout);
 
        let callNow = !timeout;
        timeout = setTimeout(() => {
          timeout = null;
        }, wait)
 
        if (callNow) func.apply(context, args)
      }
    }
    /**
     *聚合版
     **/
    function debounce(func, wait, immediate) {
      let timeout;
 
      return function () {
        let context = this;
        let args = arguments;
 
        if (timeout) clearTimeout(timeout);
        if (immediate) {
          var callNow = !timeout;
          timeout = setTimeout(() => {
            timeout = null;
          }, wait)
          if (callNow) func.apply(context, args)
        } else {
          timeout = setTimeout(function () {
            func.apply(context, args)
          }, wait);
        }
      }
    }
 
    function count() {
      content.innerHTML = num++;
    };
    content.onmousemove = debounce(count, 1000, true);
  </script>
</body>
<script>
</script>
 
</html>
```

## 节流

```js
function throttle (func, delay) {
		let task = null
		return function () {
			if (!task) {
				task = setTimeout (() => {
					task = null
					func.apply(this, arguments)
				}, delay)
			}
		}
}
```

### 多版本

```js
<!DOCTYPE html>
 
<html>
<!-- 节流 -->
<!-- 节流是为了固定的时间段内只能点击一次 -->
 
<body>
  <div id="content"
    style="height:150px;line-height:150px;text-align:center; color: #fff;background-color:#ccc;font-size:80px;"></div>

</body>
  <script>
    let num = 1;
    let content = document.getElementById('content');
    /**
     *throttleTime 时间戳版
     **/
    throttleTime = function (func, wait) {
      let previde = 0;
      return function () {
        let nowDate = Date.now();
        if (nowDate - previde > wait) {
          func();
          previde = nowDate;
        }
      }
    }
    /**
     *throttleSet 定时器版
     **/
    throttleSet = function (func, wait) {
      let timeout;
      return function () {
        if (!timeout) {
          timeout = setTimeout(() => {
            timeout = false
            func()
          }, wait)
        }
      }
    }
 
    function count() {
      content.innerHTML = num++;
    };
    content.onmousemove = throttleSet(count, 1000);
  </script>
 
</html>
```



