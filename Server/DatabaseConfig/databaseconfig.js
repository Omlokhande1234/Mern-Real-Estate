import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const MONGODB_URL=process.env.MONGODB_URL

const dbConnection=()=>{
    mongoose
    .connect(MONGODB_URL)
    .then((connect)=>console.log(`Db connected to ${connect.connection.host}`))
    .catch((e)=>console.log(e.message))
}
export default dbConnection