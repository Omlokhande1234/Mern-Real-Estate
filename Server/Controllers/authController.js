import User from '../Models/userModel.js'
import dotenv from 'dotenv'
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
             return res.status(200).json({
                  success:false,
                  message:"All fields are required"
             })
        }
        const userExists=await User.findOne({email})
        if(userExists){
                return  res.status(409).json({
                success:false,
                message:"User exists alredy"
                 })
        }
        const user=await User.create({
               username,
               email,
               password
            })
         if(!user){
            return res.status(400).json({
                success:false,
                message:"Registration failed"
            })
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
        return res.status(400).json({
            success:false,
            message:e.message
        })
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