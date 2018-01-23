const socket = io();
const form = document.getElementById('message-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('message', input.value);
  addMessageNode(input.value);
  input.value = '';
});

socket.on('message', addMessageNode);

function addMessageNode(message) {
  const li = document.createElement('li');
  const textNode = document.createTextNode(message);

  li.appendChild(textNode);
  messages.appendChild(li);
}
