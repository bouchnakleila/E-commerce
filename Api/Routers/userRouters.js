const route=require("express").Router()

const userController=require("../Controllers/userControllers")

const upload=require("../Middleware/uploadpicture")

route.post("/createuser",upload.single("picture"),userController.registerUser)

route.post("/createlogin",userController.loginUser)

route.get("/getalluser",userController.getUsers)

route.delete("/deleteuser/:id",userController.deleteUser)
route.post('/logout',userController.logout)
module.exports=route