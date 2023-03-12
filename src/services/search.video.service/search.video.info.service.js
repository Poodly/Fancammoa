const RedisRepository = require('../../repositories/redis.repository')
const axios = require('axios');

require("dotenv").config();

class GetVideoInfoService {
    redisRepository = new RedisRepository();

    getVideoInfo = async (videoId, APIKEY, VIDEOURL) => {
        const videoIdCacheKey = videoId
        const exCachedVideoIdInfo = await this.redisRepository.redisGet(videoIdCacheKey);

        if (exCachedVideoIdInfo) {
            console.log("There is already a cache of saved queries.")
            return JSON.parse(exCachedVideoIdInfo);
              
        }else {
            console.log("No cached results found, sending request to YouTube API ----------"); 
            const params = {
                part: 'snippet,statistics',
                id: videoId,
                key: APIKEY
            };
            const response = await axios.get(VIDEOURL, { params });
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
            
            await this.redisRepository.redisSetEx(videoIdCacheKey, process.env.CACHEEXPIRATIONTIME, JSON.stringify(data))
            console.log("Cached search results in Redis");
            console.log("Get video info success!!")
            return data;
        }
    } 
}
  
module.exports = GetVideoInfoService;


// 지금 여기에서 문제는 매번 videoId를 넣어주고 있기때문에 최초에 검색된 video info가 저장이된다.
// 그후 이미 저장이 되어있으니 아래 코드로 넘어가서 새로운 녀석을 검색하게 되는게아니라 
// 맨처음 저장된 녀석의 데이터를 클라이언트로 전송해주고 있는 상태였던것이다!

// 현재 코드에서는 모든 videoId의 검색 결과를 하나의 캐시 키로 저장하고 있기 때문에, 모든 videoId가 같은 검색 결과를 반환하게 되는 것입니다.
// 각각의 videoId에 대한 검색 결과를 저장하려면, 캐시 키를 videoId로 지정하고 저장하면 됩니다. 이를 위해 cacheKey를 다음과 같이 수정하면 됩니다.
// const cacheKey = `Video info_${videoId}`;
// 캐시키를 각각의 videoId로 저장하게되면 각 각 검색이된다.
// => 해결됨!!