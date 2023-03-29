require("dotenv").config();
const redis = require('redis');

// const redisClient = redis.createClient({
//     legacyMode: true,
//     port: 6379,                          // Redis 서버 포트
// });

const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}`,          
    password: process.env.REDIS_PW,                                  
    legacyMode: true,
});
redisClient.connect();

class RedisRepository {
  
    redisGet = async (key) => {
      return new Promise((resolve, reject) => {
        redisClient.get(key, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    };
  
    redisSetEx = async (key, CACHE_EXPIRATION_TIME, value) => {
      return new Promise((resolve, reject) => {
        redisClient.setEx(key, CACHE_EXPIRATION_TIME, value, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    };
}

module.exports = RedisRepository;
  