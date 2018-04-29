const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const {
  User
} = require('../database');

router.get('/', function (request, response, next) {
  response.render('login', {
    title: 'UNO'
  });
});

// DEBUG Still Gotta fix this
router.post('/', (request, response, next) => {
  let formErrors = formValidation(request);

  if (formErrors) {
    renderErrors(response, formErrors);
  } else {
    const{ username, password } = request.body;

    // WIP code
    // try {
    //   User.login( username, password )
    //   .then( errors => {
    //     if( errors ) {
    //       renderErrors( response, errors );
    //     } else {
    //       const isSecure = request.app.get('env') != 'development';
    //         response.cookie(
    //           'user_id', data.id, {
    //           httpOnly: true,
    //           signed: true,
    //           secure: isSecure
    //         });
    //         response.redirect('/lobby');
    //     }
    //   });
    // } catch ( e ) { console.log(e);}


    // This works but - it's not what I want
    let errors = [];
    User.getUserData(username)
      .then((data) => {
        // Username exists
        bcrypt.compare(password, data.password)
          .then((result) => {


            if (result) {
              const isSecure = request.app.get('env') != 'development';
              response.cookie(
                'user_id', data.id, {
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
  response.render('login', {
    title: 'UNO',
    errors: errors
  });
});

// This doesn't work as intended. Clears cookie but I feel like it needs work
// router.get('/logout', (request, response, next ) => {
//   if( request.cookies ) {
//     response.clearCookie('user_id');
//     response.redirect('/');
//   }
// });

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((username, done) => {
  User.getUserId( username ).then((user) => {
    done(null, user.id);
  });
});

module.exports = router;