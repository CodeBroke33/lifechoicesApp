import { createPool } from "mysql";
import { config } from "dotenv"; 
config();
let connection = createPool({
    host: process.env.HOST,
    database: process.env.DBName,
    user: process.env.UserName,
    password: process.env.UserPass,
    multipleStatements: true,
    connectionLimit:30
})
