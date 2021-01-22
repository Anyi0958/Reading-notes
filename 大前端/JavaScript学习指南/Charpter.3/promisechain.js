const { rejects } = require("assert");
const { resolve } = require("path");

function launch() {
    return new Promise(
        (resolve, reject) => {
            console.log("Lift off!");
            setTimeout(() => {
                resolve("In orbit.");
            }, 2 * 1000);
        }
    );
}

const c = new countdown(5)
    .on('tick', i => console.log(i + '...'));

c.go()
    .then(launch)
    .then(
        msg => {
            console.log(msg);
        }
    )
    .catch(
        err => console.error("We have a problem");
    )