async function searchRankTable() {
    const tableBodyIdolInfo = document.querySelector('.table-body-idol-info');
    tableBodyIdolInfo.innerHTML = '';   
    
    let query = document.getElementById('search_box').value;

    try {
        const response = await axios.get('/admin/getRankInfoItems');
        const RankInfoItems = await response.data.RankInfoItems;

        console.log("RankInfoItems----------------",RankInfoItems)
        console.log("query----------------",query)
        
        // 검색 결과에 따라 HTML 코드 생성
        const tempHtmlArray = [];
        let rankCount = 0;
        for (let i = 0; i < RankInfoItems.length; i++) {
            const rankCardItem = RankInfoItems[i];

            let idolId    = rankCardItem.idolId
            let idolName  = rankCardItem.idolName
            let youtubeScore = rankCardItem.youtubeScore
            let spotifyScore = rankCardItem.spotifyScore
            let instaScore   = rankCardItem.instaScore
            let googleScore  = rankCardItem.googleScore
            let overallScore = rankCardItem.overallScore

            if (query === idolName) {
                rankCount += 1;
            
                const tempHtml = `<tr onclick="editIdolInfoModal('${rankCount}','${idolName}','${youtubeScore}','${spotifyScore}','${instaScore}','${googleScore}','${overallScore}','${idolId}')" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">
                                    <td id="admin-page-rank">${rankCount}</td>
                                    <td id="admin-page-idol-name">${idolName}</td>
                                    <td id="admin-page-youtube-score">${youtubeScore}</td>
                                    <td id="admin-page-spotify-score">${spotifyScore}</td>
                                    <td id="admin-page-insta-score">${instaScore}</td>
                                    <td id="admin-page-google-score">${googleScore}</td>
                                    <td id="admin-page-overall">${overallScore}</td>
                                </tr>`
                tempHtmlArray.push(tempHtml);
                    
                } 
            if(query === '') {
                rankCount += 1;
            
                const tempHtml = `<tr onclick="editIdolInfoModal('${rankCount}','${idolName}','${youtubeScore}','${spotifyScore}','${instaScore}','${googleScore}','${overallScore}','${idolId}')" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">
                                    <td id="admin-page-rank">${rankCount}</td>
                                    <td id="admin-page-idol-name">${idolName}</td>
                                    <td id="admin-page-youtube-score">${youtubeScore}</td>
                                    <td id="admin-page-spotify-score">${spotifyScore}</td>
                                    <td id="admin-page-insta-score">${instaScore}</td>
                                    <td id="admin-page-google-score">${googleScore}</td>
                                    <td id="admin-page-overall">${overallScore}</td>
                                </tr>`
                tempHtmlArray.push(tempHtml);
            }    
        }
        tableBodyIdolInfo.insertAdjacentHTML('beforeend', tempHtmlArray.join(''));  
    } catch (error) {
        console.log('Error:', error);
    }
}     