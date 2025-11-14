const Pool = require("pg").Pool
const connectionString = process.env.DATABASE_URL || "postgres://postgres:mardon03@localhost:5432/market";

if (!connectionString) throw new Error("DATABASE_URL not set");
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