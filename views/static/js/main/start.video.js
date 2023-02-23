$(document).ready(function () {
    mainSearchVideo();
});

function mainSearchVideo() {
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', () => {
    const query  = "직캠";
    const url    = 'https://www.googleapis.com/youtube/v3/search';
    const params = {
        part: 'snippet',
        q: query,
        type: 'video',
        key: 'AIzaSyCJClqf3zSSC-ltsVXPWNKAoUbTAIwp7FM',
        maxResults: 9,
        order: 'viewCount'
    };

    // 이전 검색 결과 지우기
    const searchContainer = document.getElementById('search-container');
    searchContainer.innerHTML = '';

    axios.get(url, { params })
        .then(response => {
        const items = response.data.items;

        items.forEach(item => {
            const videoId      = item.id.videoId;
            const thumbnailUrl = item.snippet.thumbnails.high.url;
            const title        = item.snippet.title;
            const description  = item.snippet.description;

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
            });
        })
        .catch(error => console.log('Error:', error));
    });
}

// 모달 창에 유튜브 영상을 띄우는 함수
function playVideo(videoId) {
    $('#player').attr('src', `https://www.youtube.com/embed/${videoId}`);
    // https://www.youtube.com/embed/${videoId}?autoplay=1  자동재생?
}

// 모달이 닫힐 때 호출되는 함수
$('#myModal').on('hidden.bs.modal', function () {
    // iframe의 src 속성을 빈 문자열로 설정하여 영상을 중지.
    $('#player').attr('src', '');  // attr과 직접 src할당의 차이...
});