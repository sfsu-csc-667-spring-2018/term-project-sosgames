const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// User Model
const {
  User
} = require('../database');

router.get('/', function (request, response, next) {
  response.render('signup', {
    title: 'UNO - Sign Up'
  });
});

router.post('/', function (request, response, next) {
  let errors = [];
  errors = formValidation(request);

  if (!errors) {
    errors = []; // @robert: we have to reset this to empty?
    // Just trying to get the email value from the DB and save it
    User.isEmailInUse(request.body.email)
      .then((data) => {
        // Email is NOT unique, check username next
        if(data) {
          errors.push({
            msg: "Email address is already in use.",
          });
        }

        return errors;
      })
      .then((data) => {
        User.isUsernameInUse(request.body.username)
        .then((data) => {
          // Username is also not unique
          if(data) {
            errors.push({
              msg: "Username is already in use.",
            });
          }

          response.render('signup', {
            title: 'UNO - Sign Up',
            errors: errors
          });
        })
        .catch((error) => {
          response.render('signup', {
            title: 'UNO - Sign Up',
            errors: errors
          });
        })
      })
      .catch(error => {
        // Email is unique, check if username is also unique
        User.isUsernameInUse(request.body.username)
        .then((data) => {
          // Username is also not unique
          if(data) {
            errors.push({
              msg: "Username is already in use.",
            });
          }

          // Render the error(s)
          response.render('signup', {
            title: 'UNO - Sign Up',
            errors: errors
          });
        })
        .catch((error) => {
          // Email and username are both unique
          User.createUser(request.body.username, request.body.password, '/', 0, request.body.email)
          .then(users => {
            request.flash('success_msg', "You are registered and can now login");
            response.redirect('/');
          });
        });

      });
  } else {
    response.render('signup', {
      title: 'UNO - Sign Up',
      errors: errors
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

module.exports = router;