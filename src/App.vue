<template>
  <div id="app container">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>

import DefaultLayout from './layout/DefaultLayout';
import EmptyLayout from '@/layout/EmptyLayout'

export default {
  
  computed: {
    layout(){
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
  components: {
    DefaultLayout, EmptyLayout
  }
}
</script>

<style>
#app {
  margin: 0 auto;
}

</style>
