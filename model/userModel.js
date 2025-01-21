import mongoose from "mongoose";
import { JsonWebTokenError } from "jsonwebtoken";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { type } from "os";
import { stringify } from "querystring";
const userSchema= mongoose.Schema({
    fullName:{
        type:String,
        required:[true,'name is Required']
    },
    email:{
 type:String,
        required:[true,'email is Required']
    },
    password:{
        type:String,
required:[true,'pass is required'],
minLength:[8,"  max is 16"],
select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true

        },
        url:{
            type:String,
            required:true

        }
    },
    resume:{
        public_id:{
            type:String,
            required:true

        },
        url:{
            type:String,
            required:true

        }
    }

});
// Hash Pass before Save
userSchema.pre('save',async function  (next) {
    if(!this.isModified('password')){
        return next();
    }
    this.password=await bcrypt.hash(this.password,10);
    next();
    
});
// compare password by hashing
userSchema.methods.comparePassword=async function  (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
};
// JWT Token generation
userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_SECRET_KEY_EXPIRES,
    });
  };
  userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hash the token and set it to resetPasswordToken field
    this.resetPasswordToken = crypto
      .createHash("sha256") // Fix the typo: 'shad256' → 'sha256'
      .update(resetToken)
      .digest("hex");
  
    // Set expiration time for the reset token
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
  
    return resetToken;
  };
  
  export const user = mongoose.model("User", userSchema);