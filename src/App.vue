<template>
  <div id="app container">
    <component :is="layout" class="container content">
      <router-view />
    </component>
    <notifications group="foo" />
  </div>
</template>

<script>
import DefaultLayout from "./layout/DefaultLayout";
import EmptyLayout from "@/layout/EmptyLayout";
import Overlay from "@/components/App/Overlay";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    loading: true
  }),

  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout";
    },
    ...mapGetters(["MESSAGE", "ERROR"])
  },
  watch: {
    MESSAGE() {
      this.$notify({
        group: "foo",
        title: "Успешно",
        text: this.MESSAGE.text,
        type: "success"
      });
    },
    ERROR(ERROR) {
      console.log("ERROR", ERROR);
      switch (ERROR.code) {
        case "auth/too-many-requests":
          this.$notify({
            group: "foo",
            text: "Доступ временно запрещен. Попробуйте позже",
            type: "error"
          });
          break;
        case "auth/email-already-in-use":
          this.$notify({
            group: "foo",
            text: "Данный e-mail уже зарегистрирован",
            type: "error"
          });
          break;
        case "auth/user-not-found":
          this.$notify({
            group: "foo",
            text: "Данный пользователь не найден",
            type: "error"
          });
          break;
        case "auth/invalid-email":
          this.$notify({
            group: "foo",
            text: "e-mail некорректный",
            type: "error"
          });
          break;
        case "auth/weak-password":
          this.$notify({
            group: "foo",
            text: "Пароль небезопасен",
            type: "error"
          });
          break;
        case "auth/wrong-password":
          this.$notify({
            group: "foo",
            text: "Введен неверный пароль",
            type: "error"
          });
          break;

        default:
          this.$notify({ group: "foo", text: ERROR.message, type: "error" });
          break;
      }
    }
  },
  components: {
    DefaultLayout,
    EmptyLayout,
    Overlay
  }
};
</script>

<style>
#app {
  margin: 0 auto;
}
.content {
  padding: 10px 0;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
