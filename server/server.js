const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app); //createServer is also called by express.listen
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) =>{ //registers an event listener
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'example',
    text: 'sup bro',
    createdAt: 12456789
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  });
  // socket.emit('newEmail', {
  //   from: 'mike@example.com',
  //   text: 'Hey. sup bruh',
  //   createAt: 123
  // });
  //
  //
  // socket.on('createEmail', (newEmail) => {
  //   console.log('createEmail', newEmail);
  // });

  socket.on('disconnect', () => {
    console.log('Client Disconnected');
  });
});
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
// console.log(__dirname + '/../public');
// console.log(publicPath);
