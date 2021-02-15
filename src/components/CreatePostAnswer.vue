<template>
  <div class="comment">
    <div class="comment__create">
      <img :src="isCurrentUser.avatar" alt="" class="comment__avatar" />
      <div
        class="comment__text ml-3"
        contenteditable
        ref="inputField"
        @input="addTextToData"
      ></div>
      <button
        class="comment__btn"
        :disabled="comment.text.length === 0"
        @click="createNewComment"
      >
        <b-icon icon="check-all" class="comment__btn-icon"></b-icon>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    comment: {
      text: ""
    }
  }),
  computed: {
    ...mapGetters(["isCurrentUser"])
  },
  methods: {
    addTextToData() {
      this.comment.text = this.$refs.inputField.innerHTML;
    },
    createNewComment() {
      if (this.comment.text.length > 0) {
        const newComment = this.comment.text;
        this.$emit("create-new-comment", newComment);
        this.comment.text = '';
        this.$refs.inputField.innerHTML = ''
      }
    }
  }
};
</script>

<style scoped>
.post__avatar {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.post-main__user {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
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
.comment__create {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
.comment__text {
  width: 90%;
  border: 1px solid rgb(235, 238, 240);
  border-radius: 5px;
  margin-right: 15px;
  padding: 10px;
  outline: none;
  user-select: text;
  overflow-wrap: break-word;
  font-size: 19px;
  font-weight: 400;
  color: rgb(15, 20, 25);
  line-height: 1.3125;
}

.comment__btn {
  background-color: rgb(29, 161, 242);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 8px 28px;
  outline-style: none;
  min-height: 40px;
  width: 40px;
  border-radius: 50%;
  color: rgb(255, 255, 255);
  font-weight: 700;
  font-size: 15px;
  border-color: rgba(0, 0, 0, 0);
  transition: 0.2s ease-in-out;
  align-self: flex-end;
}
.comment__btn:hover {
  background-color: rgb(26, 145, 218);
}
.comment__btn:disabled {
  opacity: 0.5;
}
.comment__btn-icon {
  font-size: 20px;
}
</style>