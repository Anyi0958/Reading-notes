目录：
[TOC]
***
# 前言
大部分文章都是用了JQ或者其他的工具，而少部分利用原生JS实现功能的文章又叙述不清楚，所以针对这个问题进行整理。

# 功能
制作一个输入框和下拉框：
```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <input type="text" id="test">
    <div id="perform"></div>
	<select name="list" id="show">
	</select>
</body>
<script src="main.js"></script>
</html>
```
效果：
![1-pre][01]

引入的js如果封装起来，后期使用则会更加方便：
1. `Set`是加强版的`Map`，比`Object`更加方便
2. 选择`Set`会更加方便
```js
class SearchList {
	constructor(url, setList = new Set()){
		this.setList = setList;
		this.url = url;
	}
	
	showHint(searchString){
		let xmlhttp = new XMLHttpRequest();
		xmlhttp,open("open", this.url, true);
		xmlhttp.send(searchString);
		
		xmlhttp.onreadystatechange = () => {
			if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
				setList.add(xmlhttp.responseText);
			}
        };
	}
	
	inputList(inputId, selectId){
		document.querySelector(`#${inputId}`).addEventListener('input', event => {
			// 通过ajax传输数据到后台，然后获取传回来的数据
			// 如果要使用ajax，放开注释
			//this.showHint(document.getElementById(`${inputId}`).value);
			for(let index of this.setList.values()){
				let tmp = document.createElement('option');
				tmp.value = index;
				tmp.innerHTML = index;
				
				document.getElementById(`${selectId}`).appendChild(tmp);
			}
		});
	}
	
	inputTextChange(selectId, inputId){
		document.querySelector(`#${selectId}`).addEventListener('click', event => {
			let text = document.getElementById(`${inputId}`),
				select = document.getElementById(`${selectId}`),
				index = select.selectedIndex,
				val = select.options[index].text;
				
			text.value = val;
		});
	}
	
	addValue(addVal){
		this.setList.add(addVal);
		for (const val of this.setList[Symbol.iterator]()){
			console.log(val);
		}
	}
}
// 测试数据
let tmp = new Set(["a", "b", "c"]);
// url换成你的后台地址
let list = new SearchList('url', tmp);
// test, show 分别改成你的input, select的id
list.inputList('test', 'show');
list.inputTextChange('show', 'test');
```
![2-post][02]
***
[01]: ./img/1-pre.png "1-pre"
[02]: ./img/2-post.png "2-post"