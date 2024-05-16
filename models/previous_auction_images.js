'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class previous_auction_images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      previous_auction_images.belongsTo(models.auctions,{foreignKey: 'auction_id'})
    }
  }
  previous_auction_images.init({
    image: DataTypes.STRING,
    auction_id: DataTypes.INTEGER
  }, {
    deletedAt: 'deleted_at',
    sequelize,
    modelName: 'previous_auction_images',
  });
  return previous_auction_images;
};