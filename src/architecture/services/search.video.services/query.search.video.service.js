const RedisRepository = require('../../repositories/redis.repository')
const axios = require('axios');

require("dotenv").config();

class QuerySearchVideoService {
    redisRepository = new RedisRepository();
  
    querySearchVideo = async (query, APIKEY, SEARCHURL) => {
        const startDateTime = new Date('2020-01-01T00:00:00Z').toISOString(); // set the start date and time in ISO format
        const currentDateTime = new Date().toISOString(); // set the current date and time in ISO format

        if (!query) {
            query = "입덕직캠"
        }else{
            query = query
        }
        const queryCacheKey = query
  
        const exCachedVideoIds = await this.redisRepository.redisGet(queryCacheKey);
  
        if (exCachedVideoIds) {
            console.log("There is already a cache of saved queries.")
            return JSON.parse(exCachedVideoIds);

        } else {
            console.log("No cached results found, sending request to YouTube API ----------"); 
            const params = {
                part: 'snippet',
                q: query,
                type: 'video',
                key: APIKEY,
                maxResults: process.env.MAXRESULTS,
                order: 'viewCount',
                publishedAfter: startDateTime,   // 시작 기간
                publishedBefore: currentDateTime // 현재
            };
            const response = await axios.get(SEARCHURL, { params });
            const items = response.data.items;
            const videoIds = items.map(item => item.id.videoId);
                        
            await this.redisRepository.redisSetEx(queryCacheKey, process.env.CACHEEXPIRATIONTIME, JSON.stringify(videoIds))
            console.log("Cached search results in Redis");
            console.log("Query search video success!!")
            return videoIds;
        };
    };
};
  
module.exports = QuerySearchVideoService;