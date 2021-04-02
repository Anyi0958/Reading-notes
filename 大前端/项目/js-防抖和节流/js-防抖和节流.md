js-�����ͽ��� Ŀ¼
[TOC]
***

# ǰ��

- ��������ʱʱ���ڴ�����������ִֻ��һ��
  - ԭ�����ö�ʱ������ָ����`x`ʱ���ִ���¼������ڼ�ÿ�δ����¼��������ö�ʱ����
  - Ŀ�ģ�`n`���ڶ�ε����Ϊ1��
  - Ӧ�ã���ͼ���
- ��������һ��ʱ��ִ��һ�Σ��ڼ��δ�������Ӧ
  - ԭ�����ö�ʱ������`x`ʱ���ִ���¼��������¼�ִ����������ʱ����
  - Ŀ�ģ�`n`����ֻ�ܵ��1��
  - Ӧ�ã��ı��������ύ

# �Ƽ��Ķ�

- [��дʵ�ַ��������-codee](https://blog.csdn.net/liz9411/article/details/107017467/?spm=1001.2101.3001.4242)
- [JS�����ͽ���-Lee](https://blog.csdn.net/weixin_42120780/article/details/106934299)

# ����չʾ

## ����

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

### ��汾

```html
<!DOCTYPE html>
 
<html>
<!-- ���� -->
<!-- ����������n���� ��ֹ������������n���ڴ�������һ�Σ��Ǿ����¼��� -->
 
<body>
  <div id="content"
    style="height:150px;line-height:150px;text-align:center; color: #fff;background-color:#ccc;font-size:80px;"></div>
  <script>
    let num = 1;
    let content = document.getElementById('content');
    /**
     *������ִ�а�
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
     *����ִ�а�
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
     *�ۺϰ�
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

## ����

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

### ��汾

```js
<!DOCTYPE html>
 
<html>
<!-- ���� -->
<!-- ������Ϊ�˹̶���ʱ�����ֻ�ܵ��һ�� -->
 
<body>
  <div id="content"
    style="height:150px;line-height:150px;text-align:center; color: #fff;background-color:#ccc;font-size:80px;"></div>

</body>
  <script>
    let num = 1;
    let content = document.getElementById('content');
    /**
     *throttleTime ʱ�����
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
     *throttleSet ��ʱ����
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



