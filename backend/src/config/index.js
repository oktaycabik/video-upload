require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI,
  redisUri: process.env.REDIS_URI,
  jwtSecret: process.env.JWT_SECRET
};

module.exports = config; 