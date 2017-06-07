const redisClient = require('redis').createClient();
const geo = require('georedis').initialize(redisClient);
