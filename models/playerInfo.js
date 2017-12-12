var mongoose = require('mongoose');

// In Mongoose Schema, only name, socketid, and totalTime are being put in database.
var playerSchema = new mongoose.Schema({
name: { type: String },
socketid : String,
totalTime : String

});

module.exports =mongoose.model('player', playerSchema);
