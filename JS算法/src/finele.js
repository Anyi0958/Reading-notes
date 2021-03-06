let arr = ['a','b','c','d','e','f','a','b','c'];
/* function findAllOccurrences(arr, target){
    let arr2 = [];
    arr.reduce((pre, val, index)=>{
        if(val == target) arr2.push(index);
    },0);
    console.log(arr2);
    return arr2;
}
 */
function findAllOccurrences(arr, target){
    let arr2 = [];
    arr.filter((item, index) => {
        return item === target && arr2.push(index);
    });
    console.log(arr2);
}

findAllOccurrences(arr, 'a')