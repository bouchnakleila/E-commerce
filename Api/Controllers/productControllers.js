const Product=require("../Models/Product")

const {success, error}=require("consola")

module.exports={
    createProduct:async function(req, res){
        const pictures=[]
        for(let i=0 ; i<req.files.length ; i++)
        {
            pictures.push({
                name:req.files[i].filename
            })
        }
        let data={
            name:req.body.name,
            price:req.body.price,
            description:req.body.description,
            pictures:pictures,
            category:req.body.category
        }
        try {
            await Product.create(data, (err, product)=>{
                if(err){
                    res.status(406).json({
                        message:err.message,
                        status:406,
                        data:null
                    })
                    }else{
                        success({
                            message:"Product added",
                            badge:true
                            });
                            res.status(201).json({
                                message:"Product added",
                                status:201,
                                data:product
                            })
                        }
            })
            } catch (err) {
                res.status(500).json({
                    message:err.message || "There is an error !",
                    status:500,
                    data:null
            })
        }
    },
    getAllProduct:async function(req, res){
        await Product.find({}).exec((err, product)=>{
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
                    message:"product founded!",
                    badge:true
                })
                res.status(200).json({
                    message:"product founded!",
                    status:200,
                    data:product
                })
            }
        })
    },
    getProductById:async function(req, res){
            await Product.findById({_id:req.params.id})
            .exec((err, product)=>{
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
                        message:"product founded!",
                        badge:true
                    })
                    res.status(200).json({
                        message:"product founded!",
                        status:200,
                        data:product
                    })
                }
            })
    },
    getProdByCategory:async function(res, req){
        await Product.find({category:req.query.category}).populate("category")
        .exec((err, products)=>{
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
                    message:"Products founded!",
                    badge:200
                })
                res.status(200).json({
                    message:"Products founded!",
                    status:200,
                    data:products
                })
            }
        })
    },
    updateProduct:async function(req, res){
        await Product.updateOne({_id:req.params.id},req.body)
              .exec((err, product)=>{
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
                    message:"product updated!",
                    badge:true
                })
                res.status(200).json({
                    message:"product updated!",
                    status:200,
                    data:product
                })
            }

        })
    },
    deleteProduct:async function(req, res){
        await Product.deleteOne({_id:req.params.id})
        .exec((err, productdeleted)=>{
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
                    message:"product deleted!",
                    badge:true
                })
                res.status(200).json({
                    message:"product deleted!",
                    status:200,
                    data:productdeleted
                })
            }
        })
    }
}