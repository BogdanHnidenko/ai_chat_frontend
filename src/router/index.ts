import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import ChatLayout from '@/components/layout/ChatLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/chats' },
    { path: '/welcome', component: () => import('@/views/WelcomeView.vue'), meta: { public: true } },
    { path: '/register', component: () => import('@/views/RegisterView.vue'), meta: { public: true } },
    {
      path: '/',
      component: ChatLayout,
      children: [
        { path: 'chats', component: () => import('@/views/ChatsView.vue') },
      ],
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (!auth.isLoggedIn && !to.meta.public) return '/welcome'
})

export default router
