const middleware = require('./middleware');

const makeSockets = (server) => {
  const io = require('socket.io')(server);

  io.use((socket, next) => {
    middleware.auth.session(socket.request, {}, next);
  });

  io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    console.log(socket.request.session);
    socket.on('my other event', function (data) {
      console.log(data);
    });
  });
};

module.exports = makeSockets;
