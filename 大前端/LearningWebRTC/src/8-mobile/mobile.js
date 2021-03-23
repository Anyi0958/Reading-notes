let mobile = {
    video: {
        mandatory: {
            maxWidth: 640,
            maxHeight: 360
        }
    }
};

let desktop = {
    video: {
        mandatory: {
            minWidth: 1280,
            minHeight: 720
        }
    }
};

let constraints;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent)) {
    constraints = mobile;
}else {
    constraints = desktop;
}

navigator.getUserMedia(constraints, success, function (error)){

};