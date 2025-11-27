<template>
  <div class="page-main">
    <main class="container narrow">
      <section class="content">
        <div class="posts-grid">
          <post
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
import post from "@/components/post.vue";

export default {
  name: "MainPage",
  components: {
    post
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
