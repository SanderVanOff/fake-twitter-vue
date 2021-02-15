import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";

export default {
  state: {
    posts: []
  },
  mutations: {
    //добавляем новый пост в стэйт
    SET_POST_TO_STATE(state, post) {
      state.posts.unshift(post);
    },
    //добавляем полученные из БД посты в стэйт
    SET_ALL_POST_TO_STATE(state, allPosts) {
      state.posts = allPosts;
    },
    //удаляем нужны пост из стейта
    REMOVE_POST_FROM_STATE(state, index) {
      state.posts.splice(index, 1);
    },
    //добавление лайка
    ADD_LIKE_POST(state, payload) {
      const post = state.posts.find((item) => item.id === payload.id);
      post.likes.push(payload.currentNicknameUser);
    },
    //удаление лайка
    DELETE_LIKE_POST(state, { id, currentNicknameUser }) {
      const post = state.posts.find((item) => item.id === id);
      const indexLike = post.likes.indexOf(currentNicknameUser);
      post.likes.splice(indexLike, 1);
    }
  },
  actions: {
    //создание нового поста
    async getNewPost({ commit }, { post, fileImg }) {
      commit("CLEAR_ERROR");
      commit("SET_LOADING", true);
      try {
        await firebase.database().ref(`posts/${post.id}`).set(post);

        if (fileImg) {
          await firebase
            .storage()
            .ref(`postImg/${post.id}/${fileImg.name}`)
            .put(fileImg);

          const imageSrc = await firebase
            .storage()
            .ref(`postImg/${post.id}/${fileImg.name}`)
            .getDownloadURL();

          await firebase
            .database()
            .ref(`posts/${post.id}`)
            .update({ image: imageSrc });

            post.image = imageSrc;
        }

        commit("SET_POST_TO_STATE", post);
        commit("SET_LOADING", false);
      } catch (err) {
        commit("SET_LOADING", false);
        commit("SET_ERROR", err);
        throw err;
      }
    },
    //получение постов из БД
    async fetchAllPosts({ commit }) {
      try {
        const allPosts = [];
        const posts = (
          await firebase.database().ref(`posts`).once("value")
        ).val();

        Object.keys(posts).forEach((key) => {
          allPosts.unshift(posts[key]);
        });

        commit("SET_ALL_POST_TO_STATE", allPosts);
      } catch (err) {
        console.log(err);
      }
    },
    //удаление поста
    async removePost({ commit, getters }, { id, image }) {
      commit("CLEAR_ERROR");
      commit("SET_LOADING", true);
      
      try {
        await firebase.database().ref(`posts/${id}`).remove();

        if (image) {
          let imgSrc = firebase.storage().refFromURL(image);
          //удаляем картинку из хранилища
          await imgSrc.delete();
        }
        let index = getters.ALL_POSTS.findIndex((item) => item.id === id);
        commit("REMOVE_POST_FROM_STATE", index);
        commit("SET_LOADING", false);
      } catch (err) {
        commit("SET_LOADING", false);
        console.log(err);
        commit("SET_ERROR", err);
        throw err;
      }
    },
    //лайк поста
    async LikesPost({ commit, getters }, { id, currentNicknameUser }) {
      const changePost = getters["ALL_POSTS"].find((post) => post.id === id);
      if (changePost.likes.includes(currentNicknameUser)) {
        await commit("DELETE_LIKE_POST", { id, currentNicknameUser });
      } else {
        await commit("ADD_LIKE_POST", { id, currentNicknameUser });
      }
      await firebase.database().ref(`posts/${id}/likes`).set(changePost.likes);
    },
    //добавление комментария
    async getNewComment({commit, getters}, comment){
      const postForComment = getters["ALL_POSTS"].find((post) => post.id === comment.postId);

      if(!postForComment.comments) {
        postForComment.comments = [];
      }
      postForComment.comments.push(comment);

      await firebase.database().ref(`posts/${comment.postId}/comments`).set(postForComment.comments)

    }
  },
  getters: {
    ALL_POSTS: (state) => state.posts
  }
};
