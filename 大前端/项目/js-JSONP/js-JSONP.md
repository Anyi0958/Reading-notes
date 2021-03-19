js-JSONP Ŀ¼
[TOC]
***

# ǰ��

- `JSONP`��`JSON with Padding`�ļ�д����`web`���������е�һ��`JSON`����
- ����һ������������
- ��ʽ���ص�������
- �ص���ҳ����յ���Ӧ����õĺ�������ָ̬��
- ���ݣ��������ݸ��ص�������`JSON`����

`http://xxx/?callback=handleResponse`

- ��̬����`<script>`����ָ������`url`ʵ��

# ����չʾ

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
//��ȡ�ص�������
$jsoncallback = htmlspecialchars($_REQUEST ['jsoncallback']);
//json����
$json_data = '["customername1","customername2"]';
//���jsonp��ʽ������
echo $jsoncallback . "(" . $json_data . ")";
?>
```

## �ͻ�������ҳ�����

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>JSONP ʵ��</title>
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

