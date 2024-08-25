import mysql from 'mysql2'
// Configura los parámetros de conexión
const pool = mysql.createPool({
  host: 'database-1.cf0ei60qeumd.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'password',
  database: 'mydb',
  port: 3306 // El puerto por defecto para MySQL
});

const db = pool.promise()

export {db}
