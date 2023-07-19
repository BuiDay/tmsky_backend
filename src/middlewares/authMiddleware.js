const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const db = require("../models")

const authMiddleware = asyncHandler(async (req, res, next) =>{
    let accessToken = req.headers.authorization.split(' ')[1]
    if (!accessToken) return res.status(401).json({
        err: 1,
        msg: 'Missing access token'
    })

    jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(401).json({
            err: 1,
            msg: 'Access token expired'
        })
        req.user = user
        next()
    })
})

const isAuthen = (permissions) => asyncHandler( async (req, res, next)=>{
    const {PhoneNumber} = req.user;
    try{
        const getUser = await db.User.findOne({
            where: { PhoneNumber },
            raw: true
        })
        if(permissions.includes(getUser.Role)){
            next();
        }else{
            throw new Error("You are not an access")
        }
    }catch(err){
        throw new Error(err);
    }
})


module.exports = {authMiddleware, isAuthen}