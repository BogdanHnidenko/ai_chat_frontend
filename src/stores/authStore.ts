import { defineStore } from 'pinia'
import { removeToken, removeUserId } from '@/utils/cookies'

export interface UserInterface {
  id: string
  name: string
  email: string
  avatarUrl: string | null
}

const CUEST_KEY = "use_guest_user"

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as UserInterface | null,
    isGuest: JSON.parse(localStorage.getItem(CUEST_KEY) || "false") as boolean
  }),

  getters: {
    isLoggedIn: (state) => state.user !== null,
  },

  actions: {
    setUser(user: UserInterface) {
      this.user = user
    },
    activationGuest() {
      this.isGuest = true
      localStorage.setItem(CUEST_KEY, JSON.stringify(true))
    },
    deactivationGuest() {
      this.isGuest = false
      localStorage.removeItem(CUEST_KEY)
    },

    loginAsGuest() {
      this.user = {
        id: crypto.randomUUID(),
        name: 'Гість',
        email: '',
        avatarUrl: null,
      }
      removeToken()
      removeUserId()
    },

    logout() {
      this.user = null
      this.deactivationGuest()
      removeToken()
      removeUserId()
    },
  },
})



