const express = require('express');
const router = express.Router();
const { Cards, Games, UsersGames } = require('../database');


// TODO: to be removed? temp for view
// GET /game
router.get('/', function(req, res, next) {
  res.render('gameRoom', { title: 'UNO - Game Room' });
});

// TODO: implement restful pattern
// GET /game/:gameId
// router.get('/:gameId', function(req, res, next) {
//   res.render('gameRoom', { title: 'UNO - Game Room ID' });
// });

// TODO: should make routes this way? 
// GET /game/end
router.get('/end', function( req, res, next ) {
  res.render('endgamepage', { title: 'UNO - End Game' });
});

router.post('/', (request, response) => {
  console.log(request.body);
  // console.log(request);
  let errors = [];

  // function return array takes in request object to check data
  if(request.body.numberOfPlayers < 2 || request.body.numberOfPlayers > 12){
    errors.push({ msg: '2-12 Players required' });
  }

  // possible feature if we have time
  // if(request.body.password != request.body.confirmPassword){
  //   errors.push({ msg: 'Passwords do not match' });
  // }
  // checks errors array that comes back 
  if(errors.length > 0){
    response.render('creategame', { 
      title: 'UNO - Lobby',
      errors: errors,
      gameName: request.body.gameName,
    });
  }else {
    // Games.create(request.body.gameName, request.body.numberOfPlayers)
    //   .then( 
    //     console.log("here also") 
    //   )
    //     .catch( console.log('failed to add to database'));

      // Games.findById(2)
      //   .then(
      //     data => {
      //       console.log(data)
      //     }
      //   )
      //   .catch( 
      //     error => {
      //       console.log("doesn't work" + error)
      //     }
      //   );      

      // Games.incrementRoundNumber(1);

      // Games.changeGameDirection(1);

      // Games.changeWinnerId(2,1);

      // UsersGames.create(1,3);

      // UsersGames.findByUserId(1)
      // .then(
      //   data => {
      //     console.log(data)
      //   }
      // )
      // .catch( 
      //   error => {
      //     console.log("doesn't work" + error)
      //   }
      // ); 

      // UsersGames.findByGameId(2)
      //   .then(
      //     data => {
      //       console.log(data)
      //     }
      //   )
      //   .catch( 
      //     error => {
      //       console.log("doesn't work" + error)
      //     }
      //   );     
      
      // UsersGames.findByUserAndGameId(1,2)
      //   .then(
      //     data => {
      //       console.log(data)
      //     }
      //   )
      //   .catch( 
      //     error => {
      //       console.log("doesn't work" + error)
      //     }
      //   );       

      // Cards.getAll()
      //   .then((cards) => {
      //     console.log(cards);
      //   }
      // )

      // Cards.findById(4)
      //   .then((card) => {
      //       console.log(card);
      //     }
      //   )

      response.render('gameRoom', { title: 'UNO - Game Room' });
  }
});

module.exports = router;
