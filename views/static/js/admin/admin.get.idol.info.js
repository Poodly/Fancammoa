const refreshIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                    </svg>`

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
        const response = await axios.get('/admin/getRankInfoItems');
        const RankInfoItems = await response.data.RankInfoItems;
        
        // 검색 결과에 따라 HTML 코드 생성
        const tempHtmlArray = [];
        let rankCount = 0;
        for (let i = 0; i < RankInfoItems.length; i++) {
            const rankCardItem = RankInfoItems[i];
            
            let idolId    = rankCardItem.idolId;
            let idolName  = rankCardItem.idolName;
            let youtubeScore = parseInt(rankCardItem.youtubeScore).toLocaleString();
            let spotifyScore = parseInt(rankCardItem.spotifyScore).toLocaleString();
            let instaScore   = parseInt(rankCardItem.instaScore).toLocaleString();
            let googleScore  = parseInt(rankCardItem.googleScore).toLocaleString();
            let overallScore = parseInt(rankCardItem.overallScore).toLocaleString();
            
            rankCount += 1;
        
            const tempHtml = `<tr onclick="editIdolInfoModal('${rankCount}','${idolName}','${youtubeScore}','${spotifyScore}','${instaScore}','${googleScore}','${overallScore}','${idolId}')" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">
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
                                    <button id="search-button" onclick="searchRankTable()">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-search-heart" viewBox="0 0 16 16">
                                    <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z"/>
                                    <path d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"/>
                                    </svg>
                                    </button>
                                    <a id="cloud-plus-icon" onclick="createIdol()" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-cloud-plus" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"/>
                                        <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
                                        </svg>
                                    </a>
                                    <a id="db-down-icon" onclick="idolAutoGenerated()">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-database-down" viewBox="0 0 16 16">
                                        <path d="M12.5 9a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Zm.354 5.854 1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V10.5a.5.5 0 0 0-1 0v2.793l-.646-.647a.5.5 0 0 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0Z"/>
                                        <path d="M12.096 6.223A4.92 4.92 0 0 0 13 5.698V7c0 .289-.213.654-.753 1.007a4.493 4.493 0 0 1 1.753.25V4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.525 4.525 0 0 1-.813-.927C8.5 14.992 8.252 15 8 15c-1.464 0-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13h.027a4.552 4.552 0 0 1 0-1H8c-1.464 0-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10c.262 0 .52-.008.774-.024a4.525 4.525 0 0 1 1.102-1.132C9.298 8.944 8.666 9 8 9c-1.464 0-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777ZM3 4c0-.374.356-.875 1.318-1.313C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4Z"/>
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
                                <th scope="col">Youtube score <a onclick="youtubeRefresh()" id="youtube-refresh">${refreshIcon}</a></th>
                                <th scope="col">Spotify score <a onclick="spotifyRefresh()" id="spotitfy-refresh">${refreshIcon}</a></th>
                                <th scope="col">Insta score ${refreshIcon}</th>
                                <th scope="col">Google score ${refreshIcon}</th>
                                <th scope="col">Overall scoer <a onclick="overallRefresh()" id="overall-refresh">${refreshIcon}</a></th>
                            </tr>
                            </thead>
                            <tbody class="table-body-idol-info">

                            </tbody>
                        </table>
                        </div>
                    </div>`  
    adminMainTable.insertAdjacentHTML('beforeend', tempHtml);
}