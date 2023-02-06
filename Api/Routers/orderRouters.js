const route = require("express").Router()

const ordercontroller = require("../Controllers/orderControllers")

route.post("/createorder",ordercontroller.createOrder)

route.get("/getAll",ordercontroller.getAllOrder)

route.put("/updateorder/:id",ordercontroller.updateOrder)

route.delete("/delete/:id",ordercontroller.deleteOrder)

module.exports = route