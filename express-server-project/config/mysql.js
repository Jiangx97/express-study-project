/**
 * mysql.js
 * mysql 配置项
 */
const mysql = require('mysql')

const pool = mysql.createPool(
  {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'admin',
    database: 'express_study_db',
    timezone:'Asia/Shanghai'
  }
)
module.exports = {
  pool
}