const socket = io();

socket.on('connect', function () { //AVOID USING ES6 ARROW FUNCTIONS IN CLIENT SIDE JS
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});
socket.on('newMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm a');
  console.log('Message', message);

  let li = jQuery('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message){
  let li = jQuery('<li></li>');
  let a = jQuery('<a target="_blank">My current location</a>');// target="_blank" opens link in new tab instead of on current tab so that we arent kicked from the chat
  let formattedTime = moment(message.createdAt).format('h:mm a');
  
  li.text(`${message.from} ${formattedTime}: `);
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

  let messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('');
  });
});

const locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser.');
  }
  locationButton.attr('disabled', 'disabled').text('Sending Location...');

  navigator.geolocation.getCurrentPosition(function (position){
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled');
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
