var players = {};

var Player = require('../models/playerinfo');

function init(io) {

  io.on('connect', function(socket){

    // This is saving an instance of the player when they connect
    var player = Player({ socketid : socket.id} ).save();

    // This is setting the players' name in the database
    socket.on("setName", function(name){
      console.log("set name for " + name + " socket id " + socket.id);
      Player.findOneAndUpdate( { socketid : socket.id}, {$set : { name : name }}).then( () => {}).catch((err)=> {console.log(err)});
    })

    // If a new socket.id is added, the someone connected message comes up in the console.
    console.log('someone connected', socket.id);

    // This is sending out the player positions to everyone.  On the client side, there is logic to only draw opponents.
    io.sockets.emit('allPlayerLocations', players); 


    socket.on('clientStart', function(player){
      console.log("client start print")
    });


    socket.on('clientPosition', function(player){
      // find player in players obj and update
      players[player.id] = player;
      io.sockets.emit('allPlayerLocations', players);

    })

    // The total time is being put into the database here.
      socket.on("setTime", function(totalTime) {
        Player.findOneAndUpdate( { socketid : socket.id}, {$set : { totalTime : totalTime }}).then( () => {}).catch((err)=> {console.log(err)});



    })

    // A player is deleted when the socketID is no longer available.
    socket.on('disconnect', function() {
        delete players[socket.id];
    });
  })
}

module.exports = init;
