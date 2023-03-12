const RedisRepository = require('../../repositories/redis.repository')
const axios = require('axios');

require("dotenv").config();

class QuerySearchVideoService {
    redisRepository = new RedisRepository();
  
    querySearchVideo = async (query, APIKEY, SEARCHURL) => {
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
          order: 'viewCount'
        };
        const response = await axios.get(SEARCHURL, { params });
        const items = response.data.items;
        const videoIds = items.map(item => item.id.videoId);
                      
        await this.redisRepository.redisSetEx(queryCacheKey, process.env.CACHEEXPIRATIONTIME, JSON.stringify(videoIds))
        console.log("Cached search results in Redis");
        console.log("Start search video success!!")
        return videoIds;
      }
    };
}
  
module.exports = QuerySearchVideoService;