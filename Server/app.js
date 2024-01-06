import express from 'express'
import authRoutes from './Routes/authRoutes.js'
import userRoutes from './Routes/userRoutes.js'
import errorMiddleware from './MiddleWares/errorMiddleware.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
 

const app=express()
app.use(cors({
    origin:'*',
    credentials:true
    }) 
)


app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)



app.use(errorMiddleware)

export default app