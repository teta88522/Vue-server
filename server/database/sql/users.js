// table : t_users
// 전체조회
const selectAllUser = `SELECT 
  user_no,
  user_id,
  user_name,
  user_gender,
  user_age,
  join_date FROM t_users
  order by user_no;`;
// 단건조회
const selectInfoByno = `SELECT 
user_no,
user_id,
user_pwd,
user_name,
user_gender,
user_age,
join_date FROM t_users
WHERE user_no = ?;`;
// 등록
const insertUser = `
INSERT INTO t_users (
user_id,
user_pwd,
user_name,
user_gender,
user_age,
join_date)
values(?,?,?,?,?,?)`; // 배열 기본 값을 가져야함 물음표가 하나 면 배열 안써도 됨
// 수정
const updateUser = `
UPDATE t_users
SET ?
WHERE user_no = ?`;
// 2개의 값을 가지는 배열, [객체, 기본값]
// { 'user_id' : 'hong', 'user_pwd' : '1234} => user_id = hong,user_pwd = 1234
// 삭제
const deleteUser = "";
module.exports = {
  selectAllUser,
  selectInfoByno,
  insertUser,
  updateUser,
  deleteUser,
};
