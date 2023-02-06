const Category=require("../Models/Category")

const {success, error}=require("consola")

module.exports={
    createCategory:async function(req, res){
        const {name , description}=req.body
        const picture = req.file.filename
        if(!picture || !name )
        {
            return res.status(422).json({
                success:false,
                message:"please enter all Fields",
                status:422
            })
        }
        let data={
            picture:picture,
            name:name,
            //description:description
        }
        await Category.create(data,(err, category)=>{
            if(err){
                error({
                    message:err.message,
                    badge:true
                })
                res.status(406).json({
                    message:err.message,
                    data:null,
                    status:406
                })
            }else{
                success({
                    message:"Category created !",
                    badge:true
                })
                res.status(201).json({
                    message:"Category created !",
                    status:201,
                    data:category
                })
            }
        })
    },
    getCategories:async function(req, res){
        await Category.find({}).exec((err,listCategories)=>{
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
                    message:"Category found!",
                    badge:true
                })
                res.status(200).json({
                    message:"Category found !",
                    status:200,
                    data:listCategories
                })
            }
        })
    },
    getCategoryById:async function(req, res){
        await Category.findById({_id:req.params.id})
        .exec((err, category)=>{
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
                    message:"category found!",
                    badge:true,
                })
                res.status(200).json({
                    message:"category found !",
                    status:200,
                    data:category
                })

            }
        })
    },
    getCategoryByName:async function(req, res){
        await Category.find({name:req.query.name}).populate("name")
        .exec((err, categorybyname)=>{
            if(err)
            {
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
                    message:"category by name founded!",
                    badge:true
                })
                res.status(200).json({
                    message:"category by name founded!",
                    status:200,
                    data:categorybyname
                })
            }
        })
    },
    updateCategory:async function(req, res){
        await Category.updateOne({_id:req.params.id},req.body)
        .exec((err,categoryupdated)=>{
            if(err)
            {
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
                    message:"category found!",
                    badge:200
                })
                res.status(200).json({
                    message:"category found!",
                    status:200,
                    data:categoryupdated
                })
            }    
        })
    },
    deleteCategory:async function(req, res){
        await Category.deleteOne({_id:req.params.id})
        .exec((err, categorydeleted)=>{
            if(err){
                error({
                    message:err.message,
                    badge:true
                })
                res.status.json({
                    message:err.message,
                    status:500,
                    data:null
                })
            }else{
                success({
                    message:"category deleted!",
                    badge:true
                })
                res.status(200).json({
                    message:"category deleted!",
                    status:200,
                    data:categorydeleted
                })
            }
        })
    }
}