/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    var len = s.length,     
        dp = Array.from(new Array(len),() => new Array(len).fill(false));
    var result = "";
    for(var l = 0; l < len; ++l){
        for(var i = 0; i + l < len; ++i){
            var j = i + l;        


            if(l == 0 ){
                dp[i][j] = true;
            }else if(l == 1 ){
                dp[i][j] = (s.charAt(i) == s.charAt(j));
            }else{
                dp[i][j] = (s.charAt(i) == s.charAt(j) && dp[i + 1][ j - 1 ]);
            }
            if ( dp[i][j] && l + 1 > result.length){
                result = s.substring(i,i+l+1);
            }
        }
    }

    return result;
};

console.log(longestPalindrome("babad"));