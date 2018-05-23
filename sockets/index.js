const socketio = require('socket.io');
const io = socketio();
io.users = {};

io.on('connection', socket => {
  let referer = socket.handshake.headers.referer;

  if (referer.includes('/lobby')) {
    [require('./lobby')].forEach(fn => fn(io));
  } else if (referer.includes('/game/')) {
    let gameId = extractRoute(referer);

    [require('./game')].forEach(fn => fn(io, gameId, socket));

    socket.on('join', function(room) {
      socket.join(room);
    });
  }
});

const extractRoute = referer => {
  if (referer.includes('?')) {
    referer = referer.substring(0, referer.indexOf('?'));
  }
  const lastForwardSlash = referer.lastIndexOf('/');
  return referer.substring(lastForwardSlash + 1, referer.length);
};

module.exports = io;
