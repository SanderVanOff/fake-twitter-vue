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
</style>
