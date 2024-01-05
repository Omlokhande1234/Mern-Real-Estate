import express from 'express'
import authRoutes from './Routes/authRoutes.js'
import userRoutes from './Routes/userRoutes.js'

const app=express()

app.use(express.json())
app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)

export default app