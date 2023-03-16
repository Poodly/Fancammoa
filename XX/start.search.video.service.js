const axios = require('axios');
const RedisRepository = require('../../repositories/redis.repository')

require("dotenv").config();

class StartSearchVideoService {
    redisRepository = new RedisRepository();
    
    startSearchVideo = async (startQuery, APIKEY, SEARCHURL) => {
      const startQueryCacheKey = "Start seach word"
  
      const exCachedVideoIds = await this.redisRepository.redisGet(startQueryCacheKey);
  
      if (exCachedVideoIds) {
        console.log("There is already a cache of saved queries.")
        return JSON.parse(exCachedVideoIds);
      } else {
        console.log("No cached results found, sending request to YouTube API ----------"); 
        const params = {
          part: 'snippet',
          q: startQuery,
          type: 'video',
          key: APIKEY,
          maxResults: process.env.MAXRESULTS,
          order: 'viewCount'
        };
        const response = await axios.get(SEARCHURL, { params });
        const items = response.data.items;
        const videoIds = items.map(item => item.id.videoId);
                      
        await this.redisRepository.redisSetEx(startQueryCacheKey, process.env.CACHEEXPIRATIONTIME, JSON.stringify(videoIds))
        console.log("Cached search results in Redis");
        console.log("Start search video success!!")
        return videoIds;
      }
    };
}
  
module.exports = StartSearchVideoService;