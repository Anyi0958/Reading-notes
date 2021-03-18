// pic
const conf = {
    pic: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2801998497,4036145562&fm=27&gp=0.jpg"
};
// header, body
const tHeader = [
    'flower',
    'color',
    'pic'
];

const tBody = [
    {
        name: 'rose',
        color: 'red',
        pic: conf.pic
    },
    {
        name: 'rose2',
        color: 'red',
        pic: conf.pic
    },
    {
        name: 'rose3',
        color: 'red',
        pic: conf.pic
    }
];




export2Excel(tHeader, tBody, 'test')
