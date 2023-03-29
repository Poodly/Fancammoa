async function searchLikeVideos() {
        const url = '/user/getLikeVideos'

        // 이전 검색 결과 지우기
        const likeVideosContainer = document.getElementById('search-items');
        likeVideosContainer.innerHTML = '';
        $("#spinner-box").show()

    try {
        const response = await axios.get(url);
        const videoIds = await response.data.videoId

        // 검색 결과에 따라 HTML 코드 생성
        const tempHtmlArray = [];
        for (let i = 0; i < videoIds.length; i++) {
            const videoInfo = await getVideoInfo(videoIds[i])

            let videoId      = videoIds[i]
            let thumbnailUrl = videoInfo.thumbnailUrl
            let title        = videoInfo.title
            let viewCount    = videoInfo.viewCount
            let query        = ''

            if (title.length >= 60) {
                title = title.slice(0, 40) + " ...";
            }
            const tempHtml = `<div class="col-xl-4 col-lg-4 col-md-6">
                                <div class="card" style="width: 18rem;">
                                <a href="#" onclick="modalPlayVideo('${videoId}','${title.replace(/'/g, '').replace(/"/g, '')}','${viewCount}','${query}')" data-toggle="modal" data-target="#myModal">
                                    <img src="${thumbnailUrl}" class="card-img-top" alt="${title}">
                                    <div class="card-body">
                                    <p class="card-title">${title}</p>
                                    </div>
                                </a>
                                </div>
                            </div>`;
            tempHtmlArray.push(tempHtml);
                
            }
            $("#spinner-box").hide()
            likeVideosContainer.insertAdjacentHTML('beforeend', tempHtmlArray.join(''));
        } catch (error) {
            console.log('Error:', error);
        }
};