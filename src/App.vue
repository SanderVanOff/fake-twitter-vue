<template>
  <div id="app container">
    <component :is="layout" class="container">
      <router-view />
    </component>
  </div>
</template>

<script>
import DefaultLayout from "./layout/DefaultLayout";
import EmptyLayout from "@/layout/EmptyLayout";
import Overlay from "@/components/App/Overlay";

export default {
  data: () => ({
    loading: true,
  }),

  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout";
    },
  },
  components: {
    DefaultLayout,
    EmptyLayout,
    Overlay,
  },
};
</script>

<style>
#app {
  margin: 0 auto;
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
