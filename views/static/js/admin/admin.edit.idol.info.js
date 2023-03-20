async function updateIdolScore() {
    let idolId = document.getElementById('modal-idolId').textContent;
    let idolName = document.getElementById('modal-edit-idol-name').value;
    let youtubeScore = document.getElementById('modal-edit-youtube-score').value;
    let spotifyScore = document.getElementById('modal-edit-spotify-score').value;
    let instaScore = document.getElementById('modal-edit-insta-score').value;
    let googleScore = document.getElementById('modal-edit-google-score').value;
    let overallScore = document.getElementById('modal-edit-overall').value;

    try {

        idolId       = parseInt(idolId.replace(/,/g, ''))
        idolName     = parseInt(idolName.replace(/,/g, ''))
        youtubeScore = parseInt(youtubeScore.replace(/,/g, ''))
        spotifyScore = parseInt(spotifyScore.replace(/,/g, ''))
        instaScore   = parseInt(instaScore.replace(/,/g, ''))  
        googleScore  = parseInt(googleScore.replace(/,/g, ''))
        overallScore = parseInt(overallScore.replace(/,/g, ''))

        const response = await axios.put('/admin/updateIdolScore', {
            idolId,
            idolName,
            youtubeScore,
            spotifyScore,
            instaScore,
            googleScore,
            overallScore,
        });
        console.log(response.data, ' PUT요청 성공');
        $("#exampleModal").modal("hide");

    }catch (error) {
        console.log('Error:', error);
    }
};


async function craeteIdol() {
    try {
        const idolName = document.getElementById('modal-create-idolName').value;
        const response = await axios.post('/admin/craeteIdol', { idolName });
        console.log(response, ' Craeta idol 요청 성공');
        
        $("#exampleModal").modal("hide");

    }catch (error) {
        console.log('Error:', error);
    }
}


async function deleteIdol() {
    try {
        const idolId = document.getElementById('modal-idolId').textContent;
        const response = await axios.delete('/admin/deleteIdol', { data: { idolId } });
        console.log(response, ' DELETE요청 성공');

        $("#exampleModal").modal("hide");

    }catch (error) {
        console.log('Error:', error);
    }
};


async function overallRefresh() {
    try {
        await axios.put('admin/updateOverallScore');
        $("#overall-refresh").html('')
        $("#overall-refresh").html(`<div class="spinner-border spinner-border-sm text-success" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                    </div>`)
        window.location.reload();
    }catch (error) {
        console.log('Error:', error);
    }
}

async function youtubeRefresh() {
    try {
        $("#youtube-refresh").html('')
        $("#youtube-refresh").html(`<div class="spinner-border spinner-border-sm text-success" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                    </div>`)
        await axios.put('/admin/updateyoutubeScore');
        window.location.reload();
    }catch (error) {
        console.log('Error:', error);
    }
}

async function spotifyRefresh() {
    try {
        $("#spotitfy-refresh").html('')
        $("#spotitfy-refresh").html(`<div class="spinner-border spinner-border-sm text-success" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                    </div>`)
        await axios.put('/admin/updateSpotifyScore');
        window.location.reload();
    }catch (error) {
        console.log('Error:', error);
    }
}


