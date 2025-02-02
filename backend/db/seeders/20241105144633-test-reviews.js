'use strict';

const { Review, Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

//allow avgRating to be updated with seeder
async function updateAllSpotRatings() {
  const spots = await Spot.findAll();
  for (let spot of spots) {
    await spot.findAvgRating();
  }
  
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
        {
          spotId: 1,
          userId:1,
          review: 'test review 1',
          stars: 3.5   
        },
        {
          spotId: 1,
          userId:1,
          review: 'test review 2',
          stars: 4.6  
        },
        {
          spotId: 1,
          userId:1,
          review: 'test review 3',
          stars: 2  
        },
        {
          spotId: 2,
          userId:1,
          review: 'test review 4',
          stars: 2  
        },
        {
          spotId: 3,
          userId:2,
          review: 'test review 5',
          stars: 2  
        },
        {
          spotId: 3,
          userId:2,
          review: 'test review 6',
          stars: 2  
        }
    ], { validate: true });

    //updates avge rating wehn seeder created
    await updateAllSpotRatings();
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1] }
    }, {});

    //updates avgRating if seeder deleted
    await updateAllSpotRatings();
  }
};