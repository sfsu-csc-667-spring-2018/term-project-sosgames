const socketio = require('socket.io');
const io = socketio();

io.on('connection', socket => {
  let referer = socket.handshake.headers.referer;
  if (referer.includes('/lobby')) {
    console.log(referer);
    [require('./lobby')].forEach(fn => fn(io));
  } else if (referer.includes('/game/')) {
    let gameId = extractRoute(referer);
    [require('./game')].forEach(fn => fn(io, gameId));
  }
});

const extractRoute = (referer) => {
  const lastForwardSlash = referer.lastIndexOf('/');
  return referer.substring(lastForwardSlash + 1, referer.length);
}

module.exports = io;