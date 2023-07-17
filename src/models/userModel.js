'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasOne(models.Schedule, { foreignKey: 'CustomerId', as: 'schedules' })
      User.belongsTo(models.Coach, { foreignKey: 'id', targetKey: 'id', as: 'coaches' })
      User.belongsTo(models.Customer, { foreignKey: 'id', targetKey: 'id', as: 'customers' })
      // User.hasMany(models.Schedule, {foreignKey: 'id', as: 'schedules' })
    }
  }
  User.init({
    FullName: DataTypes.STRING,
    PhoneNumber: DataTypes.STRING,
    Password: DataTypes.STRING,
    Email:DataTypes.STRING,
    Gender: DataTypes.STRING,
    Role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};