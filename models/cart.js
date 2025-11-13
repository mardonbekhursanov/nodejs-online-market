const pool = require("../config/db")
module.exports = class Cart {
    constructor(user_id, course_id){
        this.user_id= user_id,
        this.course_id = course_id
    }
    static async getCourse(user_id) {
    // Avval foydalanuvchining cartdagi kurslarini olamiz
    const userCart = await pool.query(
        "SELECT course_id FROM cart WHERE user_id=$1",
        [user_id]
    )

    // Har bir course_id uchun kurs ma'lumotini olish
    const courses = []

    for (let item of userCart.rows) {
        const course = await pool.query(
            "SELECT * FROM courses WHERE id=$1",
            [item.course_id]
        )
        if (course.rows.length) {
            courses.push(course.rows[0])
        }
    }

    return courses
}

    static async addCourse(user_id, course_id){
        // Avval shu kurs mavjudligini tekshiramiz
        const existing = await pool.query(
            "SELECT * FROM cart WHERE user_id=$1 AND course_id=$2",
            [user_id, course_id]
        )

        if (existing.rows.length === 0) {
            await pool.query(
                "INSERT INTO cart (user_id, course_id) VALUES ($1, $2)",
                [user_id, course_id]
            )
        }
    }
}
