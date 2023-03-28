$(document).ready(async function() {
    await makeEditImgTitleSearchBoxButton()
    makeRankImgTable()
});

async function makeRankImgTable() {
    const tableBodyIdolImg = document.getElementById('table-body-idol-img-container');
    tableBodyIdolImg.innerHTML = '';    

    try {
        const response = await axios.get('/admin/getRankInfoItems');
        const rankCardItems = await response.data.RankInfoItems;
        
        // 검색 결과에 따라 HTML 코드 생성
        const tempHtmlArray = [];
        let rankCount = 0;
        for (let i = 0; i < rankCardItems.length; i++) {
            const rankCardItem = rankCardItems[i];

            let idolId    = rankCardItem.idolId
            let idolName  = rankCardItem.idolName
            let idolImage = rankCardItem.idolImage.img
            let imgId     = rankCardItem.idolImage.id
            
            rankCount += 1;
            const tempHtml = `<div class="col-md-3 mb-8">
                                <div class="card">
                                    <a href = "#" onclick="editIdolImgModal('${idolId}','${idolName}','${idolImage}','${rankCount}','${imgId}')" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">
                                        <div style="width: 12rem;">
                                        <img src="${idolImage}" id="first-card-img" class="card-img-top" alt="...">
                                        <div class="card-body">
                                        <p class="card-text" id="rank-conut">${rankCount}.</p>
                                        <p class="card-text" id="rank-name">${idolName}</p>
                                        </div>
                                        </div>
                                    </a>
                                </div>
                              </div>`
            tempHtmlArray.push(tempHtml);
                
            }    
            tableBodyIdolImg.insertAdjacentHTML('beforeend', tempHtmlArray.join(''));  
        } catch (error) {
            console.log('Error:', error);
        }
}     

function makeEditImgTitleSearchBoxButton() {
    const adminMainTable = document.querySelector('.admin-main-table');
    adminMainTable.innerHTML = '';

    const tempHtml = `<div class="info-title-search-box-button">
                        <div class="info-table-title">
                            <h2>Idol Images</h2>
                            <p>이미지 삭제, 업로드</p>
                        </div>

                        <form action="" onsubmit="return false;">
                            <div class="head_nev_2">
                                <div class="head_search">
                                    <input id="search_box" type="text" placeholder="검색어를 입력하세요." title="검색">
                                    <button id="search-button" onclick="makeQueryRankImgTable()">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-search-heart" viewBox="0 0 16 16">
                                    <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z"/>
                                    <path d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"/>
                                    </svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <br>
                        <br>

                        <div class="row gutter gutter-md" id="table-body-idol-img-container">
                        </div>`   
    adminMainTable.insertAdjacentHTML('beforeend', tempHtml);
}