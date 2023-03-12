$(document).ready(function () {
    mainStartVideo();
});

async function mainStartVideo() {
    const url = '/video/startSearch';
    
    // 이전 검색 결과 지우기
    const searchContainer = document.getElementById('search-container');
    searchContainer.innerHTML = '';

    try {
        const response = await axios.get(url);
        const videoIds = await response.data

        for (let i = 0; i < videoIds.length; i++) {
            const videoId    = videoIds[i];
            const videoInfo  = await getVideoInfo(videoId);

            let thumbnailUrl = videoInfo.thumbnailUrl;
            let title        = videoInfo.title;
            let description  = videoInfo.description;
            let tags         = videoInfo.tags;
            let viewCount    = videoInfo.viewCount;
            console.log("viewCount ---", viewCount);

            const descriptionKeywords = isKeywordsIncluded(title , searchKeyword)
            const titleKeywords = isKeywordsIncluded(description , searchKeyword)
            const tagesKeywords = isKeywordsIncludedArr(tags, searchKeyword);

            if (tagesKeywords || titleKeywords || descriptionKeywords) {
                console.log("Keywords is true ^^")
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
                searchContainer.insertAdjacentHTML('beforeend', tempHtml);
                }
            }
        } catch (error) {
        console.log('Error:', error);
    }
}
  