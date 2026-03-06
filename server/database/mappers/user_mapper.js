// database/mappers/user_mapper.js
// 실제 SQL문을 수행
const { pool } = require("../DAO");
const userSql = require("../sql/users.js");

// 전체조회
const selectAllUser = async () => {
  let conn = null;
  try {
    // connectionPool에서 대기중인 connection 반환
    conn = await pool.getConnection();
    // 해당 connection을 통해 SQL문 실행 및 결과 반환
    let [result] = await conn.query(userSql.selectAllUser);
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    // 사용이 끝난 connectionpool에 돌려줌
    if (conn) conn.release();
  }
};
// 선택조회
const selectUserByNo = async (no) => {
  let conn = null;
  try {
    conn = await pool.getConnection();
    let [result] = await conn.query(userSql.selectInfoByno, no);
    let info = result[0];
    console.log(result);
    return info;
  } catch (err) {
    console.log(err);
  } finally {
    // 사용이 끝난 connectionpool에 돌려줌
    if (conn) conn.release();
  }
};
// 등록
const insertUser = async (userInfo) => {
  //userInfo : [user_id,pwd,name.....] 순서대로 넣어야 함
  let conn = null;
  try {
    conn = await pool.getConnection();
    let [result] = await conn.query(userSql.insertUser, userInfo);
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    // 사용이 끝난 connectionpool에 돌려줌
    if (conn) conn.release();
  }
};
// 수정
const updateUser = async (userNo, updateData) => {
  let conn = null;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction(); // auto commit 해제
    let [result] = await conn.query(userSql.updateUser, [updateData, userNo]);
    // 추가 DML 실행 => 같은 트랜잭션으로 묶임
    conn.commit();
    return result;
  } catch (err) {
    console.log(err);
    conn.rollback();
  } finally {
    // 사용이 끝난 connectionpool에 돌려줌
    if (conn) conn.release();
  }
};
// 삭제
const deleteUser = () => {};

module.exports = {
  selectAllUser,
  selectUserByNo,
  insertUser,
  updateUser,
};
