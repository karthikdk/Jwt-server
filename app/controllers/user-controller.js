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
module.exports=userController