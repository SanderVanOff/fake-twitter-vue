<template>
  <div class="comment">
    <div class="comment__wrapper">
      <img :src="commentData.userAvatar" alt="" class="comment__avatar" />
      <div class="comment__main">
        <div class="comment__user">
          <span class="comment__username mr-3">{{ commentData.username }}</span>
          <span class="comment__nickname mr-3">{{ commentData.nickname }}</span>
          <span class="comment__date mr-3">{{ commentData.postDate }}</span>
          <b-icon
          icon="x"
          class="comment-delete"
          @click="removeComment(commentData)"
          v-if="commentData.nickname === isCurrentUser.nickname"
        ></b-icon>
        </div>
        <!-- <p class="comment__text" v-html="commentData.text"></p> -->
        <pre class="comment__text">{{commentData.text}}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    commentData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    ...mapGetters(["ALL_POSTS", "isCurrentUser"]),
    // commentItem(){
    //   return (this.ALL_POSTS.find(post => post.id === this.commentData.postId)).comments;
    // }
  },
  methods:{
      removeComment(comments){
          this.$emit('remove-comment', comments);
      }
  }
};
</script>

<style scoped>
.comment {
    border-top: 1px solid rgb(235, 238, 240);
    padding-top: 10px;
}
.comment__wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.comment__avatar {
  height: 50px;
  width: 50px;
  border-radius: 9999px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: rgba(0, 0, 0, 0.02) 0px 0px 2px inset;
  align-self: flex-start;
}
.comment__main {
    width: 85%;
}

.comment__user {
  width: 100%;
  margin-left: 30px;
  margin-bottom: 15px;
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.comment__username {
  color: rgb(15, 20, 25);
  font-size: 15px;
  font-weight: 700;
  line-height: 1.3125;
  overflow-wrap: break-word;
}
.comment__nickname,
.comment__date {
  font-size: 15px;
  font-weight: 400;
  color: rgb(91, 112, 131);
  line-height: 1.3125;
  overflow-wrap: break-word;
}
.comment-delete {
  position: absolute;
  right: 0;
  font-size: 30px;
  cursor: pointer;
  border-radius: 9999px;
  transition: 0.2s ease-in-out;
}
.comment-delete:hover {
  background-color: rgba(29, 161, 242, 0.1);
}
.comment__text {
    margin-left: 30px;
}
</style>