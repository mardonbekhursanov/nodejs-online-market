const pool = require("../config/db")


module.exports = class User{
    constructor(username, password){
        this.username = username,
        this.password = password
    }

    static async find(username, password){
        const user = await pool.query("SELECT * FROM users WHERE username=$1 AND password=$2", [username, password])
        return user.rows[0]
    }
    static async newAccount(username, password){
        const user = await pool.query("SELECT * FROM users WHERE username=$1", [username])
        if(user.rows.length == 0){
            const user2 = await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, password])
            console.log(user2);
            
        }
        else{
            return "Bu foydalanuvchi oldin mavjud edi"
        }
    }
    static async updateAccount(username, password, user_id){
        const newUser = await pool.query("UPDATE users SET username=$1, password=$2 WHERE id=$3", [username, password, user_id])
        return newUser.rows[0]
    }
    static async deleteAccount(user_id){
        await pool.query("DELETE FROM users  WHERE id=$1", [user_id])
    }
}