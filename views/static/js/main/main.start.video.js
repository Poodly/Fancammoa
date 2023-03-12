document.addEventListener('DOMContentLoaded', async function() {
    await mainStartVideo();
});

async function mainStartVideo() {
    const url = '/video/startSearch';

    // 이전 검색 결과 지우기
    const searchContainer = document.getElementById('search-container');
    searchContainer.innerHTML = '';

    try {
        const response = await axios.get(url);
        const videoIds = await response.data;

        // 비디오 정보를 병렬로 가져오기 => ㄷㄷ 뭐지이건.. 공부해 보기
        const videoInfoPromises = videoIds.map(videoId => getVideoInfo(videoId));
        const videoInfos = await Promise.all(videoInfoPromises);

        // 검색 결과에 따라 HTML 코드 생성
        const tempHtmlArray = [];
        for (let i = 0; i < videoIds.length; i++) {
            const videoId = videoIds[i];
            const videoInfo = videoInfos[i];

            const {
                thumbnailUrl,
                title,
                description,
                tags,
                viewCount
            } = videoInfo;

            const descriptionKeywords = isKeywordsIncluded(title , searchKeyword)
            const titleKeywords = isKeywordsIncluded(description , searchKeyword)
            const tagesKeywords = isKeywordsIncludedArr(tags, searchKeyword);

            if (descriptionKeywords || titleKeywords || tagesKeywords) {
                const tempHtml = `<div class="col-xl-4 col-lg-4 col-md-6">
                                    <div class="card" style="width: 18rem;">
                                    <a href="#" onclick="modalPlayVideo('${videoId}','${title.replace(/'/g, '').replace(/"/g, '')}','${viewCount}')" data-toggle="modal" data-target="#myModal">
                                        <img src="${thumbnailUrl}" class="card-img-top" alt="${title}">
                                        <div class="card-body">
                                        <p class="card-title">${title}</p>
                                        </div>
                                    </a>
                                    </div>
                                </div>`;
                tempHtmlArray.push(tempHtml);
            }
        }
        searchContainer.insertAdjacentHTML('beforeend', tempHtmlArray.join(''));
    } catch (error) {
        console.log('Error:', error);
    }
}



// 이전 코드.. 시간복잡도 개선문의해서 더 나아진듯 ㄷㄷ

// document.addEventListener('DOMContentLoaded', async function() {
//     await mainStartVideo();
// });

// async function mainStartVideo() {
//     const url = '/video/startSearch';
    
//     // 이전 검색 결과 지우기
//     const searchContainer = document.getElementById('search-container');
//     searchContainer.innerHTML = '';

//     try {
//         const response = await axios.get(url);
//         const videoIds = await response.data

//         for (let i = 0; i < videoIds.length; i++) {
//             const videoId    = videoIds[i];
//             const videoInfo  = await getVideoInfo(videoId);

//             let thumbnailUrl = videoInfo.thumbnailUrl;
//             let title        = videoInfo.title;
//             let description  = videoInfo.description;
//             let tags         = videoInfo.tags;
//             let viewCount    = videoInfo.viewCount;
//             console.log("viewCount ---", viewCount);

//             const descriptionKeywords = isKeywordsIncluded(title , searchKeyword)
//             const titleKeywords = isKeywordsIncluded(description , searchKeyword)
//             const tagesKeywords = isKeywordsIncludedArr(tags, searchKeyword);

//             if (tagesKeywords || titleKeywords || descriptionKeywords) {
//                 console.log("Keywords is true ^^")
//                 const tempHtml = `<div class="col-xl-4 col-lg-4 col-md-6">
//                                     <div class="card" style="width: 18rem;">
//                                     <a href="#" onclick="modalPlayVideo('${videoId}','${title.replace(/'/g, '').replace(/"/g, '')}','${viewCount}')" data-toggle="modal" data-target="#myModal">
//                                         <img src="${thumbnailUrl}" class="card-img-top" alt="${title}">
//                                         <div class="card-body">
//                                         <p class="card-title">${title}</p>
//                                         </div>
//                                     </a>
//                                     </div>
//                                 </div>`;
//                 searchContainer.insertAdjacentHTML('beforeend', tempHtml);
//                 }
//             }
//         } catch (error) {
//         console.log('Error:', error);
//     }
// }
  