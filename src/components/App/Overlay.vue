<template>
  <div class="overlay">
    <div class="d-flex justify-content-center">
      <div class="spinner-border text-light" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  /* height: 100vh;
  width: 100vw; */
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>