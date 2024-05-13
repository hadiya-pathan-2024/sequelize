'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class updated_profile_lists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      updated_profile_lists.belongsTo(models.Users, {foreignKey: 'user_id'})
    }
  }
  updated_profile_lists.init({
    user_id: DataTypes.INTEGER,
    profile_pic: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'updated_profile_lists',
  });
  return updated_profile_lists;
};