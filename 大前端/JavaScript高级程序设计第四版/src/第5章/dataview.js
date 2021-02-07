const buf = new ArrayBuffer(16);

// DataView默认使用整个ArrayBuffer
const fullDataView = new DataView(buf);
console.log(fullDataView.byteOffset);   // 0
console.log(fullDataView.byteLength);   // 16
console.log(fullDataView.buffer == buf);    // true

// 构造函数接收一个可选的字节偏移量和字节长度
// byteOffset = 0 表示视图从缓冲起点开始
// byteLLength = 8 限制视图为前8个字节
const firstHalfDataView = new DataView(buf, 0, 8);
console.log(firstHalfDataView.byteOffset);  // 0
console.log(firstHalfDataView.byteLength);  // 8
console.log(firstHalfDataView.buffer == buf);   // true

// 如果不指定，则datavie会使用剩余的缓冲
// byteOffset = 8表示视图从缓冲的第9个字节开始
// byteLength 未指定,默认为剩余缓冲
const secondHalfDataView = new DataView(buf, 8);
console.log(secondHalfDataView.byteOffset); // 8
console.log(secondHalfDataView.byteLength); // 8
console.log(secondHalfDataView.buffer == buf);  // true

