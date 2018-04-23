const socketIo = require( 'socket.io' )
const { USER_JOINED, MESSAGE_SEND } = require( '../constants/events' )

const init = ( app, server ) => {
  const io = socketIo( server )

  app.set( 'io', io )

  io.on( 'connection', function(socket){
    console.log( 'client connected' )

    socket.on( 'disconnect', function(socket){
      console.log( 'client disconnected' )
    })

    io.on('connection', function(socket){
      socket.on('chat message', function(msg){
        console.log('message: ' + msg);
      });
    });
    
    // //idea for how to manage gamestate updates
    // socket.on('game_state_update', ({GAME_ID, GAME_STATE})=>{
    //   socket.emit('game_state_update',{GAME_STATE})
    // })
  })
}

function sendMessage(data){
  socket.emit('new_chat_message', data)
}

module.exports = { init }