// DAO : Database Access Object (DB 접속 객체 설정)
require("dotenv").config({ path: "database/dbConfig.env" });
const mysql = require("mysql2/promise"); // async/await를 사용하기 위해 promise 버전 사용

// Connection Pool 생성: DB 연결선을 미리 여러 개 만들어두고 돌려쓰는 방식 (성능 향상)
const connectionPool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 5, // 최대 5개의 연결선을 만들어둠
});

module.exports = {
  pool: connectionPool, // 다른 파일에서 pool을 꺼내 쓸 수 있도록 내보냄
};
