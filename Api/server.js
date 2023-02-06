const express=require("express")

const cors=require("cors")

require("dotenv").config()

const {success ,error}=require("consola")

require('./Config/Database')

const PORT=process.env.APP_PORT

const categoryrouter=require("./Routers/categoryRouters")

const productrouter=require("./Routers/productRouters")

const userrouter=require("./Routers/userRouters")

const orderrouter = require("./Routers/orderRouters")

const app=express()

app.use(express.urlencoded({extended:false}))

app.use(express.json())

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

app.use("/category",categoryrouter)

app.use("/product",productrouter)

app.use("/User",userrouter)

app.use("/order",orderrouter)

app.get("/getimage/:imagename", function(req, res){
    res.sendFile(__dirname + "/Uploads/" + req.params.imagename)
})

app.listen(PORT, async ()=>{

    try {
        success({
            message:`Server Started ${PORT}`,
            badge:true
        })
        
    } catch (error) {
        error({
            message:"Error",
            badge:true
        })
    }
})