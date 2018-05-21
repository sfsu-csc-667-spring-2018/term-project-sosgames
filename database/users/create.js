const db = require('../connection');
const bcrypt = require('bcrypt');
const isEmailInUse = require('./isEmailInUse').isEmailInUse;
const isUserNameInUse = require('./isUserNameInUse').isUserNameInUse;
const createUser = require('./createUser').createUser;

const create = (username, email, password, photo_path) => {
  return Promise.all([isEmailInUse(email), isUserNameInUse(username)]).then(
    ([emailUsed, usernameUsed]) => {
      let errors = [];

      if (emailUsed || usernameUsed) {
        if (emailUsed) {
          errors.push({
            msg: 'Email address is already in use.'
          });
        }
        if (usernameUsed) {
          errors.push({
            msg: 'Username is already in use.'
          });
        }
        return errors;
      } else {
        bcrypt.hash(password, 10).then(hash => {
          return createUser(username, hash, photo_path, 0, email);
        });
      }
    }
  );
};

module.exports = {
  create
};
