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

  let clientSocketId = socket.id;
  const privateSocketId = privateSocket.id;
  const privateRoomName = `/game/${gameId}/${privateSocketId}`;

  fetch(`/game/${gameId}/start`, {
    // TODO: pass user.id from cookie for auth reason?
    body: JSON.stringify({ clientSocketId, privateRoomName }),
    credentials: 'include',
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' })
  })
    .then(data => {
      console.log('fetch start done');
    })
    .catch(error => {
      console.log(error);
    });
});

// Player clicks on a card in their hand to play
cardsInHand.addEventListener('click', event => {
  let playerCard = event.target;
  event.stopPropagation();
  event.preventDefault();

  let clientSocketId = socketId(socket.id);

  const cardValue = playerCard.dataset.card;
  fetch(`/game/${gameId}/play`, {
    body: JSON.stringify({ cardValue, clientSocketId }),
    credentials: 'include',
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(data => {
      console.log('fetch done');
    })
    .catch(error => {
      console.log(error);
    });
});

// A user submits a chat message
message_form.addEventListener('submit', event => {
  event.stopPropagation();
  event.preventDefault();

  const message = document.querySelector('#message').value;
  // console.log('fetch sending: ' + message);
  // console.log(JSON.stringify({ message }));
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
      // console.log('fetch done');
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

    div.appendChild(innerDiv);
    cardsInHand.appendChild(div);
  }
});

// GAME ROOM specific sockets
socket.on('ready to start game', card => {
  startButton.classList.toggle('hide');
  gameDeck.classList.toggle('hide');
  cardOnTop.dataset.cardValue = card.color + '-' + card.value;
  playerHand.classList.toggle('hide');
});

socket.on('not ready to start game', () => {
  alert('Not ready to start game!');
});
socket.on('update', () => {
  alert('stuff');
});

// CHAT in game room
socket.on('message', ({ gameId, message, user }) => {
  // console.log('test message frontend');
  // console.log(`Received ${message}`, user);
  const tr = document.createElement('tr');
  const td = document.createElement('td');

  // logic for styling based on the sender
  // if (user = this.user){ self message}
  //  else td.className = 'external-chat-message';
  td.className = 'self-chat-message';
  td.innerText = user + ' : ' + message;
  tr.appendChild(td);

  // console.log(tr);
  messageList.appendChild(tr);
  var elem = document.getElementById('chat-window');
  elem.scrollTop = elem.scrollHeight;
});
