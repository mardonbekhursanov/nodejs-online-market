require('dotenv').config();
const express = require("express")
const path = require("path")
const exhbs = require("express-handlebars")
const app = express()

const session = require('express-session');

app.use(session({
  secret: 'seniqilmayshifrem',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 kun
}));


function ensureLoginAccount(req, res, next){
    if(req.session.user){
        return next()
    }
    res.redirect("/")
}
app.get("/account", ensureLoginAccount, (req, res, next)=>{
    res.render("account", {user: req.session.user, error: "Akauntga kirilmagan!"})
})

app.engine("hbs", exhbs.engine({extname: ".hbs"}))
app.set("view engine", "hbs")
app.set("views", "views")


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "public")))

app.use((req, res, next)=>{
    res.locals.user = req.session.user || null
    next()
})

const mainRouter = require("./routes/main").routes
const cartRouter = require("./routes/cart").routes
const couseRouter = require("./routes/courses").routes

app.use(mainRouter)
app.use(cartRouter)
app.use(couseRouter)

const PORT = process.env.PORT || 3500

app.listen(PORT, ()=>{
    console.log("Servet is running on PORT: http://localhost:3500");
})