const db = require ('../models')
const { Op } = require("sequelize");

const StaffListService = () => new Promise(async (resolve, reject) => {
    try {
        let response = await db.User.findAll({
            where:{
                Role:{
                    [Op.in]:["Admin","Coach","Admin,Coach","Coach,Admin"]
                }
            },
            raw: true,
            nest: true,
            attributes: {
                exclude: ['Password']
            },
            include:[{
                model:db.Coach,
                as: 'coaches',
                attributes: ["Level"]
            }]
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

const CoachListService = () => new Promise(async (resolve, reject) => {
    try {
        let response = await db.User.findAll({
            where:{
                Role:{
                    [Op.in]:["Coach","Admin,Coach","Coach,Admin"]
                }
            },
            raw: true,
            nest: true,
            attributes: {
                exclude: ['Password']
            },
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

module.exports = {StaffListService,CoachListService}