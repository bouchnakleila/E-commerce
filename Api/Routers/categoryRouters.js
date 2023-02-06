const route=require("express").Router()

const upload=require("../Middleware/uploadpicture")

const categorycontroller=require("../Controllers/categoryControllers")

route.post("/addCategory",upload.single("picture"),categorycontroller.createCategory)

route.get("/getAll",categorycontroller.getCategories)

route.get("/getbyId/:id",categorycontroller.getCategoryById)

route.get("/getByName",categorycontroller.getCategoryByName)

route.put("/putcategory/:id",categorycontroller.updateCategory)

route.delete("/deletecategory/:id",categorycontroller.deleteCategory)

module.exports=route