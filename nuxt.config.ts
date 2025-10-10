// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   ssr: true, // 開啟 SSR 模式
  nitro: {
    preset: 'github-pages' // 讓 Nuxt 產出 GitHub Pages 相容的靜態檔案
  },
  app: {
    baseURL: '/nuxt-weather/', // 👈 一定要加上你的 repo 名稱（結尾有斜線）
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
