function square(arr){
    
    return arr.filter((val, index) => {
        val *= val;
    });
}