// 사이트에서 제공하는 기능 => 비즈니스 로직 처리 및 데이터 가공
const userMapp = require("../database/mappers/user_mapper"); // DB 통신을 담당할 Mapper 불러오기

// 전체 회원조회
const findAll = async () => {
  let list = await userMapp.selectAllUser(); // Mapper에게 쿼리 실행 요청
  return list; // 받아온 결과를 라우터로 그대로 반환
};

// 회원 상세조회
const findInfoByNo = async (no) => {
  let user = await userMapp.selectUserByNo(no);
  return user;
};

// 회원 등록
const createInfo = async (userObj) => {
  // 1. 클라이언트가 보낸 객체(JSON)를 쿼리에 넣기 좋게 배열로 변환
  const { user_id, user_pwd, user_name, user_gender, user_age, join_date } =
    userObj;

  let insertData = [
    user_id,
    user_pwd,
    user_name,
    user_gender,
    user_age,
    join_date,
  ];

  // 2. Mapper를 실행하여 DB에 데이터 삽입
  let result = await userMapp.insertUser(insertData);
  console.log(result);

  // 3. 결과를 예쁘게 포장해서 라우터로 전달
  let resObj = {
    // insertId가 0보다 크면 삽입 성공
    status: result.insertId > 0 ? "success" : "failed",
    user_no: result.insertId, // 새로 발급된 회원번호 반환
  };

  return resObj;
};

// 회원 정보 수정
const modifyInfo = async (no, userInfo) => {
  let result = await userMapp.updateUser(no, userInfo);

  let resObj = {
    // changedRows가 0보다 크면 실제로 수정된 행이 있다는 뜻이므로 성공
    status: result.changedRows > 0 ? "Success" : "Failed",
    target: {
      user_no: no,
      ...userInfo, // 수정된 정보들을 풀어서 객체에 포함 (스프레드 연산자)
    },
  };
  return resObj;
};

// 회원 삭제
const removeInfo = () => {};

module.exports = { findAll, findInfoByNo, createInfo, modifyInfo };
