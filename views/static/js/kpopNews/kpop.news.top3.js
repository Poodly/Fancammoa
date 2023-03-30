async function getTop3KpopNews() {
    // 이전 검색 결과 지우기
    const top3NewsContainer = document.getElementById('news-card-top3-append');

    try {
        const response = await axios.get('/news/getTop3KpopNews');
        const news     = response.data;

        // // allKpopNews 속성을 가진 배열로 변환
        const kpopNewsArray = Object.values(news.top3KpopNews); // ???????

        // 검색 결과에 따라 HTML 코드 생성
        const top3TempHtmlArray = [];
        let rankCount = 0
        for (let i = 0; i < kpopNewsArray.length; i++) {
            let newsId    = kpopNewsArray[i].newsId;
            let newsLink  = kpopNewsArray[i].newsLink;
            let newsImg   = kpopNewsArray[i].newsImg;
            let newsTitle = kpopNewsArray[i].newsTitle;
            let press     = kpopNewsArray[i].press;
            let newsDate  = kpopNewsArray[i].newsDate;
            rankCount += 1

            if (newsTitle.length >= 35) {
                newsTitle = newsTitle.slice(0, 35) + " ...";
            }   

            const top3tempHtml = `<div class="col">
                                <div class="card" style="width: 22.5rem;">
                                    <a href="${newsLink}" target='_blank'>
                                    <img src="${newsImg}" class="card-img-top" alt="${newsId}">
                                    <div class="card-body">
                                    <p class="card-text">${newsTitle}</p>
                                    <p class="card-date-text">${press} ${newsDate}</p>
                                    </div>
                                    </a>
                                </div>
                            </div>`   
            top3TempHtmlArray.push(top3tempHtml);
            }
        top3NewsContainer.insertAdjacentHTML('beforeend', top3TempHtmlArray.join(''));

    } catch (error) {
        console.error(error);
    }
}