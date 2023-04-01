function IdolRankModalInfo(youtubeScore, spotifyScore, instaScore, googleScore, overallScore, idolName, idolImage, rankCount) {
    const handleModalSize = document.getElementById('modal-container')
    handleModalSize.style.maxWidth = '55%';

    $('#exampleModalLabel').html(`<h4>${rankCount}. ${idolName}</h4>`)

    $('#modal-idol-info').html(`<div id="modal-card-img-body">
                                    <img src="${idolImage}" id="modal-card-img" class="" alt="...">
                                    
                                    <div class="info-table">          
                                            <div class="table-responsive">
                                            <table class="table table-sm">
                                                <thead>
                                                <tr>
                                                    <th scope="col">Youtube Score</th>
                                                    <th scope="col">Spotify Score</th>
                                                    <th scope="col">Instagram Score</th>
                                                    <th scope="col">Google Score</th>
                                                    <th scope="col">Overall</th>
                                                </tr>
    
                                                <tbody>
                                                    <tr>
                                                        <td>${youtubeScore}</td>
                                                        <td>${spotifyScore}</td>
                                                        <td>${instaScore}</td>
                                                        <td>${googleScore}</td>
                                                        <td>${overallScore}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            </div>
                                        </div>
                                </div>`)
}