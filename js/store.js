const store = Vuex.createStore({
  state() {
    return {
      posts: []
    };
  },
  mutations: {
    SET_POSTS(state, posts) {
      // Ensure each post has a 'likes' count
      state.posts = posts.map(p => ({ ...p, likes: 0 }));
    },
    INCREMENT_LIKE(state, id) {
      const post = state.posts.find(p => p.id === id);
      if (post) post.likes++;
    },
    RESET_LIKES(state) {
      state.posts.forEach(p => p.likes = 0);
    }
  },
  actions: {
    async fetchPosts({ commit }) {
      const res = await fetch('posts.json');
      const data = await res.json();
      commit('SET_POSTS', data);
    },
    likePost({ commit }, id) {
      commit('INCREMENT_LIKE', id);
    },
    resetAllLikes({ commit }) {
      commit('RESET_LIKES');
    }
  },
  getters: {
    allPosts: s => s.posts,
    getPostById: s => id => s.posts.find(p => p.id === id)
  }
});
