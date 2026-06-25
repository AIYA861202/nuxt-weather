<script setup>
const { locale } = useI18n();
const store = useWeatherStore();
const dataset = "F-C0032-001";
const selectCity = async (city) => {
  if (!city) return;

  await store.fetchWeather(dataset, city);
};

const { webInfo } = storeToRefs(store);

const currCity = computed(() => {
  const city = store.cities.find(
    (c) => c.name === store.selectedCity || c.enName === store.selectedCity,
  );
  return city ? (locale.value === "zh-TW" ? city.name : city.enName) : "";
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <HomeHeader :webInfo="webInfo" />
    <select
      class="form-select shadow-sm"
      @change="selectCity($event.target.value)"
    >
      <option disabled selected value="" class="rounded-md">
        {{ $t("selectCity") }}
      </option>
      <option
        v-for="c in store.cities"
        :key="locale === 'zh-TW' ? c.name : c.enName"
        :value="c.name"
      >
        {{ locale === "zh-TW" ? c.name : c.enName }}
      </option>
    </select>

    <div v-if="store.loading" class="flex items-center gap-2 m-auto text-white">
      <loading class="text-8xl" />
      {{ $t("loading") }}
    </div>
    <div v-else-if="store.error">{{ store.error }}</div>

    <div v-else-if="store.cityData?.length">
      <div
        v-for="loc in store.cityData"
        :key="loc.locationName"
        class="p-4 pt-0 mb-4"
      >
        <div class="text-xl text-center font-medium mb-4">
          {{ currCity + " " + $t("weatherForecast") }}
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="el in loc.weatherElement"
            :key="el.elementName"
            class="border p-2 rounded bg-gray-50 shadow-md"
          >
            <div class="font-semibold">{{ el.elementName }}</div>
            <ul class="ul">
              <li class="li" v-for="t in el.time" :key="t.startTime">
                <span class="font-mono"
                  >{{ t.startTime }} ~ {{ t.endTime }}:</span
                >
                {{ t.parameter.parameterName }}
                {{ t.parameter.parameterUnit || "" }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.link {
  color: $main;
}
</style>
