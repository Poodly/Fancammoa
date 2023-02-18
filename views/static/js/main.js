const keywords = ['직캠', '캠', '뮤비', '뮤직비디오', '입덕', 'fancam', 'cam', "MV"]

function isKeywordsIncluded(str, keywords) {
    const lowerCaseStr = str.toLowerCase();
    for (const keyword of keywords) {
        if (lowerCaseStr.includes(keyword)) {
        return true;
        }
    }
    return false;
}

function removeKeywords(str, keywords) {
    const regex = new RegExp(keywords.join('|'), 'gi');
    return str.replace(regex, '');
    }



const searchButton = document.querySelector('#search-button');
const searchBox    = document.querySelector('#search_box');
const searchWord   = document.querySelector('#search_word');

searchButton.addEventListener('click', () => {
    let searchText = searchBox.value;

    if (!isKeywordsIncluded(searchText, keywords)) {
        console.log("searchText---------------",searchText)
        console.log("isKeywordsIncluded(searchText, keywords)---------------",isKeywordsIncluded(searchText, keywords))
        
        searchWord.innerText = searchText;
    }
    else {
        searchText = removeKeywords(searchText, keywords)
        console.log("searchText---------------",searchText)
        searchWord.innerText = searchText;
    }
});


$(document).ready(function () {
    searchVideo();
});

function searchVideo() {
    $('#search-button').click(function() {
        
        let query = $('#search_box').val();
        let url = 'https://www.googleapis.com/youtube/v3/search';
        let params = {
            part: 'snippet',
            q: query,
            type: 'video',
            key: 'AIzaSyCJClqf3zSSC-ltsVXPWNKAoUbTAIwp7FM',
            maxResults: 9,
            order: 'viewCount'
        };

        // 이전 검색 결과 지우기
        $('#search-container').html('');

        $.ajax({
            url: url,
            type: 'GET',
            data: params,
            success: function(response) {

                // let tempHtml = ""
                let items = response.items;
                console.log("items-----------------",items[0])

                // var viewCount = response.items[0].statistics.viewCount;
                // console.log('동영상 조회수:', viewCount);

                for (let i in items) {
                    let videoId      = items[i].id.videoId;
                    let thumbnailUrl = items[i].snippet.thumbnails.high.url;
                    let title        = items[i].snippet.title;
                    let description  = items[i].snippet.description;
                    
                    // const exKeywords = isKeywordsIncluded(title && description, keywords);
                    // const exDescriptionKeywords  = isKeywordsIncluded(description, keywords);

                    // if (exKeywords) {

                        tempHtml = `<div id="card_id" class="col-xl-4 col-lg-4 col-md-6">
                                        <div class="card" style="width: 18rem;">
                                            <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                                            <img src="${thumbnailUrl}" class="card-img-top" alt="${title}">
                                            <div class="card-body">
                                                <p class="card-title">${title}</p>
                                            </div>
                                            </a>
                                        </div>
                                    </div>`

                            $('#search-container').append(tempHtml)
                        // }
                    }                         
                },
                error: function(response) {
                    console.log('Error: ' + response);
                }
            });
        });    




        // function isShortsIncluded(str) {
        //     return str.toLowerCase().includes('shorts');
        //     // true or false 반환
        // }

        // const exShorts = isShortsIncluded(description);
        // if (!exShorts) { // false일때만 검색결과에 들어간다.

    //     $.ajax({
    //         url: url,
    //         type: 'GET',
    //         data: params,
    //         success: function(response) {
    //             let items = response.items;
    //             console.log("items-----------------",items)
    //             let tempHtml = '';
    //             $.each(items, function(index, item) {
    //                 let videoId = item.id.videoId;
    //                 let thumbnailUrl = item.snippet.thumbnails.high.url;
    //                 let title = item.snippet.title;
    //                 let description = item.snippet.description;
                    
                        // console.log("videoId-----------------",videoId)
                        // console.log("thumbnailUrl-----------------",thumbnailUrl)
                        // console.log("title-----------------",title)
                        // console.log("description-----------------",description)
                
    //                 // Convert the image file format to JPG 
    //                 thumbnailUrl = thumbnailUrl.replace('png', 'jpg');

                    

    //                 tempHtml += `<div class="card" style="width: 20rem;">
    //                                 <a href="https://www.youtube.com/watch?v=${videoId}">
    //                                 <img src="${thumbnailUrl}" class="card-img-top" alt="${title}">
    //                                 </a>
    //                                 <div class="card-body">
    //                                     <h5 class="card-title">${title}</h5>
    //                                 </div>
    //                             </div>`
    //                 });

    //             $('#search-container').append(tempHtml)
    //         },
    //         error: function(response) {
    //             console.log('Error: ' + response);
    //         }
    //     });
    // });
}