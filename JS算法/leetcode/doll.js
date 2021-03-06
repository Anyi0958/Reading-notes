const arr0 = [[5,4], [6,4], [6,7], [2,3],[1,1]];
let arr1 = [],
    arr = [];
arr0.map(val=>{
    // console.log(val);
    val.map((ele,index)=>arr.push(ele));
});

arr1.map((val,index)=>{
    if(arr.includes(val))   return;

    if(arr1.lastIndexOf(val) !== index){
        if(index%2 == 0){
            if(arr1[arr1.lastIndexOf(val)+1] < arr1[index+1]){
                arr.push(arr1[index],arr1[index+1]);
            }else{
                arr.push(arr1[arr1.lastIndexOf(val)],arr1[arr1.lastIndexOf(val)+1]);
            }
        }else if(index%2 == 1){
            if(arr1[arr1.lastIndexOf(val)-1] < arr1[index-1]){
                arr.push(arr1[index-1],arr1[index]);
            }else{
                arr.push(arr1[arr1.lastIndexOf(val)-1],arr1[arr1.lastIndexOf(val)]);
            }
        }
    }

});
console.log(arr);


let r = new Array();
let s = [];
arr.map((val,index)=>{
    r.push([index, val[0]+val[1]]);
});

console.log(r);
r.map((val, index)=>{
    console.log(`val: ${val}, index:${index}`);
    if(s[0] === undefined){
        s.push([index, val]);
    }
    else if(val[1] < s[0][1][1]){
        s.unshift([index, val]);
        console.log(`unshift:${s}`);
    }
    else if(val[1] > s[0][1][1]){
        s.push([index, val]);
        console.log(`push: ${s}`);
    }
    console.log(`var[1]: ${val[1]}`);
    console.log(s);
});

let sum = s.reduce((total,val)=>{
    
    console.log(arr[val[0]]);
    return total++;
}, 0);

console.log(sum);