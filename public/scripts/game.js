const pathArray = window.location.pathname.split('/');
const gameId = pathArray[pathArray.length - 1];
let wildCardId = -1;

const socket = io(`/game/${gameId}`);
const privateSocket = io();

const startButton = document.querySelector('#start-btn');

const gameDeck = document.querySelector('.game-card-deck');
const cardOnTop = document.querySelector('#card-on-top');

const colorPicker = document.querySelector('#color-picker');

const playerHand = document.querySelector('.player-hand');
const cardsInHand = document.querySelector('#cards-in-hand');
const playerView = document.querySelector('#player-view');

const messageForm = document.querySelector('#chat-message-form');
const messageList = document.querySelector('#message-list');
const messageInput = document.querySelector('#message');

const userIdInput = document.querySelector('#userId');

startButton.addEventListener('click', event => {
  event.stopPropagation();
  event.preventDefault();

  fetch(`/game/${gameId}/start`, {
    credentials: 'include',
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' })
  })
    .then(data => {})
    .catch(error => {});
});

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
        .then(data => {})
        .catch(error => {});
    }
  } else {
    alert("You can't play that card!");
  }
});

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
      colorPicker.classList.toggle('hide');
    })
    .catch(error => {});
});

messageForm.addEventListener('submit', event => {
  event.stopPropagation();
  event.preventDefault();

  const message = messageInput.value;
  fetch(`/game/${gameId}/chat`, {
    body: JSON.stringify({ message }),
    credentials: 'include',
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(data => {
      messageForm.reset();
    })
    .catch(error => {});
});

privateSocket.on('connect', () => {
  let userId = userIdInput.value;
  privateSocket.emit('join', `/game/${gameId}/${userId}/${privateSocket.id}`);
});

privateSocket.on('update hand on start', cards => {
  for (const card of cards) {
    addNewCard(card);
  }
});

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

  if (oldHand.length > cards.length) {
    for (const oldCard of oldHand) {
      if (!(+oldCard.dataset.cardId in newsCards)) {
        cardsInHand.removeChild(oldCard);
      }
    }
  } else if (oldHand.length < cards.length) {
    for (const [cardId, card] of Object.entries(newsCards)) {
      if (!(+cardId in oldCards)) {
        addNewCard(card);
      }
    }
  }

  updateDisabledStateOfHand(oldHand, cards);
});

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
    for (const card of cards) {
      if (
        card.id == oldCard.dataset.cardId &&
        card.disabled &&
        !oldCard.firstElementChild.classList.contains('disabled-card')
      ) {
        oldCard.firstElementChild.classList.add('disabled-card');
      } else if (
        card.id == oldCard.dataset.cardId &&
        !card.disabled &&
        oldCard.firstElementChild.classList.contains('disabled-card')
      ) {
        oldCard.firstElementChild.classList.remove('disabled-card');
      }
    }
  }
}

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

socket.on('update new card on top', ({ gameId, newCardOnTop }) => {
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

socket.on('update player view', ({ players }) => {
  const playersDivs = {};
  for (const playerDiv of playerView.children) {
    playersDivs[playerDiv.dataset.userId] = playerDiv;
  }

  for (const player of players) {
    if (!(+player.user_id in playersDivs)) {
      const newPlayerDiv = document.createElement('div');
      newPlayerDiv.className = 'text-center col-md-2 player-avatar';
      newPlayerDiv.setAttribute('data-user-id', player.user_id);

      const profile_picture = document.createElement('img');
      profile_picture.className = 'rounded-circle';
      profile_picture.setAttribute('src', player.profile_picture_path);
      profile_picture.setAttribute('alt', 'player image');

      const playerName = document.createElement('div');
      playerName.className = 'player-name';
      playerName.innerText = 'Player ' + player.username;

      newPlayerDiv.appendChild(profile_picture);
      newPlayerDiv.appendChild(playerName);
      playerView.appendChild(newPlayerDiv);
    }
  }
});

socket.on('message', ({ gameId, message, user }) => {
  const row = document.createElement('tr');
  const messageTD = document.createElement('td');
  const chatWindow = document.getElementById('chat-window');

  messageTD.className = 'self-chat-message';
  messageTD.innerHTML = user + ' : ' + message;

  row.appendChild(messageTD);
  messageList.appendChild(row);
  chatWindow.scrollTop = chatWindow.scrollHeight;
});
