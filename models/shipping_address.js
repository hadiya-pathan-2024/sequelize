'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shipping_address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      shipping_address.belongsTo(models.Users,{foreignKey:'user_id'})
      shipping_address.hasOne(models.orders,{foreignKey: 'address_id'})
    }
  }
  shipping_address.init({
    user_id: DataTypes.INTEGER,
    address1: DataTypes.STRING,
    address2: DataTypes.INTEGER,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    pincode: DataTypes.INTEGER
  }, {
    deletedAt: 'deleted_at',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    sequelize,
    paranoid:true,
    modelName: 'shipping_address',
  });
  return shipping_address;
};
