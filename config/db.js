const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "mardon03",
    port: 5432,
    host: "localhost",
    database: "market",
})

module.exports = pool;