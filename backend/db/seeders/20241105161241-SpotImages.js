'use strict';

const { SpotImage, Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

//allow avgRating to be updated with seeder
async function updateAllSpotPreviews() {
  const spots = await Spot.findAll({
    where: {id: 1}
  });
  for (let spot of spots) {
    await spot.assignPreview();
  }
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
        {
          spotId: 1,
          url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
          preview:false    
        },
        {
          spotId: 1,
          url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
          preview:false    
        },
        {
          spotId: 1,
          url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
          preview:false    
        },
        {
          spotId: 1,
          url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
          preview:false    
        },
        {
          spotId: 1,
          url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
          preview:true    
        }
    ], { validate: true });

    await updateAllSpotPreviews()
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1] }
    }, {});

    await updateAllSpotPreviews()
  }
};