import  jwt  from "jsonwebtoken"
import { errorhandler } from "./errorUtil.js"
import  dotenv from "dotenv"
dotenv.config()

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.token
    if(!token) return next(errorhandler(400,'unauthorized'))
    jwt.verify(token,process.env.SECRET,(err,user)=>{
        if(err) return next(errorhandler(400,err.message))
        //Here we have just store the id of the user
        req.user=user
        next()
    })

}