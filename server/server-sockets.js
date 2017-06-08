const middleware = require('./middleware');
const controller = require('./controllers/lotes'); 

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

    socket.on('send message', function(data) {
      console.log('DATA RECEIVED ON SERVER SIDE'); 
      console.log('Data for New Lote Created: ', data); 
      
      io.sockets.emit('new message', { message: data }); 
    });

    
  });
   
};

module.exports = makeSockets;

