/*
    列表
    0
*/
let CallOk = true;

Flag.Event = function(ID, Map, Event, HeroLocation, Floor, callback){

    if(typeof(ID[0] == 'string' &&
        typeof(ID[1] !== 'undefined' &&
        typeof(ID[1] !== 'null')))){

            switch(ID[0].toLowerCase()){
                case "door":
                    alert('Door');
                    break;                
            }
            return;
    }

    switch(ID){
        case 0:
            if(Flag.Special)
    }
    
}