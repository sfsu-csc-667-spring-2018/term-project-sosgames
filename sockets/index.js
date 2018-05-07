const socketio = require('socket.io');
const io = socketio();
io.users = {};

io.on('connection', socket => {
  let referer = socket.handshake.headers.referer;

  if (referer.includes('/lobby')) {
    // Init namespace for lobby
    [require('./lobby')].forEach(fn => fn(io));
  } else if (referer.includes('/game/')) {
    let gameId = extractRoute(referer);
    // Init namespace for game room by gameId
    [require('./game')].forEach(fn => fn(io, gameId, socket));
    console.log('new socket: ' + socket.id);

    // TODO: in here, can do sth like keep track of all the sockets listening
    // for each socket of same namespace, add socket to io.users[socket.id]
    socket.on('join', function(room) {
      console.log('after socket join... ' + socket.id + ' -- room: ' + room);
      socket.join(room);
    });
  }
});

const extractRoute = referer => {
  // Strip query params
  if (referer.includes('?')) {
    referer = referer.substring(0, referer.indexOf('?'));
  }

  const lastForwardSlash = referer.lastIndexOf('/');
  return referer.substring(lastForwardSlash + 1, referer.length);
};

module.exports = io;
