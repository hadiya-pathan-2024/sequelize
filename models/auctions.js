'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class auctions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      auctions.belongsTo(models.Users,{foreignKey: 'seller_id'})
      auctions.hasOne(models.auctions_status,{foreignKey:'status_id'})
      auctions.hasMany(models.products,{foreignKey: 'auction_id'})
      auctions.belongsTo(models.Users,{foreignKey: 'id'})
      auctions.hasOne(models.orders,{foreignKey: 'auction_id'})
      auctions.hasOne(models.bids,{foreignKey: 'auction_id'})
      auctions.hasMany(models.previous_auction_images,{foreignKey: 'auction_id'})
    }
  }
  auctions.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    starting_time: DataTypes.DATE,
    ending_time: DataTypes.DATE,
    seller_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    sequelize,
    modelName: 'auctions',
  });
  return auctions;
};