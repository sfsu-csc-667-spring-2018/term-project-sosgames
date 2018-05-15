const isEmailInUse = require('./isEmailInUse').isEmailInUse;
const isUserNameInUse = require('./isUserNameInUse').isUserNameInUse;
const getUserData = require('./getUserData').getUserData;
const getUserDataById = require('./getUserDataById').getUserDataById;
const create = require('./create').create;

module.exports = {
  isEmailInUse,
  isUserNameInUse,
  getUserData,
  getUserDataById,
  create
};
