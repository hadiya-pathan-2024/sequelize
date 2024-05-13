'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bids extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     bids.belongsTo(models.auctions,{foreignKey: 'auction_id'})
     bids.belongsTo(models.products, {foreignKey: 'product_id'})
     bids.belongsTo(models.users,{foreignKey: 'bidder_id'})
    }
  }
  bids.init({
    auction_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    bidder_id: DataTypes.INTEGER,
    bid_amount: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    paranoid: true,
    modelName: 'bids',
  });
  return bids;
};