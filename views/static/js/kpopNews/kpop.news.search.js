async function getQueryKpopNews() {
    // 이전 검색 결과 지우기
    const newsContainerTop3 = document.getElementById('news-card-top3-append');
    const newsContainer = document.getElementById('news-card-append');
    newsContainerTop3.innerHTML = '';
    newsContainer.innerHTML = '';

    let query = '뉴진스'
    
    try {
        const response = await axios.get('/news/getAllnews');
        const news     = response.data;
        
        // allKpopNews 속성을 가진 배열로 변환
        const kpopNewsArray = Object.values(news.kpopNews); // ???????

        // console.log("kpopNewsArray--------------", kpopNewsArray)

        // 검색 결과에 따라 HTML 코드 생성
        const tempHtmlArray = [];
        for (let i = 0; i < kpopNewsArray.length; i++) {
            let newsId    = kpopNewsArray[i].newsId;
            let newsLink  = kpopNewsArray[i].newsLink;
            let newsImg   = kpopNewsArray[i].newsImg;
            let newsTitle = kpopNewsArray[i].newsTitle;
            let press     = kpopNewsArray[i].press;
            let newsDate  = kpopNewsArray[i].newsDate;
            console.log("newsTitle--------", newsTitle)
            // cursor => newsId 값을 사용합니다.
            // cursor = kpopNewsArray[kpopNewsArray.length - 1].newsId;

            // if (newsTitle.length >= 40) {
            //     newsTitle = newsTitle.slice(0, 40) + " ...";
            // }

            if (newsTitle.includes(query)) {
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
        }
        newsContainer.insertAdjacentHTML('beforeend', tempHtmlArray.join('')); 
        
    } catch (error) {
        console.error(error);
    }
}