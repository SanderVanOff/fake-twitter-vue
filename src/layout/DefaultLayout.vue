<template>
  <div class="default-layout d-flex">
    <header-component></header-component>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderComponent from "@/components/Header";
export default {
  name: "default-layout",
  components: {
    HeaderComponent
  }
};
</script>