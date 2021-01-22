function* theFutureIsNow() {
    const dataA = yield nfcall(fs.readFile, 'a');
    const dataB = yield nfcall(fs.readFile, 'b');
    const dataC = yield nfcall(fs.readFile, 'c');
    yield ptimeout(60 * 1000);
    yield nfcall(fs.writeFile, 'd', dataA + dataB + dataC);
}