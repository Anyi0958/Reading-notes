class Solution {
    public String longestPalindrome(String s) {
        int n = s.length();
        boolean[][] dp = new boolean[n][n];

        String ans = "";
        for (int l = 0; l < n; ++l) {
            for (int i = 0; i + l < n; ++i) {
                int j = i + l;
                // System.out.println(dp[1][1]);
                System.out.println(i + "," + j + dp[1][1]);
                if (l == 0) {
                    dp[i][j] = true;
                    // System.out.println(dp[1][1]);
                } else if (l == 1) {
                    dp[i][j] = (s.charAt(i) == s.charAt(j));
                    if (l == 1 && i == 0)
                        // System.out.println(s.charAt(i) + "," + s.charAt(j));
                        System.out.println(s.charAt(i) == s.charAt(j));
                    // System.out.println(i + "," + j + dp[i][j]);
                    // System.out.println(dp[1][1]);
                } else {
                    dp[i][j] = (s.charAt(i) == s.charAt(j) && dp[i + 1][j - 1]);
                    // System.out.println((dp[1][1]));
                    // System.out.print(i + "," + j + ",");
                    // System.out.print(s.charAt(i) == s.charAt(j));
                    // System.out.print(","); System.out.print(dp[i + 1][j - 1]);
                    // * System.out.println("");

                }
                if (dp[i][j] && l + 1 > ans.length()) {
                    ans = s.substring(i, i + l + 1);
                    // System.out.println(i + "," + l + ',' + dp[i][j]);
                }
            }
        }
        return ans;
    }

    public static void main(String[] args) {
        Solution test = new Solution();
        String result = test.longestPalindrome("babad");
        System.out.println(result);
    }
}
