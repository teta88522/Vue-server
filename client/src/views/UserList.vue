<!-- views/UserList.vue -->
<script setup>
import { RouterLink, useRouter } from "vue-router";
const router = useRouter(); //Router 객체 반환

import { ref, onBeforeMount, computed } from "vue";
const users = ref([]);

const count = computed(() => {
  return users.value.length;
});

// const server = "http://localhost:3000";
const findUsers = async () => {
  let list = await fetch(`/api/users`)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
  users.value = list;
};

const dateFormat = (dateVal) => {
  let newDate = new Date(dateVal);
  let year = newDate.getFullYear();
  let month = ("0" + (newDate.getMonth() + 1)).slice(-2);
  let day = ("0" + newDate.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

// 특정 회원을 선택(<tr>클릭)시 상세페이지로 이동
const goToDetail = (userNo) => {
  router.push({ name: "userInfo", params: { no: userNo } });
};

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
          <!-- yyyy-MM-dd -->
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
