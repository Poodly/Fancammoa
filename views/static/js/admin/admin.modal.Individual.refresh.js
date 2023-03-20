async function YoutubeIndividualRefresh() {
    const query = document.getElementById('modal-idol-name').textContent;
    const idolId = document.getElementById('modal-idolId').textContent;

    console.log("query----------",query)
    console.log("idolId----------",idolId)
    try {
        $("#modal-youtube-refresh").html('')
        $("#modal-youtube-refresh").html(`<div class="spinner-border spinner-border-sm text-success" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                    </div>`)
        await axios.put('/admin/IndividualUpdateYoutube', { query, idolId });

        // $("#modal-youtube-refresh").html(`${refreshIcon}`)
        window.location.reload();
    }catch (error) {
        console.log('Error:', error);
    }
}

async function SpotifyIndividualRefresh() {
    const query = document.getElementById('modal-idol-name').textContent;
    const idolId = document.getElementById('modal-idolId').textContent;

    console.log("query----------",query)
    console.log("idolId----------",idolId)
    try {
        $("#modal-spotify-refresh").html('')
        $("#modal-spotify-refresh").html(`<div class="spinner-border spinner-border-sm text-success" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                    </div>`)
        await axios.put('/admin/IndividualUpdateSpotify', { query, idolId });

        // $("#modal-spotify-refresh").html(`${refreshIcon}`)
        window.location.reload();
    }catch (error) {
        console.log('Error:', error);
    }
}