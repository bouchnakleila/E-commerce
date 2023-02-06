const Order = require("../Models/Order")

const {error , success}=require("consola")

module.exports={
    createOrder:async function(req, res){

        let data={
            user:req.body.user,
            products:req.body.products,
            totalPrice:req.body.totalPrice
        }
        try { 
            await Order.create(data,(err, order)=>{
            if(err){
                error({
                    message:err.message,
                    badge:true
                });
                res.status(406).json({
                    message:err.message,
                    status:406,
                    data:null
                })
            }else{
               success({
                message:"Order created!",
                badge:true
               }) 
               res.status(201).json({
                message:"Order created!",
                status:201,
                data:order
               })
            }
        })
        } catch (err) {
            res.status(500).json({
                message:err.message,
                status:500,
                data:null
            })
        }
        

    },
    getAllOrder:async function(req, res){
        await Order.find({}).exec((err, order)=>{
            if(err){
                    error({
                        message:err.message,
                        badge:true
                    })
                    res.status(500).json({
                        message:err.message,
                        status:500,
                        data:null
                    })
            }else{
                success({
                    message:"the order founded !",
                    badge:true
                })
                res.status(200).json({
                    message:"the order founded !",
                    status:200,
                    data:order
                })
            }
        })
    },
    updateOrder:async function(req, res){
        await Order.updateOne({_id:req.params.id},req.body)
        .exec((err, order)=>{
            if(err){
                    error({
                        message:err.message,
                        badge:true
                    })
                    res.status(500).json({
                        message:err.message,
                        status:500,
                        data:null
                    })
            }else{
                    success({
                        message:"order updated!",
                        badge:true
                    })
                    res.status(200).json({
                        message:"order updated!",
                        status:200,
                        data:order
                    })
            }
        })
    },
    deleteOrder:async function(req, res){
        await Order.deleteOne({_id:req.params.id})
        .exec((err, order)=>{
            if(err){
                error({
                    message:err.message,
                    badge:true
                })
                res.status(500).json({
                    message:err.message,
                    status:500,
                    data:null
                })
            }else{
                success({
                    message:"order deleted!",
                    badge:true
                })
                res.status(200).json({
                    message:"order deleted",
                    data:order,
                    status:200
                })
            }
        })
    }
}