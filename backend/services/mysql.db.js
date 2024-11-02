import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "imdb"
})

db.connect((err) => {
    if (err) {
        console.error('Database error: ' + err.stack)
        return
    }
})

export default db