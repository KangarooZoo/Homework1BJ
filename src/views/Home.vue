<template>
  <div class="page-main">
    <main class="container narrow">
      <section class="content">
        <!-- buttons -->
        <div style="margin-bottom: 16px; display: flex; gap: 8px;">
          <button type="button" @click="logout">Logout</button>
          <button type="button" @click="$router.push('/addpost')">Add post</button>
          <button type="button" @click="deleteAll">Delete all</button>
        </div>

        <!-- error message -->
        <div v-if="error" style="color:red;margin-bottom: 8px;">{{ error }}</div>

        <!-- posts list -->
        <div class="posts-grid">
          <!-- loop through posts -->
          <article
            v-for="post in posts"
            :key="post.id"
            class="post-card"
          >
            <a href="#" @click.prevent="openPost(post.id)">
              <div class="post-header">
                <!-- show date -->
                <span class="post-date">{{ formatDate(post.created_at) }}</span>
              </div>
              <!-- post content -->
              <p class="post-content">{{ post.body }}</p>
            </a>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
// import css files
import "@/css/index.css";
import "@/css/post.css";

export default {
  name: "HomeView",
  // data for component
  data() {
    return {
      posts: [], // array of posts
      error: "", // error message
    };
  },
  // when component loads
  async mounted() {
    // load posts
    await this.loadPosts();
  },
  methods: {
    // load posts from server
    async loadPosts() {
      // clear error
      this.error = "";
      
      try {
        // fetch posts
        const res = await fetch("/api/posts", {
          credentials: "include",
        });
        
        // check response
        if (!res.ok) {
          this.error = "Failed to load posts";
          return;
        }
        
        // get posts data
        this.posts = await res.json();
      } catch (e) {
        // catch error
        this.error = "Network error";
      }
    },
    // open a post
    openPost(id) {
      // go to post page
      this.$router.push(`/post/${id}`);
    },
    // logout function
    async logout() {
      try {
        // call logout endpoint
        await fetch("/auth/logout", {
          method: "POST",
          credentials: "include",
        });
      } finally {
        // go to login page
        this.$router.push("/login");
      }
    },
    // delete all posts
    async deleteAll() {
      // clear error
      this.error = "";
      
      try {
        // delete all posts
        const res = await fetch("/api/posts", {
          method: "DELETE",
          credentials: "include",
        });
        
        // check if ok
        if (!res.ok) {
          this.error = "Failed to delete posts";
          return;
        }
        
        // reload posts
        await this.loadPosts();
      } catch (e) {
        // error
        this.error = "Network error";
      }
    },
    // format date
    formatDate(d) {
      // convert to date string
      return new Date(d).toLocaleString();
    },
  },
};
</script>