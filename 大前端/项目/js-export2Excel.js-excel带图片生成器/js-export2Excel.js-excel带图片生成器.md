js-export2Excel.js-带图片excel生成器 目录
[TOC]
***

# 前言

- `js`生成`.xls`的`excel`文件，本质为生成`XML`网页
- 基于对原版的导出进行再次封装，原博主：[如何使用纯js导出Excel+export2Excel.js的图片导出(包教包会)](https://blog.csdn.net/qq_39940674/article/details/85862194)
- `Excle`的构造函数：`export2Excel(tHeadData, tBodyData, dataName, picWidth, picHeight)`
- 建议使用`conf`对文件内容进行配置

## 不足与改进方向

1. 无法指定下载文件的名字
2. 对内容的修改灵活性不足
3. 对`office excel`的`xml`了解不够深入

# 生成效果展示

![image-20210317164858432](.\img\0-performance.png)

# 模块 - `export2Excel_module.js`

```js
// IE Type
const BasicConf = {
    Type: [
        "MSIE",
        "Firefox",
        "Chrome",
        "Opera",
        "Safari"
    ],
    URI: 'data:application/vnd.ms-excel;base64,',
    template: `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
                xmlns:x="urn:schemas-microsoft-com:office:excel" 
                xmlns="http://www.w3.org/TR/REC-html40">
                    <head>
                    <meta charset="UTF-8">
                    <title>{title}</title>
                    <!--[if gte mso 9]>
                    <xml>
                    <x:ExcelWorkbook>
                        <x:ExcelWorksheets>
                        <x:ExcelWorksheet>
                        <x:Name>{worksheet}</x:Name>
                        <x:WorksheetOptions>
                            <x:DisplayGridlines/>
                        </x:WorksheetOptions>
                        </x:ExcelWorksheet>
                        </x:ExcelWorksheets>
                    </x:ExcelWorkbook>
                    </xml>
                    <![endif]-->
                    </head>
                    <body>
                        <table>{table}</table>
                    </body>
                </html>`,
    RegexpString: /http/,
};

let export2Excel = function(tHeadData, tBodyData, dataName, picWidth, picHeight) {
    this.explorer;
    this.idTmr;
    this.base64;
    this.format;
    this.excute(tHeadData, tBodyData, dataName, picWidth, picHeight);
}
export2Excel.prototype = {
    CleanUp() {
        window.clearInterval(this.idTmr);
    },

    GetExplorerType() {
        const explorer = window.navigator.userAgent;
        for(let i of BasicConf.Type){
            // console.log(i);
            if(explorer.indexOf(i) >= 0 ) {
                this.explorer = i;
                return;
            }
        }
    },

    JudgeType(data, name) {
        this.explorer == 'ie' ? this.tableToIE(data,name) : this.tableToNotIE(data,name);
        return;
    },

    tableToIE(data, name) {
        let curTbl = data,
            oXL = new ActiveXObject("Excel.Application");

        //创建AX对象excel
        let oWB = oXL.Workbooks.Add();
        //获取workbook对象
        let xlsheet = oWB.Worksheets(1);
        //激活当前sheet
        let sel = document.body.createTextRange();
        sel.moveToElementText(curTbl);
        //把表格中的内容移到TextRange中
        sel.select;
        //全选TextRange中内容
        sel.execCommand("Copy");
        //复制TextRange中内容
        xlsheet.Paste();
        //粘贴到活动的EXCEL中
        
        oXL.Visible = true;
        //设置excel可见属性

        try{
            let fname = oXL.Application.GetSaveAsFilename("Excel.xlsx", "Excel Spreadsheets (*.xls), *.xls");
        }catch(err) {
            console.log(`Nested catch caught: ${err}`);
        } finally {
            oWB.SaveAs(fname);
 
            oWB.Close(savechanges = false);
            //xls.visible = false;
            oXL.Quit();
            oXL = null;
            // 结束excel进程，退出完成
            window.setInterval(this.Cleanup, 1);
            this.idTmr = window.setInterval(this.CleanUp, 1);
        }
    },

    excute(tHeadData, tBodyData, dataName, picWidth, picHeight) {
        const re = BasicConf.RegexpString,
            th_len = tHeadData.length,
            tb_len = tBodyData.length;

        const width = picWidth,
            height = picHeight;

        // 添加表头信息
        let thead = '<thead><tr>';

        for (let i = 0; i < th_len; i++) {
            thead += '<th>' + tHeadData[i] + '</th>';
        }

        thead += '</tr></thead>';

        // 添加每一行数据
        let tbody = '<tbody>';

        for (let i = 0; i < tb_len; i++) {
            tbody += '<tr>';
            let row = tBodyData[i]; // 获取每一行数据
    
            for (let key in row) {
                if (re.test(row[key])) { // 如果为图片，则需要加div包住图片
                 
                    tbody += '<td style="width:' + width + 'px; height:' + height + 'px; text-align: center; vertical-align: middle"><div style="display:inline"><img src=\'' + row[key] + '\' ' + ' ' + 'width=' + '\"' + width + '\"' + ' ' + 'height=' + '\"' + height + '\"' + '></div></td>';
                } else {
                    tbody += '<td style="text-align:center">' + row[key] + '</td>';
                }
            }
            
            tbody += '</tr>';
        }
        
        tbody += '</tbody>';
    
        let table = thead + tbody;

        // export
        this.JudgeType(table, dataName);
        // console.log(dataName);
    }

}

export2Excel.prototype.tableToNotIE = (function() {
        
    const uri = BasicConf.URI;
    const template = BasicConf.template;

    this.base64 = (event) => window.btoa(unescape(encodeURIComponent(event)));
    this.format = (str, c) => {
        // console.log( str.replace(/{(\w+)}/g, (m,p)=>console.log(p)));
        return str.replace(/{(\w+)}/g,
                (m, p) => {
                    console.log(c[p]);
                    return c[p];
                });
    }

    return (table, name) => {
        const ctx = {
            title: 'fwx',
            worksheet: name,
            table
        };
        

        let link = document.createElement('a');
        
        link.setAttribute('href', 
            uri + this.base64(
                this.format(template,ctx)
            )
        );
        // console.log(link);
        link.click();
    }

})();
```

# 使用代码

## `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- <script src="./Excel-/Export2Excel.js"></script> -->
    <!-- <script src="./Excel-/Blob.js"></script> -->
    <script src="./export2Excel_module.js"></script>
    <script src="./main.js"></script>
</body>
</html>
```

## `main.js`

```js
// main.js
// pic
const conf = {
    pic: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2801998497,4036145562&fm=27&gp=0.jpg",
    picWidth: 40,
    picHeight: 60,
    excelWorkBookName: 'test'
};
// header, body
const tHeader = [
    'flower',
    'color',
    'pic'
];

const tBody = [
    {
        name: 'rose',
        color: 'red',
        pic: conf.pic
    },
    {
        name: 'rose2',
        color: 'red',
        pic: conf.pic
    },
    {
        name: 'rose3',
        color: 'red',
        pic: conf.pic
    }
];



let test = new export2Excel(tHeader, tBody, conf.excelWorkBookName, conf.picWidth, conf.picHeight);
// export2Excel(tHeader, tBody, 'test')
```

