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

socket.on('newLocationMessage', function (message){
  let li = jQuery('<li></li>');
  let a = jQuery('<a target="_blank">My current location</a>');// target="_blank" opens link in new tab instead of on current tab so that we arent kicked from the chat

  li.text(`${message.from}: `);
  a.attr('href', message.url);

  li.append(a);
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

const locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser.');
  }

  navigator.geolocation.getCurrentPosition(function (position){
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location');
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
