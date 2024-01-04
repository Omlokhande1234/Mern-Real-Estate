import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import dbConnection from './DatabaseConfig/databaseconfig.js'
const app=express()
const PORT=process.env.PORT
app.listen(PORT,async()=>{
    await dbConnection()
    console.log("Port is running on port 3000")
})