'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let usernames = ['khanh', 'nick', 'robert', 'jon'];
    let users = createUsers(usernames);
    return queryInterface.bulkInsert('users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('users', null, {});
  }
};

function createUsers(usernames) {
  let users = [];

  for (let username of usernames) {
    let firstChar = username.charAt(0);
    let user = {
      username: username,
      password: '$2b$07$lqGt/Kyu5gdg2q27ZUzTWeaBS24hA/.RTRN3X86MPE5SFfZ9/BuWO',
      profile_picture_path: '/',
      total_score: 0,
      email: firstChar + '@' + firstChar + '.com',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    users.push(user);
  }

  return users;
}
