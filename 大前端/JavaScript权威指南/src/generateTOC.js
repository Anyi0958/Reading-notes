/* #TOC {
    border: solid black 1px;
    margin: 10px;
    padding: 10px;
}

 */

onload(function(){
    let toc = document.getElementById("TOC");
    if(!toc){
        toc = document.createElement("div");
        toc.id = "TOC";
        document.body.insertBefore(toc, document.body.firstChild);
    }

    let headings;
    if(document.querySelectorAll)
        headings = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
    else
        headings = findHeadings(document.body, []);

    function findHeadings(root, sects){
        for(let c = root.firstChild; c != null; c = c.nextSibling) {
            if(c.nodeType !== 1) continue;
            if(c.tagName.length == 2 && c.tagName.charAt(0) == 'H')
                sects.push(c);
            else
                findHeadings(c,sects);
        }        
        return sects;
    }
})