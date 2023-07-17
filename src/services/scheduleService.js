const db = require ('../models')
const { Op } = require("sequelize");
const { v4 } = require('uuid')



const createScheduleService = (payload) => new Promise(async (resolve, reject) => {

    try {
        console.log(payload)
        if(payload){
            payload.forEach( async element => {
                const ScheduleId = v4();
                const {CustomerId,CoachId,title,start,end} = element
                console.log(start)
                const response = await db.Schedule.create({
                    id:ScheduleId,CustomerId,CoachId,title,
                    start:start,
                    end:end
                })      
            });
        }
      
        resolve({
            err: payload ? 0 : 1,
            msg: payload ? 'OK' : 'Failed',
            payload
        })
    } catch (error) {
        reject(error)
        console.log(error)
    }
})

const getListScheduleService = () => new Promise(async (resolve, reject) => {
    try {
        let response = await db.Schedule.findAll({
            raw: true,
            nest: true,
            attributes: {
                exclude: ['CustomerId','CoachId']
            },
            include:[{
                model:db.Customer,
                as: 'customers',
                attributes: [],
                include:[{
                    model:db.User,
                    as: 'users',
                    attributes: ["FullName"],
                }],
            },{
                model:db.Coach,
                as: 'coaches',
                attributes: [],
                include:[{
                    model:db.User,
                    as: 'users',
                    attributes: ["FullName"],
                }]
            }],
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed',
            data:response
        })
    } catch (error) {
        console.log(error)
        reject(error)
    }
})

module.exports = {createScheduleService,getListScheduleService}