<template>
  <div class="app">
    <Header />
    <main class="container narrow">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "src/components/header.vue";
import Footer from "src/components/footer.vue";

export default {
  name: "App",
  components: { Header, Footer }
};
</script>
