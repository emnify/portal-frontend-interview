import { createRouter, createWebHistory } from 'vue-router'
import SignInView from '@/views/SignInView.vue'
import { useAuthStore } from '@/stores/auth'
import LayoutMain from '@/components/layout/LayoutMain.vue'
import { routeNames } from '@/router/routeNames'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/sign-in',
      name: routeNames.signIn,
      component: SignInView,
      meta: { requiresGuest: true }
    },
    {
      path: '/',
      meta: { requiresAuth: true },
      component: LayoutMain,
      children: [
        {
          path: 'dashboard',
          name: routeNames.dashboard,
          component: () => import('@/views/DashboardView.vue'),
        },
        {
          path: 'users',
          name: routeNames.users,
          component: () => import('@/views/UsersView.vue'),
        },
      ]
    },
  ],
})

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);

  if (requiresAuth && !authStore.isAuthenticated) {
    next({ name: routeNames.signIn });
  } else if (requiresGuest && authStore.isAuthenticated) {
    next({ name: routeNames.dashboard });
  } else {
    next();
  }
})

export default router
