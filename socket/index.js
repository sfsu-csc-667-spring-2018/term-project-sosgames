const socketIo = require( 'socket.io' )
// const { USER_JOINED, MESSAGE_SEND } = require( '../constants/events' )

const init = ( app, server ) => {
  const io = socketIo( server )

  app.set( 'io', io )

  // LOBBY CHAT 
  var nsp_lobby = io.of('/lobby');
  nsp_lobby.on('connection', function(socket){
    console.log('lobby user connected');

    nsp_lobby.on('disconnect' , function(socket){
      console.log('lobby user disconnected')
    })

    nsp_lobby.on('chat message', function(msg){
      console.log(' lobby message: ' + msg);
      nsp.emit('chat message', 'everyone');
    });
  });

  // GAME ROOM CHAT
  var nsp_game_room = io.of('/game');
  nsp_game_room.on('connection', function(socket){
    console.log('game user connected');

    nsp_game_room.on('disconnect' , function(socket){
      console.log('game user disconnected')
    })

    nsp_game_room.on('chat message', function(msg){
      console.log(' lobby message: ' + msg);
      nsp.emit('chat message', 'everyone');
    });
  });



  // io.on( 'connection', function(socket){
  //   console.log( 'client connected' )

  //   socket.on( 'disconnect', function(socket){
  //     console.log( 'client disconnected' )
  //   })

  //   socket.on('chat message', function(msg){
  //     console.log('message: ' + msg);
  //     io.emit('chat message', msg);
  //   });

    
  //   //idea for how to manage gamestate updates
  //   socket.on('game_state_update', ({GAME_ID, GAME_STATE})=>{
  //     socket.emit('game_state_update',{GAME_ID, GAME_STATE})
  //   })
  // })
}

module.exports = { init }