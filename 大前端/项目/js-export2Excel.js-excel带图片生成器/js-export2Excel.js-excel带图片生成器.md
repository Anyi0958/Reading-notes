js-export2Excel.js-��ͼƬexcel������ Ŀ¼
[TOC]
***

# ǰ��

- `js`����`.xls`��`excel`�ļ�������Ϊ����`XML`��ҳ
- ���ڶ�ԭ��ĵ��������ٴη�װ��ԭ������[���ʹ�ô�js����Excel+export2Excel.js��ͼƬ����(���̰���)](https://blog.csdn.net/qq_39940674/article/details/85862194)
- `Excle`�Ĺ��캯����`export2Excel(tHeadData, tBodyData, dataName, picWidth, picHeight)`
- ����ʹ��`conf`���ļ����ݽ�������

## ������Ľ�����

1. �޷�ָ�������ļ�������
2. �����ݵ��޸�����Բ���
3. ��`office excel`��`xml`�˽ⲻ������

# ����Ч��չʾ

![image-20210317164858432](.\img\0-performance.png)

# ģ�� - `export2Excel_module.js`

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

        //����AX����excel
        let oWB = oXL.Workbooks.Add();
        //��ȡworkbook����
        let xlsheet = oWB.Worksheets(1);
        //���ǰsheet
        let sel = document.body.createTextRange();
        sel.moveToElementText(curTbl);
        //�ѱ���е������Ƶ�TextRange��
        sel.select;
        //ȫѡTextRange������
        sel.execCommand("Copy");
        //����TextRange������
        xlsheet.Paste();
        //ճ�������EXCEL��
        
        oXL.Visible = true;
        //����excel�ɼ�����

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
            // ����excel���̣��˳����
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

        // ��ӱ�ͷ��Ϣ
        let thead = '<thead><tr>';

        for (let i = 0; i < th_len; i++) {
            thead += '<th>' + tHeadData[i] + '</th>';
        }

        thead += '</tr></thead>';

        // ���ÿһ������
        let tbody = '<tbody>';

        for (let i = 0; i < tb_len; i++) {
            tbody += '<tr>';
            let row = tBodyData[i]; // ��ȡÿһ������
    
            for (let key in row) {
                if (re.test(row[key])) { // ���ΪͼƬ������Ҫ��div��סͼƬ
                 
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

# ʹ�ô���

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

