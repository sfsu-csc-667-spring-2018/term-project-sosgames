const pathArray = window.location.pathname.split( '/' );
const gameId = pathArray[pathArray.length - 1];

const socket = io(`/game/${gameId}`);

// DOM ELEMENTS
const startButton = document.querySelector('#start-btn');
const playButton = document.querySelector('#play-btn');
const drawButton = document.querySelector('#draw-btn');

const gameDeck = document.querySelector('.game-card-deck');
const cardOnTop = document.querySelector('#card-on-top');

const playerHand = document.querySelector('.player-hand');
const playerCards = document.querySelectorAll('.player-card');


// USER'S EVENTS
// Player clicks on the start button
startButton.addEventListener('click', event => {
  event.stopPropagation();
  event.preventDefault();

  fetch(`/game/${gameId}/start`, {
    // TODO: pass user.id from cookie for auth reason?
    // body: JSON.stringify({ cardValue }),
    credentials: 'include',
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' })
  })
  .then( (data) => {
    console.log("fetch start done");
  })
  .catch((error) => {
    console.log(error);
  });
});

// Player clicks on a card in their hand to play
[].forEach.call(playerCards, function(playerCard) {
  playerCard.addEventListener('click', event => {
    event.stopPropagation();
    event.preventDefault();

    const cardValue = playerCard.dataset.card;
    fetch(`/game/${gameId}/play`, {
      body: JSON.stringify({ cardValue }),
      credentials: 'include',
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
    .then( (data) => {
      console.log("fetch done");
    })
    .catch((error) => {
      console.log(error);
    });

  });
});

// SOCKETS
socket.on('ready to start game', (card) => {
  startButton.classList.toggle('hide');
  gameDeck.classList.toggle('hide');
  cardOnTop.dataset.cardValue = card.color + '-' + card.value;
  playerHand.classList.toggle('hide');
});

socket.on('not ready to start game', () => {
  alert('Not ready to start game!');
});

// socket.on('draw cards', ({}) => {
//   console.log('test draw cards');
// });

socket.on('update game', ({gameId, cardValue}) => {
  console.log("on update player turn for card " + cardValue + " in game " + gameId);
});

// // TODO: figure out how to do specific socket.id?
// socket.on('update hand', ({gameId, cardValue}) => {
//   console.log("on update player turn for card " + cardValue + " in game " + gameId);
// });
