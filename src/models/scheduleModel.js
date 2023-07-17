'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Schedule.hasMany(models.Customer, { foreignKey: 'ScheduleId', as: 'schedules' })
      Schedule.belongsTo(models.Customer, { foreignKey: 'CustomerId', targetKey: 'id', as: 'customers' })
      Schedule.belongsTo(models.Coach, { foreignKey: 'CoachId', targetKey: 'id', as: 'coaches' })
    }
  }
  Schedule.init({
    CustomerId: DataTypes.STRING,
    CoachId: DataTypes.STRING,
    title:DataTypes.TEXT,
    start:DataTypes.DATE,
    end:DataTypes.DATE,
    backgroundColor:DataTypes.STRING,
    isComfirm:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};