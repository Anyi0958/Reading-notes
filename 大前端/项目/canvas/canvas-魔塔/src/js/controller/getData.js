import {Hero, HeroData} from '../conf/Character.js';
import {EnemySet, EnemysData} from '../conf/Enemys.js';
import {IconSet, IconsData} from '../conf/IconsData.js';
import {ItemSet, ItemsData} from '../conf/Items.js';
import {MapSet, MapsData} from '../conf/Maps.js';
import {MessageSet, MessageData} from '../conf/Script.js';
import {Status, StatusData} from '../conf/Status.js';
/*
*   param: string, int
    string: Data Type,
    int: Data index
 */
const getData = function(setType, dataType, ID){
    if(!setType)   return 'setType input error.';
    
    switch(setType.toLowerCase()){
        case 'item':
            return ItemsData(dataType, ID);           
        case 'icon':
            return IconsData(dataType, ID);
        case 'enemy':
            return EnemysData(dataType, ID);
        case 'map':
            return MapsData(dataType, ID);
            
        case 'status':
            return StatusData(dataType, ID);
            
        case 'script':
            return MessageData(dataType, ID);
            
        case 'hero':
            return HeroData(dataType, ID);
            
        default:
            return 'setType type error.';
    }
};

// character
const deepCopy = function(name){
    let obj = eval(name);
    var copyObj = {};

    for(let i in obj){
        if(typeof obj[i] === 'object'){
            copyObj[i] = (obj[i].constructor === Array) ? [] : {};
            for(let j in obj[i]){
                copyObj[i][j] = obj[i][j];
            }
        }else{
            copyObj[i] = obj[i];
        }
    }

    return copyObj;
};
// console.log(typeof(MapSet.Maps));
// test
// let test = getData('item', 'All', 2);
// console.log(getData('item', 'All', 3));
export {deepCopy,getData};