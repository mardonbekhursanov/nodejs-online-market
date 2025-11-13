const Cart = require("../models/cart")
const addCourse = async (req, res) => {
    await Cart.addCourse(req.session.user.id, req.params.id)
    res.redirect("/cart")
}
const getCartPage = async (req, res) => {
    if(req.session.user){
        const courses = await Cart.getCourse(req.session.user.id)
        res.render("cart", {title: "Cart", courses})
    }
    else{
        res.render("cart", {title: "Cart"})
    }
}
module.exports = {
    addCourse,
    getCartPage

}