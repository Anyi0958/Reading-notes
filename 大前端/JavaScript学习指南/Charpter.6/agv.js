//process.argv's content
/*
    ['node',
    'path',
    'file1',
    'file2',
    'file3'
    ]
*/

const fs = require('fs');
const filename = process.argv.slice(2);
let counts = filename.map(f => {
    try{
        const data = fs.readFileSync(f, {encoding: 'utf-8'});
        return `${f}: ${data.split('\n').length}`;
    } catch(errr){
        return `${f}: couldn't read file.`;
    }
})