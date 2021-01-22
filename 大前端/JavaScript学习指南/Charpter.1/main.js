'use strict'

paper.install(window);
paper.setup(document.getElementById('mainCanvas'));

var userInputTool = new Tool();

userInputTool.onMouseDown = event => {
	var c = Shape.Circle(event.point, 20);
	c.fillColor = 'green';
}

var d = Shape.Circle(200,200,80);
d.fillColor = 'black';

var text = new PointText(200, 200);
text.justification = 'center';
text.fillColor = 'white';
text.fontSize = 20;
text.content = 'Hello World';

paper.view.draw();