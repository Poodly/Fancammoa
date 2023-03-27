const newsTrashIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>`

$(document).ready(async function() {
    await makeEditNewsTitleSearchBoxButton()
    await adminGetKpopNews()
});

async function adminGetKpopNews() {
    // 이전 검색 결과 지우기
    const newsContainer = document.getElementById('table-body-kpop-news-container');
    newsContainer.innerHTML = '';
    
    try {
        const response = await axios.get('/admin/getAllnews');
        const news     = response.data;
        
        // allKpopNews 속성을 가진 배열로 변환
        const kpopNewsArray = Object.values(news.kpopNews); // ???????

        // 검색 결과에 따라 HTML 코드 생성
        const tempHtmlArray = [];
        for (let i = 0; i < kpopNewsArray.length; i++) {
            const kpopNewsItem = kpopNewsArray[i]
            let newsId    = kpopNewsItem.newsId;
            let newsLink  = kpopNewsItem.newsLink;
            let newsImg   = kpopNewsItem.newsImg;
            let newsTitle = kpopNewsItem.newsTitle;
            let press     = kpopNewsItem.press;
            let newsDate  = kpopNewsItem.newsDate;

            if (newsTitle.length >= 30) {
                newsTitle = newsTitle.slice(0, 30) + " ...";
            }

            newsTitle = newsTitle.replace(/[^0-9a-zA-Z가-힣]/g, ' ');

            if (newsTitle.length <= 25) {
              const tempHtml = `<div class="card mb-3" id="news-card-container">
                                    <div class="row g-1">
                                      <div class="col-md-4">
                                        <img src="${newsImg}" class="img-fluid rounded-start">
                                        <p id="card-newsId">Id: ${newsId}</p>
                                      </div>
                                      <div class="col-md-8">
                                        <div class="card-body">
                                          <p class="card-title-blank">${newsTitle}</p>
                                          <div class="card-body2">
                                          <p class="card-text"><small class="text-muted">${press} ${newsDate}</p>
                                          <a id="news-trash-icon-delete" onclick="modalEditNews(${newsId})" data-bs-toggle="modal" data-bs-target="#confirmModal-delete">${newsTrashIcon}</a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>`;
              tempHtmlArray.push(tempHtml);            
            }
            else {
              const tempHtml = `<div class="card mb-3" id="news-card-container">
                                    <div class="row g-1">
                                      <div class="col-md-4">
                                        <img src="${newsImg}" class="img-fluid rounded-start">
                                        <p id="card-newsId">Id: ${newsId}</p>
                                      </div>
                                      <div class="col-md-8">
                                        <div class="card-body">
                                          <p class="card-title">${newsTitle}</p>
                                          <div class="card-body2">
                                          <p class="card-text"><small class="text-muted">${press} ${newsDate}</p>
                                          <a id="news-trash-icon-delete" onclick="modalEditNews(${newsId})" data-bs-toggle="modal" data-bs-target="#confirmModal-delete">${newsTrashIcon}</a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>`;
              tempHtmlArray.push(tempHtml);
            }
        }
        newsContainer.insertAdjacentHTML('beforeend', tempHtmlArray.join('')); 
        
    } catch (error) {
        console.error(error);
    }
}

function makeEditNewsTitleSearchBoxButton() {
    const adminMainTable = document.querySelector('.admin-main-table');
    adminMainTable.innerHTML = '';

    const tempHtml = `<div class="info-title-search-box-button">
                        <div class="info-table-title">
                            <h2>K-POP News</h2>
                            <p>뉴스 크롤링 업데이트, 삭제, 수정</p>
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
                                    <a id="news-refresh-icon" onclick="saveKpopNews()">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                                        <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                                        <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                                        </svg>
                                    </a>
                            </div>
                        </form>
                    </div>
                    <br>   
                    <div class="row gutter gutter-md">
                        <div class="row row-cols-4" id="table-body-kpop-news-container">
                        </div>
                    </div>`   
    adminMainTable.insertAdjacentHTML('beforeend', tempHtml);
}