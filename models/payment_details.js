'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      payment_details.belongsTo(models.orders,{foreignKey: 'order_id'})
    }
  }
  payment_details.init({
    order_id: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    method: DataTypes.STRING,
    payment_date: DataTypes.DATE,
    card_no: DataTypes.INTEGER,
    cvv: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    paranoid: true,
    modelName: 'payment_details',
  });
  return payment_details;
};