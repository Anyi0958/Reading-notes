function* innerGeneratorFn() {
    yield 'foo';
    return 'bar';
}

function* outerGeneratorFn() {
    console.log('iter value:', yield* innerGeneratorFn() );
}

for (const x of outerGeneratorFn()) console.log('value:', x);
// value: foo
// iter value: bar