const db = require('../connection');
const bcrypt = require('bcrypt');

// Methods to Define
const ALL = `SELECT * FROM users`;
const GET_EMAIL = `SELECT email FROM users WHERE email = $1`;
const GET_USER_ID = `SELECT id FROM users WHERE username = $1`;
const GET_USERNAME = `SELECT username FROM users WHERE username = $1`;
const GET_USER_DATA = `SELECT * FROM users WHERE username = $1`;
const CREATE_USER = `INSERT INTO users ( username, password, profile_picture_path, total_score, email ) ` +
  `VALUES ( $1, $2, $3, $4, $5 ) RETURNING *`;

let isEmailInUse = (email) => {
  return db.oneOrNone(GET_EMAIL, [email]);
};

let isUserNameInUse = (username) => {
  return db.oneOrNone(GET_USERNAME, [username]);
};

let createUser = (username, password, profile_picture_path, total_score, email) => {
  db.one(CREATE_USER, [username, password, profile_picture_path, 0, email]);
};

let getUserData = (username) => {
  return db.one(GET_USER_DATA, [username]);
};

module.exports = {
  create: (username, email, password, photo_path) =>
    Promise.all([isEmailInUse(email), isUserNameInUse(username)])
    .then(([emailUsed, usernameUsed]) => {
      let errors = [];

      if (emailUsed || usernameUsed) {
        if (emailUsed) {
          errors.push({
            msg: "Email address is already in use."
          });
        }
        if (usernameUsed) {
          errors.push({
            msg: "Username is already in use."
          });
        }
        return errors;

      } else {
        bcrypt.hash(password, 10).then(hash => {
          return createUser(username, hash, photo_path, 0, email);
        });
      }
    }),

  login: (username, password) =>
    Promise.all([getUserData(username)])
    .then(([user]) => {
      return bcrypt.compare(password, user.password).then(result => {
        if (result) {
          return user;
        } else {
          return new Array({
            msg: "Invalid password."
          });
        }
      });

    }).catch(error => {
      return new Array({
        msg: "Invalid username."
      });
    })
};