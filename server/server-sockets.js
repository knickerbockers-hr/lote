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
        })
        .then((lote) => {
          callback(null, lote); 
          io.sockets.emit('new message', { data: lote });
        })
        .catch((err) => {
          callback(err);
        });
      
      //this is sent back to Lotes.js client side and rendered to console
      //emit lotes array instead of just new message????
        //only receiving one message in data
      io.sockets.emit('new message', { data: data }); 

    });


  });
   
};

module.exports = makeSockets;

