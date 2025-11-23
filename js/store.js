const store = Vuex.createStore({
  state() {
    return { posts: [] };
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    }
  },
  actions: {
    async fetchPosts({ commit }) {
      const res = await fetch("posts.json");
      const data = await res.json();
      commit("SET_POSTS", data);
    }
  },
  getters: {
    allPosts: (s) => s.posts,
    getPostById: (s) => (id) => s.posts.find(p => p.id === id)
  }
});
