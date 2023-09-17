const Redis = require('ioredis');
const redis = new Redis();

class RedisService {
    constructor() {};

    async setToken(key, value) {
        // key === userId
        await redis.set(key, value);
    };

    async getToken(key) {
        return await redis.get(key, (err, result) => {
            console.log(result, 'result data');
            return result;
        })
    };
}

module.exports = RedisService;