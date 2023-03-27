document.addEventListener('DOMContentLoaded', async function() {
    await makeRankCard();
});

async function makeRankCard() {
    const url = '/rank/getRankInfoItems';

    // 이전 검색 결과 지우기
    const rankCardFirstContainer = document.getElementById('rank-card-first-container');
    const rankCardSecondContainer = document.getElementById('rank-card-second-container');
    rankCardFirstContainer.innerHTML = '';
    rankCardSecondContainer.innerHTML = '';

    try {
        const response = await axios.get(url);
        const rankCardItems = await response.data.RankInfoItems;

        console.log("rankCardItems----------------",rankCardItems)
        
        // 검색 결과에 따라 HTML 코드 생성

        const Top3tempHtmlArray = [];
        const tempHtmlArray = [];
        let rankCount = 0;
        for (let i = 0; i < rankCardItems.length; i++) {
            const rankCardItem = rankCardItems[i];
            
            let idolImage = rankCardItem.idolImage.img
            let idolName = rankCardItem.idolName
            // let overallScore = Math.round(rankCardItem.overallScore/100000)
            
            rankCount += 1;
              
            if (rankCount <= 3) {
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
                Top3tempHtmlArray.push(tempHtml);

            } else {
                const tempHtml = `<div class="col-md-3 mb-8">
                                    <div class="card">
                                        <a href = /?term=${encodeURIComponent(idolName)}>
                                            <div style="width: 12rem;">
                                                <img src="${idolImage}" id="second-card-img" class="card-img-top" alt="...">
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
        rankCardFirstContainer.insertAdjacentHTML('beforeend', Top3tempHtmlArray.join(''));
        rankCardSecondContainer.insertAdjacentHTML('beforeend', tempHtmlArray.join(''));

    } catch (error) {
        console.log('Error:', error);
    }
}