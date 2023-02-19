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


const searchButton  = document.querySelector('#search-button');
const searchBox     = document.querySelector('#search_box');
const searchWord    = document.querySelector('#search_word');
const spotifyLink   = document.querySelector('#spotify_link');
const instagramLink = document.querySelector('#instagram_link');

const spotifyIcon   = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-spotify" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z"/></svg>'
const instaIcon     = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/></svg>'

searchButton.addEventListener('click', () => {
    let searchText = searchBox.value;
    let spotify    = 'https://open.spotify.com/search/'
    let instagram  = 'https://www.instagram.com/explore/tags/'

    if (!isKeywordsIncluded(searchText, keywords)) {
        searchWord.innerText  = `✨ ${searchText} ✨`;
        spotifyLink.innerHTML   = `<a href="${spotify + searchText}" target="_blank">${spotifyIcon}</a>`
        instagramLink.innerHTML = `<a href="${instagram + searchText}" target="_blank">${instaIcon}</a>`
    }
    else {
        searchText = removeKeywords(searchText, keywords)
        searchWord.innerText    = `✨ ${searchText} ✨`;
        spotifyLink.innerHTML   = `<a href="${spotify + searchText}" target="_blank">${spotifyIcon}</a>`
        instagramLink.innerHTML = `<a href="${instagram + searchText}" target="_blank">${instaIcon}</a>`
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
            key: 'AIzaSyB7N1NUj5heGDF_MH2pC8HxrZaT-M21Wvs',
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