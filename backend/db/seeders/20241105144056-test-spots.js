'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        "ownerId": 2,
        "address": "123 Disney Lane",
        "city": "San Francisco",
        "state": "California",
        "country": "United States of America",
        "lat": 37.7645358,
        "lng": 122.4730327,
        "name": "Cali stay",
        "description": "Place where web developers are created",
        "price": 123,
      },
      {
        "ownerId": 2,
        "address": "empire state",
        "city": "new york",
        "state": "new york",
        "country": "United States of America",
        "lat": 37.7645358,
        "lng": 122.4730327,
        "name": "New York Stay",
        "description": "Place where web developers are created",
        "price": 123,
        "previewImage":"https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
      },
      {
        "ownerId": 1,
        "address": "567 mulburry",
        "city": "montpellier",
        "state": "vermont",
        "country": "United States of America",
        "lat": 37.7645358,
        "lng": 122.4730327,
        "name": "Vermont Stay",
        "description": "Place where web developers are created",
        "price": 123,
        "previewImage":"https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['123 Disney Lane',"empire state"] }
    }, {});
  }
};