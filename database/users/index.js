const isEmailInUse = require('./isEmailInUse').isEmailInUse;
const isUserNameInUse = require('./isUserNameInUse').isUserNameInUse;
const getUserData = require('./getUserData').getUserData;
const getUserDataById = require('./getUserDataById').getUserDataById;
const create = require('./create').create;
const getTopTenScores = require('./getTopTenScores').getTopTenScores;

module.exports = {
  isEmailInUse,
  isUserNameInUse,
  getUserData,
  getUserDataById,
  create,
  getTopTenScores
};
