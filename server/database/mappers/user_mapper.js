// 실제 SQL문을 DB로 전송하고 결과를 받아오는 파일
const { pool } = require("../DAO");
const userSql = require("../sql/users.js"); // 쿼리문 가져오기

// 전체조회
const selectAllUser = async () => {
  let conn = null;
  try {
    // 1. connectionPool에서 대기 중인 연결선(connection) 하나를 빌려옴
    conn = await pool.getConnection();
    // 2. 해당 연결선을 통해 SQL문 실행 (결과 배열에서 첫 번째 요소[result]만 뽑아냄)
    let [result] = await conn.query(userSql.selectAllUser);
    return result; // 조회된 데이터(배열) 반환
  } catch (err) {
    console.log(err);
  } finally {
    // 3. 사용이 끝난 연결선은 다른 요청이 쓸 수 있게 Pool에 반드시 돌려줌
    if (conn) conn.release();
  }
};

// 선택조회
const selectUserByNo = async (no) => {
  let conn = null;
  try {
    conn = await pool.getConnection();
    // no 값이 selectInfoByno 쿼리의 '?' 자리에 들어감
    let [result] = await conn.query(userSql.selectInfoByno, no);
    let info = result[0]; // 회원 1명 조회이므로 결과 배열의 0번째 인덱스만 추출
    return info; // 객체 반환
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.release();
  }
};

// 등록
const insertUser = async (userInfo) => {
  let conn = null;
  try {
    conn = await pool.getConnection();
    // userInfo 배열의 값들이 insertUser 쿼리의 '?' 자리에 순서대로 들어감
    let [result] = await conn.query(userSql.insertUser, userInfo);
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.release();
  }
};

// 수정 (트랜잭션 적용)
const updateUser = async (userNo, updateData) => {
  let conn = null;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction(); // 트랜잭션 시작 (자동 커밋 해제, 안전장치)

    // updateData(객체)와 userNo(숫자)가 각각 첫 번째 '?', 두 번째 '?' 에 들어감
    let [result] = await conn.query(userSql.updateUser, [updateData, userNo]);

    conn.commit(); // 문제없이 실행되면 DB에 영구 반영(commit)
    return result;
  } catch (err) {
    console.log(err);
    conn.rollback(); // 중간에 에러가 나면 수정 전 상태로 되돌림(rollback)
  } finally {
    if (conn) conn.release();
  }
};

module.exports = { selectAllUser, selectUserByNo, insertUser, updateUser };
