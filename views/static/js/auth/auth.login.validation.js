$(document).ready(async function() {
    const urlParams  = new URLSearchParams(window.location.search);
    const errorItem  = urlParams.get('error');

    if(errorItem) {
        $('#auth-validation').html(``);
        $('#auth-validation').html(`<p>* ${errorItem}</p>`);
    }
});


