// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  //  ssr: true, // 開啟 SSR 模式
  css: ['@/assets/styles/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/variable.scss";'
        }
      }
    },
  },
  nitro: {
    preset: 'github-pages' // 讓 Nuxt 產出 GitHub Pages 相容的靜態檔案
  },
  app: {
    baseURL: '/', // 👈 一定要加上你的 repo 名稱（結尾有斜線）/nuxt-weather/
  },
  runtimeConfig: {
  public: {
    weatherApiKey: process.env.WEATHER_API_KEY,
  },
},
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
