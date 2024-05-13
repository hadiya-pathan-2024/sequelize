'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      order_items.belongsTo(models.orders,{foreignKey: 'order_id'})
      order_items.belongsTo(models.products,{foreignKey: 'product_id'})
    }
  }
  order_items.init({
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    paranoid:true,
    modelName: 'order_items',
  });
  return order_items;
};