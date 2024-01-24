const mongoose=require('mongoose')

const configureDb = async (req, res) => {
    try{
        const db = await mongoose.connect("mongodb://127.0.0.1:27017/JwtToken")
        console.log("connected to db")
    } catch(e) {
        console.log("error connected to db")
    }
}

module.exports = configureDb