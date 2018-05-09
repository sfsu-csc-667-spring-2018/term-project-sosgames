'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let game_names = ['snoop', 'doge'];
    let is_reversed_flags = [false, true];
    let players_counts = [2, 4];

    let games = createGames(game_names, is_reversed_flags, players_counts);
    return queryInterface.bulkInsert('games', games, {});
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('games', null, {});
  }
};

function createGames(game_names, is_reversed_flags, players_counts) {
  let games = [];

  for (const index in game_names) {
    let game = {
      round_number: 1,
      is_reversed: is_reversed_flags[index],
      winner_id: null,
      name: game_names[index],
      number_of_players: players_counts[index],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    games.push(game);
  }

  return games;
}
