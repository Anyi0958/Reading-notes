const arr = [1, 2, 2, 3, 4, 2, 2];
const item = 2;

/* function removeWithoutCopy(arr, item) {
	let n = arr.length;
    
    for(let i=0; i < n; i++){
        console.log(`i:${i}, arr[i]:${arr[i]}`);
         if(arr[0]!==item) {
            arr.push(arr[0]);
         }
         arr.shift();          
	}
    console.log(arr);
    return arr;
} */

function test(arr, item){
    for(let i of arr.values()){
        console.log(`i: ${i}`);
        if(i != item){
            arr.push(i);
            console.log(i);
        }
        arr.shift();
    }
    console.log(arr);
    return arr;
}

/* function removeWithoutCopy(arr, item) {    
    for(let i=0; i < arr.length; i++) {
        if(arr[i] == item){
            arr.splice(i,1);
            i--;
        }
    }
    console.log(arr);
    return arr;
} */
function removeWithoutCopy(arr, item) {    
    arr.forEach((ele,index)=>{
        if(ele=item){
            arr.splice(index,1);
            index--;
        }
        
    }) 

    console.log(arr);
    return arr;
}

console.log(arr);
removeWithoutCopy(arr, item);
// test(arr, item);