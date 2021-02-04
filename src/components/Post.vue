<template>
  <div class="post">
    <div class="post__avatar">
      <img :src="postData.userAvatar" alt="" class="post-avatar__img" />
    </div>
    <div class="post__main post-main">
      <div class="post-main__user mb-3">
        <span class="post-main__username mr-3">{{ postData.username }}</span>
        <span class="post-main__nickname mr-3">{{ postData.nickname }}</span>
        <span class="post-main__date mr-3">{{ postData.postDate }}</span>
        <b-icon
          icon="x"
          class="post-delete"
          @click="removePost(postData.id, postData.image)"
        ></b-icon>
      </div>
      <div class="post-main__text mb-3" v-html="postData.text"></div>
      <div class="post-main__image mb-2">
        <img :src="postData.image" alt="" class="post-main__img" />
      </div>
      <div class="post-main__bottom">
        <b-icon
          :icon="likesPostCurrentUser ? 'heart-fill' : 'heart'"
          :class="{ active: likesPostCurrentUser }"
          class="post-main__like"
          @click="likesPost(postData.id)"
        ></b-icon>
        <span class="post-main__like-count ml-2">{{
          postData.likes.length - 1
        }}</span>
      </div>
    </div>
    {{postData.image}}
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    postData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    ...mapGetters(["ALL_POSTS", "isCurrentUser"]),
    likesPostCurrentUser() {
      if (this.postData.likes.includes(this.isCurrentUser.nickname)) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    async removePost(id, image) {
      await this.$store.dispatch("removePost", { id, image });
    },
    async likesPost(id) {
      const currentNicknameUser = this.isCurrentUser.nickname;
      await this.$store.dispatch("LikesPost", { id, currentNicknameUser });
    },
  },
};
</script>

<style scoped>
.post {
  display: flex;
  padding: 15px;
  border-top: 1px solid rgb(235, 238, 240);
}
.post__avatar {
  margin-right: 15px;
}

.post-avatar__img {
  height: 50px;
  width: 50px;
  border-radius: 9999px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: rgba(0, 0, 0, 0.02) 0px 0px 2px inset;
}

.post-main {
  display: flex;
  flex-direction: column;
}
.post-main__user {
  position: relative;
}
.post-main__username {
  color: rgb(15, 20, 25);
  font-size: 15px;
  font-weight: 700;
  line-height: 1.3125;
  overflow-wrap: break-word;
}
.post-main__nickname,
.post-main__date {
  font-size: 15px;
  font-weight: 400;
  color: rgb(91, 112, 131);
  line-height: 1.3125;
  overflow-wrap: break-word;
}
.post-delete {
  position: absolute;
  right: 0;
  font-size: 30px;
  cursor: pointer;
  border-radius: 9999px;
  transition: 0.2s ease-in-out;
}
.post-delete:hover {
  background-color: rgba(29, 161, 242, 0.1);
}
.post-main__text {
  color: rgb(15, 20, 25);
  font-size: 15px;
  font-weight: 400;
  line-height: 1.3125;
  overflow-wrap: break-word;
}
.post-main__img {
  width: 100%;
  height: 100%;
  border: 1px solid rgb(196, 207, 214);
  border-radius: 16px;
}
.post-main__bottom {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.post-main__like {
  transform: scale(1);
  cursor: pointer;
  transition: 0.2s ease-in-out;
}
.post-main__like.active {
  color: #dc3545;
}
.post-main__like:hover {
  transform: scale(1.2);
}
</style>