import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Account from '../views/Account.vue';

const routes = [
  { path: '/', name: 'Home', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  { path: '/account', name: 'Account', component: Account, meta: { requiresAuth: true } },
];

// const router = createRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes,
// });

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})



// Middleware do uwierzytelniania
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
