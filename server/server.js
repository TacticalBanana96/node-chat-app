const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app); //createServer is also called by express.listen
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) =>{ //registers an event listener
  console.log('New user connected');


  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));


  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));//io.emit emits to all users
    callback('This is from the server');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('User', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('Client Disconnected');
  });
});
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
// console.log(__dirname + '/../public');
// console.log(publicPath);


    // socket.broadcast.emit('newMessage', {
    //     from: message.from,
    //     text: message.text,
    //     createdAt: new Date().getTime()
    // });

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

    // socket.emit('newMessage', { // socket.emit emits to a single user
    //   from: 'example',
    //   text: 'sup bro',
    //   createdAt: 12456789
    // });
