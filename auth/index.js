const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const User = require('../database/users');

passport.serializeUser((user_id, done) => {
  done(null, user_id);
});

passport.deserializeUser((user_id, done) => {
  User.getUserDataById(user_id)
    .then(user => {
      done(null, user);
    })
    .catch(error => {
      done(error);
    });
});

passport.use(
  new LocalStrategy(
    {
      passReqToCallback: true
    },
    (request, username, password, done) => {
      User.getUserData(username)
        .then(user => {
          bcrypt.compare(password, user.password).then(result => {
            if (result) {
              done(null, user.id);
            } else {
              done(null, false, {
                msg: 'Invalid password.'
              });
            }
          });
        })
        .catch(error => {
          done(null, false, {
            msg: 'Invalid username.'
          });
        });
    }
  )
);

module.exports = passport;
