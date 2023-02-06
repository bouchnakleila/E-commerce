const mongoose=require("mongoose")

const Category=require("../Models/Category")

const schemaproduct=new mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    price:{
        type:Number
    },
    description:{
        type:String
    },
    pictures:[
        {
            name:{
                type:String
            }
        }
    ],
    category:{
        type:mongoose.Types.ObjectId,
        ref:"Category"
    }
})

module.exports = mongoose.model("Product",schemaproduct)