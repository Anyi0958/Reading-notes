const { resolve } = require("path");

function nfcall(f, ...args) {
    return new Promise((resolve, reject) => {
        f.call(null, ...args, (err, ...args) => {
            if(err) return reject(err);
            resolve(args.length < 2 ? args[0] : args);
        });
    });
}