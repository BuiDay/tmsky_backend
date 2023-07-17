'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Customer.belongsTo(models.Schedule, { foreignKey: 'ScheduleId', targetKey: 'id', as: 'schedules' })
      Customer.hasOne(models.User, { foreignKey: 'id', as: 'customers' })
      Customer.belongsTo(models.Coach, { foreignKey: 'CoachId', targetKey: 'id', as: 'coaches' })
      Customer.belongsTo(models.User, { foreignKey: 'id', targetKey: 'id', as: 'users' })
    }
  }
  Customer.init({
    Level: DataTypes.STRING,
    CoachId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};