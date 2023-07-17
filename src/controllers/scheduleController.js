const {createScheduleService,getListScheduleService} = require("../services/scheduleService");

const createSchedule = async (req,res)=>{
    // const {CustomerId,CoachId,title,start,end} = req.body
    try {
        // if(!CustomerId || !CoachId || !title || !start || !end){
        //     return res.status(400).json({
        //         code:1,
        //         msg:"Missing input!"
        //     })
        // }
         const response = await createScheduleService(req.body)
         return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            code:-1,
            msg:"Fail at auth controller!",
            error:error
        })
    }
}

const getListSchedule = async (req,res)=>{
    try {
         const response = await getListScheduleService()
         return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            code:-1,
            msg:"Fail at auth controller!",
            error:error
        })
    }
}


module.exports = {createSchedule,getListSchedule}