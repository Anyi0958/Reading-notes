function countdown(seconds){
	return new Promise((resolve, reject) => {
		for(let i = seconds; i >= 0; i --){
			setTimeout(() => {
				if(i > 0)	console.log(i + '...');
				else	resolve(console.log("Go!"));
			}, (seconds - i) * 1000);
		}
	});
}

countdown(5).then(
    () => {
        console.log("countdown completed successfully");
    },

    err => {
        console.log(err.message);
    }
).catch(
    err => {
        console.log(err.message);
    }
);