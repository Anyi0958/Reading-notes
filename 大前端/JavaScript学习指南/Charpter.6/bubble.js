// 创建一个事件处理器并返回这个处理器
function logEvent(handlerName, type, cancel, stop, stopImmediate) {
    // 这才是真正的事件处理器
    return event => {
        if(cancel)  event.preventDefault();
        if(stop)    event.stopPropagation();
        if(stopImmediate)   event.stopImmediatePropagation();

        console.log(`${type}: ${handlerName}` + (event.defaultPrevented ? '(canceled)' : ''));
    };
}

// 给元素上添加一个logger事件
function addEventLogger(elt, type, action) {
    const capture = type === 'capture';
    elt.addEventListener('click',
        logEvent(elt.tagName, type, action === 'cancel',
        action === 'stop', 
        action === 'stop!'),
        capture
    );
}

const body = document.querySelector('body');
const div = document.querySelector('div');
const button = document.querySelector('button');

addEventLogger(body, 'capture');
addEventLogger(body, 'bubble');
addEventLogger(div, 'capture');
addEventLogger(div, 'bubble');
addEventLogger(button, 'capture');
addEventLogger(button, 'bubble');
