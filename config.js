const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

console.log(process.env.NODE_ENV)

module.exports = {
    NODE_ENV : process.env.NODE_ENV,
    HOST : process.env.HOST,
    PORT : process.env.PORT,
    DB_HOST : process.env.DB_HOST,
    DB_NAME : process.env.DB_NAME,
    DB_USERNAME : process.env.DB_USERNAME,
    DB_PASSWORD : process.env.DB_PASSWORD,
    DB_DIALECT : process.env.DB_DIALECT,
}