<template>
    <div class="empty-layout d-flex">
    <transition name="component-fade" mode="out-in">
    <router-view></router-view>    
    </transition>
    <overlay v-if="LOADING && isCurrentUser"/>
  </div>
</template>

<script>
import Overlay from '@/components/App/Overlay';
import {mapGetters} from 'vuex';
export default {
    name: 'empty-layout',
    components: {
        Overlay
    },
    computed: {
        ...mapGetters(['LOADING', "isCurrentUser"])
    }
}
</script>

<style scoped>
.empty-layout {
    height: 100vh;
    justify-content: center;
    align-items: center;
}
</style>