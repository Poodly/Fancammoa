// 모달 창에 유튜브 영상을 띄우는 함수
let saveVideoId = ''
function modalPlayVideo(videoId, title, viewCount, query) {
    let viewCountConvert = convertNumberUnit(Number(viewCount));
    saveVideoId = videoId
    console.log("saveVideoId------------",saveVideoId)
    $('#player').attr('src', `https://www.youtube.com/embed/${videoId}`);
    $('#modal-title').html(`<p id="modal-title">${title}</p>`);
    $('#modal-viewCount').html(`<p id="modal-viewCount-icon" ><svg id="viewCount-icon" xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg>${viewCountConvert}</p>`
        );

    firstLikeButtonColor();
    makeModalHeaderTitle(query);
    }

// 모달이 닫힐 때 호출되는 함수
$('#myModal').on('hidden.bs.modal', function () {
    $('#player').attr('src', '');  
});

// 모달창 헤더 제목
function makeModalHeaderTitle(query) {
    let searchText = query
    console.log('makeModalHeaderTitle----searchText',searchText)
    if(searchText == 'null') {
        $('.modal-header-title').text('')
        return
    }
    keywordArr = getKeywords() 

    if (!isKeywordsIncluded(searchText, keywordArr)) {
        $('.modal-header-title').text(`💖 ${searchText} 💖`);
    }
}

// 조회수 변환 함수
function convertNumberUnit(number) {
    const units = ['', '만', '억', '조', '경'];
    let i = 0;
    while (number >= 10000 && i < units.length - 1) {
        number /= 10000;
        i++;
    }
    return number.toFixed(1) + units[i];
}