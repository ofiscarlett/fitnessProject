"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
require('dotenv').config();
const pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'FitnessWebSite',
    //change to get password from .env file
    password: process.env.DATABASE_PASSWORD,
    port: 5432,
});
exports.default = pool;
