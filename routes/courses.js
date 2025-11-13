const { Router } = require("express")
const routes = Router()
const { getCoursesPage } = require("../controllers/courses")

routes.get('/courses', getCoursesPage)

exports.routes = routes