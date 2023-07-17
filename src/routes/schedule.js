const express = require("express")

const {createSchedule,getListSchedule,getScheduleById} = require('../controllers/scheduleController')

const router = express.Router();

router.post('/create-schedule',createSchedule)
router.get('/get-list-schedule',getListSchedule)
router.get('/id=:id',getScheduleById)

module.exports= router