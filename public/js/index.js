const socket = io();

socket.on('connect', function () { //AVOID USING ES6 ARROW FUNCTIONS IN CLIENT SIDE JS
  console.log('Connected to server');
});
  //   socket.emit('createEmail', {
  //     to: 'jen@example.com',
  //     text: 'Hey this is Daria'
  //   });
  // });


  // socket.on('newEmail', function (email) {
  //   console.log('New email', email);
  // });
  // socket.emit('createMessage', {
  //   from: 'Somebody',
  //   text: 'psk;skfsdfddk;'
  // });


socket.on('disconnect', function () {
  console.log('Disconnected from server');
});
socket.on('newMessage', function (message) {
  console.log('Message', message);
});
