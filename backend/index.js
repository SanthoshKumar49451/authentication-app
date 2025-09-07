import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import connectDB from './database/connectDB.js';
import authRoutes from './routes/auth-route.js'
dotenv.config()




const app=express()
app.use(express.json())


app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true,               
}));

app.use(cookieParser())
app.use('/api/auth',authRoutes)




app.get('/',(req,res)=>{
    res.send('hello')
})

connectDB()

app.listen(3000,()=>{
    console.log("server")
})