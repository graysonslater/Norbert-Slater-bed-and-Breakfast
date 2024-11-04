'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.User,{
        foreignKey: 'userId',
        as: 'ReviewUser'
      });
      Review.hasMany(models.ReviewImages,
        {
          foreignKey:'reviewId',
          as: 'ReviewImages'
        }
      );
      Review.belongsTo(models.Spot,
        {
          foreignKey:'spotId',
          as: 'ReviewSpot'
        }
      );
    }
  }
  Review.init({
    id: {
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Spots',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    review: DataTypes.STRING(250),
    stars: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
