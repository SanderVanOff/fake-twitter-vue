<template>
  <form @submit.prevent="onSubmit" class="form">
    <img class="form__logo" :src=logo>
    <h2 class="form__title">Регистрация</h2>
    <div class="form-group">
      <label for="exampleInputEmail1">Email</label>
      <input
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        v-model="controls.email"
        required
      />
      <!-- <small id="emailHelp" class="form-text text-muted">Поле не должно быть пустым</small> -->
    </div>
    <!-- username -->
    <div class="form-group">
      <label for="inputUsername">Имя пользователя</label>
      <input
        type="text"
        class="form-control"
        id="inputUsername"
        aria-describedby="usernameHelp"
        v-model="controls.username"
        required
      />
      <!-- <small id="usernameHelp" class="form-text text-muted">Поле не должно быть пустым</small> -->
    </div>
    <!-- nickname -->
    <div class="form-group">
      <label for="inputNickname">Никнейм</label>
      <input
        type="text"
        class="form-control"
        id="inputNickname"
        aria-describedby="inputNickname"
        v-model="controls.nickname"
        required
      />
      <!-- <small id="inputNickname" class="form-text text-muted">Поле не должно быть пустым</small> -->
    </div>
    <!-- password -->
    <div class="form-group">
      <label for="exampleInputPassword1">Пароль</label>
      <input
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        v-model="controls.password"
        required
      />
    </div>
    
    <button type="submit" class="btn form-btn">Зарегистрироваться</button>
    <router-link to="/login" class="form-link">
      Войти в Твиттере</router-link
    >
  </form>
</template>

<script>
export default {
  data() {
    return {
      logo:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231da1f2' class='r-13gxpu9 r-4qtqp9 r-yyyyoo r-16y2uox r-1q142lx r-8kz0gk r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1srniue'%3E%3Cg%3E%3Cpath d='M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E",
      controls: {
        email: "",
        password: "",
        nickname: "",
        username: ""
      }
    };
  },
  methods: {
    async onSubmit() {
      const user = {
        email: this.controls.email,
        password: this.controls.password,
        nickname: `@${this.controls.nickname}`,
        username: this.controls.username,
        avatar: 'https://firebasestorage.googleapis.com/v0/b/fake-twitter-8319b.appspot.com/o/unnamed.jpg?alt=media&token=99a7c698-4599-45ec-89fa-b28e04d5be72'
      };

      

      await this.$store.dispatch("createUser", user);
      this.controls.email = "";
      this.controls.password = "";
      this.controls.nickname = "";
      this.controls.username = "";

      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
}
.form__logo {
  margin: 0 auto;
  height: 70px;
  width: 70px;
}
.form__title {
  margin-bottom: 15px;
  text-align: center;
}
.form-btn {
  background-color: rgb(29, 161, 242);
  color: #fff;
  width: 100%;
  border-radius: 9999px;
}
.form-link {
  display: flex;
  margin: 0 auto;
  margin-top: 25px;
  color: rgb(29, 161, 242);
  justify-content: center;
}
</style>