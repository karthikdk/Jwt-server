require('dotenv').config()
const express=require('express')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const configureDb = require('./config/db')
const userController = require('./app/controllers/user-controller')
const verifyUser = require('./app/middleware/verify-user')


const app=express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:['http://localhost:3000'],
    credentials:true
}))


configureDb()

const port=3111

//user APIs

app.post('/api/users/register',userController.register)
app.post('/api/users/login',userController.login)
app.get('/api/users/dashboard',verifyUser,userController.dashboard)

app.listen(port, () => {
    console.log("server connected on port", port)
})