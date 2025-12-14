<template>
  <main class="flex-container">
    <section class="card">
      <h1 class="h2">Add New Post</h1>
      <!-- form for adding post -->
      <form class="post-form" @submit.prevent="submit">
        <div class="form-field">
          <label for="body">Body:</label>
          <!-- textarea for post content -->
          <textarea
            id="body"
            name="body"
            rows="10"
            v-model="body"
            required
          ></textarea>
        </div>

        <div class="button">
          <!-- submit button -->
          <button type="submit" class="submit-button">Submit Post</button>
        </div>
      </form>
      <!-- show error if there is one -->
      <p v-if="error" style="color:red;margin-top:8px;">{{ error }}</p>
    </section>
  </main>
</template>

<script>
// import styles
import "@/css/style.css";
import "@/css/addPost.css";

export default {
  name: "AddPost",
  // component data
  data() {
    return {
      body: "", // post body text
      error: "", // error message
    };
  },
  methods: {
    // submit form
    async submit() {
      // clear error
      this.error = "";
      
      try {
        // send post to server
        const res = await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ body: this.body }),
        });
        
        // check if ok
        if (!res.ok) {
          this.error = "Failed to add post";
          return;
        }
        
        // go to home page
        this.$router.push("/home");
      } catch (e) {
        // catch errors
        this.error = "Network error";
      }
    },
  },
};
</script>