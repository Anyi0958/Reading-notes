JavaScript�߼�������Ƶ��İ� Ŀ¼
[TOC]
***
# ǰ��

��������ԴΪ����JavaScript�߼�������ơ������İ棩�����л��ᣬ������������Ϊ����

## ע��

- <p style="color:red;">���Ĳ��漰�����﷨��������Ҫ�ɹۿ�<a href="https://www.runoob.com/js/js-tutorial.html">����̳�</a></p>

# �Ƽ�

- ��JavaScript�߼�������ơ������İ棩
- ��JavaScriptѧϰָ�ϡ�

# 1. ʲô��JavaScript

## DOm
�ĵ�����ģ��(DOM):��һ��Ӧ�ñ�̽ӿ�(API)
```html
<html>
<head>
	<title>xxx</title>
</head>
<body>
<p>xxxx</p>
</body>
</html>
```

ͼ����
![1-DOM.png][01]

# 2. HTML�е�JavaScript

## `<script>`Ԫ��
### ����
- async���������ؽű�
- charset��ָ���Ĵ����ַ���
- crossorigin������Դ��������
- defer�����ĵ���������ʾ��ɺ���ִ�нű�
- integrity������ȶԽ��յ�����Դ��ָ���ļ���ǩ��������֤����Դ�������ԡ�����CDN
- language
- src
- type��������нű����Ե��������͡������`module`���򱻵���ES6ģ��

## ��̬���ؽű�
```javascript
let script = document.createElement('script');
script.src = 'test.js'
document.head.appendChild(script);
```
## XHTML�еı仯
XHTML�ǽ�HTML��ΪXML���°�װ�Ľ����
### ����
- XHTMLʹ��JavaScript����ָ��`type=text/javascript`
- �����ϸ�
- �Ѿ�����
- `//<!CDATA //]]>`��

# 3. ���Ի���
## ���ݸ���
- �﷨
- ��������
- �������
- ����

<p style="color:red;">���Ĳ��漰�����﷨���ɹۿ�����̳�</p>

## �ϸ�ģʽ
- �����淶д��
- `use strict`






[01]: ./img/1-DOM.png "1-DOM"