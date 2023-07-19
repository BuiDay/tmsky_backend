const express = require("express");
const cors = require('cors')
const connectDatabase = require( "./src/config/connectDb")
const initRoutes =  require('./src/routes')
const { notFound, errorHandler } = require('./src/middlewares/errorHandler')
// const config =  require('./config.js');
const dotenv = require('dotenv');
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