<template>
  <div class="app">
    <SiteHeader />
    <main class="container narrow">
      <router-view />
    </main>
    <SiteFooter />
  </div>
</template>

<script>
import SiteHeader from "@/components/header.vue";
import SiteFooter from "@/components/footer.vue";

export default {
  name: "App",
  components: { SiteHeader, SiteFooter }
};
</script>
