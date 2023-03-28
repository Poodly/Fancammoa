async function adminGetQueryKpopNews() {
    // 이전 검색 결과 지우기
    const newsContainer = document.getElementById('table-body-kpop-news-container');
    const query = document.getElementById('search_box').value;
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

            if (newsTitle.includes(query)) {
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
        }
        newsContainer.insertAdjacentHTML('beforeend', tempHtmlArray.join('')); 
        
    } catch (error) {
        console.error(error);
    }
}