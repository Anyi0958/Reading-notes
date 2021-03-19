let dropTarget = document.getElementById('droptarget');

function handleEvent(event) {
    let info = '',
        output = document.getElementById('output'),
        files,
        i,
        len;
    event.preventDefault();

    if(event.type == 'drop'){
        files = event.dataTransfer.files;
        i = 0;
        len = files.length;
        let img = document.createElement('img');
        // event.dataTransfer.setDragImage(img,150,150);
        console.log(event.dataTransfer.getData('text'));
        // img.src = files.getData();
        document.body.appendChild(img);

        while(i < len){
            info += `${files[i].name} (${files[i].type}, ${files[i].size} bytes)<br />`;
            i++;
        }
        output.innerHTML = info;
    }
}

dropTarget.addEventListener('dragenter', handleEvent);
dropTarget.addEventListener('dragover', handleEvent);
dropTarget.addEventListener('drop', handleEvent);