import app from './server'
import * as dotenv from 'dotenv'
dotenv.config()

app.listen(process.env.PORT, () =>{
    console.log(`Listening on http://localhost:${process.env.PORT}`)
    
})