let cursorArr = []
let cursor = 0
let maxCount = 0
const limit = 8

async function getKpopNews() {
    // 이전 검색 결과 지우기
    const newsContainer = document.getElementById('news-card-append');
    newsContainer.innerHTML = '';
    
    try {
        const response = await axios.get('/news/getKpopNews', { params : { limit, cursor } });
        const news     = response.data;
        maxCount       = news.maxCount;
        
        // allKpopNews 속성을 가진 배열로 변환
        const kpopNewsArray = Object.values(news.kpopNews); // ???????

        // 검색 결과에 따라 HTML 코드 생성
        const tempHtmlArray = [];
        for (let i = 0; i < kpopNewsArray.length; i++) {
            let newsId    = kpopNewsArray[i].newsId;
            let newsLink  = kpopNewsArray[i].newsLink;
            let newsImg   = kpopNewsArray[i].newsImg;
            let newsTitle = kpopNewsArray[i].newsTitle;
            let press     = kpopNewsArray[i].press;
            let newsDate  = kpopNewsArray[i].newsDate;

            // cursor => newsId 값을 사용합니다.
            cursor = kpopNewsArray[kpopNewsArray.length - 1].newsId;

            if (newsTitle.length >= 40) {
                newsTitle = newsTitle.slice(0, 40) + " ...";
            }
            const tempHtml = `<div class="col">
                                <div class="card" style="width: 16.6rem;">
                                    <a href="${newsLink}" target='_blank'>
                                    <img src="${newsImg}" class="card-img-top" alt="${newsId}">
                                    <div class="card-body">
                                    <p class="card-text">${newsTitle}</p>
                                    <p class="card-date-text">${press} ${newsDate}</p>
                                    </div>
                                    </a>
                                </div>
                            </div>`;
            tempHtmlArray.push(tempHtml);
        }
        newsContainer.insertAdjacentHTML('beforeend', tempHtmlArray.join('')); 
        // window.scrollTo(0, 175);
        
    } catch (error) {
        console.error(error);
    }
}

async function getLeftKpopNews() {
    // 이전 검색 결과 지우기
    const newsContainer = document.getElementById('news-card-append');
    newsContainer.innerHTML = '';
    
    try {
        const response = await axios.get('/news/getKpopNews', { params : { limit, cursor: cursor } });
        const news     = response.data;

        // allKpopNews 속성을 가진 배열로 변환
        const kpopNewsArray = Object.values(news.kpopNews); // ???????

        // 검색 결과에 따라 HTML 코드 생성
        const tempHtmlArray = [];
        for (let i = 0; i < kpopNewsArray.length; i++) {
            let newsId    = kpopNewsArray[i].newsId;
            let newsLink  = kpopNewsArray[i].newsLink;
            let newsImg   = kpopNewsArray[i].newsImg;
            let newsTitle = kpopNewsArray[i].newsTitle;
            let press     = kpopNewsArray[i].press;
            let newsDate  = kpopNewsArray[i].newsDate;

            // cursor => newsId 값을 사용합니다.
            cursor = kpopNewsArray[kpopNewsArray.length - 1].newsId;

            if (newsTitle.length >= 40) {
                newsTitle = newsTitle.slice(0, 40) + " ...";
            }

            const tempHtml = `<div class="col">
                                <div class="card" style="width: 16.6rem;">
                                    <a href="${newsLink}" target='_blank'>
                                    <img src="${newsImg}" class="card-img-top" alt="${newsId}">
                                    <div class="card-body">
                                    <p class="card-text">${newsTitle}</p>
                                    <p class="card-date-text">${press} ${newsDate}</p>
                                    </div>
                                    </a>
                                </div>
                            </div>`;
            tempHtmlArray.push(tempHtml);
            }
        newsContainer.insertAdjacentHTML('beforeend', tempHtmlArray.join('')); 
        // window.scrollTo(0, 175);

    } catch (error) {
        console.error(error);
    }
}