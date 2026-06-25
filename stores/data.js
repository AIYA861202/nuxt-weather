import { defineStore } from "pinia";

export const webInfoMock = {
  "zh-TW": {
    title: "臺灣氣象查詢",
    keywords: "臺灣氣象, 天氣預報, 氣象資料",
    description:
      "提供臺灣氣象資料查詢，包含各地區的天氣預報、氣象觀測資料等資訊。",
    ogTitle: "臺灣氣象查詢",
    ogDescription:
      "提供臺灣氣象資料查詢，包含各地區的天氣預報、氣象觀測資料等資訊。",
    twitterTitle: "臺灣氣象查詢",
    twitterDescription:
      "提供臺灣氣象資料查詢，包含各地區的天氣預報、氣象觀測資料等資訊。",
  },
  "en-US": {
    title: "Taiwan Weather Inquiry",
    keywords: "Taiwan weather, weather forecast, meteorological data",
    description:
      "Provides weather information for Taiwan, including weather forecasts and meteorological observation data for various regions.",
    ogTitle: "Taiwan Weather Inquiry",
    ogDescription:
      "Provides weather information for Taiwan, including weather forecasts and meteorological observation data for various regions.",
    twitterTitle: "Taiwan Weather Inquiry",
    twitterDescription:
      "Provides weather information for Taiwan, including weather forecasts and meteorological observation data for various regions.",
  },
};

export const useWeatherStore = defineStore("data", {
  state: () => ({
    cities: [
      { name: "宜蘭縣", station: "467080", enName: "Yilan County" },
      { name: "桃園市", station: "467050", enName: "Taoyuan City" },
      { name: "新竹縣", station: "467571", enName: "Hsinchu County" },
      { name: "苗栗縣", station: "467490", enName: "Miaoli County" },
      { name: "彰化縣", station: "467270", enName: "Changhua County" },
      { name: "南投縣", station: "467650", enName: "Nantou County" },
      { name: "雲林縣", station: "467590", enName: "Yunlin County" },
      { name: "嘉義縣", station: "467480", enName: "Chiayi County" },
      { name: "屏東縣", station: "467590", enName: "Pingtung County" },
      { name: "臺東縣", station: "467660", enName: "Taitung County" },
      { name: "花蓮縣", station: "466990", enName: "Hualien County" },
      { name: "澎湖縣", station: "467350", enName: "Penghu County" },
      { name: "基隆市", station: "466940", enName: "Keelung City" },
      { name: "新竹市", station: "467571", enName: "Hsinchu City" },
      { name: "嘉義市", station: "467480", enName: "Chiayi City" },
      { name: "臺北市", station: "466920", enName: "Taipei City" },
      { name: "高雄市", station: "467440", enName: "Kaohsiung City" },
      { name: "新北市", station: "466880", enName: "New Taipei City" },
      { name: "臺中市", station: "467490", enName: "Taichung City" },
      { name: "臺南市", station: "467410", enName: "Tainan City" },
      { name: "連江縣", station: "467990", enName: "Lienchiang County" },
      { name: "金門縣", station: "467110", enName: "Kinmen County" },
    ],
    selectedCity: "",
    cityData: null,
    loading: false,
    error: null,
    // 基本資訊
    webInfo: null,
  }),

  actions: {
    async fetchWeather(set, city) {
      this.selectedCity = city;
      this.loading = true;
      this.error = null;
      this.cityData = null;

      const minLoadingMs = 2000; // 最小載入時間，避免閃爍
      const startTime = Date.now();

      try {
        const data = await $fetch("/api/weather", {
          params: {
            dataset: set,
            locationName: city,
          },
        });

        const location = data?.records?.location;

        if (!Array.isArray(location)) {
          throw new Error(
            data?.message || data?.records?.message || "查無天氣資料",
          );
        }

        this.cityData = location;
      } catch (err) {
        this.error = err?.message || "取得天氣資料失敗";
      } finally {
        const elapsed = Date.now() - startTime;
        if (elapsed < minLoadingMs) {
          await new Promise((resolve) =>
            setTimeout(resolve, minLoadingMs - elapsed),
          );
        }
        this.loading = false;
      }
    },
    // 基本資訊
    async getWebInfo(locale) {
      // mock 模式
      this.webInfo = webInfoMock[locale] || webInfoMock["zh-TW"];
    },
  },
});
