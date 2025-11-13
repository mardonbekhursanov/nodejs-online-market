const Courses = require('../models/courses')
// method: GET
//pagename: Courses
// route: /courses
const getCoursesPage = async (req, res) => {
    const courses = await Courses.findAll()
    res.render("courses", {title: "Courses", courses})
}

module.exports = {
    getCoursesPage
}