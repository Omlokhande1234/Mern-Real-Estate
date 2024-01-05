import User from '../Models/userModel.js'
import dotenv from 'dotenv'
import { errorhandler } from '../utils/errorUtil.js'
dotenv.config()

const cookieOptions={
    maxAge: 7*24*60*60, // 7 days
    httpOnly:true,
    secure:true
}
export const Signup=async(req,res,next)=>{
    try{
        const{email,username,password}=req.body
        if(!email||!username||!password){
             return next(errorhandler(400,"Every field is reqired"))
        }
        const userExists=await User.findOne({email})
        if(userExists){
               return next(errorhandler(400,"User already exists"))
        }
        const user=await User.create({
               username,
               email,
               password
            })
         if(!user){
            return next(errorhandler(400,"Registration failed"))
        }
        await user.save()
        user.password=undefined
        const token=await user.generateJWTToken()
        res.cookie('token',token,cookieOptions)
        res.status(200)({
             success:true,
             message:"User registered suuccessffully",
             user
        })
    }catch(e){
        return next(errorhandler(400,e.message))
    }
}

export const Signin=async(req,res,next)=>{
    try{

    }catch(e){

    }
}

export const logout=async(req,res,next)=>{
    try{

    }catch(e){

    }
}