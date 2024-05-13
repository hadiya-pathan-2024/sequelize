'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_queries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_queries.init({
    receiver: DataTypes.STRING,
    sender: DataTypes.STRING,
    message: DataTypes.STRING,
    mark_read: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    paranoid: true,
    modelName: 'user_queries',
  });
  return user_queries;
};