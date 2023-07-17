const express = require("express");
const cors = require('cors')
const connectDatabase = require( "./src/config/connectDb")
const initRoutes =  require('./src/routes')
const { notFound, errorHandler } = require('./src/middlewares/errorHandler')
const config =  require('./config.js');

const app = express();

app.use(express.json())

app.use(cors());

initRoutes(app)
connectDatabase()
app.use(notFound);
app.use(errorHandler);

app.listen(config.PORT, config.HOST, () => {
    console.log(`APP LISTENING ON http://${config.HOST}:${config.PORT}`);
})