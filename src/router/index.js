import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/views/mainPage.vue";
import Signup from "@/views/signup.vue";

const routes = [
  { path: "/", name: "main", component: MainPage },
  { path: "/signup", name: "signup", component: Signup }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
