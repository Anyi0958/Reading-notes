let input = document.getElementsByTagName('input')[0];

input.addEventListener('change', event => {
    // console.log('a');
    // console.log(files);
    let filesList =input.files;
    console.log(filesList);
    for(let a = 0; a < filesList.length; a++){
        let i = filesList[a];
        console.log(i.name,
                i.size,
                i.type,
                i.lastModifiedDate);
    }
});

// function fileInfo(files) {
//     console.log(files);
//     for(let i = 0; i < files.length; i++){
//         let f = files[i];
//         console.log(f.name);
//     }
// }