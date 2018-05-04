const connectToGameNamespace = (io, gameId) => {
  // console.log("sockets/game.js -- connect to game " + gameId);
  let gameIo = io.of(`/game/${gameId}`);
}

module.exports = connectToGameNamespace;