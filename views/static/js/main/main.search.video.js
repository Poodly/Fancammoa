document.addEventListener('DOMContentLoaded', function() {
    searchVideo();
});

function searchVideo() {
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', async () => {
        const url = '/video/search'
        const query  = document.getElementById('search_box').value;

        // 이전 검색 결과 지우기
        const searchContainer = document.getElementById('search-container');
        searchContainer.innerHTML = '';

    try {
        const response = await axios.post(url, { query });
        const items = await response.data;

        for (let i = 0; i < items.length; i++) {
            const item       = items[i];
            const videoId    = item.id.videoId;
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
    });
}