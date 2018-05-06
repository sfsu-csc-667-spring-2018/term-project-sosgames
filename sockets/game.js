const connectToGameNamespace = (io, gameId) => {
  let gameIo = io.of(`/game/${gameId}`);
};

module.exports = connectToGameNamespace;
