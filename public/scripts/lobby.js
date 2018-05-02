const socket = io('/lobby');
const messageList = document.querySelector('#message-list');

document.querySelector('#chat-message').addEventListener('submit', event => {
  event.stopPropagation();
  event.preventDefault();

  const message = document.querySelector('#message').value;
  fetch('/chat', {
    body: JSON.stringify({ message }),
    credentials: 'include',
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' })
  });
});

socket.on('message', ({ user, message }) => {
  console.log(`Received ${message}`, user);
  const tr = document.createElement('tr');
  const td = document.createElement('td');
  td.innerText = message;
  tr.appendChild(td);

  console.log(tr);
  messageList.appendChild(tr);
  // document.querySelector($(message)).val() = "";
});
