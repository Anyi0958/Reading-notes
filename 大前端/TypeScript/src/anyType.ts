let x: any = 1;
x.ifItExists(); // 正确，方法运行时可能存在，但不会检查
x.toFixed();    //正确

let arrayList: any[] = [1, false, 'fine'];
arrayList[1] = 100;