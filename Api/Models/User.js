const mongoose=require("mongoose")
const schemaUser=new mongoose.Schema({
        fullname:{
                type:String,
        },
        email:{
            type:String,
            unique:true
        },
        phone:{
            type:Number,

        },
        password:{
            type:String,

        },
        adress:{
            type:String,
        },
        picture:{
            type:String
        },
        role:{
            type:String,
            enum:['admin','client'],
            default:'client'
        }
})

module.exports = mongoose.model("User",schemaUser)