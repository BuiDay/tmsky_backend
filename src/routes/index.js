const authRouter = require ('./auth');
const customerRouter = require ('./customer')
const scheduleRouter = require ('./schedule')
const staffRouter = require ('./staff')

const initRoutes = (app) => {
    app.use("/api/v1/auth",authRouter)
    app.use('/api/v1/staff', staffRouter)
    // app.use('/api/v1/category', categoryRouter)
    // app.use('/api/v1/post', postRouter)
    // app.use('/api/v1/price', priceRouter)
    // app.use('/api/v1/area', areaRouter)
    app.use('/api/v1/schedule',scheduleRouter)
    app.use('/api/v1/customer', customerRouter)

    return app.use('/',(req, res)=>{
        res.send('server on...')
    })
}


module.exports = initRoutes