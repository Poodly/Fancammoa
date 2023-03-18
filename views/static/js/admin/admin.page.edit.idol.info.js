$(document).ready(function() {
    $("#left-nav-edit-idol-info").click(async function() {
        
    const url = '/rank/getRankInfoItems';
      
    // 이전 검색 결과 지우기
    const tableBodyIdolInfo = document.getElementById('table-body-idol-info');
    tableBodyIdolInfo.innerHTML = '';

    try {
        const response = await axios.get(url);
        const rankCardItems = await response.data.RankInfoItems;

        console.log("rankCardItems----------------",rankCardItems)
        
        // 검색 결과에 따라 HTML 코드 생성
        const tempHtmlArray = [];
        let rankCount = 0;
        for (let i = 0; i < rankCardItems.length; i++) {
            const rankCardItem = rankCardItems[i];
            
            let idolImage = rankCardItem.idolImage.img
            let idolName = rankCardItem.idolName
            // let overallScore = Math.round(rankCardItem.overallScore/100000)
            
            rankCount += 1;
      
            const tempHtml = `<div class="col-md-4">
                                <div class="card">
                                    <a href = /?term=${encodeURIComponent(idolName)}>
                                        <div style="width: 17rem;">
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
          tableBodyIdolInfo.insertAdjacentHTML('beforeend', tempHtmlArray.join(''));  
      } catch (error) {
          console.log('Error:', error);
      }
    });
});
  