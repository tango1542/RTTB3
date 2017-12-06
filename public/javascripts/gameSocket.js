console.log("gameSocket Action")

var socket = io();

// socket.on('allPlayerLocations', function(opponentPositions){
//   console.log('opponentPositions', opponentPositions)
// });


function sendPosition(x, y) {
  socket.emit('clientPosition', player);
  // console.log(player)
}


function setName(name) {
  socket.emit('setName', name);
}

socket.on('setId', function(id){
  player.id = id;
  console.log("socket on")
});

socket.on('allPlayerLocations', function(players) {
  // console.log('rec all locations', players)
  opponents = players;
})

socket.on('atMaxPlayers', function(players){
  message('Reached max players for multiplayer')
  preventStart()
})



// // Prints sockets client in the console of a new client machine when they connect
// console.log('socket client')
//
// // This seems to be creating the socket object
// var socket = io();
//
// // Not really sure what this does.
// socket.on('functionName', function(data){
//   console.log(data);
// })
//
//
// // This function updates the number of total users that are currently participating.
// // socket.on('totalUsers', function(users){
// //   console.log('total users ' + users)
// //   updateUsers(users);
// // })
//
// //not sure what this does at all
// socket.on('newSquare', function(square){
//   drawSquare(square);
// });
//
// //not sure what this does either
// socket.on('allSquares', function(squares){
//   for (var s = 0 ; s < squares.length ; s++) {
//     drawSquare(squares[s]);
//   }
// });
//
//
// //This actually clears the canvas
// socket.on('clear', function() {
//   resetCanvas();
// })
//
// // This prints "timer update" and the number of seconds in the client console.
// // socket.on('timerUpdate', function(timeleft){
// //   console.log('timer update ' + timeleft)
// //    updateTimer(timeleft);
// // })
//
// // Without this function, neither canvas can be drawn in
// function sendSquare(square) {
//   socket.emit('clientDrewSquare', square);
// }
