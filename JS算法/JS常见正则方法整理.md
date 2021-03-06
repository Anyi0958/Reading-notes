JS常见正则方法整理 目录
[TOC]
***

# 前言

- 整理自`FreecodeCamp`

***



# 1. 使用测试方法 - `test`

- `JavaScript `中有多种使用正则表达式的方法。测试正则表达式的一种方法是使用.test()方法。
- `.test()`方法会把你编写的正则表达式应用到一个字符串（即括号内的内容），如果你的匹配模式成功匹配到字符，则返回true，反之，返回false。

```js
let testStr = "freeCodeCamp";
let testRegex = /Code/;
testRegex.test(testStr);
// Returns true
```

# 2. 同时用多种模式匹配文字字符串 - `x|y`

- 可以使用|操作符来匹配多个规则。
- 此操作符匹配在它之前或之后的匹配模式。例如，如果你想匹配`"yes"`或`"no"`，你需要的正则表达式是`/yes|no/`。
- 你还可以匹配多个规则，这可以通过添加更多的匹配模式来实现。这些匹配模式将包含更多的|操作符来分隔它们，比如`/yes|no|maybe/`。

# 3. 匹配时忽略大小写 - `/x/i`

- 匹配不同的英文字母大小写
- 大小写（或者字母大小写）是大写字母和小写字母的区别。大写字母的例子有`"A"、"B"`和`"C"`。小写字母的例子有`"a"、"b"和"c"`。
- 你可以使用标志`（flag）`来匹配这两种情况。标志有很多，不过这里我们只关注忽略大小写的标志——`i`。
- 你可以通过将它附加到正则表达式之后来使用它。这里给出使用该标志的一个实例`/ignorecase/i`。这个字符串可以匹配字符串`"ignorecase"`、`"igNoreCase"`和`"IgnoreCase"`。

# 4. 提取匹配项 - `match`

- 可以使用.match()方法来提取你找到的实际匹配项。
```js
"Hello, World!".match(/Hello/);
// Returns ["Hello"]
let ourStr = "Regular expressions";
let ourRegex = /expressions/;
ourStr.match(ourRegex);
// Returns ["expressions"]
```

# 5. 全局匹配 - `/x/g`

- 若要多次搜寻或提取匹配模式，你可以使用`g`标志。
```js
let repeatRegex = /Repeat/ig;
testStr.match(repeatRegex);
// Returns ["Repeat", "Repeat", "Repeat"]
```

# 6. 用通配符`.`匹配任何内容 - `/hu./`

- 通配符`.`将匹配任何一个字符。通配符也叫`dot`或`period`。你可以像使用正则表达式中任何其他字符一样使用通配符。例如，如果你想匹配"hug"、"huh"、"hut"和"hum"，你可以使用正则表达式`/hu./`匹配以上四个单词。
```js
let humStr = "I'll hum a song";
let hugStr = "Bear hug";
let huRegex = /hu./;
humStr.match(huRegex); // Returns ["hum"]
hugStr.match(huRegex); // Returns ["hug"]
```

# 7. 将单个字符与多种可能性匹配 - `[aiu]`

- 你可以使用字符集搜寻具有一定灵活性的文字匹配模式。字符集允许你通过把它们放在方括号`（[和]）`之间的方式来定义一组你需要匹配的字符串。
- 例如，你想要匹配`"bag"、"big"和"bug"`，但是不想匹配`"bog"`。你可以创建正则表达式`/b[aiu]g/`来执行此操作。`[aiu]`是只匹配字符`"a"、"i"或者"u"`的字符集。
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

# 8. 匹配字母表中的字母 - `[a-z]`

- 在字符集中，你可以使用连字符`（-）`来定义要匹配的字符范围。
例如，要匹配小写字母`a到e`，你可以使用`[a-e]`。
```js
let catStr = "cat";
let batStr = "bat";
let matStr = "mat";
let bgRegex = /[a-e]at/;
catStr.match(bgRegex); // Returns ["cat"]
batStr.match(bgRegex); // Returns ["bat"]
matStr.match(bgRegex); // Returns null
```

# 9. 匹配字母表中的数字和字母 - `[0-9]`

- 使用连字符`（-）`匹配字符范围并不仅限于字母。它还可以匹配一系列数字。
- 例如，`/[0-5]/`匹配`0和5`之间的任意数字，包含`0和5`。
- 此外，还可以在单个字符集中组合一系列字母和数字。
```js
let jennyStr = "Jenny8675309";
let myRegex = /[a-z0-9]/ig;
// matches all letters and numbers in jennyStr
jennyStr.match(myRegex);
```

# 10. 匹配单个未指定的字符 - `[^a-z]`

- 要创建否定字符集，你需要在开始括号后面和不想匹配的字符前面放置插入字符`（即^）`。
- 例如，`/[^aeiou]/g`i匹配所有非元音字符。
- 注意，字符`.、!、[、@、/`和空白字符等也会被匹配，该否定字符集仅排除元音字符。

# 11. 匹配出现一次或多次的字符 - `/a+/g`

- 你可以使用`+`符号来检查情况是否如此。记住，字符或匹配模式必须一个接一个地连续出现。
- 例如，/a+/g会在`"abc"`中匹配到一个匹配项，并且返回["a"]。因为+的存在，它也会在`"aabc"`中匹 配到一个匹配项，然后返回`["aa"]`。
- 如果它是检查字符串`"abab"`，它将匹配到两个匹配项并且返回`["a", "a"]`，因为`a`字符不连续，在它们之间有一个`b`字符。最后，因为在字符串`"bcd"`中没有`"a"`，因此找不到匹配项。

# 12. 匹配出现零次或多次的字符 - `/a*/`

- 可以匹配出现零次或多次的字符,执行该操作的字符叫做`asterisk`或`star`，即`*`。
```js
let soccerWord = "gooooooooal!";
let gPhrase = "gut feeling";
let oPhrase = "over the moon";
let goRegex = /go*/;
soccerWord.match(goRegex); // Returns ["goooooooo"]
gPhrase.match(goRegex); // Returns ["g"]
oPhrase.match(goRegex); // Returns null
```

# 13. 用惰性匹配来查找最小字符 - `/t[a-z]*?/`

- 在正则表达式中，贪婪匹配会匹配到符合正则表达式匹配模式的字符串的最长可能部分，并将其作为匹配项返回。
- 另一种方案称为懒惰匹配，它会匹配到满足正则表达式的字符串的最小可能部分。
- 你可以将正则表达式`/t[a-z]*i/`应用于字符串`"titanic"`。这个正则表达式是一个以t开始，以`i`结束，并且中间有一些字母的匹配模式。
- 正则表达式默认是贪婪匹配，因此匹配返回为`["titani"]`。它会匹配到适合该匹配模式的最大子字符串。
- 但是，你可以使用?字符来将其变成懒惰匹配。调整后的正则表达式`/t[a-z]*?i/`匹配字符串`"titanic"`返回`["ti"]`。

# 14. 匹配字符串的开头 - `/^a/`

- 正则表达式可以用于查找许多匹配项。它们还用于搜寻字符串中特定位置的匹配模式。
- 在之前的挑战中，你使用字符集中的插入符号（^）来创建一个否定字符集，形如`[^thingsThatWillNotBeMatched]`。在字符集之外，插入符号用于字符串的开头搜寻匹配模式。

```js
let firstString = "Ricky is first and can be found.";
let firstRegex = /^Ricky/;
firstRegex.test(firstString);
// Returns true
let notFirst = "You can't find Ricky now.";
firstRegex.test(notFirst);
// Returns false
```

# 15. 匹配字符串的末尾 - `/xx$/`

- 你可以使用正则表达式的美元符号$来搜寻字符串的结尾。

```js
let theEnding = "This is a never ending story";
let storyRegex = /story$/;
storyRegex.test(theEnding);
// Returns true
let noEnding = "Sometimes a story will have to end";
storyRegex.test(noEnding);
// Returns false
```

#  16. 匹配所有的字母和数字 - `/\w/`

- 使用字符类，你可以使用[a-z]搜寻字母表中的所有字母。这种字符类是很常见的，它有一个缩写，但这个缩写也包含额外的字符。
- JavaScript 中与字母表匹配的最接近的字符类是\w，这个缩写等同于`[A-Za-z0-9_]`它不仅可以匹配大小写字母和数字，注意，它还会匹配下划线字符（_）。

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

# 17. 匹配除了字母和数字的所有符号 - `/\W/`

- 你已经了解到可以使用缩写\w来匹配字母和数字`[A-Za-z0-9_]`。不过，有可能你想要搜寻的匹配模式与字母数字相反。
- 你可以使用`\W`搜寻和`\w`相反的匹配模式。注意，相反匹配模式使用大写字母。此缩写与`[^A-Za-z0-9_]`是一样的。

```js
let shortHand = /\W/;
let numbers = "42%";
let sentence = "Coding!";
numbers.match(shortHand); // Returns ["%"]
sentence.match(shortHand); // Returns ["!"]
```

# 18. 匹配所有数字 - `/\d/g`

- 查找数字字符的缩写是`\d`，注意是小写的`d`。这等同于字符类`[0-9]`，它查找` 0 到 9` 之间任意数字的单个字符。

```js
let numString = "Your sandwich will be $5.00";
let numRegex = /\d/g; // 修改这一行
let result = numString.match(numRegex).length;
```

# 19. 匹配所有非数字 - `/\D/`

- 查找非数字字符的缩写是`\D`。这等同于字符串``[^0-9]``，它查找不是 `0 - 9` 之间数字的单个字符。

# 20. 限制可能的用户名 - `/xx+\d*$/i`

- 用户名中的数字必须在最后，且数字可以有零个或多个。
- 用户名字母可以是小写字母和大写字母。
- 用户名长度必须至少为两个字符。两位用户名只能使用字母。

```js
let username = "JackOfAllTrades";
let userCheck = /[a-z][a-z]+\d*$/i; // 修改这一行
let result = userCheck.test(username);
```

# 21. 匹配空白字符 - `/\s/`

- 你可以使用`\s`搜寻空格，其中`s`是小写
- 此匹配模式不仅匹配空格，还匹配回车符、制表符、换页符和换行符，你可以将其视为与`[\r\t\f\n\v]`类似

```js
let whiteSpace = "Whitespace. Whitespace everywhere!"
let spaceRegex = /\s/g;
whiteSpace.match(spaceRegex);
// Returns [" ", " "]
```

# 22. 匹配非空白字符 - `/\S/`

- 使用`\S`搜寻非空白字符，其中S是大写。此匹配模式将不匹配空格、回车符、制表符、换页符和换行符。你可以认为这类似于字符类`[^\r\t\f\n\v]`

```js
let whiteSpace = "Whitespace. Whitespace everywhere!"
let nonSpaceRegex = /\S/g;
whiteSpace.match(nonSpaceRegex).length; // Returns 32
```

# 23. 指定匹配的上限和下限 - `/\d{3,5}/`

- 回想一下，你使用加号`+`查找一个或多个字符，使用星号`*`查找零个或多个字符。这些都很方便，但有时你需要匹配一定范围的匹配模式。
- 你可以使用数量说明符指定匹配模式的上下限。数量说明符与花括号`（{`和`}）`一起使用。你可以在花括号之间放两个数字，这两个数字代表匹配模式的上限和下限。
- 例如，要在字符串`"ah"`中匹配仅出现3到5次的字母`a`，你的正则表达式应为`/a{3,5}h/`。

```js
let A4 = "aaaah";
let A2 = "aah";
let multipleA = /a{3,5}h/;
multipleA.test(A4); // Returns true
multipleA.test(A2); // Returns false


//修改正则表达式ohRegex以匹配在"Oh no"中仅出现3到6次的字母h。
let ohStr = "Ohhh no";
let ohRegex = /Oh{3,6}\sno/i; // 修改这一行
let result = ohRegex.test(ohStr);
```

# 24. 只指定匹配的下限 - `/\d{3,}/`

- 可以使用带有花括号的数量说明符来指定匹配模式的上下限。但有时候你只想指定匹配模式的下限而不需要指定上限。
- 在第一个数字后面跟一个逗号即可。
- 例如，要匹配至少出现3次字母a的字符串`"hah"`，你的正则表达式应该是`/ha{3,}h/`。

```js
let A4 = "haaaah";
let A2 = "haah";
let A100 = "h" + "a".repeat(100) + "h";
let multipleA = /ha{3,}h/;
multipleA.test(A4); // Returns true
multipleA.test(A2); // Returns false
multipleA.test(A100); // Returns true
```

# 25. 指定匹配的确切数量 - `/a{3}/`

- 可以使用带有花括号的数量说明符来指定匹配模式的上下限。但有时你只需要特定数量的匹配。
- 要指定一定数量的匹配模式，只需在大括号之间放置一个数字。
- 例如，要只匹配字母a出现3次的单词`"hah"`，你的正则表达式应为`/ha{3}h/`

```js
let A4 = "haaaah";
let A3 = "haaah";
let A100 = "h" + "a".repeat(100) + "h";
let multipleHA = /a{3}h/;
multipleHA.test(A4); // Returns false
multipleHA.test(A3); // Returns true
multipleHA.test(A100); // Returns false
```

# 26. 检查全部或无 - `/colou?r/`

- 有时，你想要搜寻的匹配模式可能有不确定是否存在的部分。尽管如此，你还是想检查它们。
- 为此，你可以使用问号`?`指定可能存在的元素。这将检查前面的零个或一个元素。你可以将此符号视为前面的元素是可选的。
- 例如，美式英语和英式英语略有不同，你可以使用问号来匹配两种拼写。

```js
let american = "color";
let british = "colour";
let rainbowRegex= /colou?r/;
rainbowRegex.test(american); // Returns true
rainbowRegex.test(british); // Returns true
```

# 27. 正向先行断言和负向先行断言 - `/q(?=u)/, /q(?!u)/`

- 先行断言是告诉 JavaScript 在字符串中向前查找的匹配模式。当你想要在同一个字符串上搜寻多个匹配模式时，这可能非常有用。
- 有两种先行断言：正向先行断言和负向先行断言。
- 正向先行断言会查看并确保搜索匹配模式中的元素存在，但实际上并不匹配。正向先行断言的用法是`(?=...)`，其中`...`就是需要存在但不会被匹配的部分。
- 另一方面，负向先行断言会查看并确保搜索匹配模式中的元素不存在。负向先行断言的用法是`(?!...)`，其中`...`是你希望不存在的匹配模式。如果负向先行断言部分不存在，将返回匹配模式的其余部分。
- 尽管先行断言有点儿令人困惑，但是这些示例会有所帮助。

```js
let quit = "qu";
let noquit = "qt";
let quRegex= /q(?=u)/;
let qRegex = /q(?!u)/;
quit.match(quRegex); // Returns ["q"]
noquit.match(qRegex); // Returns ["q"]
```

## `abc123 - /(?=\w{3,6})(?=\D*\d)/`和`abc123 - /(?!\d)/`

- 先行断言的更实际用途是检查一个字符串中的两个或更多匹配模式。这里有一个简单的密码检查器，密码规则是 3 到 6 个字符且至少包含一个数字

```js
let password = "abc123";
let checkPass = /(?=\w{3,6})(?=\D*\d)/;
checkPass.test(password); // Returns true

//在正则表达式pwRegex中使用先行断言以匹配至少5个字符且有两个连续数字的密码。
let sampleWord = "astronaut";
let pwRegex = /(?=\w{5})(?=\D*\d+)/; // 修改这一行
let result = pwRegex.test(sampleWord);
```

# 28. 使用捕获组重用模式 - `/(\w+)\s\1/`

- 本质是先匹配大字符串，再从其中分割出一个小的字符串。
- 一些你所搜寻的匹配模式会在字符串中出现多次，手动重复该正则表达式太浪费了。有一种更好的方法可以指定何时在字符串中会有多个重复的子字符串。
- 你可以使用捕获组搜寻重复的子字符串。括号`(和)`可以用来匹配重复的子字符串。你只需要把重复匹配模式的正则表达式放在括号中即可。
- 要指定重复字符串将出现的位置，可以使用反斜杠`（\）`后接一个数字。这个数字从` 1 `开始，随着你使用的每个捕获组的增加而增加。这里有一个示例，`\1`可以匹配第一个组。
- 下面的示例匹配任意两个被空格分割的单词

```js
//在字符串上使用.match()方法将返回一个数组，其中包含它匹配的字符串及其捕获组
let repeatStr = "regex regex";
let repeatRegex = /(\w+)\s\1/;
repeatRegex.test(repeatStr); // Returns true
repeatStr.match(repeatRegex); // Returns ["regex regex", "regex"]

//在正则表达式reRegex中使用捕获组，以匹配在字符串中仅重复三次的数字，
//每一个都由空格分隔。
let repeatNum = "42 42 42";
let reRegex = /^(\d+)\s\1\s\1$/; // 修改这一行
let result = reRegex.test(repeatNum);
```

# 29. 使用捕获组搜索和替换 - `string.replace(regex, 's')`

- 搜索功能是很有用的。但是，当你的搜索也执行更改（或替换）匹配文本的操作时，搜索功能就会显得更加强大。
- 可以使用字符串上`.replace()`方法来搜索并替换字符串中的文本。`.replace()`的输入首先是你想要搜索的正则表达式匹配模式，第二个参数是用于替换匹配的字符串或用于执行某些操作的函数。

```js
let wrongText = "The sky is silver.";
let silverRegex = /silver/;
wrongText.replace(silverRegex, "blue");
// Returns "The sky is blue."
```

- 还可以使用美元符号`（$）`访问替换字符串中的捕获组。

```js
"Code Camp".replace(/(\w+)\s(\w+)/, '$2 $1');
// Returns "Camp Code"

let huhText = "This sandwich is good.";
let fixRegex = /(\w+).$/; // 修改这一行
let replaceText = "okey-dokey."; // 修改这一行
let result = huhText.replace(fixRegex, replaceText);
```

