export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      aiStore: useAiStore()
    }
  }
})
