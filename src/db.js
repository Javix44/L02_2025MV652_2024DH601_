import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
    user: process.env.BD_USER,
    host: process.env.BD_HOST,
    password: process.env.BD_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});