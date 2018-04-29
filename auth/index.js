const passport = require('passport');
// const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const User = require('../database/users');

// TODO: from jrob -- can refactor to this?
// const lookup = (email, password, done) => {
//   User.find(email)
//     .then(({ id, hash, email }) => {
//       if (bcrypt.compareSync(password, hash)) {
//         done(null, { id, email });
//       } else {
//         done('Please verify your email and password', false);
//       }
//     })
//     .catch(error => {
//       console.log(error);
//       done('Please verify your email and password', false);
//     });
// };

// const strategy = new LocalStrategy(
//   {
//     usernameField: 'email',
//     passwordField: 'password'
//   },
//   lookup
// );

passport.serializeUser(User.serialize);
passport.deserializeUser(User.deserialize);
// passport.use(strategy);

module.exports = passport;