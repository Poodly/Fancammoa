async function adminGetQueryKeywords() {
    const tableBodyIdolInfo = document.querySelector('.table-body-idol-info');
    const query = document.getElementById('search_box').value;
    tableBodyIdolInfo.innerHTML = '';    

    try {
        const response = await axios.get('/admin/getKeywords');
        const keywords = response.data.keywords;

        // 검색 결과에 따라 HTML 코드 생성
        const tempHtmlArray = [];
        for (let i = 0; i < keywords.length; i++) {
            const keywordItem = keywords[i];
            
            let keyword   = keywordItem.keyword;
            let keywordId  = keywordItem.keywordId;
            
            if (keyword.includes(query)) {
                const tempHtml = `<tr onclick="modalEditKeyword('${keywordId}','${keyword}')" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">
                                    <td id="admin-page-keywordId">${keywordId}</td>
                                    <td id="admin-page-keyword">${keyword}</td>
                                </tr>`
                tempHtmlArray.push(tempHtml);
                }    
            }
            tableBodyIdolInfo.insertAdjacentHTML('beforeend', tempHtmlArray.join(''));  
        } catch (error) {
            console.log('Error:', error);
        }
}