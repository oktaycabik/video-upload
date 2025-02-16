const redis = require('redis');
const config = require('./index');

const redisClient = redis.createClient({
  url: config.redisUri
});

redisClient.connect().catch(console.error);

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));

module.exports = redisClient; 