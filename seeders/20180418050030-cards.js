'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    const cards = [];
    const colors = ["blue", "red", "yellow", "green", "wild"];
    const value = [1, 2, 3, 4, 5, 6, 7, 8, 8, 9];

    // return queryInterface.bulkInsert('cards', [
    //   {
    //     value : '1',
    //     color : 'blue',
    //     point_value : 1,
    //     image_path : '../public/images/spritesheet_uno_large.png',
    //     createdAt : new Date(),
    //     updatedAt : new Date()
    //   },
    //   {
    //     value : '2',
    //     color : 'blue',
    //     point_value : 2,
    //     image_path : '../public/images/spritesheet_uno_large.png',
    //     createdAt : new Date(),
    //     updatedAt : new Date()
    //   },
    //   {
    //     value : '3',
    //     color : 'blue',
    //     point_value : 3,
    //     image_path : '../public/images/spritesheet_uno_large.png',
    //     createdAt : new Date(),
    //     updatedAt : new Date()
    //   },
    // ],
    // {});
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('cards', [{
      value :'1',
      color: 'blue'
    }])
  }
};
