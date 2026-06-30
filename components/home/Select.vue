<script setup>
const { locale } = useI18n();
const store = useWeatherStore();
const dataset = "F-C0032-001";

const selectCity = async (city) => {
  if (!city) return;

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
      :value="c.name"
    >
      {{ locale === "zh-TW" ? c.name : c.enName }}
    </option>
  </select>
</template>
