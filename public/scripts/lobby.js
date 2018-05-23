const socket = io('/lobby');
const messageList = document.querySelector('#message-list');
const gameTable = document.querySelector('#games-table');
const noGames = document.querySelector('.no-games');
const gameName = document.querySelector('#gameName');
const totalPlayers = document.querySelector('#totalPlayers');
const joinGame = document.querySelector('#joinGame');
const privateSocket = io();

document
  .querySelector('#chat-message-form')
  .addEventListener('submit', event => {
    event.stopPropagation();
    event.preventDefault();

    const message = document.querySelector('#message').value;
    fetch('/chat', {
      body: JSON.stringify({
        message
      }),
      credentials: 'include',
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    document.getElementById('chat-message-form').reset();
  });

socket.on('message', ({ user, message }) => {
  const row = document.createElement('tr');
  const messageTD = document.createElement('td');

  messageTD.className = 'self-chat-message';
  messageTD.innerHTML = user.username + ' : ' + message;

  row.appendChild(messageTD);

  messageList.appendChild(row);
  let elem = document.getElementById('chat-window');
  elem.scrollTop = elem.scrollHeight;
});

socket.on('games', ({ id, name, maxNumberOfPlayers }) => {
  if (noGames !== null) {
    hasNoGames = false;
    noGames.classList.toggle('hide');
    gameName.classList.toggle('hide');
    totalPlayers.classList.toggle('hide');
    joinGame.classList.toggle('hide');
  }

  let row = document.createElement('tr');
  row.setAttribute('style', 'margin: 3px');

  let nameTD = document.createElement('td');
  nameTD.innerText = name;

  let maxPlayersTD = document.createElement('td');
  maxPlayersTD.innerText = maxNumberOfPlayers;

  let linkTD = document.createElement('td');
  let link = document.createElement('a');
  link.setAttribute('href', '/game/' + id);
  link.setAttribute('class', 'btn btn-md btn-success btn-block');
  link.setAttribute('role', 'button');
  link.innerText = 'Join';
  linkTD.appendChild(link);

  row.appendChild(nameTD);
  row.appendChild(maxPlayersTD);
  row.appendChild(linkTD);

  gameTable.appendChild(row);
});
