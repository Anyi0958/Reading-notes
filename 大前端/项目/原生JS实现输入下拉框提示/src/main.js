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

let tmp = new Set(["a", "b", "c"]);
// url换成你的后台地址
let list = new SearchList('url', tmp);
// test, show 分别改成你的input, select的id
list.inputList('test', 'show');
list.inputTextChange('show', 'test');
