import * as dotenv from 'dotenv'
dotenv.config()

import app from './server'
import cronjob from 'node-cron'
import { updateExpiredElections } from './modules/updateExpiredElections'
import config from './config'

//Cron Job for updating election status automatically
//Run every 1hour
cronjob.schedule('0 * * * *', updateExpiredElections)



app.listen(config.port, () =>{
    console.log(`Listening on http://localhost:${config.port}`)
    
})