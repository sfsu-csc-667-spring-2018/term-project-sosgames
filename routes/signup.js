const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// User Model
const User = require('../models/user');

router.get('/', function (request, response, next) {
  response.render('signup', {
    title: 'UNO - Sign Up'
  });
});

router.post('/', function (request, response) {

  // This is for debugging
  console.log(request.body);

  const username = request.body.username;
  const email = request.body.email;
  const password = request.body.password;
  const confirmpassword = request.body.confirmpassword;

  // Validation
  request.checkBody('email', 'Email is not valid').isEmail();
  request.checkBody('confirmpassword', 'Passwords do not match').equals(password);

  const errors = request.validationErrors();

  if (errors) {
    response.render('signup', {
      title: 'UNO - Sign Up',
        errors: errors
    });
  } else {
    // Get the Path
    // Create a User object
    const newUser = new User({

    });

    // This needs to change to be consistent with how I'm displaying errors
    request.flash('success_msg', "You are registered and can now login");
    response.redirect('/');

  }
});


module.exports = router;