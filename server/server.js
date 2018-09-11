const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app); //createServer is also called by express.listen
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) =>{ //registers an event listener
  console.log('New user connected');




  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name are required');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    socket.on('createLocationMessage', (coords) => {
      let user = users.getUser(socket.id);

      if(user){
      io.to(params.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
    });
    socket.on('createMessage', (message, callback) => {
      let user = users.getUser(socket.id);

      if(user && isRealString(message.text)){
        io.to(params.room).emit('newMessage', generateMessage(user.name, message.text));//io.emit emits to all users
      }
      callback();
    });
    callback();
  });






  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
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
