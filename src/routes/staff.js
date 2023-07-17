const express = require("express")
const {getStaffList, getCoachList} = require('../controllers/staffController')
const router = express.Router();

router.get('/get-staff-list',getStaffList)
router.get('/get-coach-list',getCoachList)

module.exports= router