const {getScheduleUser,CustomerListService} = require('../services/customerServive')


const getScheduleUserById = async (req, res) => {
    const { id } = req.user
    try {
        const response = await getScheduleUser(id)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at category controller: ' + error
        })
    }
}

const getListCustomer = async (req, res) => {
    try {
        const response = await CustomerListService()
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at category controller: ' + error
        })
    }
}



module.exports = {getScheduleUserById,getListCustomer}