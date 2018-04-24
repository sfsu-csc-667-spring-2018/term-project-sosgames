const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {
  User
} = require('../database');

router.get('/', function (request, response, next) {
  response.render('signup', {
    title: 'UNO - Sign Up'
  });
});

router.post('/', (request, response, next) => {
  let formErrors = formValidation(request);

  if (formErrors) {
    renderErrors(response, formErrors);
  } else {
    const {
      username,
      email,
      password
    } = request.body;
    const photo_path = '/'; // DEBUG This will be updated

    // This is test code, the bottom commented out code works as intended
    User.create(username, email, password, photo_path)
      .then(errors => {
        renderErrors(response, errors);

      }).catch(error => {
        console.log(error);
        request.flash('success_msg', "You are registered and can now login");
        response.redirect('/');
      });
    // Promise.all([
    //   User.isEmailInUse(email),
    //   User.isUserNameInUse(username)

    // ]).then(([emailInUse, userNameInUse]) => {
    //   let errors = [];
    //   if (emailInUse || userNameInUse) {
    //     if (emailInUse) {
    //       errors.push({msg: "Email address is already in use."});
    //     }
    //     if (userNameInUse) {
    //       errors.push({msg: "Username is already in use."});
    //     }
    //     renderErrors(response, errors);
    //   }
    // }).catch( errors => {
    //   bcrypt.hash(request.body.password, 10).then(hash => {
    //     User.createUser(request.body.username, hash, '/', 0, request.body.email)
    //       .then(users => {
    //         request.flash('success_msg', "You are registered and can now login");
    //         response.redirect('/');
    //       });
    //   });

    // });
  }
});

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