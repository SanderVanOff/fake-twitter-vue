<template>
  <main class="main">
    <div class="main-header">
      <span class="main-header__title">Понравившиеся посты</span>
      <div class="main-header__icon">
        <img
          class="main-header__img"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231da1f2' class='r-13gxpu9 r-4qtqp9 r-yyyyoo r-1q142lx r-50lct3 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1srniue'%3E%3Cg%3E%3Cpath d='M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E"
          alt=""
        />
      </div>
    </div>
    <div class="main-form"></div>
    <div class="main-line"></div>
    <template v-if="isCurrentUser">
    <transition-group name="list" tag="div" class="posts">
    <post
      v-for="post of getLikesPosts"
      :key="post.id"
      :postData="post"
    ></post>
    </transition-group>
    </template>
    <div class="d-flex justify-content-center loader" v-else>
      <div class="spinner-border text-dark" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src

import Post from "@/components/Post";

import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    Post,
  },
  computed: {
    ...mapGetters(["ALL_POSTS", "isCurrentUser"]),
    getLikesPosts() {
      const likesPosts = this.ALL_POSTS.filter((item) => {
        return item.likes.includes(this.isCurrentUser.nickname);
      });
      return likesPosts;
    },
  },
};
</script>

<style scoped>


</style>
