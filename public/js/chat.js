// const express = require('express')
// const app = express()
// //set the template engine ejs
// app.set('view engine', 'ejs')
// //middlewares
// app.use(express.static('public'))
// //routes
// app.get('/', (req, res) => {
//   res.render('index')
// })
// //Listen on port 3002
// server = app.listen(3002)
// //socket.io import
// const io = require('socket.io')(server)
// //listen on every connection
// io.on('connection', (socket) => {
//   console.log('New user connected')
//   //default username
//   socket.username = "Anonymous"
//   //listen on change_username
//   socket.on('change_username', (data) => {
//       socket.username = data.username
//   })
//   //listen on new_message
//   socket.on('new_message', (data) => {
//       //broadcast the new message
//       io.sockets.emit('new_message', {message : data.message, username : socket.username});
//   })
//   //listen on typing
//   socket.on('typing', (data) => {
//       socket.broadcast.emit('typing', {username : socket.username})
//   })
//   //grabbing username from login/register for chat
//   const userNames = {};
//   socket.on('setSocketId', function(data) {
//   const userName = data.name;
//   const userId = data.userId;
//   userNames[userName] = userId;
// });
// })

$(function () {
  //make connection
  const socket = io.connect('http://localhost:3002/%27');

  //buttons and inputs
  const message = $('#message');
  const username = $('#username');
  const send_message = $('#send_message');
  const send_username = $('#send_username');
  const chatroom = $('#chatroom');
  const feedback = $('#feedback');

  //Emit message
  send_message.click(function () {
    socket.emit('new_message', { message: message.val() });
  });
  // Or if the enter key is pressed
  message.keypress((e) => {
    let keycode = e.keyCode ? e.keyCode : e.which;
    if (keycode == '13') {
      socket.emit('new_message', { message: message.val() });
    }
  });

  //Listen on new_message
  socket.on('new_message', (data) => {
    feedback.html('');
    message.val('');
    chatroom.append(
      "<p class='message'>" + data.username + ': ' + data.message + '</p>'
    );
  });

  //Emit a username
  send_username.click(function () {
    socket.emit('change_username', { username: username.val() });
  });

  //Emit typing
  message.bind('keypress', () => {
    socket.emit('typing');
  });

  //Listen on typing
  socket.on('typing', (data) => {
    feedback.html(
      '<p><i>' + data.username + ' is typing a message...' + '</i></p>'
    );
    message.keypress(function (e) {
      if (e.which == 13) {
        socket.emit('new_message', { message: message.val() });
      }
    });
  });
});
