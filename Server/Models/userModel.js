import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minLength:[5,'Name must have atleast 5 letters'],
        maxLength:[30,"Name should be less than 30 letters"],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email is already registered"],
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minLength:[8,"Password must have atleast 8 letters"],
        maxLength:[30,"Password should have less than 30 characters"],
        select:false
    }
},{
    timestamps: true //this will add createdAt and updatedAt as a timestamp in the database
})
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password= await bcrypt.hash(this.password)
})
userSchema.method={
    generateJWTToken:async function(next){
        return await this.generateJWTToken.sign(
            {id:this_id,email:this.email},
            process.env.SECRET,
            {
                expiresIn:JWT_EXPIRY
            }
        )
    },
    comparePassword:async function(plainPassword){
        return await bcrypt.compare(plainPassword,this.password)

    }
}
const User=mongoose.model('User',userSchema)
export default User