const express = require('express');
const router = express.Router();
//  const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

router.get('/', function (request, response, next) {
  response.render('signup', {
    title: 'UNO - Sign Up'
  });
});

router.post('/', function (request, response) {

  const username = request.body.username;
  const email = request.body.email;
  const password = request.body.password;
  const confirmpassword = request.body.confirmpassword;

  // Validation
  request.checkBody('email', 'Email is not valid').isEmail();
  request.checkBody('confirmpassword', 'Passwords do not match').equals(password);

  const errors = request.validationErrors();

  if (errors) {
    console.log('Errors!');
    response.render('signup', {
      title: 'UNO - Sign Up',
        errors: errors
    });
  } else {
    request.flash('success_msg', "You are registered and can now login");
    response.redirect('/users/login');
  }
});


module.exports = router;