import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'

import dbConnect from './utils/db.js'
import authRoutes from './routes/Auth.js'
import userRoutes from './routes/Contract.js'
import cookieParser from 'cookie-parser'
const app  = express()
const port = process.env.PORT 
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:process.env.FRONTEND_URL
}))
dbConnect()
app.listen(port,()=>{
    console.log('server started at port ',port);
})

//routes
app.use('/api',authRoutes)
app.use('/api/contract',userRoutes)