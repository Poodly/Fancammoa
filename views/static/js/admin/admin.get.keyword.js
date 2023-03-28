const trashIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>`

$(document).ready(async function() {
    await makeEditKeywordTitleSearchBoxButton();
    adminGetKeywords();
});

async function adminGetKeywords() {
    const tableBodyIdolInfo = document.querySelector('.table-body-idol-info');
    tableBodyIdolInfo.innerHTML = '';    

    try {
        const response = await axios.get('/admin/getKeywords');
        const keywords = response.data.keywords;

        // console.log(response.data.keywords)
        // console.log(response.data.keywords)

        // 검색 결과에 따라 HTML 코드 생성
        const tempHtmlArray = [];
        for (let i = 0; i < keywords.length; i++) {
            const keywordItem = keywords[i];
            
            let keyword   = keywordItem.keyword;
            let keywordId = keywordItem.keywordId;
            let createdAt = keywordItem.createdAt;
            let updatedAt = keywordItem.updatedAt;
        
            const tempHtml = `<tr onclick="modalEditKeyword('${keywordId}','${keyword}')" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">
                                <td id="admin-page-keywordId">${keywordId}</td>
                                <td id="admin-page-keyword">${keyword}</td>
                                <td id="admin-page-keyword-createdAt">${createdAt}</td>
                                <td id="admin-page-keyword-">${updatedAt}</td>
                            </tr>`
            tempHtmlArray.push(tempHtml);
            }    
            tableBodyIdolInfo.insertAdjacentHTML('beforeend', tempHtmlArray.join(''));  
        } catch (error) {
            console.log('Error:', error);
        }
}

function makeEditKeywordTitleSearchBoxButton() {
    const adminMainTable = document.querySelector('.admin-main-table');
    adminMainTable.innerHTML = '';

    const tempHtml = `<div class="info-title-search-box-button">
                        <div class="info-table-title">
                            <h2>Idol information</h2>
                            <p>키워드 삭제, 추가, 이름변경</p>
                        </div>

                        <form action="" onsubmit="return false;">
                            <div class="head_nev_2">
                                <div class="head_search">
                                    <input id="search_box" type="text" placeholder="검색어를 입력하세요." title="검색">
                                    <button id="search-button" onclick="adminGetQueryKeywords()">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-search-heart" viewBox="0 0 16 16">
                                    <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z"/>
                                    <path d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"/>
                                    </svg>
                                    </button>
                                    <a id="cloud-plus-icon" onclick="modalCraeteKeyword()" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-cloud-plus" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"/>
                                        <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
                                        </svg>
                                    </a>
                                </div>
                            </form>
                        </div>

                    <div class="info-table">          
                        <div class="table-responsive">
                        <table class="table table-sm">
                            <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Keyword</th>
                                <th scope="col">createAt</th>
                                <th scope="col">updatedAt</th>
                            </tr>
                            </thead>
                            <tbody class="table-body-idol-info">

                            </tbody>
                        </table>
                        </div>
                    </div>`  
    adminMainTable.insertAdjacentHTML('beforeend', tempHtml);
}