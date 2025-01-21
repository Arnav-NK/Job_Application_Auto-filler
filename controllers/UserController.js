import user from '../model/userModel.js';
import catchAsyncErr from '../middleware/catchasyncErr.js'
import  {ErrorHandler} from '../middleware/err.js';
import {v2 as cloudinary} from 'cloudinary';
import crypto from 'crypto';
import { generateToken } from '../utlis.js/jwttoken.js';

export const register =catchAsyncErr(async(req,res,next)=>{
    if(!req.files || !req.files.avatar || !req.files.resume){
        return next(new ErrorHandler("avatar and resume are Required!",400));
    }
    const{avatar,resume}=req.files;
    // Avatar Upload Karne ke ninja techinque diding diding
    const cloudinaryResponseforAvatar=await cloudinary.uploader.upload(
        avatar.tempFilePath,
        {folder:"AVATARS"}
    );
    if (!cloudinaryResponseforAvatar || cloudinaryResponseforAvatar.error) {
        return next(new ErrorHandler("Error uploading avatar to Cloudinary.", 500));
      }
 // Resume Upload Karne ke ninja techinque diding diding
 const cloudinaryResponseForResume=await cloudinary.uploader.upload(
    resume.tempFilePath,
    {folder:"RESUME"}
);
if (!cloudinaryResponseForResume || cloudinaryResponseForResume.error) {
    return next(new ErrorHandler("Error uploading resume to Cloudinary.", 500));
  }
  const {fullName,email,password}=req.body;

  const newUser=await user.create({
    fullName,
    email,
    password,
    avatar:{
        public_id: cloudinaryResponseforAvatar.public_id,
        url: cloudinaryResponseforAvatar.secure_url,  
    },
    resume: {
        public_id: cloudinaryResponseForResume.public_id,
        url: cloudinaryResponseForResume.secure_url,
      },
  });
  generateToken(newUser,"user Register")

});
export const login=catchAsyncErr(async(req,res,next)=>{
    const{email,password}=req.body;
    if(!email || !password){
        return next(new ErrorHandler(''))
    }
})