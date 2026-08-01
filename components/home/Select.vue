<script setup>
const { locale } = useI18n();
const store = useWeatherStore();
const dataset = locale.value === "zh-TW" ? "F-C0032-001" : "F-C0032-002";

const selectCity = async (city) => {
  if (!city) return;
console.log(`Selected city: ${city}`);
  await store.fetchWeather(dataset, city);
};
</script>

<template>
  <select
    class="form-select p-3 shadow-sm"
    @change="selectCity($event.target.value)"
  >
    <option disabled selected value="" class="rounded-md">
      {{ $t("selectCity") }}
    </option>
    <option
      v-for="c in store.cities"
      :key="locale === 'zh-TW' ? c.name : c.enName"
      :value="locale === 'zh-TW' ? c.name : c.enName"
    >
      {{ locale === 'zh-TW' ? c.name : c.enName }}
    </option>
  </select>
</template>
