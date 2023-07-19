const express = require("express")
const {getStaffList, getCoachList,coachComfirmSchedule} = require('../controllers/staffController')
const {authMiddleware,isAuthen} = require ('../middlewares/authMiddleware')
const router = express.Router();

router.get('/get-staff-list',getStaffList)
router.get('/get-coach-list',getCoachList)
router.post('/coach-comfirm-schedule',authMiddleware,coachComfirmSchedule)

module.exports= router