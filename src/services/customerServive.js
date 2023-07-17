const db = require ('../models')
const { Op } = require("sequelize");
// GET CURRENT

const getScheduleUser = (id) => new Promise(async (resolve, reject) => {
    try {
        let response = await db.Schedule.findAll({
            where: { CustomerId:id },
            raw: true,
            attributes: {
                exclude: ['CustomerId']
            },
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed',
            response
        })
    } catch (error) {
        reject(error)
    }
})

const CustomerListService = () => new Promise(async (resolve, reject) => {
    try {
        let response = await db.User.findAll({
            where:{
                Role:"Customer"
            },
            raw: true,
            nest: true,
            attributes: {
                exclude: ['Password']
            },
            include:[{
                model:db.Customer,
                as: 'customers',
                attributes: ["Level"],
                include:[{
                    model:db.Coach,
                    as: 'coaches',
                    attributes: ["Level"],
                    include:[{
                        model:db.User,
                        as: 'users',
                        attributes: ["FullName"],
                    }]
                }]
            }],
           
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed',
            data:response
        })
    } catch (error) {
        reject(error)
    }
})


module.exports = {getScheduleUser,CustomerListService}