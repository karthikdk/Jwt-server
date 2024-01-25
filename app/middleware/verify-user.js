const jwt=require('jsonwebtoken')
const { renewToken } = require('../controllers/user-controller')
const verifyUser=(req,res,next)=>{
    const accesstoken=req.cookies.accessToken;
    if(!accesstoken){
        if(renewToken(req,res)){
            next()
        }
    }else{
        jwt.verify(accesstoken,process.env.JWT_SECRET,(err,decoded)=>{
            if(err){
                return res.json({valid:false,message:'Invalid Token'})
            }else{
                req.email=decoded.email
                next()
            }
        })
    }
}
module.exports=verifyUser