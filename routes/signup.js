const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../database');

router.get('/', function (request, response, next) {
  response.render('signup', {
    title: 'UNO - Sign Up'
  });
});

router.post('/', function (request, response, next) {
  let formErrors = formValidation(request);

  if (formErrors) {
    renderErrors(response, formErrors);
  } else {
    let errors = []; 
    // Just trying to get the email value from the DB and save it
    User.isEmailInUse(request.body.email)
      .then((data) => {
        // Email is NOT unique, check username next
        errors.push({
          msg: "Email address is already in use."
        });

      })
      .then((data) => {

        User.isUserNameInUse(request.body.username)
          .then((data) => {
            // Username is also not unique
            errors.push({
              msg: "Username is already in use."
            });

            renderErrors(response, errors);

          })
          .catch((error) => {
            renderErrors(response, errors);

          });
      })
      .catch(error => {
        // Email is unique, check if username is also unique
        User.isUserNameInUse(request.body.username)
          .then((data) => {
            // Username is also not unique
            errors.push({
              msg: "Username is already in use."
            });
            renderErrors(response, errors);

          })
          .catch((error) => {
            // Email and username are both unique
            bcrypt.hash(request.body.password, 10).then( hash => {
              User.createUser(request.body.username, hash, '/', 0, request.body.email)
                .then(users => {
                  request.flash('success_msg', "You are registered and can now login");
                  response.redirect('/');
                });
            });
          });

      });
  }
});

// Validate User
let formValidation = ((request) => {
  request.checkBody('username', 'Username field cannot be empty.').notEmpty();
  request.checkBody('username', 'Username must be between 4-20 characters long.').len(4, 20);
  request.checkBody('email', 'Email field cannot be empty.').notEmpty();
  request.checkBody('email', 'Email is not valid.').isEmail();
  request.checkBody('email', 'Email address must be between 4-100 characters long.').len(4, 100);
  request.checkBody('password', 'Password field cannot be empty.').notEmpty();
  request.checkBody('password', 'Password must be 8-100 characters long.').len(8, 100);
  request.checkBody('confirmpassword', 'Confirm Password field cannot be empty.').notEmpty();
  request.checkBody('confirmpassword', 'Password must be 8-100 characters long.').len(8, 100);
  request.checkBody('confirmpassword', 'Passwords do not match').equals(request.body.password);
  return request.validationErrors();
});

let renderErrors = ((response, errors) => {
  response.render('signup', {
    title: 'UNO - Sign Up',
    errors: errors
  });
});

module.exports = router;