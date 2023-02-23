// $(document).ready(function () {
//     mainStartVideo();
// });
document.addEventListener('DOMContentLoaded', function() {
    mainStartVideo();
});

function mainStartVideo() {
    const query  = "직캠";
    const url    = 'https://www.googleapis.com/youtube/v3/search';
    const params = {
        part: 'snippet',
        q: query,
        type: 'video',
        key: 'AIzaSyB7N1NUj5heGDF_MH2pC8HxrZaT-M21Wvs',
        maxResults: 3,
        order: 'viewCount'
    };

    // 이전 검색 결과 지우기
    const searchContainer = document.getElementById('search-container');
    searchContainer.innerHTML = '';

    axios.get(url, { params })
        .then(response => {
        const items = response.data.items;

        // console.log("items--------",items)

        items.forEach(item => {
            let videoId      = item.id.videoId;
            let thumbnailUrl = item.snippet.thumbnails.high.url;
            let title        = item.snippet.title;
            let description  = item.snippet.description;

            console.log("title---",title)
            const titleKeywords = isKeywordsIncluded(description , searchKeyword)
            // const descriptionKeywords = isKeywordsIncluded(title , searchKeyword)

            if (titleKeywords) {
                const tempHtml = `<div class="col-xl-4 col-lg-4 col-md-6">
                                    <div class="card" style="width: 18rem;">
                                    <a href="#" onclick="playVideo('${videoId}')" data-toggle="modal" data-target="#myModal">
                                        <img src="${thumbnailUrl}" class="card-img-top" alt="${title}">
                                        <div class="card-body">
                                        <p class="card-title">${title}</p>
                                        </div>
                                    </a>
                                    </div>
                                </div>`;
                    searchContainer.insertAdjacentHTML('beforeend', tempHtml);
                }
            });
        })
        .catch(error => console.log('Error:', error));
}