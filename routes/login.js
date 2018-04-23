const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {
  User
} = require('../database');

/* GET home page. */
router.get('/', function (request, response, next) {
  response.render('index', {
    title: 'UNO'
  });
});

router.post('/login', function (request, response, next) {
  let formErrors = formValidation(request);

  if (formErrors) {
    renderErrors(response, formErrors);
  } else {
    let errors = [];

    User.getUserData(request.body.username)
      .then((data) => {
        // Username exists
        bcrypt.compare(request.body.password, data.password)
          .then((result) => {

            try {
              if (result) {
                const isSecure = request.app.get('env') != 'development';
                response.cookie('user_id', data.id, {
                  httpOnly: true,
                  signed: true,
                  secure: isSecure
                });
  
                response.redirect('/lobby');
              } else {
                errors.push({
                  msg: "Invalid password."
                });
                renderErrors(response, errors);
              }
            } catch ( e ) {
              console.log(e);
            }
          }).catch(error => {
            console.log(error);

          });
      })
      .catch(error => {

        errors.push({
          msg: "Invalid username."
        });
        renderErrors(response, errors);
      });
  }

});

// Validate User
let formValidation = ((request) => {
  request.checkBody('username', 'Username field cannot be empty.').notEmpty();
  request.checkBody('username', 'Username must be between 4-20 characters long.').len(4, 20);
  request.checkBody('password', 'Password field cannot be empty.').notEmpty();
  request.checkBody('password', 'Password must be 8-100 characters long.').len(8, 100);
  return request.validationErrors();
});

let renderErrors = ((response, errors) => {
  response.render('index', {
    title: 'UNO',
    errors: errors
  });
});










router.get('/lobby', function (request, response, next) {
  response.render('lobby', {
    title: 'UNO - Lobby'
  });
});

router.get('/create-game', function (request, response, next) {
  response.render('creategame', {
    title: 'UNO - Create Game'
  });
});

router.get('/end-game-page', function (request, response, next) {
  response.render('endgamepage', {
    title: 'UNO - End Game'
  });
});

module.exports = router;