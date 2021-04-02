let loadFile = document.getElementById('upload');

loadFile.addEventListener('change', event => {
    const reader = new FileReader();

    reader.onload = function(){
        const output = document.querySelector('#test');

        output.src = reader.result;
    };

    reader.readAsDataURL(event.target.files[0]);
});