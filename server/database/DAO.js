// DAO : Database Acess Object
// db
// const path = require("path");
// require("dotenv").config({ path: path.join(__dirname, "dbConfig.env") });
require("dotenv").config({ path: "database/dbConfig.env" }); // path 시작 경로가 가장 최상위 부터임 ex> 여기서는 server
const mysql = require("mysql2/promise");

const connectionPool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 5, // default 10개
});

module.exports = {
  pool: connectionPool,
};
