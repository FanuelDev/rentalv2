// stores/authStore.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { id: number; nom: string; email: string },
    token: '',
  }),
  actions: {
    setUser(user: any, token: string) {
      this.user = user
      this.token = token
    },
    logout() {
      this.user = null
      this.token = ''
    },
  },
})
