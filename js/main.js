import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')

/*const App = {
  components: { PostCard },
  computed: {
    posts() { return this.$store.getters.allPosts; }
  },
  created() {
    this.$store.dispatch('fetchPosts');
  },
  methods: {
    resetAll() { this.$store.dispatch('resetAllLikes'); }
  },
  template: `
    <section class="content">
      <div class="posts-grid">
        <PostCard v-for="p in posts" :key="p.id" :post-id="p.id" />
      </div>
      <button id="reset-likes-btn" type="button" @click="resetAll">
        Reset all likes
      </button>
    </section>
  `
};

Vue.createApp(App).use(store).mount('.container.narrow');

