function findMedium(num1,num2){
    if(num1.length > num2.length){
        findMedium(num2, num1);
    }

    let num1_length = num1.length,
        num2_length = num2.length;

    let left = 0, 
        right = num1_length;

    let left_max = 0,
        right_max = 0;

    while(left < right){
        let num1_mediumIndex = (left + right) / 2,
            num2_mediumIndex = (num1_length + num2_length + 1) / 2 - num1_mediumIndex;

        let num1_im1 = (num1_mediumIndex == 0) ? 0 : 

    }

}