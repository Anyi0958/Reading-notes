// valid
function* validGeneratorFn() {
    yield;
}

// invalid
function* invalidGeneratorFnA() {
    function a() {
        yield;
    }
}

// invalid
function* invalidGeneratorFnB() {
    const b = () => {
        yield;
    }
}

// invalid
function* invalidGeneratorFnC() {
    (() => {
        yield;
    })();
}