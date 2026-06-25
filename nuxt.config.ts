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
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss",'@nuxtjs/i18n'],
    // modules config
  i18n: {
    strategy: 'prefix_except_default', // 更換語系網址不變
    locales: [
      {
        code: 'zh-TW', // 中文
        file: 'zh-TW.json'
      },
      {
        code: 'en-US', // 英文
        file: 'en-US.json'
      }
    ],
    langDir: 'language', // 語系包位置
    defaultLocale: 'zh-TW', // 預設中文
    detectBrowserLanguage: false, // 不自動偵測瀏覽器語系

    defaultDirection: 'ltr',
    routesNameSeparator: '___',
    trailingSlash: false,
    defaultLocaleRouteNameSuffix: 'default',
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
}as any);
