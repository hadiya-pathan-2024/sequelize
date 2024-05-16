'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      products.belongsTo(models.auctions,{foreignKey: 'auction_id'})
      products.hasOne(models.categories,{foreignKey:'category_id'})
      products.belongsTo(models.Users,{foreignKey:'seller_id'})
      products.hasMany(models.parameters,{foreignKey: 'product_id'})
      products.hasMany(models.product_images,{foreignKey: 'product_id'})
      products.hasMany(models.bids,{foreignKey: 'product_id'})
      products.hasMany(models.order_items,{foreignKey: 'product_id'})

    }
  }
  products.init({
    product_name: DataTypes.STRING,
    auction_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    seller_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    product_condition: DataTypes.STRING,
    status: DataTypes.STRING,
    starting_price: DataTypes.INTEGER,
    bid_price_interval: DataTypes.INTEGER,
    reserved_price: DataTypes.INTEGER,
    winning_bid: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};