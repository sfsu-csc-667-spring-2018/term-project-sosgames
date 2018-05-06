const pathArray = window.location.pathname.split('/');
const gameId = pathArray[pathArray.length - 1];

const socket = io(`/game/${gameId}`);
const privateSocket = io();
const socketId = (id) => { return id.split('#')[1]; };

const playerCards = document.querySelectorAll('.player-card');

// USER'S EVENTS
// Player clicks on the start button
startButton.addEventListener('click', event => {
  event.stopPropagation();
  event.preventDefault();

  let clientSocketId = socket.id;
  let privateRoom =  `game-${privateSocket.id}`;
  console.log('private: '+privateRoom);

  fetch(`/game/${gameId}/start`, {
    // TODO: pass user.id from cookie for auth reason?
    body: JSON.stringify({ clientSocketId, privateRoom }),
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

    let clientSocketId = getSocketId(socket.id);

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
});

socket.on('update', ({ gameId, cardValue }) => {
  console.log(
    'on update player turn for card ' + cardValue + ' in game ' + gameId
  );
});

const message_form = document.querySelector('#chat-message-form');
const messageList = document.querySelector('#message-list');

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

// Private socket for a specific client
privateSocket.on('connect', () => {
  privateSocket.emit('join', `game-${privateSocket.id}`);
  console.log('on connect--'+privateSocket.id);
});

privateSocket.on('yo', (data) => {
  console.log("yooo ");
  console.log(JSON.stringify(data));
});

// TODO: figure out how to do specific socket.id?
// socket.on('update hand', ({gameId, cardValue}) => {
//   console.log("on update player turn for card " + cardValue + " in game " + gameId);
// });
