const mongoose=require("mongoose")

const schemacategory=new mongoose.Schema({
    name:{
        type:String,
        minlenght:3,
        trim:true
    },
    //description:{
    //    type:String,
    //},
    picture:{
        type:String,
    }
})

module.exports = mongoose.model("Category",schemacategory)