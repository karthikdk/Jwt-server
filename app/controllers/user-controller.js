const User = require("../models/user-model");
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const pick=require('lodash/pick')
const validator=require('validator')

const userController={}

userController.register=async(req,res)=>{
    try {
        const body=pick(req.body,['name','email','password'])

        if(Object.keys(body).length===0){
            return res.status(404).json({error: "data fields not found"})
        }
        if(!body.name || !body.email || !body.password ){
            return res.status(400).json({error: "invalid data values"})
        }
        if(!validator.isEmail(body.email)) {
            return res.status(400).json({error: "invalid email"})
        }
        if(!body.password.length > 8) {
            return res.status(400).json({error: "password should be alteast 8 char long"})
        }
        if(!validator.isStrongPassword(body.password)) {
            return res.status(400).json({error: "password is not strong enough"})
        }
        const user = new User(body)
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(user.password, salt)
        user.password = hashedPassword
        const userDoc = await user.save()
        res.json(userDoc)
      }
      catch (error) {
        res.json(error) 
     }
}
userController.login=async(req,res)=>{
    try {
        const body=pick(req.body,['email','password'])
        if(Object.keys(body).length === 0) {
            return res.status(404).json({error: "data fields not found"})
        }
        if(!body.email||!body.password){
            return res.status(400).json({error: "invalid data values"})
        }

        const user=await User.findOne({email:body.email})
        if(!user){
            return res.status(404).json({error: "user not found"})
        }else{
            const password=await bcrypt.compare(body.password,user.password)
            if(!password){
                res.status(400).json({error: "Incorrect password"})  
            }else{
                const tokenData={
                    _id:user._id,
                    email:user.email
                }

                const accessToken=jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:'1m'})
                const refreshToken=jwt.sign(tokenData,process.env.JWT_REFRESH_SECRET,{expiresIn:'10m'})
               

                //storing access token and refresh token in cookie
                res.cookie('accessToken', accessToken, {maxAge: 60000})

                res.cookie('refreshToken', refreshToken, 
                {maxAge: 300000, httpOnly: true, secure: true, sameSite: 'strict'})
                return res.json({Login:true})
            }
        }
    } catch (error) {
        res.json(error)
    }
}

//renew access token
userController.renewToken=(req,res)=>{
    const refreshtoken=req.cookies.refreshToken
    let exist=false
    if(!refreshtoken){
        return res.json({valid:false,message:'No Refresh Token'})
    }else{
        jwt.verify(refreshtoken,process.env.JWT_REFRESH_SECRET,(err,decoded)=>{
            if(err){
                return res.json({valid:false,message:'invalid refresh token'})
            }else{
                const accessToken=jwt.sign({email:decoded.email},process.env.JWT_SECRET,{expiresIn:'1m'})
                res.cookie('accessToken', accessToken, {maxAge: 60000})
                exist=true
            }
        })
    }
    return exist
}

//protected route
userController.dashboard=(req,res)=>{
    return res.json({valid:true,message:'authorized'})
}

module.exports=userController