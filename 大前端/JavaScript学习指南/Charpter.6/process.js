const fs = require('fs');
fs.readdir('data', (err, files) => {
    if(err) {
        console.log('none');
        process.exit(1);
    }

    const textFiles = files.filter(f => /\.txt$/i.test(f));
    if(textFiles.length === 0){
        console.log('No');
        process.exit(0);
    }
});