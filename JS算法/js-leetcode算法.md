js-leetcode�㷨 Ŀ¼
[TOC]
***

# ǰ��

# �Ƽ��Ķ�

- leetcode

# 2. �������

�������� �ǿ� ��������ʾ�����Ǹ�������������ÿλ���ֶ��ǰ��� ���� �ķ�ʽ�洢�ģ�����ÿ���ڵ�ֻ�ܴ洢 һλ ���֡�

���㽫��������ӣ�������ͬ��ʽ����һ����ʾ�͵�����

����Լ���������� 0 ֮�⣬���������������� 0 ��ͷ��

 

ʾ�� 1��

![2](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/01/02/addtwonumber1.jpg)

> ���룺l1 = [2,4,3], l2 = [5,6,4]
> �����[7,0,8]
> ���ͣ�342 + 465 = 807.
> ʾ�� 2��

> ���룺l1 = [0], l2 = [0]
> �����[0]
> ʾ�� 3��

> ���룺l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
> �����[8,9,9,9,0,0,0,1]


��ʾ��

- ÿ�������еĽڵ����ڷ�Χ [1, 100] ��
- 0 <= Node.val <= 9
- ��Ŀ���ݱ�֤�б��ʾ�����ֲ���ǰ����

## ʵ��

### 1. `js`

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let head = new ListNode();
    let current = head;
    let temp = 0;
    while(l1!=null || l2!=null){
        let x = (l1!=null)? l1.val:0;
        let y = (l2!=null)? l2.val:0;
        let sum = x+y+temp;
        temp = parseInt(sum/10);
        current.next = new ListNode(parseInt(sum%10));
        current = current.next;
        if(l1!=null) l1 = l1.next;
        if(l2!=null) l2 = l2.next;
    }
    if(temp>0){
        current.next = new ListNode(temp);
    }
    return head.next;
};

```

# 3. ���ظ��ַ�����ִ�

����һ���ַ����������ҳ����в������ظ��ַ��� **`��Ӵ�`** �ĳ��ȡ�

ʾ�� 1:

> ����: s = "abcabcbb"
> ���: 3 
> ����: ��Ϊ���ظ��ַ�����Ӵ��� "abc"�������䳤��Ϊ 3��

ʾ�� 2:

> ����: s = "bbbbb"
> ���: 1
> ����: ��Ϊ���ظ��ַ�����Ӵ��� "b"�������䳤��Ϊ 1��

ʾ�� 3:

> ����: s = "pwwkew"
> ���: 3
> ����: ��Ϊ���ظ��ַ�����Ӵ��� "wke"�������䳤��Ϊ 3��
>     ��ע�⣬��Ĵ𰸱����� �Ӵ� �ĳ��ȣ�"pwke" ��һ�������У������Ӵ���

ʾ�� 4:

> ����: s = ""
> ���: 0

��ʾ��

- 0 <= s.length <= 5 * 104
- s ��Ӣ����ĸ�����֡����źͿո����

## ʵ��

### 1. ��������

```js
var lengthOfLongestSubstring = function(s) {
    // ��ϣ���ϣ���¼ÿ���ַ��Ƿ���ֹ�
    const occ = new Set();
    const n = s.length;
    // ��ָ�룬��ʼֵΪ -1���൱���������ַ�������߽����࣬��û�п�ʼ�ƶ�
    let rk = -1, ans = 0;
    for (let i = 0; i < n; ++i) {
        if (i != 0) {
            // ��ָ�������ƶ�һ���Ƴ�һ���ַ�
            occ.delete(s.charAt(i - 1));
        }
        while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
            // ���ϵ��ƶ���ָ��
            occ.add(s.charAt(rk + 1));
            ++rk;
        }
        // �� i �� rk ���ַ���һ�����������ظ��ַ��Ӵ�
        ans = Math.max(ans, rk - i + 1);
    }
    return ans;
};
```

# 4. Ѱ�����������������λ��

����������С�ֱ�Ϊ m �� n �����򣨴�С�������� nums1 �� nums2�������ҳ���������������������� ��λ�� ��

ʾ�� 1��

> ���룺nums1 = [1,3], nums2 = [2]
> �����2.00000
> ���ͣ��ϲ����� = [1,2,3] ����λ�� 2

ʾ�� 2��

> ���룺nums1 = [1,2], nums2 = [3,4]
> �����2.50000
> ���ͣ��ϲ����� = [1,2,3,4] ����λ�� (2 + 3) / 2 = 2.5

ʾ�� 3��

> ���룺nums1 = [0,0], nums2 = [0,0]
> �����0.00000

ʾ�� 4��

> ���룺nums1 = [], nums2 = [1]
> �����1.00000

ʾ�� 5��

> ���룺nums1 = [2], nums2 = []
> �����2.00000


��ʾ��

- nums1.length == m
- nums2.length == n
- 0 <= m <= 1000
- 0 <= n <= 1000
- 1 <= m + n <= 2000
- -106 <= nums1[i], nums2[i] <= 106


���ף��������һ��ʱ�临�Ӷ�Ϊ O(log (m+n)) ���㷨�����������

## ʵ��

### 1. ϣ������

#### ����˼·

�Ⱥϲ����飬���������飬����λ��

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  var num = nums1.concat(nums2);
  var length = num.length;
  var medio = 0;
  var center = length / 2;

  //ϣ�����
  var gap = Math.floor(center);

  while (gap >= 1) {
    for (var i = gap; i < length; i++) {
      var temp = num[i];

      var j = i;

      while (num[j - gap] > temp && j > gap - 1) {
        num[j] = num[j - gap];
        j -= gap;
      }

      num[j] = temp;
    }
    gap = Math.floor(gap / 2);
  }

  if (length % 2 == 0) {
    medio = (num[center] + num[center - 1]) / 2;
  } else {
    medio = num[Math.floor(center)];
  }

  return medio;
};

```

### 2. ���ֲ���

- ʹ�ù鲢�ķ�ʽ���ϲ������������飬�õ�һ������������顣�������������м�λ�õ�Ԫ�أ���Ϊ��λ����

- ����Ҫ�ϲ������������飬ֻҪ�ҵ���λ����λ�ü��ɡ�������������ĳ�����֪�������λ����Ӧ������������±�֮��Ҳ����֪�ġ�ά������ָ�룬��ʼʱ�ֱ�ָ������������±� 00 ��λ�ã�ÿ�ν�ָ���Сֵ��ָ�����һλ�����һ��ָ���Ѿ���������ĩβ����ֻ��Ҫ�ƶ���һ�������ָ�룩��ֱ��������λ����λ�á�

```java
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int length1 = nums1.length, length2 = nums2.length;
        int totalLength = length1 + length2;
        if (totalLength % 2 == 1) {
            int midIndex = totalLength / 2;
            double median = getKthElement(nums1, nums2, midIndex + 1);
            return median;
        } else {
            int midIndex1 = totalLength / 2 - 1, midIndex2 = totalLength / 2;
            double median = (getKthElement(nums1, nums2, midIndex1 + 1) + getKthElement(nums1, nums2, midIndex2 + 1)) / 2.0;
            return median;
        }
    }

    public int getKthElement(int[] nums1, int[] nums2, int k) {
        /* ��Ҫ˼·��Ҫ�ҵ��� k (k>1) С��Ԫ�أ���ô��ȡ pivot1 = nums1[k/2-1] �� pivot2 = nums2[k/2-1] ���бȽ�
         * ����� "/" ��ʾ����
         * nums1 ��С�ڵ��� pivot1 ��Ԫ���� nums1[0 .. k/2-2] ���� k/2-1 ��
         * nums2 ��С�ڵ��� pivot2 ��Ԫ���� nums2[0 .. k/2-2] ���� k/2-1 ��
         * ȡ pivot = min(pivot1, pivot2)������������С�ڵ��� pivot ��Ԫ�ع��Ʋ��ᳬ�� (k/2-1) + (k/2-1) <= k-2 ��
         * ���� pivot �������Ҳֻ���ǵ� k-1 С��Ԫ��
         * ��� pivot = pivot1����ô nums1[0 .. k/2-1] ���������ǵ� k С��Ԫ�ء�����ЩԪ��ȫ�� "ɾ��"��ʣ�µ���Ϊ�µ� nums1 ����
         * ��� pivot = pivot2����ô nums2[0 .. k/2-1] ���������ǵ� k С��Ԫ�ء�����ЩԪ��ȫ�� "ɾ��"��ʣ�µ���Ϊ�µ� nums2 ����
         * �������� "ɾ��" ��һЩԪ�أ���ЩԪ�ض��ȵ� k С��Ԫ��ҪС���������Ҫ�޸� k ��ֵ����ȥɾ�������ĸ���
         */

        int length1 = nums1.length, length2 = nums2.length;
        int index1 = 0, index2 = 0;
        int kthElement = 0;

        while (true) {
            // �߽����
            if (index1 == length1) {
                return nums2[index2 + k - 1];
            }
            if (index2 == length2) {
                return nums1[index1 + k - 1];
            }
            if (k == 1) {
                return Math.min(nums1[index1], nums2[index2]);
            }
            
            // �������
            int half = k / 2;
            int newIndex1 = Math.min(index1 + half, length1) - 1;
            int newIndex2 = Math.min(index2 + half, length2) - 1;
            int pivot1 = nums1[newIndex1], pivot2 = nums2[newIndex2];
            if (pivot1 <= pivot2) {
                k -= (newIndex1 - index1 + 1);
                index1 = newIndex1 + 1;
            } else {
                k -= (newIndex2 - index2 + 1);
                index2 = newIndex2 + 1;
            }
        }
    }
}
```

### 3. ��������

```java
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) {
            return findMedianSortedArrays(nums2, nums1);
        }

        int m = nums1.length;
        int n = nums2.length;
        int left = 0, right = m;
        // median1��ǰһ���ֵ����ֵ
        // median2����һ���ֵ���Сֵ
        int median1 = 0, median2 = 0;

        while (left <= right) {
            // ǰһ���ְ��� nums1[0 .. i-1] �� nums2[0 .. j-1]
            // ��һ���ְ��� nums1[i .. m-1] �� nums2[j .. n-1]
            int i = (left + right) / 2;
            int j = (m + n + 1) / 2 - i;

            // nums_im1, nums_i, nums_jm1, nums_j �ֱ��ʾ nums1[i-1], nums1[i], nums2[j-1], nums2[j]
            int nums_im1 = (i == 0 ? Integer.MIN_VALUE : nums1[i - 1]);
            int nums_i = (i == m ? Integer.MAX_VALUE : nums1[i]);
            int nums_jm1 = (j == 0 ? Integer.MIN_VALUE : nums2[j - 1]);
            int nums_j = (j == n ? Integer.MAX_VALUE : nums2[j]);

            if (nums_im1 <= nums_j) {
                median1 = Math.max(nums_im1, nums_jm1);
                median2 = Math.min(nums_i, nums_j);
                left = i + 1;
            } else {
                right = i - 1;
            }
        }

        return (m + n) % 2 == 0 ? (median1 + median2) / 2.0 : median1;
    }
}

```

# 5. ������ַ���

����һ���ַ��� s���ҵ� s ����Ļ����Ӵ���

ʾ�� 1��

> ���룺s = "babad"
> �����"bab"
> ���ͣ�"aba" ͬ���Ƿ�������Ĵ𰸡�

ʾ�� 2��

> ���룺s = "cbbd"
> �����"bb"

ʾ�� 3��

> ���룺s = "a"
> �����"a"

ʾ�� 4��

> ���룺s = "ac"
> �����"a"


��ʾ��

- 1 <= s.length <= 1000
- s �������ֺ�Ӣ����ĸ����д��/��Сд�����

## ʵ��

### 1. `DP`

**��״̬ת�Ʒ����У������Ǵӳ��Ƚ϶̵��ַ����򳤶Ƚϳ����ַ�������ת�Ƶģ����һ��Ҫע�⶯̬�滮��ѭ��˳��**

```java
class Solution {
    public String longestPalindrome(String s) {
        int n = s.length();
        boolean[][] dp = new boolean[n][n];
        String ans = "";
        for (int l = 0; l < n; ++l) {
            for (int i = 0; i + l < n; ++i) {
                int j = i + l;
                if (l == 0) {
                    dp[i][j] = true;
                } else if (l == 1) {
                    dp[i][j] = (s.charAt(i) == s.charAt(j));
                } else {
                    dp[i][j] = (s.charAt(i) == s.charAt(j) && dp[i + 1][j - 1]);
                }
                if (dp[i][j] && l + 1 > ans.length()) {
                    ans = s.substring(i, i + l + 1);
                }
            }
        }
        return ans;
    }
}

```

#### `js`

```js
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    let n = s.length;
    let res = '';
    let dp = Array.from(new Array(n),() => new Array(n).fill(0));
    for(let i = n-1;i >= 0;i--){
        for(let j = i;j < n;j++){
            dp[i][j] = s[i] == s[j] && (j - i < 2 || dp[i+1][j-1]);
            if(dp[i][j] && j - i +1 > res.length){
                res = s.substring(i,j+1);
            }
        }
    }
    return res;
};

//2.
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
```

