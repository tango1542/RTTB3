var express = require('express');
var router = express.Router();
//var playerName = require('../models/playerInfo')


var line_history = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.io.emit('functionName', 'some data');
  //res.send('hellooooo')
  res.render('index', { title: 'Drawing Program' });
});

router.post('/addPlayer', function(req, res, next) {
  var playuh = playerName(req.body);
  console.log(playuh);

  //This printed out a very long list of details
  // console.log(playerName);

  playuh.save()
  .then ( (doc) => {
    console.log(doc);
    res.redirect('/')
  })
  .catch( (err) => {
    if (err.name === 'ValidationError') {
      req.flash('error', err.message);
      res.redirect('/');
    }
    // else if (err.code === 11000) {
    //   req.flash('error', req.body.name + ' is already in the database.')
    //   res.redirect('/');
    // }
    else {
    next(err);
  }
  });
});
//   .catch( (err) => {
//     if (err.name === 'ValidationError') {
//       req.flash('error', err.message);
//       res.redirect('/');
//     }
//     // else if (err.code === 11000) {
//     //   req.flash('error', req.body.name + ' is already in the database.')
//     //   res.redirect('/');
//     // }
//     else {
//     next(err);
//   }
//   });
// });

module.exports = router;
