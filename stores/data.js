import { defineStore } from "pinia";

export const useWeatherStore = defineStore("data", {
  state: () => ({
    cities: [
      { name: "宜蘭縣", station: "467080" },
      { name: "桃園市", station: "467050" },
      { name: "新竹縣", station: "467571" },
      { name: "苗栗縣", station: "467490" },
      { name: "彰化縣", station: "467270" },
      { name: "南投縣", station: "467650" },
      { name: "雲林縣", station: "467590" },
      { name: "嘉義縣", station: "467480" },
      { name: "屏東縣", station: "467590" },
      { name: "臺東縣", station: "467660" },
      { name: "花蓮縣", station: "466990" },
      { name: "澎湖縣", station: "467350" },
      { name: "基隆市", station: "466940" },
      { name: "新竹市", station: "467571" },
      { name: "嘉義市", station: "467480" },
      { name: "臺北市", station: "466920" },
      { name: "高雄市", station: "467440" },
      { name: "新北市", station: "466880" },
      { name: "臺中市", station: "467490" },
      { name: "臺南市", station: "467410" },
      { name: "連江縣", station: "467990" },
      { name: "金門縣", station: "467110" },
    ],
    selectedCity: "",
    cityData: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchWeather(set, city) {
      this.selectedCity = city;
      this.loading = true;
      this.error = null;
      this.cityData = null;

      try {
        const data = await $fetch("/api/weather", {
          params: {
            dataset: set,
            locationName: city,
          },
        });

        const location = data?.records?.location;

        if (!Array.isArray(location)) {
          throw new Error(data?.message || data?.records?.message || "查無天氣資料");
        }

        this.cityData = location;
      } catch (err) {
        this.error = err?.message || "取得天氣資料失敗";
      } finally {
        this.loading = false;
      }
    },
  },
});
