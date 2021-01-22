const exec = require('child_process').exec;

exec('dir', (err, stdout, stderr) => {
    if(err) return console.log(err.message);
    stdout = stdout.toString();
    console.log(stdout);

    stderr = stderr.toString();
    if(stderr !== ''){
        console.log(stderr);
    }
})