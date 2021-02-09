<template>
  <div class="default-layout">
    <header-component></header-component>
    <transition name="component-fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <mobile-header-component></mobile-header-component>
    <overlay v-if="LOADING || !isCurrentUser" />

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
import MobileHeaderComponent from "@/components/MobileHeader";
import Overlay from "@/components/App/Overlay";
import CreatePost from "@/components/CreatePost";

import { mapGetters } from "vuex";

export default {
  name: "default-layout",
  data() {
    return {
      toastCount: 0
    };
  },
  components: {
    HeaderComponent,
    Overlay,
    CreatePost,
    MobileHeaderComponent
  },
  computed: {
    ...mapGetters(["MESSAGE", "LOADING", "isCurrentUser"])
  },
  methods: {
    makeToast(append = false) {
      this.toastCount++;
      this.$bvToast.toast(`This is toast number ${this.toastCount}`, {
        title: "BootstrapVue Toast",
        autoHideDelay: 5000,
        appendToast: append
      });
    }
  },
  created() {
    this.$store.dispatch("fetchAllPosts");
  }
};
</script>

<style scoped>
.default-layout {
  display: grid;
  grid-template-columns: 1fr 3fr;
  justify-content: center;
}

@media (max-width: 991px) {
  .default-layout {
    grid-template-columns: 1fr 6fr;
  }
}

@media (max-width: 499px) {
  .default-layout {
    grid-template-columns: 1fr;
  }
}
</style>