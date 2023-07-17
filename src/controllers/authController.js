const {registerService,loginService,getOne,changePassService,getUserByIdService} = require("../services/authService");

const registerUser = async (req,res)=>{
    const {FullName, PhoneNumber} = req.body;
    try {
        if(!FullName || !PhoneNumber){
            return res.status(400).json({
                 code:1,
                 msg:"Missing input!"
             })
         }
         const response = await registerService(req.body)
         return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            code:-1,
            msg:"Fail at auth controller!",
            error:error
        })
    }
}

const loginUser = async (req, res) => {
    const { PhoneNumber, Password } = req.body
    try {
        if (!PhoneNumber || !Password) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs !'
        })
        const response = await loginService(req.body)
        if(response.err === -1){
            return res.status(401).json(response)
         }
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + error
        })
    }
}


const getCurrent = async (req, res) => {
    const { id } = req.user
    try {
        const response = await getOne(id)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at category controller: ' + error
        })
    }
}

const changePassUser = async (req, res) => {
    const { id } = req.user
    try {
        const response = await changePassService(id,req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at category controller: ' + error
        })
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params
    try {
        const response = await getUserByIdService(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at category controller: ' + error
        })
    }
}


module.exports = {registerUser,loginUser,getCurrent,changePassUser,getUserById}