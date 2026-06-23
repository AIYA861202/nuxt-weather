// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  //  ssr: true, // 開啟 SSR 模式
  css: ["@/assets/styles/main.scss"],
  vite: {
    // ssr: {
    //   noExternal: ["naive-ui", "vueuc", "vooks", "evtd"],
    // },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/variable.scss";',
        },
      },
    },
  },
  // build: {
  //   transpile: ["naive-ui", "vueuc", "vooks", "evtd"],
  // },
  app: {
    baseURL: "/", //  加上 repo 名稱（結尾有斜線/nuxt-weather/）
  },
  runtimeConfig: {
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
  },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
});
