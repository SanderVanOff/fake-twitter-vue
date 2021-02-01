<template>
  <div class="default-layout d-flex">
    <header-component></header-component>
    <router-view></router-view>
    
  </div>
</template>

<script>
import HeaderComponent from "@/components/Header";


import {mapGetters} from 'vuex'
export default {
  name: "default-layout",
  data() {
      return {
        toastCount: 0
      }
    },
  components: {
    HeaderComponent,
  },
  computed: {
    ...mapGetters(['MESSAGE']),
  },
  methods :{
    makeToast(append = false) {
        this.toastCount++
        this.$bvToast.toast(`This is toast number ${this.toastCount}`, {
          title: 'BootstrapVue Toast',
          autoHideDelay: 5000,
          appendToast: append
        })
      }
  }

};
</script>