import { defineStore } from "pinia";

export const useWeatherStore = defineStore("data", {
  state: () => ({
    cities: [
      "宜蘭縣",
      "花蓮縣",
      "臺東縣",
      "澎湖縣",
      "金門縣",
      "連江縣",
      "臺北市",
      "新北市",
      "桃園市",
      "臺中市",
      "臺南市",
      "高雄市",
      "基隆市",
      "新竹縣",
      "新竹市",
      "苗栗縣",
      "彰化縣",
      "南投縣",
      "雲林縣",
      "嘉義縣",
      "嘉義市",
      "屏東縣",
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
      try {
        const data = await $fetch("/api/weather", {
          params: {
            dataset: set,
            locationName: city,
          },
        });

        // data.records.location 已經只包含選中的縣市
        this.cityData = data.records.location;
      } catch (err) {
        this.error = err.message || "取得資料失敗";
      } finally {
        this.loading = false;
      }
    },
  },
});
