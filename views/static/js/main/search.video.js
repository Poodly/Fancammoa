document.addEventListener('DOMContentLoaded', function() {
    searchVideo();
});

function searchVideo() {
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', () => {
    const query  = document.getElementById('search_box').value;
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

        // console.log("items---",items)

        items.forEach(item => {
            const videoId      = item.id.videoId;
            const thumbnailUrl = item.snippet.thumbnails.high.url;
            const title        = item.snippet.title;
            const description  = item.snippet.description;

            console.log("title---",title)
            const titleKeywords = isKeywordsIncluded(description , searchKeyword)
            const descriptionKeywords = isKeywordsIncluded(title , searchKeyword)

            if (titleKeywords || descriptionKeywords) {
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
    });
}
