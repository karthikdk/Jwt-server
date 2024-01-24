const express=require('express')
const cors=require('cors')
const configureDb = require('./config/db')


const app=express()

app.use(express.json())
app.use(cors())

configureDb()

const port=3111

app.listen(port, () => {
    console.log("server connected on port", port)
})