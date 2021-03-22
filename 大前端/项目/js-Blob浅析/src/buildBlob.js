let blob = new BlobBuilder();

// add one word in Blob, use null as end of the string
blob.append("This blob contains this text and 10 big-endian 32-bit signed ints.");
blob.append("\0"); // NULL

// data store in  ArrayBuffer
let ab = new ArrayBuffer(4*10),
    dv = new DataView(ab);

for(let i = 0; i < 10; i++){
    dv.setInt32(i*4, i);
}

// add ArrayBuffer in Blob
blob.append(ab);
// get blob from builder, assign MIME Type
let result = blob.getBlob("x-optional/mime-type-here");
console.log(result);

