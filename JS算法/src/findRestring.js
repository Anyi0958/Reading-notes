const arr = [1,2,4,4,3,3,1,5,3];

/* function dulplicate(arr){
    let arr2 = arr.sort();
    let b = [];
    return arr2.filter((item, index) => {
        if(b.indexOf(item) == -1 && arr2.lastIndexOf(item) != index){
            b.push(item);
            console.log(b);
            return true;
        }
    });

} */

function dulplicate(arr){
    let arr2 = [];
    for(let i = 0; i < arr.length - 1; i ++){
        for(let j = i + 1; j < arr.length; j++){
            if(arr[i] === arr[j] && arr2.indexOf(arr[j]) == -1){
                arr2.push(arr[j]);
                break;
            }
        }
    }

    return arr2;
}
dulplicate(arr);

