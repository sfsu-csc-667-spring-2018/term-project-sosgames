const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const promise = require('bluebird');


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
    errors = [];  
    
    if (uniqueEmailAddress(request.body.email)) {
      errors.push({
        param: request.body.email,
        msg: "Email address is already in use.",
        value: request.body.email
      });
    }

    if (uniqueUsername(request.body.username)) {
      errors.push({
        param: request.body.username,
        msg: "Username is already in use.",
        value: request.body.username
      });
    }
  }

  if (errors) {
    response.render('signup', {
      title: 'UNO - Sign Up',
      errors: errors
    });
  } else {
    User.createUser(request.body.username, request.body.password, '/', 0, request.body.email)
      .then(users => {
        request.flash('success_msg', "You are registered and can now login");
        response.redirect('/');
      });
  }
});

// Validate User
let formValidation = ((request) => {
  request.checkBody('username', 'Username field cannot be empty.').notEmpty();
  request.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
  request.checkBody('email', 'Email is not valid.').isEmail();
  request.checkBody('email', 'Email address must be between 4-100 characters long.').len(4, 100);
  request.checkBody('password', 'Password must be 8-100 characters long.').len(8, 100);
  request.checkBody('confirmpassword', 'Password must be 8-100 characters long.').len(8, 100);
  request.checkBody('confirmpassword', 'Passwords do not match').equals(request.body.password);
  return request.validationErrors();
});


let uniqueEmailAddress = (email => {
  let test = User.getOneByEmail(email)
    .then(data => {
      if (data == null) {
        console.log('UNIQUE USERNAME');
        return true;
      } else {
        console.log('NONUNIQUE EMAIL');
        return false;
      }
    }).catch(error => {
      console.log(error);
    });
});

let uniqueUsername = (username => {
  return User.getOneByUsername(username)
    .then(data => {
      if (data == null) {
        console.log('UNIQUE USERNAME');
        console.log(data);

        return true;
      } else {
        console.log('NONUNIQUE USERNAME');
        console.log(data);

        return false;
      }
    }).catch(error => {
      console.log(error);
    });
});

module.exports = router;