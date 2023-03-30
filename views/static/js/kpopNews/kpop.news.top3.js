let starIcon = `<svg id="news-star-icon" xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="#FACC2E" class="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>`

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
                                    <p class="top3-card-text">${newsTitle}</p>
                                    <p class="card-date-text">${starIcon} ${press} ${newsDate}</p>
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