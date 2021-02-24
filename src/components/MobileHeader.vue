<template>
  <header class="mobile-header">
    <div class="header__wrapper">
    <nav class="header__nav nav">
      <ul class="nav__list">
        <li class="nav__item" v-for="link of links" :key="link.name">
          <router-link :to="link.url" class="nav__link" exact>
            <!-- <img class="nav__link-img" :src="link.image" alt="link.name" /> -->
            <b-icon :icon="link.image" class="nav__link-img"></b-icon>
            <span class="nav__link-title">{{ link.title }}</span>
          </router-link>
        </li>
        <!--  -->
        <button
          class="nav__button twit-btn d-flex justify-content-center align-items-center"
          v-b-modal.modal-create-post
        >
          <b-icon icon="pencil" class="nav__button-icon"></b-icon>
          <span class="nav__button__text">Написать</span>
        </button>
      </ul>
    </nav>
    <!--  -->

    <b-dropdown variant="white" no-caret class="user-dropdown-btn">
      <template #button-content>
        <div class="header__user user user-dropdown">
          <img :src="currentUser.avatar" alt="" class="user__img" />
          <div class="user__info">
            <p class="user__username">{{ currentUser.username }}</p>
            <p class="user__nickname">{{ currentUser.nickname }}</p>
          </div>
          <b-icon icon="three-dots-vertical" class="user__options"></b-icon>
        </div>
      </template>
      <div class="user__info-dropdown">
        <img
          :src="currentUser.avatar"
          alt=""
          class="user__img"
        />
        <input
          ref="inputImgFile"
          type="file"
          name="loadImg"
          id="loadImg"
          class="input-load-img"
          @change="changeAvatar"
        />
        <div class="user__info">
          <p class="user__username">{{ currentUser.username }}</p>
          <p class="user__nickname">{{ currentUser.nickname }}</p>
        </div>
      </div>
      <b-dropdown-item @click="loadImage">Изменить аватар</b-dropdown-item>
      <b-dropdown-item><router-link :to="{name: 'about'}">О приложении</router-link></b-dropdown-item>
      <b-dropdown-item @click="logout">Выход</b-dropdown-item>
    </b-dropdown>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    avatar: null,
    links: [
      {
        name: "home",
        title: "Главная",
        image: "house-door-fill",
        url: "/"
      },
      {
        name: "myPost",
        title: "Мои посты",
        image: "person-circle",
        url: "/my-post"
      },
      {
        name: "likes",
        title: "Нравится",
        image: "heart-fill",
        url: "/likes-post"
      }
    ]
  }),
  computed: {
    ...mapGetters(["isCurrentUser", "isAuthenticated"]),
    currentUser() {
      if (this.isCurrentUser) {
        return this.isCurrentUser;
      } else {
        const defaultUser = {
          nickname: "nickname",
          username: "username",
          avatar:
            "https://firebasestorage.googleapis.com/v0/b/fake-twitter-8319b.appspot.com/o/unnamed.jpg?alt=media&token=99a7c698-4599-45ec-89fa-b28e04d5be72"
        };
        return defaultUser;
      }
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("LOGOUT");
      //  this.$router.push('/login')
    },
    loadImage() {
      this.$refs.inputImgFile.click();
    },
    async changeAvatar() {
      this.avatar = this.$refs.inputImgFile.files[0];
      await this.$store.dispatch("changeAvatar", this.avatar);
    }
  }
};
</script>

<style scoped>
.mobile-header {
  position: fixed;
  bottom: 0;
  background: #fff;
  width: 100%;
  display: none;
  
}
.header__wrapper {
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.nav {
    width: 100%;
}
.nav__link-img {
  display: inline-block;
  width: 30px;
  font-size: 20px;
}
.nav__list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}
.nav__item {
  display: flex;
  align-items: center;
  padding: 0 15px;
  height: 50px;
  border-radius: 9999px;
  transition: 0.2s ease;
}

.nav__item:hover {
  background-color: rgba(29, 161, 242, 0.1);
}

.nav__item:hover .nav__link-title {
  color: rgba(29, 161, 242, 1);
}
.nav__link-title {
  margin-right: 15px;
  margin-left: 20px;
  font-size: 19px;
  font-weight: 700;
  line-height: 1.3125;
  overflow-wrap: break-word;
}
.nav__button {
  background-color: rgb(29, 161, 242);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 8px 28px;
  outline-style: none;
  height: 49px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 9999px;
  width: 49px;
  color: rgb(255, 255, 255);
  font-weight: 700;
  font-size: 15px;
  border-color: rgba(0, 0, 0, 0);
  transition: 0.2s ease-in-out;
  margin-top: 15px;
  position: fixed;
  bottom: 100px;
  right: 30px;
}

.nav__button:hover {
  background-color: rgb(26, 145, 218);
}
.nav__button-icon {
  font-size: 20px;
  margin-right: 1rem;
}
.router-link-exact-active {
  color: rgb(26, 145, 218);
}
.user-dropdown-btn {
    margin-left: 5%;
    margin-right: 20px;
}
.header__user .dropdown-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  /* margin-bottom: 15px; */
}
.user:hover {
  background-color: rgba(29, 161, 242, 0.1);
  padding: 10px;
  border-radius: 9999px;
}
.user__img {
  border-radius: 9999px;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.04);
  box-shadow: rgba(0, 0, 0, 0.02) 0px 0px 2px inset;
  cursor: pointer;
  width: 40px;
  height: 40px;
  object-fit: cover;
}
.user__username {
  overflow-wrap: break-word;
  color: rgb(15, 20, 25);
  font-weight: 700;
  font-size: 15px;
  line-height: 1.3125;
}
.user__nickname {
  color: rgb(91, 112, 131);
  font-weight: 400;
  font-size: 15px;
  line-height: 1.3125;
}
.input-load-img {
  display: none;
}
.user__info-dropdown {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 10px;
}
.btn-secondary {
  color: black !important;
  background-color: transparent !important;
  border-color: transparent !important;
}
.dropdown-toggle.dropdown-toggle::after {
  display: none;
}



@media (max-width: 991px) {
  .header {
    align-items: center;
  }

  .nav__link-title {
    display: none;
  }
  .nav__button {
    padding: 0;
    border-radius: 50%;
  }
  .nav__button-icon {
    margin-right: 0;
  }
  .nav__button__text {
    display: none;
  }
  .header__user {
    flex-direction: column;
    text-align: center;
  }
  .user__info .user__username,
  .user__info .user__nickname {
    display: none;
  }
  .user__options.b-icon.bi{
    display: none !important;
  }
}
@media (max-width: 499px) {
  .mobile-header {
    display: block;
  }
}
</style>
