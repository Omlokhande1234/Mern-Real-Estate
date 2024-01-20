import User from '../Models/userModel.js';
import { errorhandler } from '../utils/errorUtil.js';
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()


// const cookieOptions={
//   maxAge: 7*24*60*60, // 7 days
//   httpOnly:true,
//   secure:true
// }
// const generateToken=async function(user){
//   return await jwt.sign(
//     {id:user._id,email:user._email},
//     process.env.SECRET,
//     {
//       expiresIn:process.env.JWT_EXPIRY
//     }
//   )
   
// }

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if(!username|!email||!password){
      return next (errorhandler(400,'All fields are required'));
    }
    const userExists=await User.findOne({email})
    if(userExists){
      return next(errorhandler(400,`User with the email ${email} already exists`))
    }
    const hashPassword=bcrypt.hashSync(password,10)
    const user=await User.create({
      username,
      email,
      password:hashPassword
    })
    if(!user){
      return next(errorhandler(500,"Error creating user"))
    }
    await user.save();
    user.password=undefined
    

    // const token=await user.generateJWTToken()
    // res.cookie('token',token,cookieOptions)
    res.status(400).json({
      success:true,
      message:"User Created successfully",
      user
    })
  } catch (error) {
    return next(errorhandler(400,error.message));
  }
};

export const Signin=async(req,res,next)=>{
  const{email,password}=req.body
    try{
      if(!email||!password){
        return next(errorhandler(400,"All fields are required"))
      }
      const user=await User.findOne({email}).select('+password')
      if(!user||!bcrypt.compareSync(password,user.password)){
        return next(errorhandler(400,"Invalid Email or Password"));
      }
      const token=jwt.sign({id:user._id,email:user.email},process.env.SECRET);
        const {password:pass,...rest}=user._doc
        res.cookie('token',token,{httpOnly:true}).status(200).json(rest);
     
      res.status(200).json({
        success:true,
        message:"User logged in successfully",
        user
      })
    }catch(e){
      return next(errorhandler(400,e.message))

    }
}

export const logout=async(req,res,next)=>{
    try{

    }catch(e){

    }
}

export const google=async (req,res,next)=> {
  try {
      const user=await User.findOne({email:req.body.email})
      if (user) {
          const token=jwt.sign({id:user._id,email:user.email},process.env.SECRET);
          const {password:pass,...rest}=user._doc
          res.cookie('token',token,{httpOnly:true}).status(200).json(rest);
      } else {
          const generatedPassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
          const hashedPassword=bcrypt.hashSync(generatedPassword,10);
          const newUser=new User({username:req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4),email:req.body.email,password:hashedPassword,avatar:req.body.photo})
          await newUser.save();
          const token=jwt.sign({id:newUser._id,email:user._email},process.env.SECRET);
          const {password:pass,...rest}=newUser._doc
        
          res.cookie('token',token,{httpOnly:true}).status(200).json(rest);
          console.log(newUser._doc)
      }
      
  } catch (error) {
      next(error);
  }
};