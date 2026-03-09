// DB에 날릴 SQL 문장들만 모아둔 파일. (관리를 편하게 하기 위함)
// table : t_users

// 전체조회
const selectAllUser = `SELECT user_no, user_id, user_name, user_gender, user_age, join_date FROM t_users order by user_no;`;

// 단건조회 ( ? 는 나중에 실제 값으로 치환될 자리표시자)
const selectInfoByno = `SELECT user_no, user_id, user_pwd, user_name, user_gender, user_age, join_date FROM t_users WHERE user_no = ?;`;

// 등록 (6개의 데이터가 순서대로 ? 자리에 들어감)
const insertUser = `INSERT INTO t_users (user_id, user_pwd, user_name, user_gender, user_age, join_date) values(?,?,?,?,?,?)`;

// 수정 (? 자리에 객체와 조건 값이 들어감)
const updateUser = `UPDATE t_users SET ? WHERE user_no = ?`;

// 삭제
const deleteUser = "";

module.exports = {
  selectAllUser,
  selectInfoByno,
  insertUser,
  updateUser,
  deleteUser,
};
