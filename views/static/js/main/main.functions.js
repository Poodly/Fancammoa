// 모달 창에 유튜브 영상을 띄우는 함수
function playVideo(videoId, title) {
    $('#player').attr('src', `https://www.youtube.com/embed/${videoId}`);
    $('#modal-title').text(title);
}
// https://www.youtube.com/embed/${videoId}?autoplay=1  자동재생?

// 모달이 닫힐 때 호출되는 함수
$('#myModal').on('hidden.bs.modal', function () {
    // iframe의 src 속성을 빈 문자열로 설정하여 영상을 중지.
    $('#player').attr('src', '');  // attr과 직접 src할당의 차이...
});

// modal.addEventListener('hidden.bs.modal', function () {
//     // iframe의 src 속성을 빈 문자열로 설정하여 영상을 중지.
//     document.getElementById('player').src = '';
// });

function isKeywordsIncluded(text, keywords) {
    const words = text.split(' '); // 공객기준 배열화
    wordsArr = words.map(str => str.replace(/[^\w\s]/gi, '')).filter(str => str.trim() !== ''); // 특수문자, 빈 문자 제외
    console.log(wordsArr);
    for (let i = 0; i < wordsArr.length; i++) {
        if (keywords.includes(wordsArr[i])) {
            console.log(`'${wordsArr[i]}' 키워드가 포함되어있습니다.-------`);
            return true;
            }
    }
    return false;
}

function removeKeywords(str, keywords) {
    const regex = new RegExp(keywords.join('|'), 'gi');
    return str.replace(regex, '');
    }