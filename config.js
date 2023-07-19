const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

module.exports = {
    NODE_ENV : process.env.NODE_ENV || "",
    HOST : process.env.HOST || "localhost",
    PORT : process.env.PORT || "8888",
    DB_HOST : process.env.DB_HOST || "localhost",
    DB_NAME : process.env.DB_NAME || "tmsky_app",
    DB_USERNAME : process.env.DB_USERNAME || "root",
    DB_PASSWORD : process.env.DB_PASSWORD|| "",
    DB_DIALECT : process.env.DB_DIALECT|| "mysql",
}