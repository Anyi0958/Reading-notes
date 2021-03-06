function fizzBuzz(num) {
    
    switch(true){
        case num%3 === 0 && num % 5 === 0:  return 'fizzbuzz';break;
        case num%3 === 0:   return 'fizz'; break;
        case num%5 === 0:   return 'buzz'; break;
        case num == null || typeof(num) != 'number':    return false; break;
        default:    return num;
    }
}