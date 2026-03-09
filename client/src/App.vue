<script setup>
// a 태그 대신 Vue 내부에서 페이지를 이동시켜주는 RouterLink와
// 라우터가 지정한 컴포넌트를 보여줄 자리인 RouterView를 가져옵니다.
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="container">
    <header>
      <p><RouterLink to="/user/list">전체회원</RouterLink></p>
    </header>

    <main><RouterView /></main>

    <footer></footer>
  </div>
</template>

<style scoped></style>
