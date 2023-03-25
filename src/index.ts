import * as dotenv from 'dotenv'
dotenv.config()

import app from './server'

app.listen(process.env.PORT, () =>{
    console.log(`Listening on http://localhost:${process.env.PORT}`)
    
})