// method: GET
// pagename: Home
// route: /
const User = require("../models/login")

const getMainPage = (req, res)=>{
    res.render("main", {title: "Home"})
}
const getLoginPage = (req, res) => {
    res.render("login", {title: "Login"})
}
const loginAccount = async (req, res)=>{
    const { username, password } = req.body
    const user = await User.find(username, password)
    
    if(!user){
        return res.render("login", {title: "Login",error: "Username yoki password Xato"})
    }
    req.session.user = user
    res.redirect("/")
}
const accountSettings = async (req, res) =>{
    res.render("account", {title: "Account Settings"})
}
const logOutAccount = async (req, res)=>{
    req.session.destroy(()=>{
        res.redirect("/")
    })
    res.clearCookie('connect.sid');
}

const getSignupPage = async (req, res) => {
    res.render("signup", {title: "Akkaunt Yaratish"})
}
const newAccount = async (req, res) => {
    const error = await User.newAccount(req.body.username, req.body.password)
    if(!error){
        res.redirect("/login")
    }
    else{
        res.render("signup", {title: "signup", error})
    }
}
const updateAccount = async (req, res) => {
    const newUser = await User.updateAccount(req.body.username, req.body.password, req.params.id)
    req.session.user = newUser
    res.redirect("/login")
}
const deleteAccount = async (req, res)=>{
    await User.deleteAccount(req.params.id)
    req.session.destroy(()=>{
        res.redirect("/")
    })
    res.clearCookie('connect.sid');
}
module.exports = {
    getMainPage,
    getLoginPage,
    loginAccount,
    accountSettings,
    logOutAccount,
    getSignupPage,
    newAccount,
    updateAccount,
    deleteAccount
}