<template>
  <div class="create-post">
    <div class="create-post__main mb-2">
      <div class="create-post__avatar">
        <img :src="currentUserAvatar" alt="" class="create-post__avatar-img" />
      </div>
      <div
        class="create-post__text ml-3"
        contenteditable
        ref="inputField"
        @input="addTextToData"
        @keydown.once="clearPlaceholder"
      >
        Что происходит?
      </div>
    </div>
    <div class="create-post__image" v-show="post.image">
      <b-icon
        icon="x"
        class="create-post__image-delete"
        @click="post.image = null"
      ></b-icon>
      <img :src="post.image" class="create-post__img" />
    </div>
    <div class="create-post__action">
      <div class="create-post__add" @click="loadImage">
        <img
          class="create-post__add-img"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231da1f2'%3E%3Cg%3E%3Cpath d='M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z'%3E%3C/path%3E%3Ccircle cx='8.868' cy='8.309' r='1.542'%3E%3C/circle%3E%3C/g%3E%3C/svg%3E"
          alt=""
        />
      </div>
      <input
        ref="inputImgFile"
        type="file"
        name="loadImg"
        id="loadImg"
        class="create-post__add-input"
        @change="loadImageFile"
      />
      <button class="create-post__create" @click="createNewPost">
        Твитнуть
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    defaultAvatar:
      "https://firebasestorage.googleapis.com/v0/b/fake-twitter-8319b.appspot.com/o/unnamed.jpg?alt=media&token=99a7c698-4599-45ec-89fa-b28e04d5be72",
    post: {
      text: "",
      image: null,
    },
  }),
  computed: {
    ...mapGetters(["isCurrentUser"]),
    currentUserAvatar() {
      if (this.isCurrentUser) {
        return this.isCurrentUser.avatar;
      } else {
        return "https://firebasestorage.googleapis.com/v0/b/fake-twitter-8319b.appspot.com/o/unnamed.jpg?alt=media&token=99a7c698-4599-45ec-89fa-b28e04d5be72";
      }
    },
  },

  methods: {
    clearPlaceholder() {
      this.$refs.inputField.textContent = " ";
    },
    addTextToData() {
      this.post.text = this.$refs.inputField.innerHTML;
    },
    loadImage() {
      this.$refs.inputImgFile.click();
      console.log("img", this.$refs.inputImgFile);
    },
    loadImageFile() {
      const urlImg = URL.createObjectURL(this.$refs.inputImgFile.files[0]);
      this.post.image = urlImg;
    },
    async createNewPost() {
      if (this.post.text.length > 0) {
        const fileImg = this.$refs.inputImgFile.files[0];
        const option = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        };
        const post = {
          id: Date.now().toString(32),
          username: this.isCurrentUser.username,
          nickname: this.isCurrentUser.nickname,
          userAvatar: this.isCurrentUser.avatar,
          text: this.post.text,
          image: this.post.image,
          postDate: new Date().toLocaleString("ru-RU", option),
          likes: ["0"],
        };

        await this.$store.dispatch("getNewPost", { post, fileImg });
        this.post.text = "";
        this.post.image = null;
        this.$refs.inputField.innerHTML = "Что происходит?";
      }
    },
  },
};
</script>

<style scoped>
.create-post__main {
  display: flex;
  align-items: flex-start;
}
.create-post__avatar-img {
  height: 50px;
  width: 50px;
  border-radius: 9999px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: rgba(0, 0, 0, 0.02) 0px 0px 2px inset;
}
.create-post__text {
  outline: none;
  user-select: text;
  overflow-wrap: break-word;
  font-size: 19px;
  font-weight: 400;
  color: rgb(15, 20, 25);
  line-height: 1.3125;
  width: 100%;
}
.create-post__image {
  position: relative;
}
.create-post__img {
  width: 100%;
  height: 100%;
  border: 1px solid rgb(196, 207, 214);
  border-radius: 16px;
}
.create-post__image-delete {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 30px;
  color: #fff;
  cursor: pointer;
  border-radius: 9999px;
  transition: 0.2s ease-in-out;
  background-color: rgba(0, 0, 0, 0.5);
}

.create-post__action {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.create-post__add {
  border-radius: 9999px;
  cursor: pointer;
  width: 39px;
  height: 39px;
  transition: 0.2s ease-in-out;
  margin-left: 50px;
  margin-top: 20px;
}
.create-post__add:hover {
  background-color: rgba(29, 161, 242, 0.1);
}
.create-post__add-img {
  width: 100%;
  padding: 10px;
}
.create-post__add-input {
  display: none;
}
.create-post__create {
  background-color: rgb(29, 161, 242);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 8px 28px;
  outline-style: none;
  min-height: 39px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 9999px;
  color: rgb(255, 255, 255);
  font-weight: 700;
  font-size: 15px;
  border-color: rgba(0, 0, 0, 0);
  transition: 0.2s ease-in-out;
}
.create-post__create:hover {
  background-color: rgb(26, 145, 218);
}
</style>