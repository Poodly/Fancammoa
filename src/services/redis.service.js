const dotenv = require('dotenv');
const redis = require("redis");

dotenv.config();

const redisClient = redis.createClient({
    host: process.env.REDIS_AWS_HOST, // Redis 서버 호스트
    port: 6379,               // Redis 서버 포트
});

redisClient.on("connect", () => {
    console.log("Redis client connected");
});

redisClient.on("error", (error) => {
    console.error(error);
});

redisClient.on("end", () => {
    console.log("Redis client disconnected");
});

class RedisService {
    redisGet = (key) => {
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
  
    redisSet = (key, value) => {
        return new Promise((resolve, reject) => {
            redisClient.set(key, value, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    };

    closeConnection = () => {
        redisClient.quit();
    }
}

module.exports = RedisService;
