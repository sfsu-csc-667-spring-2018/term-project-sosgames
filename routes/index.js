const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../database');

/* GET home page. */
router.get('/', function(request, response, next) {
  response.render('index', { title: 'UNO' });
});

router.post('/', function (request, response, next) {
  let formErrors = formValidation(request);

  if( formErrors ) {
    renderErrors( response, formErrors );
  } else {
    let errors = []; 

   try {
    // Just trying to print out the username,
    // When I made a request, it says that this is not a
    // valid function
    // { "username" : "rcuezzzz","password" : "12345678"} <- in Postman
    // All I want to have happen is see the console logs
    User.isUserNameInUse(request.body.username)
    .then((data) => {
      JSON.stringify(data);
      console.log(data.username);
      console.log("Username is invalid");
    });
   } catch ( e ) { console.log(e);} 
    // Debug Purposes
    response.redirect('/lobby');
  }

});

// Validate User
let formValidation = ((request) => {
  request.checkBody('username', 'Username field cannot be empty.').notEmpty();
  request.checkBody('password', 'Password field cannot be empty.').notEmpty();
  return request.validationErrors();
});

let renderErrors = ((response, errors) => {
  response.render('index', {
    title: 'UNO',
    errors: errors
  });
});










router.get('/lobby', function( request, response, next ) {
  response.render('lobby', { title: 'UNO - Lobby' });
});

router.get('/create-game', function( request, response, next ) {
    response.render('creategame', { title: 'UNO - Create Game' });
});

router.get('/end-game-page', function( request, response, next ) {
  response.render('endgamepage', { title: 'UNO - End Game' });
});

module.exports = router;
