const refreshIcon = `<a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                        </svg>
                    </a>`

$(document).ready(async function() {
    await makeEditInfoTitleSearchBoxButton()
    makeRankTable()
});

$("#left-nav-edit-idol-info").click(async function() {
    await makeEditInfoTitleSearchBoxButton()
    makeRankTable()
});



async function makeRankTable() {
    const tableBodyIdolInfo = document.querySelector('.table-body-idol-info');
    tableBodyIdolInfo.innerHTML = '';    

    try {
        const response = await axios.get('/rank/getRankInfoItems');
        const RankInfoItems = await response.data.RankInfoItems;

        console.log("RankInfoItems----------------",RankInfoItems)
        
        // 검색 결과에 따라 HTML 코드 생성
        const tempHtmlArray = [];
        let rankCount = 0;
        for (let i = 0; i < RankInfoItems.length; i++) {
            const rankCardItem = RankInfoItems[i];
            
            let idolId    = rankCardItem.idolId
            let idolName  = rankCardItem.idolName
            let youtubeScore = rankCardItem.youtubeScore
            let spotifyScore = rankCardItem.spotifyScore
            let instaScore   = rankCardItem.instaScore
            let googleScore  = rankCardItem.googleScore
            let overallScore = rankCardItem.overallScore
            let idolImage    = rankCardItem.idolImage.img
            
            rankCount += 1;
        
            const tempHtml = `<tr onclick="editIdolInfoModal('${rankCount}','${idolName}','${youtubeScore}','${spotifyScore}','${instaScore}','${googleScore}','${overallScore}','${idolId}','${idolImage}')" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">
                                <td id="admin-page-rank">${rankCount}</td>
                                <td id="admin-page-idol-name">${idolName}</td>
                                <td id="admin-page-youtube-score">${youtubeScore}</td>
                                <td id="admin-page-spotify-score">${spotifyScore}</td>
                                <td id="admin-page-insta-score">${instaScore}</td>
                                <td id="admin-page-google-score">${googleScore}</td>
                                <td id="admin-page-overall">${overallScore}</td>
                            </tr>`
            tempHtmlArray.push(tempHtml);
                
            }    
            tableBodyIdolInfo.insertAdjacentHTML('beforeend', tempHtmlArray.join(''));  
        } catch (error) {
            console.log('Error:', error);
        }
}     

function makeEditInfoTitleSearchBoxButton() {
    const adminMainTable = document.querySelector('.admin-main-table');
    adminMainTable.innerHTML = '';

    const tempHtml = `<div class="info-title-search-box-button">
                        <div class="info-table-title">
                            <h2>Idol information</h2>
                            <p>삭제, 추가, 이름변경, 점수 업데이트</p>
                        </div>

                        <form action="" onsubmit="return false;">
                            <div class="head_nev_2">
                                <div class="head_search">
                                    <input id="search_box" type="text" placeholder="검색어를 입력하세요." title="검색">
                                    <button id="search-button" onclick="">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-search-heart" viewBox="0 0 16 16">
                                    <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z"/>
                                    <path d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"/>
                                    </svg>
                                    </button>
                                    <a id="cloud-plus-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-cloud-plus" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"/>
                                        <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
                                        </svg>
                                    </a>
                                </div>
                            </form>
                        </div>

                    <div class="info-table">          
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
                            </tr>
                            </thead>
                            <tbody class="table-body-idol-info">

                            </tbody>
                        </table>
                        </div>
                    </div>`  
    adminMainTable.insertAdjacentHTML('beforeend', tempHtml);
}
  