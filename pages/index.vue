<script setup>
const { locale } = useI18n()
const store = useWeatherStore()
const { searchByPosition } = useSearchByPosition()

const currCity = computed(() => {
  const city = store.cities.find(
    (c) => c.name === store.selectedCity || c.enName === store.selectedCity,
  )
  return city ? (locale.value === "zh-TW" ? city.name : city.enName) : ""
})



onMounted(() => {
  if (!("geolocation" in navigator) || store.selectedCity) return

  navigator.geolocation.getCurrentPosition(
    searchByPosition,
    (error) => {
      if(locale.value === "zh-TW") console.warn("無法從目前位置搜尋天氣資訊，請允許使用位置資訊", error)
      else
      console.warn("Please allow location access", error)
    },
    { timeout: 10000, maximumAge: 300000 },
  )
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 min-h-[60vh]">
    <HomeSelect />
    <div v-if="store.loading" class="flex items-center gap-2 m-auto">
      <loading class="text-8xl" />
      {{ $t("loading") }}
    </div>
    <div v-else-if="store.error">{{ store.error }}</div>

    <div v-else-if="store.cityData?.length">
      <div class="p-1 mb-4 lg:p-4 md:p-2">
        <div class="text-xl text-center font-medium mb-2">
          {{ currCity + " " + $t("weatherForecast") }}
        </div>
        <div class="flex flex-col items-center justify-center gap-3 lg:gap-4">
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
