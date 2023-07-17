const db = require("../models")
const bcrypt = require("bcrypt")
// import generateToken from '../utils/jwtToken'
const jwt = require('jsonwebtoken')
const { v4 } = require('uuid')
require('dotenv').config()

const newPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const registerService = ({ PhoneNumber, FullName, Password, Role, ...Params }) => new Promise(async (resolve, reject) => {
    const userId = v4();
    try {
        let token;
        if (Role.includes("Customer")) {
            const response = await db.User.findOrCreate({
                where: { PhoneNumber },
                defaults: {
                    id: Params.userId,
                    PhoneNumber,
                    FullName,
                    Email: Params.Email,
                    Gender: Params.Gender,
                    Password: newPassword(Password),
                    Role: Role.toString(),
                }
            })
            token = response[1] && jwt.sign({ id: response[0].id, PhoneNumber: response[0].PhoneNumber }, process.env.JWT_KEY || "", { expiresIn: '1d' })
            if (token) {
                await db.Customer.create({
                    id: Params.userId,
                    Level: Params.Level,
                    CoachId: Params.CoachId,
                })

            }
            resolve({
                err: token ? 0 : -1,
                msg: token ? "Register is successfull" : "Phone number has been already used!",
                token: token || null
            })
        }
        else {
            const response = await db.User.findOrCreate({
                where: { PhoneNumber },
                defaults: {
                    id: userId,
                    PhoneNumber,
                    Email: Params.Email,
                    Gender: Params.Gender,
                    FullName,
                    Role: Role.toString(),
                    Password: newPassword(Password),
                }
            })

            token = response[1] && jwt.sign({ id: response[0].id, PhoneNumber: response[0].PhoneNumber }, process.env.JWT_KEY || "", { expiresIn: '1d' })
            if (token && Role.includes("Coach")) {
                await db.Coach.create({
                    id: userId,
                    Level: Params.Level,
                })
            }
            resolve({
                err: token ? 0 : -1,
                msg: token ? "Register is successfull" : "Phone number has been already used!",
                token: token || null
            })
        }

    } catch (error) {
        reject(error)
    }
})

const loginService = ({ PhoneNumber, Password }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { PhoneNumber },
            raw: true
        })
        const isCorrectPassword = response && bcrypt.compareSync(Password, response.Password);
        const token = isCorrectPassword && jwt.sign({ id: response.id, PhoneNumber: response.PhoneNumber }, process.env.SECRET_KEY, { expiresIn: '2d' });
        resolve({
            err: token ? 0 : -1,
            msg: token ? 'Login is successfully !' : response ? 'Password is wrong !' : 'Phone number not found !',
            token: token || null
        })

    } catch (error) {
        reject(error)
    }
})

const getOne = (id) => new Promise(async (resolve, reject) => {
    try {
        let response = await db.User.findOne({
            where: { id },
            raw: true,
            attributes: {
                exclude: ['Password']
            }
        })
        if (response.Role == "Customer") {
            const id = response.id;
            const data = await db.Customer.findOne({
                where: { id },
                raw: true,
                nest: true,
                attributes: {
                    exclude: ['id']
                },
                // include:[{
                //     model:db.Schedule,
                //     as: 'schedules',
                //     attributes: ['Title',"Start","End"]
                // }]
            })
            response = {
                ...response,
                ...data,
            }
        }
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed',
            data: response
        })
    } catch (error) {
        reject(error)
    }
})

const changePassService = (id, body) => new Promise(async (resolve, reject) => {
    try {
        let response = await db.User.update({
            Password: newPassword(body.Password)
        },
            {
                where: { id }
            }
        )
        resolve({
            err: response ? 0 : -1,
            msg: response ? 'OK' : 'Failed',
        })
    } catch (error) {
        reject(error)
    }
})

const getUserByIdService = (id) => new Promise(async (resolve, reject) => {
    console.log(id)
    try {
        let response = await db.User.findOne(
            {
                where: { id },
                attributes: {
                    exclude: ['Password']
                }
            }
        )
        resolve({
            err: response ? 0 : -1,
            msg: response ? 'OK' : 'Failed',
            response
        })
    } catch (error) {
        reject(error)
    }
})


module.exports = { registerService, loginService, getOne, changePassService, getUserByIdService }


