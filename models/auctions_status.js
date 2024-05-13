'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class auctions_status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      auctions_status.belongsTo(models.auctions,{foreignKey: 'status_id'})
    }
  }
  auctions_status.init({
    status: DataTypes.STRING
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    sequelize,
    modelName: 'auctions_status',
  });
  return auctions_status;
};