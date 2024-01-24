const express=require('express')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const configureDb = require('./config/db')
const userController = require('./app/controllers/user-controller')


const app=express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

configureDb()

const port=3111

//user APIs

app.post('/api/users/register',userController.register)

app.listen(port, () => {
    console.log("server connected on port", port)
})