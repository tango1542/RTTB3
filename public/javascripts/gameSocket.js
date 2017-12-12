
var socket = io();


// This is sending the coordinates of any client player, with the socket.emit, to the websocket server
function sendPosition(x, y) {
  socket.emit('clientPosition', player);
  // console.log(player)
}

// This is sending the totalTime, which is the elapsed time until a player collides with the goal box, to the websocket server.
function sendTotalTime(totalTime) {
  socket.emit('sendTotalTime', totalTime);
  // console.log(player)
}

// This is sending the entered name to the websocket server
function setName(name) {
  socket.emit('setName', name);
}

// This is setting the value to be put into the database
function setTime(totalTime) {
  socket.emit('setTime', totalTime);
}

// This is creating a player ID to be put in the database.
socket.on('setId', function(id){
  player.id = id;
  console.log("socket on")
});

// This is receiving other client players' positions (opponents)
socket.on('allPlayerLocations', function(players) {
  // console.log('rec all locations', players)
  opponents = players;
})
