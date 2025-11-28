<template>
  <header id="index-header" class="index-header">
    <div class="left-side">
      <nav>
        <router-link to="/" class="nav-link">Home</router-link>
        <!--<router-link to="/add-post" class="nav-link">Add Post</router-link>
        <router-link to="/login" class="nav-link">Login</router-link>-->
        <router-link to="/signup" class="nav-link">Signup</router-link>
      </nav>
    </div>

    <div class="right-side">
      <div class="user-menu">
        <img
          src="@/assets/alternative.jpg"
          alt="User photo"
          class="profile-image"
          @click="toggleMenu"
        />

        <div class="dropdown" :class="{ show: dropdownOpen }">
          <p class="name"><strong>{{ userName }}</strong></p>
          <p class="email">{{ userEmail }}</p>
          <a class="logout" href="#" >Logout</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "SiteHeader",

  data() {
    return {
      dropdownOpen: false,
      userName: "Name",          
      userEmail: "name@example.com"
    };
  },

  methods: {
    toggleMenu() {
      this.dropdownOpen = !this.dropdownOpen;
    },

  }
};
</script>

