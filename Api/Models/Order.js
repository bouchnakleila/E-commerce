const mongoose=require("mongoose")

const schemaOrder=new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    products:[
        {
            shop:{
                type:mongoose.Types.ObjectId,
                ref:"Product"
            },
            quant:Number
        }
    ],
    totalPrice:{
        type:Number
    }
})

module.exports = mongoose.model("Order",schemaOrder)