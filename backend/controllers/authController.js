import User from '../model/User.js'
import bcrypt from 'bcryptjs'
import { generateVerificationToken } from '../utils/generateVerificationToken.js'
import  {validator} from '../utils/validator.js'
import { generateJWTToken } from '../utils/generateJWTToken.js'
import { sendVerificationEmail } from '../services/resend.service/resend.sendVerification.email.js'
import { sendPasswordResetEmail } from '../services/resend.service/sendPasswordResetEmail.js'
import crypto from 'crypto'
export const signUP =async(req,res)=>{


    
  try {
    const { name, email, password } = req.body;

    // Validate fields
    if (!validator(name, email, password)) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (password.length<8) {
        return res.status(400).json({
            message:"password must be at least 8 characters long",
            success:false
        })
        
    }
    const useralreadyExists=await User.findOne({email})
    if (useralreadyExists) {
        return res.status(400).send({
            message:"user already exist"

        })
        
    }

    const hashedPassword=await bcrypt.hash(password,10)
    const verificationToken=generateVerificationToken()
    const user=new User({
        name,
        email,
        password:hashedPassword,
        verificationToken,
        verificationTokenExpiresAt:Date.now()+24*60*60*1000
    })
    await user.save()
    console.log(user)

   await sendVerificationEmail(user.email,verificationToken)


   return res.status(201).send({
    success:true,
    message:"user created successfully",
    user:{
        ...user._doc,
        password:undefined,

    }
   })
        

    } catch (error) {
        return res.status(400).json({
            message:error?.message||"something went wrong",
            success:false
        })
        
    }



    


}

export const logIn =async(req,res)=>{

    const {email,password}=req.body;
    try {
        if (!validator(email,password)) {
            return res.status(400).json({
                message:"fields are required",
                success:false
            })
            
        }

        const user=await User.findOne({
            email
        })
        if(!user) return res.status(400).json({message:"Invalid credentials",success:false})
         const isMatch=await bcrypt.compare(password,user.password)  
        if (!isMatch) return res.status(400).json({message:"password is not match",success:false})
            const isVerified=user.isVerified
        if(!isVerified) return res.status(400).json({success:false,message:"please verify your email to login"})
         const token=   generateJWTToken(res,user._id)
        return res.status(200).json({
            message:"Login successfully",
            success:true,
            token
        })
    } catch (error) {
        console.log(error)
        return res.stuas(400).json({
            message:error?.message||"something went wrong",
            success:false
        })
        
    }
}


export const logOut =async(req,res)=>{
    res.clearCookie('token')
    return res.status(200).json({
        message:"logout successfully",
        success:true
        })

}



export const verifyEmail=async(req,res)=>{
    const {code}=req.body;

    try {
        if (!validator(code)) {
            return res.status(400).json({
                success:false,
                message:"Token is required"
            })
            
        }
        const user=await User.findOne({
            verificationToken:code,
            verificationTokenExpiresAt:{$gt:Date.now()}

        })
        console.log(user)

        if (!user) {
            return res.status(400).json({
                success:false,
                message:"Invalid or expired token"
            })
            
        }
        user.isVerified=true;
        user.verificationToken=undefined;
        await user.save()

        return res.status(200).json({
            success:true,
            message:"Email verified successfully"
        })

    } catch (error) {
        return res.status(400).json({
            message:error?.message||"something went wrong",
            success:false
        })
        
    }

}

export const forgotPassword=async(req,res)=>{
    const{email}=req.body;
   try {
      if (!validator(email)) {
            return res.status(400).json({
                success:false,
                message:"Token is required"
            })
        }

        const user=await User.findOne({email})
        if (!user) {
            return res.status(400).json({
                success:false,
                message:"user not found"
            })
            
        }
        const resetPasswordToken=crypto.randomBytes(32).toString('hex')
        const resetPasswordExpiresAt=Date.now()+24*60*60*1000

         user.resetPasswordToken=resetPasswordToken
        user.resetPasswordExpiresAt=resetPasswordExpiresAt

         await user.save()

         await sendPasswordResetEmail(user.email,`${process.env.FRONTEND_URL}/reset-password/${resetPasswordToken}`)
         return res.status(200).json({
            success:true,
            message:"password reset email sent successfully"
         })
        


   } catch (error) {
    return res.status(400).json({
        message:error?.message||"something went wrong",
        success:false
    })
    
   }

    
}


export const resetPassword=async(req,res)=>{
    try {
        const token=req.params.token;
        console.log(token)
        const {password}=req.body
        const user=await User.findOne({
            resetPasswordToken:token,
            resetPasswordExpiresAt:{$gt:Date.now()}
        })

        if (!user) {
            return res.status(400).json({
                message:"Invalid or expired token",
                success:false
            })
            
        }
        if (password.length<8) {
            return res.status(400).json({  
                message:"password must be at least 8 characters long",
                success:false
            }) 

        }
        const hashedPassword=await bcrypt.hash(password,10)
        user.password=hashedPassword
        user.resetPasswordToken=undefined
        user.resetPasswordExpiresAt=undefined
        await user.save()
        return res.status(200).json({
            message:"password reset successfully",
            success:true
        })

    } catch (error) {
         return res.status(400).json({
            message:error?.message||"something went wrong",
            success:false
        })
        
    }
}



export const checkAuth=async(req,res)=>{
   
    
    const userId=req.userId
    console.log(userId)
    try{
        const user=await User.findById(userId).select('-password -__v -verificationToken -verificationTokenExpiresAt -resetPasswordToken -resetPasswordExpiresAt')
        console.log(user)
        return res.status(200).json({
            message:"success fetched user",
            success:true,
            user
        })
    } catch (error) {
        return res.status(400).json({
            message:error?.message||"something went wrong",
            success:false
        })
    }
}


