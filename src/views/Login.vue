<template>
  <div>
    <div class="flex-container">
      <div class="flex-item">
        <div class="login-container">
          <h2>Welcome to PostIt</h2>
          <router-link to="/signup">Create an account</router-link>
          <p>or <br /> Login to your existing account</p>

          <form class="login-form" @submit.prevent="submit">
            <input
              placeholder="Email"
              type="email"
              id="email"
              name="email"
              v-model="email"
              required
            />
            <input
              placeholder="Password"
              type="password"
              id="password"
              name="password"
              v-model="password"
              required
            />

            <button id="login-btn" type="submit">Login</button>
          </form>

          <p v-if="error" style="color:red;margin-top:8px;">{{ error }}</p>
        </div>
      </div>
      <div class="flex-item"></div>
      <div class="flex-item"></div>
    </div>
  </div>
</template>

<script>
import "@/css/style.css";
import "@/css/login.css";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async submit() {
      this.error = "";
      try {
        const res = await fetch("/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email: this.email, password: this.password }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          this.error = data.message || "Login failed";
          return;
        }

        this.$router.push("/home");
      } catch (e) {
        this.error = "Network error";
      }
    },
  },
};
</script>
