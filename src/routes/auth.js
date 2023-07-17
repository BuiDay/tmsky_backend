const express = require("express")

const {registerUser,loginUser,getCurrent,changePassUser,getUserById} = require('../controllers/authController')
const {authMiddleware,isAuthen} = require ('../middlewares/authMiddleware')

const router = express.Router();

router.get('/get-current',authMiddleware,getCurrent)
router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/change-password',authMiddleware,changePassUser)
router.get('/id=:id',getUserById)

module.exports= router