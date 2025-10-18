<script setup>
import { useWeatherStore } from '~/stores/data'

const store = useWeatherStore()

const dataset = 'F-C0032-001'
const selectCity = async (city) => {
  await store.fetchWeather(dataset, city)
}
</script>

<template>
  <div>
    <h1>選擇縣市</h1>
    <select @change="selectCity($event.target.value)">
      <option disabled selected value="">請選擇</option>
      <option v-for="c in store.cities" :key="c" :value="c">{{ c }}</option>
    </select>

    <div v-if="store.loading">載入中...</div>
    <div v-else-if="store.error">{{ store.error }}</div>
    
    <div v-else-if="store.cityData">
      <h2 class="text-xl font-semibold mb-2">{{ store.selectedCity }} 天氣預報</h2>

      <div v-for="loc in store.cityData" :key="loc.locationName" class="border p-4 rounded mb-4 shadow">
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="el in loc.weatherElement" :key="el.elementName" class="border p-2 rounded bg-gray-50">
            <h4 class="font-semibold">{{ el.elementName }}</h4>
            <ul>
              <li v-for="t in el.time" :key="t.startTime">
                <span class="font-mono">{{ t.startTime }} ~ {{ t.endTime }}:</span>
                {{ t.parameter.parameterName }} {{ t.parameter.parameterUnit || '' }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.link{
  color: $main;
}
</style>