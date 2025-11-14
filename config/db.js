const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || "postgres://postgres:mardon03@localhost:5432/market";

if (!connectionString) throw new Error("DATABASE_URL not set");

const pool = new Pool({
    connectionString,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

module.exports = pool;