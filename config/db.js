const Pool = require("pg").Pool
const connectionString = process.env.DATABASE_URL || `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const pool = new Pool({
    user: "postgres",
    password: "mardon03",
    port: 5432,
    host: "localhost",
    database: "market",
    connectionString,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
})

module.exports = pool;