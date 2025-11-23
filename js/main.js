const App = {
  components: { PostCard },
  computed: {
    posts() { return this.$store.getters.allPosts; }
  },
  created() {
    this.$store.dispatch('fetchPosts');
  },
  template: `
    <section class="posts-grid">
      <PostCard v-for="p in posts" :key="p.id" :post-id="p.id" />
    </section>
  `
};

Vue.createApp(App).use(store).mount('.posts-grid');
