const middleware = require('./middleware');

const makeSockets = (server) => {
  const io = require('socket.io')(server);

  io.use((socket, next) => {
    middleware.auth.session(socket.request, {}, next);
  });

  io.on('connection', function (socket) {

    socket.on('location update', function (data) {
      console.log(this.request.session);
      console.log('data: ', data);
    });

    socket.on('disconnect', () => {
      console.log('disconnect event');
    });
  });
};

module.exports = makeSockets;
