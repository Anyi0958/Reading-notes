const Hero = {
    Name: "勇士",
    HP: 1000,
    ATK: 10,
    DEF: 10,
    Gold: 0,
    Exp: 0,
    YellowKey: 0,
    BlueKey: 0,
    RedKey: 0,
    IronKey: 0,
    GreenKey: 0,
    PayGold: 0,
    // 当前楼层
    Floor: 3,
    // 移动速度
    Zoom: 1
};

const HeroData = function(dataType, ID){
    let heros = eval('Hero.' + dataType);
    // console.log(heros === undefined);
    if(heros === undefined)   return 'Hero dataType error';

    if(ID !== 'undefined' && heros instanceof Object){
        return heros[ID];
    }

    return heros;
}

// test
// let test = HeroData('PayGold', 'x');
// console.log(test);
export {Hero, HeroData};