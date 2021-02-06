<template>
  <div class="default-layout d-flex">
    <header-component></header-component>
    <router-view></router-view>
    <overlay v-if="LOADING && !isCurrentUser" />

    <b-modal id="modal-create-post" :busy="true" size="lg" centered>
      <create-post></create-post>
      <template #modal-footer class="d-none">
        <div class="w-100 d-none"></div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import HeaderComponent from "@/components/Header";
import Overlay from "@/components/App/Overlay";
import CreatePost from "@/components/CreatePost";

import { mapGetters } from "vuex";



export default {
  name: "default-layout",
  data() {
    return {
      toastCount: 0,
    };
  },
  components: {
    HeaderComponent,
    Overlay,
    CreatePost,
  },
  computed: {
    ...mapGetters(["MESSAGE", "LOADING", "isCurrentUser"]),
  },
  methods: {
    makeToast(append = false) {
      this.toastCount++;
      this.$bvToast.toast(`This is toast number ${this.toastCount}`, {
        title: "BootstrapVue Toast",
        autoHideDelay: 5000,
        appendToast: append,
      });
    },
  },
  created() {
    this.$store.dispatch("fetchAllPosts");
  },
};
</script>

<style scoped>
/* .default-layout {
  height: 100vh;
  justify-content: center;
  align-items: center;
} */
</style>