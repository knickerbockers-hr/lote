const middleware = require('./middleware');
const LoteController = require('./controllers/lotes'); 

const makeSockets = (server) => {
  const io = require('socket.io')(server);

  io.use((socket, next) => {
    middleware.auth.session(socket.request, {}, next);
  });

  io.on('connection', function (socket) {

    // socket.on('location update', function (data) {
    //   console.log(this.request.session.passport);
    //   console.log('data: ', data);
    // });

    socket.on('disconnect', () => {
      console.log('disconnect event');
    });

    socket.on('send message', function(data, callback) {
      console.log('Data for New Lote Created (server-sockets.js): ', data); 

      //call lote controller and save to DB here 
      LoteController.create(data)
        .then((result) => {
          callback(null, result);
          io.sockets.emit('new message', { data: result });
        })
        .catch((err) => {
          callback(err);
        });
    });
  });
};

module.exports = makeSockets;

