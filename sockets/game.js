const connectToGameNamespace = (io, gameId) => {
  let gameIo = io.of(`/game/${gameId}`);
  console.log("gameIO - " + `/game/${gameId}`);
}

module.exports = connectToGameNamespace;