async function makeQueryRankImgTable() {
    const tableBodyIdolImg = document.getElementById('table-body-idol-img-container');
    const query = document.getElementById('search_box').value;
    tableBodyIdolImg.innerHTML = '';    

    try {
        const response = await axios.get('/admin/getRankInfoItems');
        const rankCardItems = await response.data.RankInfoItems;

        console.log("rankCardItems----------------",rankCardItems)
        
        // 검색 결과에 따라 HTML 코드 생성
        const tempHtmlArray = [];
        let rankCount = 0;
        for (let i = 0; i < rankCardItems.length; i++) {
            const rankCardItem = rankCardItems[i];

            let idolId    = rankCardItem.idolId
            let idolName  = rankCardItem.idolName
            let idolImage = rankCardItem.idolImage.img
            let imgId     = rankCardItem.idolImage.id

            if (idolName.includes(query)) {
                const tempHtml = `<div class="col-md-3 mb-8">
                                    <div class="card">
                                        <a href = "#" onclick="editIdolImgModal('${idolId}','${idolName}','${idolImage}','${rankCount}','${imgId}')" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">
                                            <div style="width: 12rem;">
                                            <img src="${idolImage}" id="first-card-img" class="card-img-top" alt="...">
                                            <div class="card-body">
                                            <p class="card-text" id="rank-conut">${rankCount}.</p>
                                            <p class="card-text" id="rank-name">${idolName}</p>
                                            </div>
                                            </div>
                                        </a>
                                    </div>
                                  </div>`
                tempHtmlArray.push(tempHtml);     
                }    
            }
            tableBodyIdolImg.insertAdjacentHTML('beforeend', tempHtmlArray.join(''));  
        } catch (error) {
            console.log('Error:', error);
        }
}     