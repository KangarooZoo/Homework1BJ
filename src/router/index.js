import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Signup from '@/views/signup.vue';
import Home from '@/views/Home.vue';
import AddPost from '@/views/AddPost.vue';
import PostView from '@/views/PostView.vue';
import Contacts from '@/views/Contacts.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/contacts', name: 'Contacts', component: Contacts },
  { path: '/home', name: 'Home', component: Home, meta: { requiresAuth: true } },
  { path: '/addpost', name: 'AddPost', component: AddPost, meta: { requiresAuth: true } },
  { path: '/post/:id', name: 'PostView', component: PostView, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (!to.meta.requiresAuth) return next();

  try {
    const res = await fetch('/auth/authenticate', {
      method: 'GET',
      credentials: 'include',
    });
    const data = await res.json();
    if (data.authenticated) next();
    else next('/login');
  } catch (e) {
    next('/login');
  }
});

export default router;
