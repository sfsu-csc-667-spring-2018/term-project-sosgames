const socketio = require('socket.io');
const io = socketio();

io.on('connection', socket => {
  let referer = socket.handshake.headers.referer;

  if (referer.includes('/lobby')) {
    // Init namespace for lobby
    [require('./lobby')].forEach(fn => fn(io));

  } else if (referer.includes('/game/')) {
    let gameId = extractRoute(referer);

    socket.join(`/game/${gameId}#${socket.id}`);

    // Init namespace for game room by gameId
    [require('./game')].forEach(fn => fn(io, gameId));
  }
});

const extractRoute = (referer) => {
  // Strip query params
  if (referer.includes('?')) {
    referer = referer.substring(0, referer.indexOf('?'));
  }

  const lastForwardSlash = referer.lastIndexOf('/');
  return referer.substring(lastForwardSlash + 1, referer.length);
}

module.exports = io;