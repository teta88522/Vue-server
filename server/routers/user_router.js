// 라우팅 = 사용자의 요청(URI + METHOD)
//        + Service
//        + 응답(view or Data)

const express = require("express");
const router = express.Router();
// 제공할 서비스 객체
const services = require("../services/user_service.js");
// 전체조회 | URI (/users) + METHOD(GET)
router.get("/users", async (req, res) => {
  let result = await services.findAll();
  res.send(result);
});
// 단건조회 | URI (/users/:no) + METHOD(GET)
router.get(`/users/:no`, async (req, res) => {
  const target = req.params.no;
  let result = await services.findInfoByNo(target);
  res.send(result);
});
// 등록 | URI (/users) + METHOD(POST)
router.post(`/users`, async (req, res) => {
  let target = req.body;
  let result = await services.createInfo(target);
  res.send(result);
});
// 수정 | URI (/users/:no) + METHOD(PUT)
router.put("/users/:no", async (req, res) => {
  let id = req.params.no;
  let target = req.body;
  let result = await services.modifyInfo(id, target);
  res.send(result);
});
// 삭제 | URI (/users/:no) + METHOD(DELETE)

module.exports = router;
