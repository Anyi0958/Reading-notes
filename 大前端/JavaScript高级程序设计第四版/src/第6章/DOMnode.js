const m = new Map();

const loginButton = document.querySelector('#login');

// 给这个结点关联一些元数据
m.set(loginButton, {disabled: true});

const wm = new WeakMap();
wm.set(loginButton, {disabled: true});