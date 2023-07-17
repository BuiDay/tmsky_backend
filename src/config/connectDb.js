const {Sequelize} = require('sequelize');
const config =  require('../../config');

const sequelize = new Sequelize(config.DB_NAME , config.DB_USERNAME, config.DB_PASSWORD, {
  host: config.DB_HOST ,
  dialect: config.DB_DIALECT ,
  logging:false,
  // dialectOptions:{
  //   'ssl':{
  //     "require":true,
  //     "rejectUnauthorized":false
  //   }
  // }
});

const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = connectDatabase