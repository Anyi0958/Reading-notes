JS�������򷽷����� Ŀ¼
[TOC]
***

# ǰ��

- ������`FreecodeCamp`

***



# 1. ʹ�ò��Է��� - `test`

- `JavaScript `���ж���ʹ��������ʽ�ķ���������������ʽ��һ�ַ�����ʹ��.test()������
- `.test()`����������д��������ʽӦ�õ�һ���ַ������������ڵ����ݣ���������ƥ��ģʽ�ɹ�ƥ�䵽�ַ����򷵻�true����֮������false��

```js
let testStr = "freeCodeCamp";
let testRegex = /Code/;
testRegex.test(testStr);
// Returns true
```

# 2. ͬʱ�ö���ģʽƥ�������ַ��� - `x|y`

- ����ʹ��|��������ƥ��������
- �˲�����ƥ������֮ǰ��֮���ƥ��ģʽ�����磬�������ƥ��`"yes"`��`"no"`������Ҫ��������ʽ��`/yes|no/`��
- �㻹����ƥ�������������ͨ����Ӹ����ƥ��ģʽ��ʵ�֡���Щƥ��ģʽ�����������|���������ָ����ǣ�����`/yes|no|maybe/`��

# 3. ƥ��ʱ���Դ�Сд - `/x/i`

- ƥ�䲻ͬ��Ӣ����ĸ��Сд
- ��Сд��������ĸ��Сд���Ǵ�д��ĸ��Сд��ĸ�����𡣴�д��ĸ��������`"A"��"B"`��`"C"`��Сд��ĸ��������`"a"��"b"��"c"`��
- �����ʹ�ñ�־`��flag��`��ƥ���������������־�кܶ࣬������������ֻ��ע���Դ�Сд�ı�־����`i`��
- �����ͨ���������ӵ�������ʽ֮����ʹ�������������ʹ�øñ�־��һ��ʵ��`/ignorecase/i`������ַ�������ƥ���ַ���`"ignorecase"`��`"igNoreCase"`��`"IgnoreCase"`��

# 4. ��ȡƥ���� - `match`

- ����ʹ��.match()��������ȡ���ҵ���ʵ��ƥ���
```js
"Hello, World!".match(/Hello/);
// Returns ["Hello"]
let ourStr = "Regular expressions";
let ourRegex = /expressions/;
ourStr.match(ourRegex);
// Returns ["expressions"]
```

# 5. ȫ��ƥ�� - `/x/g`

- ��Ҫ�����Ѱ����ȡƥ��ģʽ�������ʹ��`g`��־��
```js
let repeatRegex = /Repeat/ig;
testStr.match(repeatRegex);
// Returns ["Repeat", "Repeat", "Repeat"]
```

# 6. ��ͨ���`.`ƥ���κ����� - `/hu./`

- ͨ���`.`��ƥ���κ�һ���ַ���ͨ���Ҳ��`dot`��`period`���������ʹ��������ʽ���κ������ַ�һ��ʹ��ͨ��������磬�������ƥ��"hug"��"huh"��"hut"��"hum"�������ʹ��������ʽ`/hu./`ƥ�������ĸ����ʡ�
```js
let humStr = "I'll hum a song";
let hugStr = "Bear hug";
let huRegex = /hu./;
humStr.match(huRegex); // Returns ["hum"]
hugStr.match(huRegex); // Returns ["hug"]
```

# 7. �������ַ�����ֿ�����ƥ�� - `[aiu]`

- �����ʹ���ַ�����Ѱ����һ������Ե�����ƥ��ģʽ���ַ���������ͨ�������Ƿ��ڷ�����`��[��]��`֮��ķ�ʽ������һ������Ҫƥ����ַ�����
- ���磬����Ҫƥ��`"bag"��"big"��"bug"`�����ǲ���ƥ��`"bog"`������Դ���������ʽ`/b[aiu]g/`��ִ�д˲�����`[aiu]`��ֻƥ���ַ�`"a"��"i"����"u"`���ַ�����
```js
let bigStr = "big";
let bagStr = "bag";
let bugStr = "bug";
let bogStr = "bog";
let bgRegex = /b[aiu]g/;
bigStr.match(bgRegex); // Returns ["big"]
bagStr.match(bgRegex); // Returns ["bag"]
bugStr.match(bgRegex); // Returns ["bug"]
bogStr.match(bgRegex); // Returns null
```

# 8. ƥ����ĸ���е���ĸ - `[a-z]`

- ���ַ����У������ʹ�����ַ�`��-��`������Ҫƥ����ַ���Χ��
���磬Ҫƥ��Сд��ĸ`a��e`�������ʹ��`[a-e]`��
```js
let catStr = "cat";
let batStr = "bat";
let matStr = "mat";
let bgRegex = /[a-e]at/;
catStr.match(bgRegex); // Returns ["cat"]
batStr.match(bgRegex); // Returns ["bat"]
matStr.match(bgRegex); // Returns null
```

# 9. ƥ����ĸ���е����ֺ���ĸ - `[0-9]`

- ʹ�����ַ�`��-��`ƥ���ַ���Χ������������ĸ����������ƥ��һϵ�����֡�
- ���磬`/[0-5]/`ƥ��`0��5`֮����������֣�����`0��5`��
- ���⣬�������ڵ����ַ��������һϵ����ĸ�����֡�
```js
let jennyStr = "Jenny8675309";
let myRegex = /[a-z0-9]/ig;
// matches all letters and numbers in jennyStr
jennyStr.match(myRegex);
```

# 10. ƥ�䵥��δָ�����ַ� - `[^a-z]`

- Ҫ�������ַ���������Ҫ�ڿ�ʼ���ź���Ͳ���ƥ����ַ�ǰ����ò����ַ�`����^��`��
- ���磬`/[^aeiou]/g`iƥ�����з�Ԫ���ַ���
- ע�⣬�ַ�`.��!��[��@��/`�Ϳհ��ַ���Ҳ�ᱻƥ�䣬�÷��ַ������ų�Ԫ���ַ���

# 11. ƥ�����һ�λ��ε��ַ� - `/a+/g`

- �����ʹ��`+`�������������Ƿ���ˡ���ס���ַ���ƥ��ģʽ����һ����һ�����������֡�
- ���磬/a+/g����`"abc"`��ƥ�䵽һ��ƥ������ҷ���["a"]����Ϊ+�Ĵ��ڣ���Ҳ����`"aabc"`��ƥ �䵽һ��ƥ���Ȼ�󷵻�`["aa"]`��
- ������Ǽ���ַ���`"abab"`������ƥ�䵽����ƥ����ҷ���`["a", "a"]`����Ϊ`a`�ַ���������������֮����һ��`b`�ַ��������Ϊ���ַ���`"bcd"`��û��`"a"`������Ҳ���ƥ���

# 12. ƥ�������λ��ε��ַ� - `/a*/`

- ����ƥ�������λ��ε��ַ�,ִ�иò������ַ�����`asterisk`��`star`����`*`��
```js
let soccerWord = "gooooooooal!";
let gPhrase = "gut feeling";
let oPhrase = "over the moon";
let goRegex = /go*/;
soccerWord.match(goRegex); // Returns ["goooooooo"]
gPhrase.match(goRegex); // Returns ["g"]
oPhrase.match(goRegex); // Returns null
```

# 13. �ö���ƥ����������С�ַ� - `/t[a-z]*?/`

- ��������ʽ�У�̰��ƥ���ƥ�䵽����������ʽƥ��ģʽ���ַ���������ܲ��֣���������Ϊƥ����ء�
- ��һ�ַ�����Ϊ����ƥ�䣬����ƥ�䵽����������ʽ���ַ�������С���ܲ��֡�
- ����Խ�������ʽ`/t[a-z]*i/`Ӧ�����ַ���`"titanic"`�����������ʽ��һ����t��ʼ����`i`�����������м���һЩ��ĸ��ƥ��ģʽ��
- ������ʽĬ����̰��ƥ�䣬���ƥ�䷵��Ϊ`["titani"]`������ƥ�䵽�ʺϸ�ƥ��ģʽ��������ַ�����
- ���ǣ������ʹ��?�ַ�������������ƥ�䡣�������������ʽ`/t[a-z]*?i/`ƥ���ַ���`"titanic"`����`["ti"]`��

# 14. ƥ���ַ����Ŀ�ͷ - `/^a/`

- ������ʽ�������ڲ������ƥ������ǻ�������Ѱ�ַ������ض�λ�õ�ƥ��ģʽ��
- ��֮ǰ����ս�У���ʹ���ַ����еĲ�����ţ�^��������һ�����ַ���������`[^thingsThatWillNotBeMatched]`�����ַ���֮�⣬������������ַ����Ŀ�ͷ��Ѱƥ��ģʽ��

```js
let firstString = "Ricky is first and can be found.";
let firstRegex = /^Ricky/;
firstRegex.test(firstString);
// Returns true
let notFirst = "You can't find Ricky now.";
firstRegex.test(notFirst);
// Returns false
```

# 15. ƥ���ַ�����ĩβ - `/xx$/`

- �����ʹ��������ʽ����Ԫ����$����Ѱ�ַ����Ľ�β��

```js
let theEnding = "This is a never ending story";
let storyRegex = /story$/;
storyRegex.test(theEnding);
// Returns true
let noEnding = "Sometimes a story will have to end";
storyRegex.test(noEnding);
// Returns false
```

#  16. ƥ�����е���ĸ������ - `/\w/`

- ʹ���ַ��࣬�����ʹ��[a-z]��Ѱ��ĸ���е�������ĸ�������ַ����Ǻܳ����ģ�����һ����д���������дҲ����������ַ���
- JavaScript ������ĸ��ƥ�����ӽ����ַ�����\w�������д��ͬ��`[A-Za-z0-9_]`����������ƥ���Сд��ĸ�����֣�ע�⣬������ƥ���»����ַ���_����

```js
let longHand = /[A-Za-z0-9_]+/;
let shortHand = /\w+/;
let numbers = "42";
let varNames = "important_var";
longHand.test(numbers); // Returns true
shortHand.test(numbers); // Returns true
longHand.test(varNames); // Returns true
shortHand.test(varNames); // Returns true
```

# 17. ƥ�������ĸ�����ֵ����з��� - `/\W/`

- ���Ѿ��˽⵽����ʹ����д\w��ƥ����ĸ������`[A-Za-z0-9_]`���������п�������Ҫ��Ѱ��ƥ��ģʽ����ĸ�����෴��
- �����ʹ��`\W`��Ѱ��`\w`�෴��ƥ��ģʽ��ע�⣬�෴ƥ��ģʽʹ�ô�д��ĸ������д��`[^A-Za-z0-9_]`��һ���ġ�

```js
let shortHand = /\W/;
let numbers = "42%";
let sentence = "Coding!";
numbers.match(shortHand); // Returns ["%"]
sentence.match(shortHand); // Returns ["!"]
```

# 18. ƥ���������� - `/\d/g`

- ���������ַ�����д��`\d`��ע����Сд��`d`�����ͬ���ַ���`[0-9]`��������` 0 �� 9` ֮���������ֵĵ����ַ���

```js
let numString = "Your sandwich will be $5.00";
let numRegex = /\d/g; // �޸���һ��
let result = numString.match(numRegex).length;
```

# 19. ƥ�����з����� - `/\D/`

- ���ҷ������ַ�����д��`\D`�����ͬ���ַ���``[^0-9]``�������Ҳ��� `0 - 9` ֮�����ֵĵ����ַ���

# 20. ���ƿ��ܵ��û��� - `/xx+\d*$/i`

- �û����е����ֱ�������������ֿ��������������
- �û�����ĸ������Сд��ĸ�ʹ�д��ĸ��
- �û������ȱ�������Ϊ�����ַ�����λ�û���ֻ��ʹ����ĸ��

```js
let username = "JackOfAllTrades";
let userCheck = /[a-z][a-z]+\d*$/i; // �޸���һ��
let result = userCheck.test(username);
```

# 21. ƥ��հ��ַ� - `/\s/`

- �����ʹ��`\s`��Ѱ�ո�����`s`��Сд
- ��ƥ��ģʽ����ƥ��ո񣬻�ƥ��س������Ʊ������ҳ���ͻ��з�������Խ�����Ϊ��`[\r\t\f\n\v]`����

```js
let whiteSpace = "Whitespace. Whitespace everywhere!"
let spaceRegex = /\s/g;
whiteSpace.match(spaceRegex);
// Returns [" ", " "]
```

# 22. ƥ��ǿհ��ַ� - `/\S/`

- ʹ��`\S`��Ѱ�ǿհ��ַ�������S�Ǵ�д����ƥ��ģʽ����ƥ��ո񡢻س������Ʊ������ҳ���ͻ��з����������Ϊ���������ַ���`[^\r\t\f\n\v]`

```js
let whiteSpace = "Whitespace. Whitespace everywhere!"
let nonSpaceRegex = /\S/g;
whiteSpace.match(nonSpaceRegex).length; // Returns 32
```

# 23. ָ��ƥ������޺����� - `/\d{3,5}/`

- ����һ�£���ʹ�üӺ�`+`����һ�������ַ���ʹ���Ǻ�`*`������������ַ�����Щ���ܷ��㣬����ʱ����Ҫƥ��һ����Χ��ƥ��ģʽ��
- �����ʹ������˵����ָ��ƥ��ģʽ�������ޡ�����˵�����뻨����`��{`��`}��`һ��ʹ�á�������ڻ�����֮����������֣����������ִ���ƥ��ģʽ�����޺����ޡ�
- ���磬Ҫ���ַ���`"ah"`��ƥ�������3��5�ε���ĸ`a`�����������ʽӦΪ`/a{3,5}h/`��

```js
let A4 = "aaaah";
let A2 = "aah";
let multipleA = /a{3,5}h/;
multipleA.test(A4); // Returns true
multipleA.test(A2); // Returns false


//�޸�������ʽohRegex��ƥ����"Oh no"�н�����3��6�ε���ĸh��
let ohStr = "Ohhh no";
let ohRegex = /Oh{3,6}\sno/i; // �޸���һ��
let result = ohRegex.test(ohStr);
```

# 24. ָֻ��ƥ������� - `/\d{3,}/`

- ����ʹ�ô��л����ŵ�����˵������ָ��ƥ��ģʽ�������ޡ�����ʱ����ֻ��ָ��ƥ��ģʽ�����޶�����Ҫָ�����ޡ�
- �ڵ�һ�����ֺ����һ�����ż��ɡ�
- ���磬Ҫƥ�����ٳ���3����ĸa���ַ���`"hah"`�����������ʽӦ����`/ha{3,}h/`��

```js
let A4 = "haaaah";
let A2 = "haah";
let A100 = "h" + "a".repeat(100) + "h";
let multipleA = /ha{3,}h/;
multipleA.test(A4); // Returns true
multipleA.test(A2); // Returns false
multipleA.test(A100); // Returns true
```

# 25. ָ��ƥ���ȷ������ - `/a{3}/`

- ����ʹ�ô��л����ŵ�����˵������ָ��ƥ��ģʽ�������ޡ�����ʱ��ֻ��Ҫ�ض�������ƥ�䡣
- Ҫָ��һ��������ƥ��ģʽ��ֻ���ڴ�����֮�����һ�����֡�
- ���磬Ҫֻƥ����ĸa����3�εĵ���`"hah"`�����������ʽӦΪ`/ha{3}h/`

```js
let A4 = "haaaah";
let A3 = "haaah";
let A100 = "h" + "a".repeat(100) + "h";
let multipleHA = /a{3}h/;
multipleHA.test(A4); // Returns false
multipleHA.test(A3); // Returns true
multipleHA.test(A100); // Returns false
```

# 26. ���ȫ������ - `/colou?r/`

- ��ʱ������Ҫ��Ѱ��ƥ��ģʽ�����в�ȷ���Ƿ���ڵĲ��֡�������ˣ��㻹���������ǡ�
- Ϊ�ˣ������ʹ���ʺ�`?`ָ�����ܴ��ڵ�Ԫ�ء��⽫���ǰ��������һ��Ԫ�ء�����Խ��˷�����Ϊǰ���Ԫ���ǿ�ѡ�ġ�
- ���磬��ʽӢ���ӢʽӢ�����в�ͬ�������ʹ���ʺ���ƥ������ƴд��

```js
let american = "color";
let british = "colour";
let rainbowRegex= /colou?r/;
rainbowRegex.test(american); // Returns true
rainbowRegex.test(british); // Returns true
```

# 27. �������ж��Ժ͸������ж��� - `/q(?=u)/, /q(?!u)/`

- ���ж����Ǹ��� JavaScript ���ַ�������ǰ���ҵ�ƥ��ģʽ��������Ҫ��ͬһ���ַ�������Ѱ���ƥ��ģʽʱ������ܷǳ����á�
- ���������ж��ԣ��������ж��Ժ͸������ж��ԡ�
- �������ж��Ի�鿴��ȷ������ƥ��ģʽ�е�Ԫ�ش��ڣ���ʵ���ϲ���ƥ�䡣�������ж��Ե��÷���`(?=...)`������`...`������Ҫ���ڵ����ᱻƥ��Ĳ��֡�
- ��һ���棬�������ж��Ի�鿴��ȷ������ƥ��ģʽ�е�Ԫ�ز����ڡ��������ж��Ե��÷���`(?!...)`������`...`����ϣ�������ڵ�ƥ��ģʽ������������ж��Բ��ֲ����ڣ�������ƥ��ģʽ�����ಿ�֡�
- �������ж����е���������󣬵�����Щʾ��������������

```js
let quit = "qu";
let noquit = "qt";
let quRegex= /q(?=u)/;
let qRegex = /q(?!u)/;
quit.match(quRegex); // Returns ["q"]
noquit.match(qRegex); // Returns ["q"]
```

## `abc123 - /(?=\w{3,6})(?=\D*\d)/`��`abc123 - /(?!\d)/`

- ���ж��Եĸ�ʵ����;�Ǽ��һ���ַ����е����������ƥ��ģʽ��������һ���򵥵�������������������� 3 �� 6 ���ַ������ٰ���һ������

```js
let password = "abc123";
let checkPass = /(?=\w{3,6})(?=\D*\d)/;
checkPass.test(password); // Returns true

//��������ʽpwRegex��ʹ�����ж�����ƥ������5���ַ����������������ֵ����롣
let sampleWord = "astronaut";
let pwRegex = /(?=\w{5})(?=\D*\d+)/; // �޸���һ��
let result = pwRegex.test(sampleWord);
```

# 28. ʹ�ò���������ģʽ - `/(\w+)\s\1/`

- ��������ƥ����ַ������ٴ����зָ��һ��С���ַ�����
- һЩ������Ѱ��ƥ��ģʽ�����ַ����г��ֶ�Σ��ֶ��ظ���������ʽ̫�˷��ˡ���һ�ָ��õķ�������ָ����ʱ���ַ����л��ж���ظ������ַ�����
- �����ʹ�ò�������Ѱ�ظ������ַ���������`(��)`��������ƥ���ظ������ַ�������ֻ��Ҫ���ظ�ƥ��ģʽ��������ʽ���������м��ɡ�
- Ҫָ���ظ��ַ��������ֵ�λ�ã�����ʹ�÷�б��`��\��`���һ�����֡�������ִ�` 1 `��ʼ��������ʹ�õ�ÿ������������Ӷ����ӡ�������һ��ʾ����`\1`����ƥ���һ���顣
- �����ʾ��ƥ�������������ո�ָ�ĵ���

```js
//���ַ�����ʹ��.match()����������һ�����飬���а�����ƥ����ַ������䲶����
let repeatStr = "regex regex";
let repeatRegex = /(\w+)\s\1/;
repeatRegex.test(repeatStr); // Returns true
repeatStr.match(repeatRegex); // Returns ["regex regex", "regex"]

//��������ʽreRegex��ʹ�ò����飬��ƥ�����ַ����н��ظ����ε����֣�
//ÿһ�����ɿո�ָ���
let repeatNum = "42 42 42";
let reRegex = /^(\d+)\s\1\s\1$/; // �޸���һ��
let result = reRegex.test(repeatNum);
```

# 29. ʹ�ò������������滻 - `string.replace(regex, 's')`

- ���������Ǻ����õġ����ǣ����������Ҳִ�и��ģ����滻��ƥ���ı��Ĳ���ʱ���������ܾͻ��Եø���ǿ��
- ����ʹ���ַ�����`.replace()`�������������滻�ַ����е��ı���`.replace()`����������������Ҫ������������ʽƥ��ģʽ���ڶ��������������滻ƥ����ַ���������ִ��ĳЩ�����ĺ�����

```js
let wrongText = "The sky is silver.";
let silverRegex = /silver/;
wrongText.replace(silverRegex, "blue");
// Returns "The sky is blue."
```

- ������ʹ����Ԫ����`��$��`�����滻�ַ����еĲ����顣

```js
"Code Camp".replace(/(\w+)\s(\w+)/, '$2 $1');
// Returns "Camp Code"

let huhText = "This sandwich is good.";
let fixRegex = /(\w+).$/; // �޸���һ��
let replaceText = "okey-dokey."; // �޸���һ��
let result = huhText.replace(fixRegex, replaceText);
```

