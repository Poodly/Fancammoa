const axios = require('axios');
require("dotenv").config();
const env = process.env;

const apiKey    = env.YOUTUBE_APIKEY3;
const searchUrl = 'https://www.googleapis.com/youtube/v3/search';
const videoUrl  = 'https://www.googleapis.com/youtube/v3/videos';

class SearchYoutubeVideo {
//---------------------------------------------------------------------------------
    startSearchVideo = async (req, res, next) => {
        try {
            const query  = '입덕직캠'; // Search word
            const params = {
                part: 'snippet',
                q: query,
                type: 'video',
                key: apiKey,
                maxResults: 3,
                order: 'viewCount'
            };
            const response = await axios.get(searchUrl, { params });  // YouTube 검색 API 요청 보내기
            console.log("Start search video success!!")
            res.status(200).json(response.data.items);                // 검색 결과를 클라이언트에게 응답

        } catch (error){
            console.error(error);
            next(error); 
        };
    };

    searchVideo = async (req, res, next) => {
        try {
            const { query } = req.body  // Search word
            const params = {
                part: 'snippet',
                q: query,
                type: 'video',
                key: apiKey,
                maxResults: 3,
                order: 'viewCount'
            };
            const response = await axios.get(searchUrl, { params }); 
            console.log("Search video success!!")
            res.status(200).json(response.data.items);                                                     

        } catch (error){
            console.error(error);
            next(error); 
        };
    };

    getVideoInfo = async (req, res, next) => {
        try {
            const { videoId } = req.body
            const params = {
                part: 'snippet,statistics',
                id: videoId,
                key: apiKey
            };
            const response = await axios.get(videoUrl, { params });
            const item = response.data.items[0];
 
            const thumbnailUrl = item.snippet.thumbnails.high.url;
            const title        = item.snippet.title;
            const tags         = item.snippet.tags;
            const description  = item.snippet.description;
            const viewCount    = item.statistics.viewCount;

            const data = { 
                thumbnailUrl,
                title,
                tags,
                description,
                viewCount 
            }
            console.log("Get video info success!!")
            return res.status(200).json( data );
        } catch (error){
            console.error(error);
            next(error); 
        };
    };

}

module.exports = SearchYoutubeVideo;

// 이 코드는 YouTube API를 사용하여 검색어로 비디오를 검색하고, 해당 비디오의 정보를 반환하는 Node.js 서버 코드입니다.

// 코드는 require 함수를 사용하여 필요한 모듈을 불러오고, dotenv를 사용하여 환경변수를 가져와 사용합니다.
// apiKey와 searchUrl, videoUrl 등의 변수를 선언하고, SearchYoutubeVideo 클래스를 정의합니다.
// startSearchVideo, searchVideo, getVideoInfo 등의 메서드를 정의합니다.
// startSearchVideo는 검색어를 하드코딩하여 검색을 시작하는 메서드입니다.
// searchVideo는 클라이언트로부터 검색어를 받아 검색하는 메서드입니다.
// getVideoInfo는 비디오 ID를 받아 해당 비디오의 정보를 반환하는 메서드입니다.
// 모든 메서드는 async 함수로 구현되어 있으며, axios를 사용하여 HTTP 요청을 보내고, 반환값으로 Promise를 사용합니다.
// 에러가 발생하면 catch 블록에서 에러를 처리하고, next 함수를 호출하여 다음 미들웨어로 에러를 전달합니다.
// 각각의 메서드에서 성공적으로 요청이 완료되면 콘솔에 로그를 출력하고, 클라이언트에게 HTTP 응답을 반환합니다.
// 이 코드는 기본적인 기능이 구현되어 있어 실제 서비스에서 사용할 수 있을 만큼 충분합니다. 하지만, 검색 결과를 캐싱하지 않고 매번 API를 호출하므로, 
// 검색이 자주 일어난다면 API 사용량 초과 등의 문제가 발생할 수 있습니다. 또한, 입력값에 대한 검증이나 에러 처리가 충분하지 않으므로, 보안 취약점이 존재할 수 있습니다. 
// 이러한 부분들을 보완하면 더욱 안정적인 서버 코드를 작성할 수 있을 것입니다.
