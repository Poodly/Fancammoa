let query = ''

async function searchVideo() {
    query = document.getElementById('search_box').value;
    if (!query) {
        // URL 파라미터에서 검색어를 추출합니다.
        const searchParams = new URLSearchParams(window.location.search);
        query = searchParams.get('term');
        $('#search_box').val(query)
    } else {
        window.location.href = `/?term=${encodeURIComponent(query)}`;
    }
    
    // 이전 검색 결과 지우기
    const searchContainer = document.getElementById('search-container');
    searchContainer.innerHTML = '';

    try {
        const response = await axios.post('/video/search', { query });
        const videoIds = await response.data

        // 비디오 정보를 병렬로 가져오기 => ㄷㄷ 뭐지이건.. 공부해 보기
        const videoInfoPromises = videoIds.map(videoId => getVideoInfo(videoId));
        const videoInfos = await Promise.all(videoInfoPromises);

        // 검색 결과에 따라 HTML 코드 생성
        const tempHtmlArray = [];
        for (let i = 0; i < videoIds.length; i++) {
            const videoId   = videoIds[i];
            const videoInfo = videoInfos[i];

            let {
                thumbnailUrl,
                title,
                description,
                tags,
                viewCount
            } = videoInfo;

            if (title.length >= 60) {
                title = title.slice(0, 40) + " ...";
            }

            const searchKeyword = await getKeywords()
            const descriptionKeywords = isKeywordsIncluded(title , searchKeyword)
            const titleKeywords = isKeywordsIncluded(description , searchKeyword)
            const tagesKeywords = isKeywordsIncludedArr(tags, searchKeyword);

            if (tagesKeywords || titleKeywords || descriptionKeywords) {
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
            }
            searchContainer.insertAdjacentHTML('beforeend', tempHtmlArray.join(''));
            window.scrollTo(0, 185);

        } catch (error) {
            console.log('Error:', error);
        }
};