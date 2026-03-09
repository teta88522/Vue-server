// 라우팅 = 사용자의 요청(URI + METHOD)을 확인하고 알맞은 Service를 호출한 뒤 응답하는 역할

const express = require("express");
const router = express.Router();
// 실제 비즈니스 로직을 처리해줄 실무자(Service) 객체 불러오기
const services = require("../services/user_service.js");

// 1. 전체조회 | URI (/users) + METHOD(GET)
router.get("/users", async (req, res) => {
  let result = await services.findAll(); // 서비스에게 전체 목록 좀 가져오라고 지시
  res.send(result); // 클라이언트(Vue의 UserList.vue)에게 결과(JSON 배열) 전송
});

// 2. 단건조회 | URI (/users/:no) + METHOD(GET)
router.get(`/users/:no`, async (req, res) => {
  const target = req.params.no; // 주소창에 적힌 번호(예: /users/5 의 5)를 뽑아냄
  let result = await services.findInfoByNo(target);
  res.send(result); // 클라이언트(Vue의 UserInfo.vue)에게 결과(JSON 객체) 전송
});

// 3. 등록 | URI (/users) + METHOD(POST)
router.post(`/users`, async (req, res) => {
  let target = req.body; // 클라이언트가 보낸 새 회원 정보 (JSON 데이터)
  let result = await services.createInfo(target);
  res.send(result);
});

// 4. 수정 | URI (/users/:no) + METHOD(PUT)
router.put("/users/:no", async (req, res) => {
  let id = req.params.no; // 수정할 회원 번호
  let target = req.body; // 수정할 내용
  let result = await services.modifyInfo(id, target);
  res.send(result);
});

// 5. 삭제 | URI (/users/:no) + METHOD(DELETE)
// (아직 구현되지 않음 - 여기에 router.delete 작성 필요)

module.exports = router;
