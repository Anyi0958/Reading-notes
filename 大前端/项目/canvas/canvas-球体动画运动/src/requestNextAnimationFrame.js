window.requestNextAnimationFrame = (function() {
    let originalWebkitRequestAnimationFrame = undefined,
        wrapper = undefined,
        callback = undefined,
        geckoVersion = 0,
        userAgent = navigator.userAgent,
        index = 0;

    if(window.webkitRequestAnimationFrame) {
        wrapper = time => {
            if(time === undefined)  time = +new Date();
            this.callback(time);
        };

        originalWebkitRequestAnimationFrame = window.webkitRequestAnimationFrame;

        window.webkitRequestAnimationFrame = (callback, element) => {
            this.callback = callback;
            
            originalWebkitRequestAnimationFrame(wrapper, element);
        };
    }

    if(window.mozRequestAnimationFrame) {
        index = userAgent.indexOf('rv:');

        if(userAgent.indexOf('Gecko') !== -1){
            geckoVersion = userAgent.substr(index + 3, 3);

            if(geckoVersion === '2.0'){
                window.mozRequestAnimationFrame = undefined;
            }
        }
    }


    return window.requestAnimationFrame   ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame   ||
        window.oRequestAnimationFrame     ||
        window.msRequestAnimationFrame    ||

        function(callback, element) {
            let start,
                finish;

            window.setTimeout(function() {
                start = +new Date();
                callback(start);
                finish = +new Date();

                this.timeout = 1000 / 60 - (finish - start);
            }, this.timeout);
        };
})();