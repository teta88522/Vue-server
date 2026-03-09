<script setup>
import { RouterLink, useRouter } from "vue-router";
import { ref, onBeforeMount, computed } from "vue";

const router = useRouter(); // 자바스크립트 코드 내에서 페이지를 이동시킬 때 사용하는 객체
const users = ref([]); // 서버에서 받아올 회원 목록 배열을 담을 반응형 변수

// users 배열의 길이를 실시간으로 계산하여 총 회원 수를 구합니다.
const count = computed(() => {
  return users.value.length;
});

// 백엔드에서 회원 목록을 가져오는 비동기 함수
const findUsers = async () => {
  // vite.config.js의 프록시 설정 덕분에 'http://localhost:3000/users'로 요청이 갑니다.
  let list = await fetch(`/api/users`)
    .then((resp) => resp.json()) // 응답을 JSON 객체로 변환
    .catch((err) => console.log(err)); // 에러 발생 시 콘솔에 출력

  users.value = list; // 받아온 데이터를 반응형 변수에 넣으면 화면이 자동으로 업데이트됩니다.
};

// 날짜 형식을 'YYYY-MM-DD'로 깔끔하게 포맷팅해주는 함수
const dateFormat = (dateVal) => {
  let newDate = new Date(dateVal);
  let year = newDate.getFullYear();
  let month = ("0" + (newDate.getMonth() + 1)).slice(-2);
  let day = ("0" + newDate.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

// 테이블의 특정 행(<tr>)을 클릭했을 때 실행되는 함수
const goToDetail = (userNo) => {
  // router.push를 이용해 '/user/info/유저번호' 로 페이지를 이동시킵니다.
  router.push({ name: "userInfo", params: { no: userNo } });
};

// 컴포넌트가 화면에 그려지기 직전에 서버에 데이터를 요청(findUsers)합니다.
onBeforeMount(() => {
  findUsers();
});
</script>

<template>
  <div class="container">
    <table class="table text-center">
      <caption>
        <p>총{{ count }}</p>
      </caption>
      <thead>
        <tr>
          <th>No.</th>
          <th>아이디</th>
          <th>이름</th>
          <th>성별</th>
          <th>가입날짜</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="info in users" v-on:click="goToDetail(info.user_no)">
          <td>{{ info.user_no }}</td>
          <td>{{ info.user_id }}</td>
          <td>{{ info.user_name }}</td>
          <td>{{ info.user_gender }}</td>
          <td>{{ dateFormat(info.join_date) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
