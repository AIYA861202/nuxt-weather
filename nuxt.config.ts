// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: "/", //  加上 repo 名稱（結尾有斜線/nuxt-weather/）
    head: {
      htmlAttrs: {
        lang: 'zh-Hant'
      },
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        },
        {
          // AI精靈css
          rel: 'stylesheet',
          href: 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css'
        }
      ],
      script: [
        {
          // AI精靈 js
          // src: 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js'
          src: 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1'
        }
      ],
      noscript: [{ children: 'Javascript is required' }]
    }
  },
  //  ssr: true, // 開啟 SSR 模式
  css: ["@/assets/styles/main.scss"],
  vite: {
    // ssr: {
    //   noExternal: ["naive-ui", "vueuc", "vooks", "evtd"],
    // },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: '@use "@/assets/styles/variable.scss";',
        },
      },
    },
  },
  // build: {
  //   transpile: ["naive-ui", "vueuc", "vooks", "evtd"],
  // },
  runtimeConfig: {
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
    public: {
      // Keep this empty for the Vercel website (same-origin /api requests).
      // Set NUXT_PUBLIC_API_BASE to the production Vercel URL when building
      // the static bundle copied into Capacitor.
      apiBase:
        process.env.NUXT_PUBLIC_API_BASE ||
        process.env.NUXT_PUBLIC_APP_URL ||
        "",
    },
  },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss","@nuxtjs/i18n", "dayjs-nuxt", "@nuxt/icon", "@vueuse/motion/nuxt"],
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
  dayjs: {
    locales: ["en", "zh-tw"],
    defaultLocale: "zh-tw",
    plugins: ["relativeTime", "utc", "timezone"],
    defaultTimezone: "Asia/Taipei",
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
}as any);
