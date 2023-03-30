const starIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="#FACC2E" class="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>`

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
            
            rankCount += 1;
            if (rankCount <= 3) {
                const top3TempHtml = `<div class="col-md-4">
                                    <div class="card">
                                        <a href = /?term=${encodeURIComponent(idolName)}>
                                            <div style="width: 17rem;">
                                            <img src="${idolImage}" id="first-card-img" class="card-img-top" alt="...">
                                            <div class="card-body">
                                            ${starIcon}
                                            <p class="card-text" id="rank-conut"></p>
                                            <p class="card-text" id="rank-name">${idolName}</p>
                                            </div>
                                            </div>
                                        </a>
                                    </div>
                                  </div>`

                const tempHtml2 = `<div class="col-md-3 mb-8">
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
                Top3tempHtmlArray.push(top3TempHtml);
                tempHtmlArray.push(tempHtml2);
            } else if (rankCount <= 40) {
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
        window.scrollTo(0, 175);

    } catch (error) {
        console.log('Error:', error);
    }
}