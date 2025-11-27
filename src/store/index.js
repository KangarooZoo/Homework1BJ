// /store/index.js
import { createStore } from 'vuex'

import rawPosts from '/posts.json'


export default createStore({
  strict: true,

  state: {
    // add likes to each post
    postList: rawPosts.map(p => ({ ...p, likes: 0 }))
  },

  getters: {
    // all posts
    allPosts: state => state.postList,

    // get a single post by id
    postById: state => id =>
      state.postList.find(p => p.id === id)
  },

  mutations: {
    IncreaseLike(state, postId) {
      const post = state.postList.find(p => p.id === postId);
      if (post) {
        post.likes++;
      }
    },
    ResetAllLikes(state) {
    state.postList.forEach(p => {
      p.likes = 0;
    });
  }
  },

  actions: {
    IncreaseLikeAct({ commit }, postId) {
      setTimeout(() => {
        commit('IncreaseLike', postId);
      }, 1000);
    },
    resetAllLikes({ commit }) {
    commit("ResetAllLikes");
  }
  }
});