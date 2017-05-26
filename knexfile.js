const config = require('config');
// var config = require('config-heroku');
const env = require('dotenv').config();
config['knex'].connection = process.env.DATABASE_URL;
module.exports = config['knex'];
