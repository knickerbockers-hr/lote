// const config = require('config');
var config = require('config-heroku');
module.exports = config['knex'];
