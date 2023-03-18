$(document).ready(function() {
    $("#register-btn").click(function() {
        // 버튼을 누르면 등록확인 모달을 띄움
        $("#confirmModal").modal("show");
    });
    // 이 코드는 동적으로 생성된 요소에 대해서는 작동하지 않습니다. 
    // 이유는 $(selector).click() 메서드는 초기 로드 시 페이지에 존재하는 모든 요소에 대해서만 바인딩되기 때문입니다.

    $("#register-btn-delete").click(function() {
        // 버튼을 누르면 삭제확인 모달을 띄움
        $("#confirmModal-delete").modal("show");
    });

    $(document).on("click", "#trash-icon", function() {
    // 버튼을 누르면 삭제확인 모달을 띄움
    $("#confirmModal-delete").modal("show");
    });
  
    $("#confirm-register-btn").click(function() {
        // 확인 모달의 "등록" 버튼을 누르면 등록 처리를 진행
        // ...
        // 등록 처리가 완료되면 기존 모달을 닫음
        $("#exampleModal").modal("hide");
        $("#confirmModal").modal("hide"); 
        
        window.location.reload();
    });
  
    $("#confirm-register-btn-delete").click(function() {
        // 확인 모달의 "등록" 버튼을 누르면 등록 처리를 진행
        // ...
        // 등록 처리가 완료되면 기존 모달을 닫음
        $("#exampleModal").modal("hide");
        $("#confirmModal-delete").modal("hide"); 
        
        window.location.reload();
    });
});





function editIdolInfoModal(rankCount, idolName, youtubeScore, spotifyScore, instaScore, googleScore, overallScore, idolId, idolImage) {

  // $('#idol-name').html();
  // $('#modal-idol-info').empty()

  $('#modal-idol-info').html(`<div class="info-table">          
                                <div class="table-responsive">
                                <table class="table table-sm">
                                    <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Youtube score ${refreshIcon}</th>
                                        <th scope="col">Spotify score ${refreshIcon}</th>
                                        <th scope="col">Insta score ${refreshIcon}</th>
                                        <th scope="col">Google score ${refreshIcon}</th>
                                        <th scope="col">Overall scoer ${refreshIcon}</th>
                                        <th scope="col">Idol id</th>
                                    </tr>
                                    </thead>
                                    <tbody class="table-body-idol-info">
                                        <tr>
                                            <td id="admin-page-rank">${rankCount}</td>
                                            <td id="admin-page-idol-name">${idolName}</td>
                                            <td id="admin-page-youtube-score">${youtubeScore}</td>
                                            <td id="admin-page-spotify-score">${spotifyScore}</td>
                                            <td id="admin-page-insta-score">${instaScore}</td>
                                            <td id="admin-page-google-score">${googleScore}</td>
                                            <td id="admin-page-overall">${overallScore}</td>
                                            <td id="admin-page-overall">${idolId}</td>
                                        </tr>

                                        <tr>
                                            <td id="admin-page-rank"></td>
                                            <td id="admin-page-idol-name"><input class="modal-input" value="${idolName}"></td>
                                            <td id="admin-page-youtube-score"><input class="modal-input" value="${youtubeScore}"></td>
                                            <td id="admin-page-spotify-score"><input class="modal-input" value="${spotifyScore}"></td>
                                            <td id="admin-page-insta-score"><input class="modal-input" value="${instaScore}"></td>
                                            <td id="admin-page-google-score"><input class="modal-input" value="${googleScore}"></td>
                                            <td id="admin-page-overall"><input class="modal-input" value="${overallScore}"></td>
                                            <td id="admin-page-rank"></td>
                                        </tr>

                                        
                                    </tbody>
                                </table>
                                </div>
                            </div>`
                          );

  // $('#youtube-score').html();
  // $('#spotify-score').html();
  // $('#insta-score').html();
  // $('#google-score').html();
  // $('#overall-score').html();

  // $('#idol-img').html();
  }





