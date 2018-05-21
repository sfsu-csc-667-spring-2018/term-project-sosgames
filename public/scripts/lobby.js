const socket = io('/lobby');
const messageList = document.querySelector('#message-list');
const gameTable = document.querySelector('#games-table');
const noGames = document.querySelector('.no-games');
const gameName = document.querySelector('#gameName');
const totalPlayers = document.querySelector('#totalPlayers');
const joinGame = document.querySelector('#joinGame');

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
  // console.log(`Received ${message}`, user);
  const tr = document.createElement('tr');
  const td = document.createElement('td');

  // logic for styling based on the sender
  // if ((user == request.cookies.user)) {
  //   td.className = 'self-chat-message';
  // } else {
  //   td.className = 'external-chat-message';
  // }
  td.className = 'self-chat-message';
  td.innerText = user + ' : ' + message;
  tr.appendChild(td);

  messageList.appendChild(tr);
  var elem = document.getElementById('chat-window');
  elem.scrollTop = elem.scrollHeight;
});

socket.on('games', ({ id, name, max_number_of_players }) => {
  if (!noGames.classList.contains('hide')) {
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
  maxPlayersTD.innerText = max_number_of_players;

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
