// Express is a Node framework that provides simplicity in setting up, routing,
// and many others
const express = require('express');
const app = express();

// Pass the Express app to node's http-server module
// An express app does not translate to a server automatically
// Rather, Express would provide a server upon calling the
// .listen(port) method. Alternatively, we can create the server
// ourselves and pass the Express app as a handler
// We require the server instance to use with Socket.io
const httpServer = require('http').Server(app);

// Node utility to help with paths
const path = require('path');

// Define the port the server will be using
const PORT = process.env.PORT || 3000;

// Configure where to serve static files from
app.use('/public', express.static(path.resolve(__dirname, 'public')));

// Define the entry route
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

// Require and initialize the socket
// Socket.io uses two parts, one on the front end and one on the back end
// Socket.io also exposes the script to use on the front end at /socket.io/socket.io.js
const io = require('socket.io')(httpServer);

io.on('connection', (socket) => {
  console.log('A user connected');
});

// Listen for calls on the designated port
httpServer.listen(PORT, () => {
  console.log(`Server up at http://localhost:${PORT}`);
});


