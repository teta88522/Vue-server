<script setup>
import { useRoute } from "vue-router";
import { ref, onBeforeMount } from "vue"; // import는 보통 스크립트 최상단에 모아두는 것이 좋습니다.

const route = useRoute(); // 현재 주소의 정보(파라미터 등)를 담고 있는 객체
const selectNo = route.params.no; // URL에서 '/user/info/:no' 부분의 :no 값을 빼옵니다.
console.log(selectNo);

const user = ref({}); // 한 명의 정보이므로 보통 빈 객체 {} 로 초기화하는 것이 좋습니다.

// 특정 회원의 번호로 백엔드에 상세 정보를 요청하는 비동기 함수
const findByNo = async (userNo) => {
  // 예: http://localhost:3000/users/1
  let info = await fetch(`/api/users/${userNo}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));

  user.value = info; // 받아온 상세 정보를 user 변수에 저장하여 화면에 반영
};

// 컴포넌트가 마운트되기 전에 주소창에서 뽑아낸 번호로 데이터를 가져옵니다.
onBeforeMount(() => {
  findByNo(selectNo);
});
</script>

<template>
  <div class="container text-center">
    <div class="row">
      <div class="col-4">No.</div>
      <div class="col-8">{{ user.user_no }}</div>
    </div>
    <div class="row">
      <div class="col-4">아이디</div>
      <div class="col-8">{{ user.user_id }}</div>
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
