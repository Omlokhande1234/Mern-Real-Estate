import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
import  jwt  from 'jsonwebtoken';


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select:false
    },
    avatar:{
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
  },
    { timestamps: true }
);

// userSchema.method={
//     generateToken:async function (){
//       return await jwt.sign(
//         {id:this_id,email:this_email},
//         process.env.SECRET,
//         {
//           expiresIn:process.env.JWT_EXPIRY
//         }
//       )
       
//     },
//     comparePassword:async function(plainTextPassword){
//       return await bcrypt.compare(plainTextPassword,this.password)
//     }
// }


const User = mongoose.model('User', userSchema);

export default User;