const ButtonLocation = document.getElementById('right-icon')

$(document).ready(async function() {
    await getKpopNews()
    ButtonLocation.scrollIntoView({ behavior: 'smooth' });
});

let cursorArr = []
let cursor = 0
let maxCount = 0
const limit = 8



$("#right-icon").click(async function(event) {
    event.preventDefault();
    if (cursorArr.length < maxCount-1) {
        cursorArr.push(cursor);
    }else {
        cursorArr = []
        cursor = 0
    }
    await getKpopNews()

    // ButtonLocation.scrollIntoView({ behavior: 'smooth' });
});

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

        console.log("maxCount--------------", maxCount)

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

            if (newsTitle.length <= 25) {
                const tempHtml = `<div class="col">
                                    <div class="card" style="width: 16.6rem;">
                                        <a href="${newsLink}" target='_blank'>
                                        <img src="${newsImg}" class="card-img-top" alt="${newsId}">
                                        <div class="card-body">
                                        <p class="card-text-blank">${newsTitle}</p>
                                        <p class="card-date-text">${press} ${newsDate}</p>
                                        </div>
                                        </a>
                                    </div>
                                </div>`;
                tempHtmlArray.push(tempHtml);
            } else {
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

$("#left-icon").click(async function(event) {
    event.preventDefault();

    console.log(cursorArr.pop())
    cursor = cursorArr[cursorArr.length - 1];
    
    await getLeftKpopNews()

    // ButtonLocation.scrollIntoView({ behavior: 'smooth' });
});

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

            if (newsTitle.length <= 25) {
                const tempHtml = `<div class="col">
                                    <div class="card" style="width: 16.6rem;">
                                        <a href="${newsLink}" target='_blank'>
                                        <img src="${newsImg}" class="card-img-top" alt="${newsId}">
                                        <div class="card-body">
                                        <p class="card-text-blank">${newsTitle}</p>
                                        <p class="card-date-text">${press} ${newsDate}</p>
                                        </div>
                                        </a>
                                    </div>
                                </div>`;
                tempHtmlArray.push(tempHtml);
            } else {
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














// async function getKpopNews() {
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
//                                     <img src="${newsImg}" class="card-img-top" alt="${newsId}">
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


// async function saveKpopNews() {
//     try {
//         await axios.post('/news/saveKpopNews');
        
//     } catch (error) {
//         console.error(error);
//     }
// }