const pool = require("../config/db")

module.exports = class Courses{
    constructor(){

    }
    static async findAll(){
        const courses = await pool.query("SELECT * FROM courses")
        return courses.rows
    }
}