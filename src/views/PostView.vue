<template>
  <main class="container narrow">
    <section class="content">
      <!-- post title -->
      <h2>Post {{ post && post.id }}</h2>
      <!-- show date if post exists -->
      <p v-if="post">Date: {{ formatDate(post.created_at) }}</p>

      <!-- textarea for editing -->
      <textarea
        v-model="body"
        rows="10"
        style="width: 100%; margin: 12px 0"
      ></textarea>

      <!-- buttons -->
      <div style="display: flex; gap: 8px; margin-top: 8px">
        <button type="button" @click="updatePost">Update</button>
        <button type="button" @click="deletePost">Delete</button>
      </div>

      <!-- error message -->
      <p v-if="error" style="color: red; margin-top: 8px">{{ error }}</p>
    </section>
  </main>
</template>

<script>
// import css
import "@/css/index.css";

export default {
  name: "PostView",
  // component data
  data() {
    return {
      post: null, // the post object
      body: "", // post body text
      error: "", // error message
    };
  },
  // when component loads
  async mounted() {
    // load the post
    await this.loadPost();
  },
  methods: {
    // load post from server
    async loadPost() {
      // clear error
      this.error = "";
      
      try {
        // get post id from route
        const id = this.$route.params.id;
        
        // fetch post
        const res = await fetch(`/api/posts/${id}`, {
          credentials: "include",
        });
        
        // check response
        if (!res.ok) {
          this.error = "Failed to load post";
          return;
        }
        
        // get post data
        this.post = await res.json();
        // set body text
        this.body = this.post.body;
      } catch (e) {
        // catch error
        this.error = "Network error";
      }
    },
    // update post
    async updatePost() {
      // clear error
      this.error = "";
      
      try {
        // get id
        const id = this.$route.params.id;
        
        // send update request
        const res = await fetch(`/api/posts/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ body: this.body }),
        });
        
        // check if ok
        if (!res.ok) {
          this.error = "Update failed";
          return;
        }
        
        // go back to home
        this.$router.push("/home");
      } catch (e) {
        // error
        this.error = "Network error";
      }
    },
    // delete post
    async deletePost() {
      // clear error
      this.error = "";
      
      try {
        // get id
        const id = this.$route.params.id;
        
        // send delete request
        const res = await fetch(`/api/posts/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        
        // check response
        if (!res.ok) {
          this.error = "Delete failed";
          return;
        }
        
        // go to home
        this.$router.push("/home");
      } catch (e) {
        // error
        this.error = "Network error";
      }
    },
    // format date
    formatDate(d) {
      // convert date to string
      return new Date(d).toLocaleString();
    },
  },
};
</script>
