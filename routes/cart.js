const { Router } = require("express")
const routes = Router()
const {addCourse, getCartPage} = require("../controllers/cart")
routes.post("/buy/:id", addCourse)
routes.get("/cart", getCartPage)
exports.routes = routes