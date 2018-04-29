const socketIo = require( 'socket.io' )
// const { USER_JOINED, MESSAGE_SEND } = require( '../constants/events' )

const init = ( app, server ) => {
  const io = socketIo( server )

  app.set( 'io', io )

  // LOBBY CHAT 
  var nsp_lobby = io.of('/lobby');
  nsp_lobby.on('connection', function(nsp_lobby){
    console.log('lobby user connected');

    nsp_lobby.on('disconnect' , function(nsp_lobby){
      console.log('lobby user disconnected')
    })

    nsp_lobby.on('chat_message', function(msg){
      console.log(' lobby message: ' + msg);
      // CWD ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      //    current problem: lobbies not emitting to the full channel, just themselves.
      nsp_lobby.emit('chat_message', msg);
      // above is the current code that worked previously, below is my best guess
      // nsp_lobby.to('/lobby').emit('chat_message', msg);
    });
// below is a sanity check to see if the windows accept the emit method
    // nsp_lobby.emit('chat_message', 'welcome!');
  });

  // GAME ROOM CHAT
  var nsp_game_room = io.of('/game');
  nsp_game_room.on('connection', function(nsp_game_room){
    console.log('game user connected');

    nsp_game_room.on('disconnect' , function(nsp_game_room){
      console.log('game user disconnected')
    })

    nsp_game_room.on('chat_message', function(msg){
      console.log(' game message: ' + msg);
      nsp_game_room.emit('chat_message', msg);
    });

    nsp_game_room.emit('chat_message', 'welcome!');
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