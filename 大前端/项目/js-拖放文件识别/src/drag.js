let canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

// 阻止浏览器的默认处理
canvas.addEventListener('dragenter', event => {
    event.preventDefault();

    event.dataTransfer.effectAllowed = 'copy';
}, false);

canvas.addEventListener('dragover', event => {
    event.preventDefault();    
}, false);

window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

canvas.addEventListener('drop', event => {
    let file = event.dataTransfer.files[0];

    window.requestFileSystem(window.TEMPORARY, 5*1024*1024, fs => {
        fs.root.getFile(file.name, { creaye: true },
            fileEntry => {
                fileEntry.createWriter(writer => {
                    writer.write(file);
                });

                alert(`success: ${fileEntry.toURL()}`);
            },
            err => {
                alert(err.code);
            }
            );
    },
        err => alert(err.code)
    );
}, false);