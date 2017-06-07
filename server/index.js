'use strict';
const app = require('./app');
const db = require('../db');
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

const sockets = require('./server-sockets')(server);


