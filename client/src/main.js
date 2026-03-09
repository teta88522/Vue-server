import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // index.js에서 만든 라우터 가져오기

const app = createApp(App); // Vue 애플리케이션 인스턴스 생성

app.use(router); // 애플리케이션에 라우터 기능 추가

app.mount("#app"); // index.html의 <div id="app">에 Vue 앱을 부착(렌더링)
