const express = require("express")
const {getCurrent,getScheduleUserById,getListCustomer} = require('../controllers/customerController')

const {authMiddleware,isAuthen} = require ('../middlewares/authMiddleware')
const router = express.Router();


router.get('/get-schedule',authMiddleware,getScheduleUserById)

router.get('/get-customer-list',getListCustomer)



module.exports= router
