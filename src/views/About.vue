<template>
  <div class="about">
    <h1 class="about__title">Chatter</h1>
    <p class="about__description">Приложение обмена сообщениями</p>
    <p class="about__version">v.1.0</p>
    <hr/>
    <h4 class="about__subtitle">Инструкция</h4>
    <p class="about__text mb-2">
      Обмениваться сообщениями возможно, как с компьютера, так возможно из телефона. 
      Для работы приложения используется технология PWA, благодаря которой возможно установить приложение 
      на телефон.
    </p>
    <p class="about__text mb-2">
      Для этого необходимо зайти в приложение по ссылке, а затем в меню выбрать "Добавить на главный экран"
    </p>
    <p class="about__text mb-2">
      На Iphone необходимо в меню выбрать "Добавить на экран Home"
    </p>
    <p class="about__text">
      Приятного пользования!
    </p>
    <hr/>
    <router-link :to="{name: 'Home'}" class="back__btn">На главную</router-link>
  </div>
</template>

<style scoped>
.back__btn {
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
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.back__btn:hover {
  background-color: rgb(26, 145, 218);
}
</style>