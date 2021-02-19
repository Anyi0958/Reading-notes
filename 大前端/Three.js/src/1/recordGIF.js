let canvas = document.getElementsByTagName('canvas')[0];
const array = [];
let index = 0;

const recorder = setInterval(() => {
	if(index < 100){
		canvas.toBlob(blob => {
			array.push(window.URL.createObjectURL(blob));
		});
		index++;
	} else {
		console.log(array);
		clearInterval(recorder);
	}
}, 100);

const a = document.createElement('a');
document.body.appendChild(a);
a.style = 'display: none';

/* (async () => {
	let i = 0;
	for (const url of array) {
		a.href = url;
		a.download = `gif-${i}`;
		// a.click();
		i++;
		await new Promise(r => setTimeout(r, 100));
	}
})(); */


console.log("start");
let c = document.createElement('a');
document.body.appendChild(c);

let im = document.createElement('img');
im.style = 'border:0';
im.id = 'picID';
c.appendChild(im);
for (let m of array){
	console.log("start");	
	document.getElementById('picID').src = m;
}