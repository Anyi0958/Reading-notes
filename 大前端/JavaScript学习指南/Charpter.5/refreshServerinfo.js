function refreshServerInfo() {
    const $serverinfo = $('.serverinfo');
    $.get('http://localhost:7070').then(
        data => {
            Object.keys(data).forEach( prop => {
                $(`[data-replace="${p}"]`).text(data[p]);
            });            
        },

        (jqXHR, textStatus, err) => {
            console.log(err);
            $serverinfo.addClass('error')
                        .html('Error');
        }

    );
}