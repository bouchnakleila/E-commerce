const mongoose=require("mongoose")

require("dotenv").config()

const {success,error}=require("consola")

const DB=process.env.APP_DB

const connectDB=async ()=>{
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(DB)
        success({
            message:`Successfuly connected with DB \n ${DB}`,
            badge:true
        })
    } catch (err) {
        error({
            message:`Unable to connect with DB \n ${err}`,
            badge:true
        })
        connectDB()
    }
}

module.exports=connectDB()