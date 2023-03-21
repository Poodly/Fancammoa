$(document).ready(function() {
    $("#register-btn").click(function() {
        // 버튼을 누르면 등록확인 모달을 띄움
        $("#confirmModal").modal("show");
    });

    $("#register-btn-replace").click(function() {
        // 버튼을 누르면 등록확인 모달을 띄움
        $("#confirmModal").modal("show");
    });

    $("#register-btn-replace-keyword").click(function() {
        // 버튼을 누르면 삭제확인 모달을 띄움
        $("#confirmModal").modal("show");
    });
    // 이 코드는 동적으로 생성된 요소에 대해서는 작동하지 않습니다. 
    // 이유는 $(selector).click() 메서드는 초기 로드 시 페이지에 존재하는 모든 요소에 대해서만 바인딩되기 때문입니다.

    $("#register-btn-delete").click(function() {
        // 버튼을 누르면 삭제확인 모달을 띄움
        $("#confirmModal-delete").modal("show");
    });


    // $(document).on("click", "#trash-icon", function() {

    // $("#confirmModal-delete").modal("show");
    // });
    
    $("#confirm-register-btn").click(async function() {
        // 확인 모달의 "등록" 버튼을 누르면 등록 처리를 진행
        $("#confirmModal").modal("hide"); 
        
        await updateIdolScore();
        
        window.location.reload();
    });

    $("#confirm-craete-btn").click(async function() {
        // 확인 모달의 "생성" 버튼을 누르면 생성 처리를 진행
        $("#confirmModal").modal("hide"); 
        
        await craeteIdol();
        
        window.location.reload();
    });

    $("#confirm-btn-keyword").click(async function() {
        // 확인 모달의 "생성" 버튼을 누르면 생성 처리를 진행
        $("#confirmModal").modal("hide"); 
        
        await craeteKeyword();
        
        window.location.reload();
    });
    
    $("#confirm-btn-replace-keyword").click(async function() {
        // 확인 모달의 "생성" 버튼을 누르면 생성 처리를 진행
        $("#confirmModal").modal("hide"); 
        
        await editKeyword();
        
        window.location.reload();
    });
    
    $("#confirm-replace-btn").click(async function() {
        // 확인 모달의 "교체" 버튼을 누르면 등록 처리를 진행
        $("#confirmModal").modal("hide"); 
        
        await editIdolImg();
        
        window.location.reload();
    });
  
    $("#confirm-btn-delete").click(async function() {
        // 확인 모달의 "삭제" 버튼을 누르면 삭제 처리를 진행
        $("#confirmModal-delete").modal("hide"); 

        await deleteIdol()
        
        window.location.reload();
    });
});





function editIdolInfoModal(rankCount, idolName, youtubeScore, spotifyScore, instaScore, googleScore, overallScore, idolId) {
    const handleModalSize = document.getElementById('modal-container')
    handleModalSize.style.maxWidth = '60%';
    $('#modal-idol-info').html(`<div class="info-table">          
                                    <div class="table-responsive">
                                    <table class="table table-sm">
                                        <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Youtube score <a id="modal-youtube-refresh" onclick="YoutubeIndividualRefresh()">${refreshIcon}</a></th>
                                            <th scope="col">Spotify score <a id="modal-spotify-refresh" onclick="SpotifyIndividualRefresh()">${refreshIcon}</a></th>
                                            <th scope="col">Insta score ${refreshIcon}</th>
                                            <th scope="col">Google score ${refreshIcon}</th>
                                            <th scope="col">Overall scoer ${refreshIcon}</th>
                                            <th scope="col">Id</th>
                                        </tr>
                                        </thead>
                                        <tbody class="table-body-idol-info">
                                            <tr>
                                                <td id="modal-rank">${rankCount}</td>
                                                <td id="modal-idol-name">${idolName}</td>
                                                <td id="modal-youtube-score">${youtubeScore}</td>
                                                <td id="modal-spotify-score">${spotifyScore}</td>
                                                <td id="modal-insta-score">${instaScore}</td>
                                                <td id="modal-google-score">${googleScore}</td>
                                                <td id="modal-overall">${overallScore}</td>
                                                <td id="modal-idolId">${idolId}</td>
                                            </tr>

                                            <tr>
                                                <td id="admin-page-rank"></td>
                                                <td id="admin-page-idol-name"><input class="modal-input" id="modal-edit-idol-name" value="${idolName}"></td>
                                                <td id="admin-page-youtube-score"><input class="modal-input" id="modal-edit-youtube-score" value="${youtubeScore}"></td>
                                                <td id="admin-page-spotify-score"><input class="modal-input" id="modal-edit-spotify-score" value="${spotifyScore}"></td>
                                                <td id="admin-page-insta-score"><input class="modal-input" id="modal-edit-insta-score" value="${instaScore}"></td>
                                                <td id="admin-page-google-score"><input class="modal-input" id="modal-edit-google-score" value="${googleScore}"></td>
                                                <td id="admin-page-overall"><input class="modal-input" id="modal-edit-overall" value="${overallScore}"></td>
                                                <td id="admin-page-rank"></td>
                                            </tr>

                                            
                                        </tbody>
                                    </table>
                                    </div>
                                </div>`);

    $('#confirm-btn-keyword').hide()
    $('#confirm-btn-replace-keyword').hide()
    $('#confirm-craete-btn').hide()
    $('#confirm-replace-btn').hide()
    $('#confirm-register-btn').show()

    $('#register-btn-replace-keyword').hide()
    $('#register-btn-replace').hide()
    $('#register-btn-delete').show()
    $('#register-btn').show()
}

function createIdol() {
    const handleModalSize = document.getElementById('modal-container')
    handleModalSize.style.maxWidth = '15%';
    $('#modal-idol-info').html(`<div class="info-table">          
                                    <div class="table-responsive">
                                    <table class="table table-sm">
                                        <thead>
                                        <tr>
                                            <th scope="col">Create idol name</th>
                                        </tr>
                                        </thead>
                                        <tbody class="table-body-idol-info">

                                            <tr>
                                                <td id="admin-page-idol-name"><input class="modal-input" id="modal-create-idolName" value=""></td>
                                            </tr>

                                        </tbody>
                                    </table>
                                    </div>
                                </div>`);
    

    $('#register-btn-delete').hide()
    $('#register-btn-replace').hide()
    $('#register-btn-replace-keyword').hide()
    $('#register-btn').show()
    
    $('#confirm-btn-replace-keyword').hide()
    $('#confirm-btn-keyword').hide()
    $('#confirm-replace-btn').hide()
    $('#confirm-register-btn').hide()
    $('#confirm-craete-btn').show()
}

function editIdolImgModal(idolId, idolName, idolImage, rankCount, imgId) {
    const handleModalSize = document.getElementById('modal-container')
    handleModalSize.style.maxWidth = '40%';

    $('#modal-idol-info').html(`<div id="modal-card-img-body">
                                    <img src="${idolImage}" id="modal-card-img" class="" alt="...">
                                </div>
                                    
                                <div class="modal-card-content">

                                    <div class="info-table">          
                                        <div class="table-responsive">
                                        <table class="table table-sm">
                                            <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">idolId</th>
                                                <th scope="col">imgId</th>
                                            </tr>

                                            <tbody>
                                                <tr>
                                                    <td>${rankCount}</td>
                                                    <td>${idolName}</td>
                                                    <td>${idolId}</td>
                                                    <td id="modal-eidt-imgId">${imgId}</td>
                                                </tr>
                                            </tbody>

                                        </table>
                                        </div>
                                    </div>

                                    <p class="card-text" id="rank-idolId">${idolImage}</p>
                                    <input id="modal-img-input" value="${idolImage}">
                                </div>`)

    $('#confirm-craete-btn').hide()
    $('#confirm-register-btn').hide()
    $('#confirm-btn-keyword').hide()
    $('#confirm-btn-replace-keyword').hide()

    $('#register-btn-delete').hide()
    $('#register-btn-replace-keyword').hide()
    $('#register-btn').hide()
    $('#register-btn-replace').show()
}

function modalCraeteKeyword() {
    const handleModalSize = document.getElementById('modal-container')
    handleModalSize.style.maxWidth = '30%';
    $('#modal-idol-info').html(`<div class="mb-3">
                                    <label for="message-text" class="col-form-label">Create keyword</label>
                                    <textarea class="form-control" id="modal-create-Keyword"></textarea>
                                </div>`);
    
    $('#register-btn-delete').hide()
    $('#register-btn-replace').hide()
    $('#register-btn-replace-keyword').hide()
    $('#register-btn').show()

    $('#confirm-replace-btn').hide()
    $('#confirm-btn-replace-keyword').hide()
    $('#confirm-craete-btn').hide()
    $('#confirm-register-btn').hide()
    $('#confirm-btn-keyword').show()
}

function modalEditKeyword(keywordId, keyword) {
    const handleModalSize = document.getElementById('modal-container')
    handleModalSize.style.maxWidth = '15%';
    $('#modal-idol-info').html(`<div class="info-table">          
                                    <div class="table-responsive">
                                    <table class="table table-sm">
                                        <thead>
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Keyword</th>
                                        </tr>
                                        </thead>
                                        <tbody class="table-body-idol-info">
                                            <tr>
                                                <td id="admin-page-edit-KeywordId">${keywordId}</td>
                                                <td id="admin-page-edit-Keyword">${keyword}</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td id="admin-page-idol-name"><input class="modal-input" id="modal-edit-Keyword" value="${keyword}"></td>     
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>`);
    
    $('#register-btn-delete').hide()
    $('#register-btn-replace').hide()
    $('#register-btn-replace-keyword').show()
    $('#register-btn').hide()

    $('#confirm-replace-btn').hide()
    $('#confirm-craete-btn').hide()
    $('#confirm-register-btn').hide()
    $('#confirm-btn-keyword').hide()
    $('#confirm-btn-replace-keyword').show()
}






