import User from "../Models/userModel.js"
import { errorhandler } from "../utils/errorUtil.js"
import bcrypt from 'bcryptjs'

export const test=(req,res)=>{
    res.json({
        message:"api route is working"
    })
}
export const updateUser=async(req,res,next)=>{
    if(req.user.id!==req.params.id) return next(errorhandler(401,'you can update only your own account'))
    try{
        //if the user tries to change or update the password 
        if(req.body.password){
            req.body.password=bcrypt.hashSync(req.body.password,10)
        }
        //Here the user can update either email,password,name all of three can be updated or
        //any one of these can be updated so to handle this we use set method
        const updatedUser= await User.findByIdAndUpdate(req.params.id,
            {$set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                avatar:req.body.avatar
            }
                
            },{new:true})
            //seperated the password and rest of the information
            const{password,...rest}=updatedUser._doc
             return res.status(200).json({
                success:true,
                message:"user updated successfully",
                user:rest

            })
         
    }catch(error){
         return next(errorhandler(400,error.message))

    }
}
export const deleteUser=async (req,res,next)=>{
    if(req.user.id!==req.params.id) return next(errorhandler(401,'you can delete only your own account'))
    try{
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('token')
        res.status(200).json({
            success:true,
            message:"User deleted successfully",
            User
        })

    }
    catch(error){
        return next(errorhandler(400,error.message))
    }
}