<template>
  <header class="mobile-header">
    <div class="header__wrapper">
    <nav class="header__nav nav">
      <ul class="nav__list">
        <li class="nav__item" v-for="link of links" :key="link.name">
          <router-link :to="link.url" class="nav__link" exact>
            <img class="nav__link-img" :src="link.image" alt="link.name" />
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
        image:
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231da1f2' class='r-13gxpu9 r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr'%3E%3Cg%3E%3Cpath d='M22.58 7.35L12.475 1.897c-.297-.16-.654-.16-.95 0L1.425 7.35c-.486.264-.667.87-.405 1.356.18.335.525.525.88.525.16 0 .324-.038.475-.12l.734-.396 1.59 11.25c.216 1.214 1.31 2.062 2.66 2.062h9.282c1.35 0 2.444-.848 2.662-2.088l1.588-11.225.737.398c.485.263 1.092.082 1.354-.404.263-.486.08-1.093-.404-1.355zM12 15.435c-1.795 0-3.25-1.455-3.25-3.25s1.455-3.25 3.25-3.25 3.25 1.455 3.25 3.25-1.455 3.25-3.25 3.25z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E",
        url: "/"
      },
      {
        name: "myPost",
        title: "Мои твитты",
        image:
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230f1419' class='r-18jsvk2 r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr'%3E%3Cg%3E%3Cpath d='M12 11.816c1.355 0 2.872-.15 3.84-1.256.814-.93 1.078-2.368.806-4.392-.38-2.825-2.117-4.512-4.646-4.512S7.734 3.343 7.354 6.17c-.272 2.022-.008 3.46.806 4.39.968 1.107 2.485 1.256 3.84 1.256zM8.84 6.368c.162-1.2.787-3.212 3.16-3.212s2.998 2.013 3.16 3.212c.207 1.55.057 2.627-.45 3.205-.455.52-1.266.743-2.71.743s-2.255-.223-2.71-.743c-.507-.578-.657-1.656-.45-3.205zm11.44 12.868c-.877-3.526-4.282-5.99-8.28-5.99s-7.403 2.464-8.28 5.99c-.172.692-.028 1.4.395 1.94.408.52 1.04.82 1.733.82h12.304c.693 0 1.325-.3 1.733-.82.424-.54.567-1.247.394-1.94zm-1.576 1.016c-.126.16-.316.246-.552.246H5.848c-.235 0-.426-.085-.552-.246-.137-.174-.18-.412-.12-.654.71-2.855 3.517-4.85 6.824-4.85s6.114 1.994 6.824 4.85c.06.242.017.48-.12.654z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E",
        url: "/my-post"
      },
      {
        name: "likes",
        title: "Нравится",
        image:
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230f1419' %3E%3Cg%3E%3Cpath d='M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E",
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
