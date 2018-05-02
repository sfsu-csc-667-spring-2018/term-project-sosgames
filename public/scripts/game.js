const pathArray = window.location.pathname.split( '/' );
const gameId = pathArray[pathArray.length - 1];

const socket = io(`/game/${gameId}`);

const playerCards = document.querySelectorAll('.player-card');
[].forEach.call(playerCards, function(playerCard) {
  playerCard.addEventListener('click', event => {
    // event.stopPropagation();
    event.preventDefault();

    const cardValue = playerCard.dataset.card;
    fetch(`/game/${gameId}/play`, {
      body: JSON.stringify({ cardValue }),
      credentials: 'include',
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
    .then( (data) => {
      console.log(data);
      console.log("fetch done")
    });

  });
});

socket.on('update', ({gameId, cardValue}) => {
  console.log("on update player turn for card " + cardValue + " in game " + gameId);
});
