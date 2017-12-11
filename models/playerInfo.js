var mongoose = require('mongoose');

var playerSchema = new mongoose.Schema({
name: { type: String },
socketid : String,
totalTime : String

});

module.exports =mongoose.model('player', playerSchema);
