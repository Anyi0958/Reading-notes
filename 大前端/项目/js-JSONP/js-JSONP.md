js-JSONP 目录
[TOC]
***

# 前言

- `JSONP`是`JSON with Padding`的简写，在`web`服务上流行的一种`JSON`变体
- 包在一个函数调用里
- 格式：回调和数据
- 回调：页面接收到响应后调用的函数，动态指定
- 数据：参数传递给回调函数的`JSON`数据

`http://xxx/?callback=handleResponse`

- 动态创建`<script>`，并指定跨域`url`实现

# 代码展示

## `main.js`

```js
function callbackFunction(result, methodName)
{
    var html = '<ul>';
    for(var i = 0; i < result.length; i++)
    {
        html += '<li>' + result[i] + '</li>';
    }
    html += '</ul>';
    document.getElementById('divCustomers').innerHTML = html;
}
```

## `jsonp.php`

```php
<?php
header('Content-type: application/json');
//获取回调函数名
$jsoncallback = htmlspecialchars($_REQUEST ['jsoncallback']);
//json数据
$json_data = '["customername1","customername2"]';
//输出jsonp格式的数据
echo $jsoncallback . "(" . $json_data . ")";
?>
```

## 客户端完整页面代码

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>JSONP 实例</title>
</head>
<body>
<div id="divCustomers"></div>
<script type="text/javascript">
function callbackFunction(result, methodName)
{
    var html = '<ul>';
    for(var i = 0; i < result.length; i++)
    {
        html += '<li>' + result[i] + '</li>';
    }
    html += '</ul>';
    document.getElementById('divCustomers').innerHTML = html;
}
</script>
<script type="text/javascript" src="https://www.runoob.com/try/ajax/jsonp.php?jsoncallback=callbackFunction"></script>
</body>
</html>
```

