// 검색 버튼 클릭 이벤트 핸들러 함수

function search() {
    // 검색어 입력 필드에서 검색어를 가져옵니다.
    searchPageQuery = document.getElementById('search_box').value;
  
    // 검색어를 URL 파라미터로 전달하면서 다른 페이지로 이동합니다.    ex)http://localhost:4000/?term=뉴진스
    window.location.href = `/?term=${encodeURIComponent(searchPageQuery)}`;
}