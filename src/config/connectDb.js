const {Sequelize} = require('sequelize');
const config =  require('../../config');

const sequelize = new Sequelize("db_tmsky" , "db_tmsky_user", "HE5TLqXBDDc5lRMgNBVYDTuAhIhALtU3", {
  host: "dpg-ciqi7itgkuvrtocdlc00-a.singapore-postgres.render.com" ,
  dialect:"postgres" ,
  logging:false,
  dialectOptions:{
    'ssl':{
      "require":true,
      "rejectUnauthorized":false
    }
  }
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