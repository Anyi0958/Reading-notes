function handleResponse(response) {
    console.log(`${reponse.ip}`);
}

let script = document.createElement('script');
script.src = "http://127.0.0.1/?callback=handleResponse";
document.body.insertBefore(script,document.body.firstChild);