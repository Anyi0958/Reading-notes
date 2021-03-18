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
                 
                    tbody += '<td style="width:' + width + 'px; height:' + height + 
                        'px; text-align: center; vertical-align: middle"><div style="display:inline"><img src=\'' + 
                        row[key] + '\' ' + ' ' + 'width=' + '\"' + width + '\"' + ' ' + 'height=' + '\"' + height + 
                        '\"' + '></div></td>';
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