const buf = new ArrayBuffer(16);    // 在内存中分配16字节
console.log(buf.byteLength);    // 16

const buf1 = new ArrayBuffer(16);
const buf2 = buf1.slice(4, 12);
console.log(buf2.byteLength);   // 8