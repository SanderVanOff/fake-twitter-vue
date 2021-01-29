<template>
    <div class="empty-layout d-flex">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'empty-layout'
}
</script>

<style scoped>
.empty-layout {
    height: 100vh;
    justify-content: center;
    align-items: center;
}
</style>