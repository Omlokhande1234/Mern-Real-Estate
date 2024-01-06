import User from '../Models/userModel.js';
import { errorhandler } from '../utils/errorUtil.js';
import bcrypt from 'bcryptjs'


// const cookieOptions={
//   maxAge: 7*24*60*60, // 7 days
//   httpOnly:true,
//   secure:true
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
    try{

    }catch(e){

    }
}

export const logout=async(req,res,next)=>{
    try{

    }catch(e){

    }
}