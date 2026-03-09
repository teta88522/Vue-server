import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 주소창에 '/user/list'를 입력하면
      path: "/user/list",
      name: "userList",
      // UserList.vue 컴포넌트를 보여줍니다. (Lazy Loading 방식: 필요할 때만 불러옴)
      component: () => import("../views/UserList.vue"),
    },
    {
      // '/user/info/1', '/user/info/5' 처럼 뒤에 동적인 번호(:no)가 올 때
      path: "/user/info/:no",
      name: "userInfo",
      // UserInfo.vue 컴포넌트를 보여줍니다.
      component: () => import("../views/UserInfo.vue"),
    },
  ],
});

export default router;
