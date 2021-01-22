function refreshServerInfo(){
    const req = new XMLHttpRequest();
    req.open('POST', 'http://localhost:7070/', true);
    req.send('ss');
    req.addEventListener('load', () => {
        console.log(this.responseText);
        const data = JSON.parse(this.responseText);
        
        const serverinfo = document.querySelector('.serverinfo');

        Object.keys(data).forEach(prop => {
            const replacements = serverinfo.querySelectorAll(`[data-replace="${prop}"]`);

            for(let r of replacements){
                r.textContent = data[p];
            }
        });
    });


}

//每5秒更新一次
setInterval(refreshServerInfo, 2000);