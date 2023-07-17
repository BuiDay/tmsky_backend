'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coach extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Customer.belongsTo(models.Schedule, { foreignKey: 'ScheduleId', targetKey: 'id', as: 'schedules' })
      Coach.hasOne(models.Customer, { foreignKey: 'id', as: 'customers' })
      Coach.belongsTo(models.User, { foreignKey: 'id', targetKey: 'id', as: 'users' })
    }
  }
  Coach.init({
    Level: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Coach',
  });
  return Coach;
};