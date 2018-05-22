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

const colorPicker = document.querySelector('#color-picker');

const playerHand = document.querySelector('.player-hand');
const cardsInHand = document.querySelector('#cards-in-hand');
const playerCards = document.querySelectorAll('.player-card');
const playersInGame = document.querySelectorAll('.player-name');
const playerView = document.querySelector('#player-view');

const message_form = document.querySelector('#chat-message-form');
const messageList = document.querySelector('#message-list');

const userIdInput = document.querySelector('#userId');

// SPECIAL WILD CARD VALUES
let wildCardId = -1;

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
  let cardValue = playerCard.dataset.cardValue;
  if (cardValue) {
    const cardId = playerCard.dataset.cardId;
    let wildColor = '';

    if (cardValue.includes('wild')) {
      wildCardId = cardId;
      colorPicker.classList.toggle('hide');
    } else {
      fetch(`/game/${gameId}/play`, {
        body: JSON.stringify({ cardId, wildColor }),
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
    }
  } else {
    alert("You can't play that card!");
  }
});

// Color picker
colorPicker.addEventListener('click', event => {
  event.stopPropagation();
  event.preventDefault();

  let cardId = wildCardId;
  let colorPickerButton = event.target;
  wildColor = colorPickerButton.dataset.wildColor;

  fetch(`/game/${gameId}/play`, {
    body: JSON.stringify({ cardId, wildColor }),
    credentials: 'include',
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(data => {
      console.log('PLAY: fetch wild done');
      colorPicker.classList.toggle('hide');
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
  let userId = userIdInput.value;
  privateSocket.emit('join', `/game/${gameId}/${userId}/${privateSocket.id}`);
});

// Client side event for a hand update
privateSocket.on('update hand', cards => {
  for (const card of cards) {
    addNewCard(card);
  }
});

// Client side event for a hand update -- appending new cards after each turn
privateSocket.on('update hand after play', cards => {
  let oldHand = [];
  let oldCards = {};
  for (let childElement of cardsInHand.children) {
    if (childElement.classList.contains('player-card-div')) {
      oldHand.push(childElement);
      oldCards[childElement.dataset.cardId] = childElement;
    }
  }

  let newsCards = {};
  for (const card of cards) {
    newsCards[card.id] = card;
  }

  console.log('oldhand:');
  console.log(oldHand.length);
  console.log('newcards:');
  console.log(cards.length);

  if (oldHand.length > cards.length) {
    console.log('remove stuff');

    // Remove cards
    for (const oldCard of oldHand) {
      console.log('oldcard:');
      console.log(oldCard);
      if (!(+oldCard.dataset.cardId in newsCards)) {
        console.log('remove this ^^^');
        cardsInHand.removeChild(oldCard);
      }
    }
    updateDisabledStateOfHand(oldHand, cards);
  } else if (oldHand.length < cards.length) {
    console.log('add new stuff');

    // Append new cards
    updateDisabledStateOfHand(oldHand, cards);

    // Add new card if new card doesn't exist in current hand
    for (const [cardId, card] of Object.entries(newsCards)) {
      if (!(+cardId in oldCards)) {
        console.log('NEW CARD:');
        console.log(card);
        addNewCard(card);
      }
    }
  } else {
    console.log('same stuff');

    // same number of cards
    updateDisabledStateOfHand(oldHand, cards);
  }
});

// HELPER METHODS
function addNewCard(card) {
  let cardData = card.value.includes('wild')
    ? `${card.value}`
    : `${card.color}-${card.value}`;

  let div = document.createElement('div');
  div.className = 'col player-card-div';
  div.setAttribute('data-card-id', card.id);

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

function updateDisabledStateOfHand(oldHand, cards) {
  for (const oldCard of oldHand) {
    console.log('OLD CARD:');
    console.log(oldCard);
    for (const card of cards) {
      console.log('NEWCARD:');
      console.log(card);
      if (
        card.id == oldCard.dataset.cardId &&
        card.disabled &&
        !oldCard.firstElementChild.classList.contains('disabled-card')
      ) {
        console.log('disable:');
        oldCard.firstElementChild.classList.add('disabled-card');
        console.log(oldCard);
      } else if (
        card.id == oldCard.dataset.cardId &&
        !card.disabled &&
        oldCard.firstElementChild.classList.contains('disabled-card')
      ) {
        console.log('enabled:');
        oldCard.firstElementChild.classList.remove('disabled-card');
        console.log(oldCard);
      }
    }
  }
}

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

socket.on('update which active player', ({ players }) => {
  let currentPlayerId = -1;
  for (const player of players) {
    if (player.currentPlayer) {
      currentPlayerId = player.user_id;
    }
  }

  for (const playerDiv of playerView.children) {
    if (
      (+playerDiv.dataset.userId != currentPlayerId &&
        playerDiv.classList.contains('player-active')) ||
      (+playerDiv.dataset.userId == currentPlayerId &&
        !playerDiv.classList.contains('player-active'))
    ) {
      playerDiv.classList.toggle('player-active');
    }
  }
});

socket.on('player view update', ({ players }) => {
  if (playersInGame.length != players.length) {
    let newPlayerDiv = document.createElement('div');
    newPlayerDiv.className = 'text-center col-md-2 player-avatar';

    const profile_picture = document.createElement('img');
    profile_picture.className = 'rounded-circle';
    profile_picture.setAttribute(
      'src',
      '../images/profile_pic_green.png'
      // players[players.length - 1].profile_picture_path
    );
    profile_picture.setAttribute('alt', 'player image');

    const playerName = document.createElement('div');
    playerName.className = 'player-name';
    playerName.innerText = 'Player ' + players[players.length - 1].username;

    const playerPoints = document.createElement('div');
    playerPoints.className = 'player-points';
    playerPoints.innerText =
      'Score: ' + players[players.length - 1].current_score;

    const playerNumCards = document.createElement('div');
    playerNumCards.className = 'player-num-cards';
    playerNumCards.innerText =
      'Cards: ' + players[players.length - 1].number_of_cards;

    newPlayerDiv.appendChild(profile_picture);
    newPlayerDiv.appendChild(playerName);
    newPlayerDiv.appendChild(playerPoints);
    newPlayerDiv.appendChild(playerNumCards);

    playerView.appendChild(newPlayerDiv);
  }
});

// CHAT in game room
socket.on('message', ({ gameId, message, user }) => {
  const row = document.createElement('tr');
  const messageTD = document.createElement('td');

  messageTD.className = 'self-chat-message';
  messageTD.innerHTML = user + ' : ' + message;

  row.appendChild(messageTD);

  messageList.appendChild(row);
  var elem = document.getElementById('chat-window');
  elem.scrollTop = elem.scrollHeight;
});
