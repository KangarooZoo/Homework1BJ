<template>
  <div class="page-main">
    <main class="container narrow">
      <section class="content">
        <div class="posts-grid">
          <BlogPost
            v-for="post in posts"
            :key="post.id"
            :post-id="post.id"
          />
        </div>

        <button
          id="reset-likes-btn"
          type="button"
          @click="resetAllLikes"
        >
          Reset all likes
        </button>
      </section>
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BlogPost from "@/components/post.vue";
import "@/css/index.css";
import "@/css/post.css";

export default {
  name: "MainPage",
  components: {
    BlogPost
  },
  data() {
    return {
      isUserMenuOpen: false
    };
  },
  computed: {
    ...mapGetters({
      posts: "allPosts"
    })
  },
  methods: {
    toggleUserMenu() {
      this.isUserMenuOpen = !this.isUserMenuOpen;
    },
    resetAllLikes() {
      this.$store.dispatch("resetAllLikes");
    }
  }
};
</script>
