const User=require("../Models/User")

const {success, error}=require("consola")

const bcrypt=require("bcrypt")

const jwt=require("jsonwebtoken")

const SECRET=process.env.SECRET

registerUser=async function(req, res){
    try {
        const picture = req.file.filename
        
        const user=await User.findOne({email : req.body.email})
       
        if(user){
                return res.status(400).json({
                message:"User Exist with this email!"
            })
        }
        const password=bcrypt.hashSync(req.body.password,10)
        const newUser = new User({
            ...req.body,
            picture:picture,
            password
        })
        await newUser.save()
        res.status(201).json({
            message:"Your account created successfully!",
            status:201
        })

    } catch (err) {
        res.status(500).json({
            status:500,
            message:err.message,
        })
    }
}

getUsers=async function(req , res){
    await User.find({}).exec((err, user)=>{
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
            data:user
        })
    }
        })
    
}

deleteUser=async function(req ,res) {
    await User.deleteOne({_id:req.params.id})
    .exec((err, userdeleted)=>{
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
                message:"User deleted!",
                badge:true
            })
            res.status(200).json({
                message:"User deleted!",
                status:200,
                data:userdeleted
            })
        }
    })
}
    

loginUser=async function(req, res){
    try {
         const {email,password}=req.body
         const user=await User.findOne({email})
         //console.log(user);
         if(!user)
         {
            return res.status(404).json({
                status:404,
                message:"User not found with this email "
            })
         }
         const test=bcrypt.compareSync(password,user.password)
         if(!test)
         {
            return res.status(404).json({
                status:404,
                message:"Password incorrect!"
            })
         }
         const token=jwt.sign({
            id:user._id,
            user:user
         },SECRET,
         {expiresIn:'1h'})

         const { role, ...otherDetails } = user._doc;
            res.cookie("access_token", token, { maxAge: 3600 * 1000, httpOnly: true, sameSite: true });
                delete user.id
                delete user.password

                res.status(200).json({
                    success: true,
                    role: user.role,
                    user: user,
                    token:token,
                    message: 'succesffully logged in',
         })
    } catch (err) {
        res.status(500).json({
            message:err.message,
            status:500
        })
    }
},
logout=function (req, res) {
    res.clearCookie("access_token");
    res.status(200).json({
        isconnected: false,
        role: 'visitor'
    })
}

module.exports={
    registerUser,
    getUsers,
    deleteUser,
    loginUser,
    logout
}