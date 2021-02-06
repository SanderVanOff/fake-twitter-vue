<template>
    <div class="error">
        <h3 class="error__title">Ошибка</h3>
        <img src="/logo.png" alt="">
        <p class="error__text">К сожалению данной страницы не существует</p>
        <router-link to="/" class="error__btn">На главную</router-link>
    </div>
</template>

<style scoped>
.error {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.error__btn {
  background-color: rgb(29, 161, 242);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 8px 28px;
  outline-style: none;
  min-height: 49px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 9999px;
  width: 90%;
  color: rgb(255, 255, 255);
  font-weight: 700;
  font-size: 15px;
  border-color: rgba(0, 0, 0, 0);
  transition: 0.2s ease-in-out;
  margin-top: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.error__btn:hover {
  background-color: rgb(26, 145, 218);
}
</style>