import * as dotenv from 'dotenv'
dotenv.config()

import app from './server'
import cronjob from 'node-cron'
import { updateExpiredElections } from './modules/updateExpiredElections'

//Cron Job for updating election status automatically
//Run every 1hour
cronjob.schedule('0 * * * *', updateExpiredElections)



app.listen(process.env.PORT, () =>{
    console.log(`Listening on http://localhost:${process.env.PORT}`)
    
})