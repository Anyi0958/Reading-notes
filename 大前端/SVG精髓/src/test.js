var slideChoice = -1;
var rgb = [100, 100, 100];

function init() {
    var obj = document.getElementById("sliderGroup" + i);
    obj.addEventListener("mousedown", startColorDrag, false);
    obj.addEventListener("mousemove", doColorDrag, false);
    obj.addEventListener("mouseup", endColorDrag, false);
}


function startColorDrag(evt) {
    var sliderId = evt.target.parentNode.getAttribute('id');
    endColorDrag(evt);
    slideChoice = parseInt(sliderId[sliderId.length - 1]);
}

function endColorDrag(evt) {
    slideChoice = -1;
}

function doColorDrag(evt) {
    var sliderId = evt.target.parentNode.getAttribute('id');
    chosen =  

}