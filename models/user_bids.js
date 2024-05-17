'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_bids extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Users.init({
    bidder_id : DataTypes.INTEGER,
    bids_id: DataTypes.INTEGER
  }, {
    deletedAt: 'deleted_at',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    sequelize,
    paranoid: true,
    modelName: 'user_bids',
  });
  return user_bids;
};