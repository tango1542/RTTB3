

var players = {};   // dict of id + player obj

const MAX_PLAYERS = 5;

var Player = require('../models/playerinfo');

function init(io) {

  io.on('connect', function(socket){

    var player = Player({ socketid : socket.id} ).save();  // todo callback

    socket.on("setName", function(name){
      //save here.

      console.log("set name for " + name + " socket id " + socket.id);


      Player.findOneAndUpdate( { socketid : socket.id}, {$set : { name : name }}).then( () => {}).catch((err)=> {console.log(err)});

    })

    console.log('someone connected', socket.id);


    io.sockets.emit('allPlayerLocations', players);  // send to everyone.


    // if (Object.keys(players).length < MAX_PLAYERS) {
    //
    //   socket.emit('setId', socket.id);   // send only to the thing that connected
    //   players[socket.id] = null; // placeholder until the player updates with their full info
    //
    // }
    //
    // else {
    //   socket.emit('atMaxPlayers');
    // }


    socket.on('clientStart', function(player){
      console.log("client start print")
        // needed?
    });


    socket.on('clientPosition', function(player){
      // find player in players obj and update
      players[player.id] = player;
      io.sockets.emit('allPlayerLocations', players);

    })


      socket.on("setTime", function(totalTime) {
        //save here.

        // console.log("Total time is " + totalTime);
        // + " socket id " + socket.id);


        Player.findOneAndUpdate( { socketid : socket.id}, {$set : { totalTime : totalTime }}).then( () => {}).catch((err)=> {console.log(err)});



    })

    // Delete this player
    socket.on('disconnect', function() {
        delete players[socket.id];
    });

  })

}

module.exports = init;


// // Just console log of the word engine.
// console.log('the engine')
//
// // Sets the base number of total users.
// var totalUsers = 0;
//
// // secondsLeft initialized at 60
// var secondsLeft = 60;
//
// // Maybe creating an empty array for the squares variable?
// var squares = [];
//
// // initializes the active variable as false
// var active = false;
//
// function init(io) {
//
//   io.on('connect', function(socket){
//     // If it is not active, start the countdown, and change the active to true.
//     if (!active) {
//       startCountdown(socket);
//       active = true;
//     }
//
// // This is currently printing "someone connected [object Object]"
//     console.log('someone connected ' + socket);
//     // This adds one to the total count of users.
//     totalUsers++;
//     // prints out the total users.
//     console.log(totalUsers)
//
//     //Send this user all current squares
//     socket.emit('allSquares', squares);
//
//     //Update all users with the total number of users
//     io.sockets.emit('totalUsers', totalUsers);
//
//     socket.on('clientDrewSquare', function(square){
//       // Prints out the words draw square recd from the draw function in drawingclient.js
//       // console.log('draw square recd. ')
//       // Prints out the x, y, and color coordinates of the variable square from the draw function in drawingclient.js
//       // console.log(square);
//
//       // Without this line, the drawing does not transfer to the other canvases.
//       socket.broadcast.emit('newSquare', square);
//
//       // I do not know what this code does.
//       squares.push(square);
//
//     });
//
//     socket.on('disconnect', function(){
//       console.log('someone disconnected ' + socket )
//       totalUsers--;
//       // This code below broadcasts the totalUsers to decrease.  Without it, the number would stay the same.
//       io.sockets.emit('totalUsers', totalUsers);
//     });
//
//   })
// }
//
// function startCountdown(socket) {
//
// // timePermitted is the set variable for how much time is allowed before the action below happens.
//   var timePermitted = 10;
//   var seconds = timePermitted;
//
//   socket.broadcast.emit('timerUpdate', seconds);
//
//   var countdownInterval = 1;
//
//   // 5 second repeating timer
//   setInterval(function(){
//
//     // This prints the number of seconds remaining in the console.
//     seconds = seconds - countdownInterval;
//     // console.log('tick ' + seconds)
//
//     socket.broadcast.emit('timerUpdate', seconds);
//
// // This seems to call the function to have the canvas cleared.  The function is in socketclient.js
//     if (seconds <= 0 ) {
//       socket.broadcast.emit('clear');
//       squares = [];
//       seconds = timePermitted;
//     }
//
//   }, 1000*countdownInterval);
// }
//
// module.exports = init;
