const route=require("express").Router()

const upload=require("../Middleware/uploadpicture")

const productcontroller=require("../Controllers/productControllers")

route.post("/createproduct",upload.array("pictures",3),productcontroller.createProduct)

route.get("/getAllProduct",productcontroller.getAllProduct)

route.get("/getbyId/:id",productcontroller.getProductById)

route.get("/getbycategory",productcontroller.getProdByCategory)

route.put("/updateProduct/:id",productcontroller.updateProduct)

route.delete("/deleteprod/:id",productcontroller.deleteProduct)

module.exports=route