'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      orders.belongsTo(models.auctions,{foreignKey: 'auction:id'})
      orders.belongsTo(models.Users,{foreignKey: 'buyer_id'})
      orders.belongsTo(models.shipping_address,{foreignKey: 'address_id'})
      orders.hasMany(models.order_items, {foreignKey: 'order_id'})
      orders.hasOne(models.payment_details, {foreignKey: 'order_id'})

    }
  }
  orders.init({
    auction_id: DataTypes.INTEGER,
    buyer_id: DataTypes.INTEGER,
    address_id: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    paranoid:true,
    modelName: 'orders',
  });
  return orders;
};