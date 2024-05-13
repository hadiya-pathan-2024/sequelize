'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class parameters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      parameters.belongsTo(models.products,{foreignKey: 'product_id'})
    }
  }
  parameters.init({
    product_id: DataTypes.INTEGER,
    parameter_name: DataTypes.STRING,
    parameter_value: DataTypes.STRING,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'parameters',
  });
  return parameters;
};