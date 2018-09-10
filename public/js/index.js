const socket = io();

socket.on('connect', function () { //AVOID USING ES6 ARROW FUNCTIONS IN CLIENT SIDE JS
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});
socket.on('newMessage', function (message) {
  console.log('Message', message);

  let li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//   from: 'frank',
//   text: 'hi'
// }, function (data) {
//   console.log('Got it', data)
// });

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
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
//   text: 'psk;skddk;'
// });
