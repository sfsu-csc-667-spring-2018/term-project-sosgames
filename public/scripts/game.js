// const { User, Games, UsersGames, Cards, GamesCards } = require('../../../database');
const pathArray = window.location.pathname.split('/');
const gameId = pathArray[pathArray.length - 1];

const socket = io(`/game/${gameId}`);
const socketId = id => {
  return id.split('#')[1];
};

const privateSocket = io();

// DOM ELEMENTS
const startButton = document.querySelector('#start-btn');
const playButton = document.querySelector('#play-btn');
const drawButton = document.querySelector('#draw-btn');

const gameDeck = document.querySelector('.game-card-deck');
const cardOnTop = document.querySelector('#card-on-top');

const playerHand = document.querySelector('.player-hand');
const cardsInHand = document.querySelector('#cards-in-hand');
const playerCards = document.querySelectorAll('.player-card');

const message_form = document.querySelector('#chat-message-form');
const messageList = document.querySelector('#message-list');

const userIdInput = document.querySelector('#userId');

// USER'S EVENTS
// Player clicks on the start button
startButton.addEventListener('click', event => {
  event.stopPropagation();
  event.preventDefault();

  fetch(`/game/${gameId}/start`, {
    credentials: 'include',
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' })
  })
    .then(data => {
      console.log('START: fetch done');
    })
    .catch(error => {
      console.log(error);
    });
});

// Player clicks on a card in their hand to play
cardsInHand.addEventListener('click', event => {
  event.stopPropagation();
  event.preventDefault();

  let playerCard = event.target;
  if (playerCard.dataset.cardId) {
    const cardId = playerCard.dataset.cardId;
    // const cardOnTopId = cardOnTop.dataset.cardId;

    // TODO: display color picker if wild card, then send this info back as well
    fetch(`/game/${gameId}/play`, {
      body: JSON.stringify({ cardId }),
      credentials: 'include',
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(data => {
        console.log('PLAY: fetch done');
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    alert("You can't play that card!");
  }
});

// A user submits a chat message
message_form.addEventListener('submit', event => {
  event.stopPropagation();
  event.preventDefault();

  const message = document.querySelector('#message').value;
  fetch(`/game/${gameId}/chat`, {
    body: JSON.stringify({
      message
    }),
    credentials: 'include',
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(data => {
      document.getElementById('chat-message-form').reset();
    })
    .catch(error => {
      console.log(error);
    });
});

// PRIVATE SOCKET for a specific client
privateSocket.on('connect', () => {
  if (!startButton.classList.contains('hide')) {
    let userId = userIdInput.value;
    privateSocket.emit('join', `/game/${gameId}/${userId}/${privateSocket.id}`);
    console.log('on emit-- ' + privateSocket.id);
  }
  console.log('on connect-- ' + privateSocket.id);
});

// Client side event for a hand update
privateSocket.on('update hand', cards => {
  const cardOnTopValues = cardOnTop.getAttribute('data-card-value').split('-');
  const cardOnTopColor = cardOnTopValues[0];
  const cardOnTopNumber = cardOnTopValues[1];

  for (const card of cards) {
    console.log(card);

    let cardData = card.value.includes('wild')
      ? `${card.value}`
      : `${card.color}-${card.value}`;

    let div = document.createElement('div');
    div.className = 'col';

    let innerDiv = document.createElement('div');
    innerDiv.className = 'player-card centered sprite';

    if (card.disabled) {
      innerDiv.className += ' disabled-card';
    }

    innerDiv.setAttribute('data-card-value', cardData);
    innerDiv.setAttribute('data-card-id', card.id);

    div.appendChild(innerDiv);
    cardsInHand.appendChild(div);
  }
});

// GAME ROOM specific sockets
socket.on('ready to start game', card => {
  startButton.classList.toggle('hide');
  gameDeck.classList.toggle('hide');
  cardOnTop.dataset.cardValue = card.color + '-' + card.value;
  cardOnTop.dataset.cardId = card.id;
  playerHand.classList.toggle('hide');
});

socket.on('not ready to start game', () => {
  alert('Not ready to start game!');
});

socket.on('update', ({ gameId, newCardOnTop }) => {
  let cardValue = newCardOnTop.value.includes('wild')
    ? newCardOnTop.value
    : newCardOnTop.color + '-' + newCardOnTop.value;
  cardOnTop.dataset.cardValue = cardValue;
});

// CHAT in game room
socket.on('message', ({ gameId, message, user }) => {
  const tr = document.createElement('tr');
  const td = document.createElement('td');

  // logic for styling based on the sender
  td.className = 'self-chat-message';
  td.innerText = user + ' : ' + message;
  tr.appendChild(td);

  messageList.appendChild(tr);
  var elem = document.getElementById('chat-window');
  elem.scrollTop = elem.scrollHeight;
});
