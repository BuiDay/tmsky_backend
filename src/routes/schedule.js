const express = require("express")

const {createSchedule,getListSchedule} = require('../controllers/scheduleController')

const router = express.Router();

router.post('/create-schedule',createSchedule)
router.get('/get-list-schedule',getListSchedule)

module.exports= router