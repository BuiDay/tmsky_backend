const {StaffListService, CoachListService,CoachComfirmSchedulService} = require('../services/staffService')

const getStaffList = async (req, res) => {
    try {
        const response = await StaffListService()
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at category controller: ' + error
        })
    }
}

const getCoachList = async (req, res) => {
    try {
        const response = await CoachListService()
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at category controller: ' + error
        })
    }
}

const coachComfirmSchedule = async (req, res) => {
    const { id } = req.user
    try {
        const response = await CoachComfirmSchedulService(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at category controller: ' + error
        })
    }
}

module.exports = {getStaffList,getCoachList,coachComfirmSchedule}
