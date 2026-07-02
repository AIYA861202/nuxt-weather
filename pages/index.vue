<script setup>
const { locale } = useI18n()
const store = useWeatherStore()

const currCity = computed(() => {
  const city = store.cities.find(
    (c) => c.name === store.selectedCity || c.enName === store.selectedCity,
  )
  return city ? (locale.value === "zh-TW" ? city.name : city.enName) : ""
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 min-h-[60vh]">
    <HomeSelect />
    <div v-if="store.loading" class="flex items-center gap-2 m-auto text-white">
      <loading class="text-8xl" />
      {{ $t("loading") }}
    </div>
    <div v-else-if="store.error">{{ store.error }}</div>

    <div v-else-if="store.cityData?.length">
      施工中...
      <div class="p-4 mb-4">
        <div class="text-xl text-center font-medium mb-4">
          {{ currCity + " " + $t("weatherForecast") }}
        </div>
        <div class="flex flex-col items-center justify-center gap-4">
          <PatternCard
            :wx="store.cityData[0].weatherElement[0]"
            :pop="store.cityData[0].weatherElement[1]"
            :mint="store.cityData[0].weatherElement[2]"
            :cl="store.cityData[0].weatherElement[3]"
            :maxt="store.cityData[0].weatherElement[4]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
