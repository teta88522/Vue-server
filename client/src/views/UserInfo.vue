<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
const selectNo = route.params.no;
console.log(selectNo);

const user = ref([]);

import { ref, computed, onBeforeMount } from "vue";

const findByNo = async (userNo) => {
  let info = await fetch(`/api/users/${userNo}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
  user.value = info;
};

onBeforeMount(() => {
  findByNo(selectNo);
});
</script>

<template>
  <div class="container text-center">
    <!-- 12칸 -->
    <div class="row">
      <div class="col-4">No.</div>
      <div class="col-8">{{ user.user_no }}</div>
    </div>
    <div class="row">
      <div class="col-4">아이디</div>
      <div class="col-8">{{ user.user_id }}</div>
    </div>
    <div class="row">
      <div class="col-4">비밀번호</div>
      <div class="col-8">{{ user.user_pwd }}</div>
    </div>
    <div class="row">
      <div class="col-4">이름</div>
      <div class="col-8">{{ user.user_name }}</div>
    </div>
    <div class="row">
      <div class="col-4">성별</div>
      <div class="col-8">{{ user.user_gender }}</div>
    </div>
    <div class="row">
      <div class="col-4">나이</div>
      <div class="col-8">{{ user.user_age }}</div>
    </div>
    <div class="row">
      <div class="col-4">가입일자</div>
      <div class="col-8">{{ user.join_date }}</div>
    </div>
    <button class="btn btn-info">수정</button>
    <button class="btn btn-light">목록</button>
    <button class="btn btn-warning">삭제</button>
  </div>
</template>
