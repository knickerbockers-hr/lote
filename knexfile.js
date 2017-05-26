const config = require('config');
// var config = require('config-heroku');
const env = require('dotenv').config();
module.exports = config['knex'];
