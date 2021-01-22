const fs = require('fs');
const fname = 'filename';

fs.readFile(fname, (err, data) => {
	if(err)	return console.error(`${fname}:${err.message}`);
	console.log(`${fname} contents: ${data}`);
});