'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.shipping_address,{foreignKey: 'user_id'})
      Users.hasMany(models.auctions,{foreignKey: 'seller_id'})
      Users.hasMany(models.products,{foreignKey: 'seller_id'})
      Users.hasMany(models.orders,{foreignKey: 'buyer_id'})
      Users.hasMany(models.bids,{foreignKey: 'bidder_id'})
      Users.hasMany(models.updated_profile_lists, {foreignKey: 'user_id'})
    }
  }
  Users.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    role: DataTypes.STRING,
    email: DataTypes.STRING,
    dob: DataTypes.DATE,
    gender: DataTypes.STRING,
    activation_status: DataTypes.INTEGER,
    password: DataTypes.STRING,
    profile_pic: DataTypes.STRING
  }, {
    deletedAt: 'deleted_at',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    sequelize,
    paranoid: true,
    modelName: 'Users',
    indexes: [{
      unique: true,
      fields: ['first_name','email']
    }]
  });
  return Users;
};