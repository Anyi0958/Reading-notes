let btn = document.getElementsByClassName('article-list-item-txt')[0].childNodes;

let event1 = document.createEvent('MouseEvents');
event1.initMouseEvent('click',true,true,document.defaultView,
						0,0,0,0,0,false,false,false,false,
						0, null);
						
btn.dispatchEvent(event1);