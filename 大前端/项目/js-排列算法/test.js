/* 
    给一个正整数，输出该整数的正序全排列
    比如3，输出 123，132，213，231，312，321
 */
let testArr = new Set();

function sort(length){
    let str = "";
    for(let i = 1; i <= length; i++){
        str += i.toString();
    }    
    console.log(str);
    testArr.add(str);

    
}

sort(3);