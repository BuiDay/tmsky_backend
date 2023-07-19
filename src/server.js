const express = require("express");
const cors = require('cors')
const connectDatabase = require( "./config/connectDb")
const initRoutes =  require('./routes')
const { notFound, errorHandler } = require('./middlewares/errorHandler')
// const config =  require('./config.js');
const dotenv = require('dotenv');
require("@babel/core").transform("code", {
    presets: ["@babel/preset-env"],
  });
dotenv.config()
const app = express();

app.use(express.json())

app.use(cors());

initRoutes(app)

// console.log(config)

connectDatabase()
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`APP LISTENING ON http://${process.env.HOST}:${process.env.PORT}`);
})