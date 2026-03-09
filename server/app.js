const express = require("express");
const app = express();
const port = 3000;

// 미들웨어 등록 영역
// 클라이언트가 POST/PUT 등으로 보낸 데이터를 Express가 읽을 수 있도록 변환해주는 설정입니다.
// body parser (필수)
// content-type : application/x-www-form-urlencoded (HTML 폼 전송 방식 처리)
app.use(express.urlencoded({ extended: false }));
// content-type : application/json (Vue에서 fetch로 보내는 JSON 데이터 처리)
app.use(express.json());

// Server 실행
app.listen(port, () => {
  console.log("Server start");
  console.log(`http://localhost:${port}`);
});

// 라우팅 등록 영역
// - 기본 라우팅: 브라우저에 http://localhost:3000/ 만 입력했을 때 나오는 환영 인사
app.get("/", (req, res) => {
  res.send("Welcome!!");
});

// - 기능별 라우터모듈 등록
// /users 등 회원과 관련된 요청은 모두 user_router.js가 처리하도록 넘깁니다.
const userRouter = require("./routers/user_router.js");
app.use("/", userRouter); // 첫 번째 인자가 '/'이므로 기본 도메인 뒤에 라우터 경로가 그대로 붙습니다.
