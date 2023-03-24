$(document).ready(async function() {
    await getKpopNewsPick()
});

async function getKpopNewsPick() {

    // 이전 검색 결과 지우기
    const newsContainer = document.getElementById('news-card-append');
    // newsContainer.innerHTML = '';

    try {
        const response = await axios.get('/news/getKpopNews');
        const news     = response.data;

        // allKpopNews 속성을 가진 배열로 변환
        const kpopNewsArray = Object.values(news.allKpopNews); // ???????

        // console.log("news--------------", news.allKpopNews[0])

        // 검색 결과에 따라 HTML 코드 생성
        const tempHtmlArray = [];
        for (let i = 0; i < kpopNewsArray.length; i++) {
            let newsId    = kpopNewsArray[i].newsId;
            let newsLink  = kpopNewsArray[i].newsLink;
            let newsImg   = kpopNewsArray[i].newsImg;
            let newsTitle = kpopNewsArray[i].newsTitle;
            let press     = kpopNewsArray[i].press;
            let newsDate  = kpopNewsArray[i].newsDate;

            const tempHtml = `<div class="col">
                                <div class="card" style="width: 16rem;">
                                    <img src="${newsImg}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                    <p class="card-text">${newsTitle}</p>
                                    <p class="card-date-text">${press} ${newsDate}</p>
                                    </div>
                                </div>
                            </div>`;
            tempHtmlArray.push(tempHtml);
                
        }
        console.log(tempHtmlArray)
        newsContainer.insertAdjacentHTML('beforeend', tempHtmlArray.join(''));

    } catch (error) {
        console.error(error);
    }
}



// async function getKpopNewsPick() {
//     try {
//         const newsContainer = document.getElementById('news-card-append');
//         const response = await axios.get('/news/getKpopNews');
//         const news     = response.data;

//         // 검색 결과에 따라 HTML 코드 생성
//         const tempHtmlArray = [];
//         for (let i = 0; i < news.length; i++) {
//             let newsId    = news.allKpopNews[i].newsId;
//             let newsLink  = news.allKpopNews[i].newsLink;
//             let newsImg   = news.allKpopNews[i].newsImg;
//             let newsTitle = news.allKpopNews[i].newsTitle;
//             let press     = news.allKpopNews[i].press;
//             let newsDate  = news.allKpopNews[i].newsDate;

//             const tempHtml = `<div class="col">
//                                 <div class="card" style="width: 16rem;">
//                                     <img src="${newsImg}" class="card-img-top" alt="...">
//                                     <div class="card-body">
//                                     <p class="card-text">${newsTitle}</p>
//                                     <p class="card-date-text">${press} ${newsDate}</p>
//                                     </div>
//                                 </div>
//                             </div>`;
//             tempHtmlArray.push(tempHtml);
                
//         }
//         console.log(tempHtmlArray)
//         newsContainer.insertAdjacentHTML('beforeend', tempHtmlArray.join(''));

//     } catch (error) {
//         console.error(error);
//     }
// }


// async function saveKpopNewsPick() {
//     try {
//         await axios.post('/news/saveKpopNews');
        
//     } catch (error) {
//         console.error(error);
//     }
// }