require("dotenv").config();
const env = process.env;

const redis = require('redis');

const redisClient = redis.createClient({
    legacyMode: true,
    host: env.REDIS_HOST, // Redis 서버 호스트
    port: env.REDIS_PORT,                       // Redis 서버 포트
});

redisClient.connect().catch(console.error);

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
  