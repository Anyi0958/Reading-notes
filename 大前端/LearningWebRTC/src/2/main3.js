let constraints = {
    video: {
        mandatory: {
            minWidth: 640,
            minHeight: 480
        }
    },
    audio: false
};

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i
    .test(navigator.userAgent)){
        constraints = {
            video: {
                mandatory: {
                    minWidth: 480,
                    minHeight: 320,
                    maxWidth: 1024,
                    maxHeight: 768
                }
            },
            audio: false
        };
    }

navigator.getUserMedia(constraints, stream => {
    let video = document.querySelector('video');
    try{
        video.src = window.URL.createObjectURL(stream);
    }catch(error){
        video.srcObject = stream;
    }
}, err => {
    console.log(err);
});