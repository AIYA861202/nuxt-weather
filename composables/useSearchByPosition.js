export const useSearchByPosition = () => {
  const { locale } = useI18n()
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase.replace(/\/$/, "")
  const store = useWeatherStore()


  const findCity = (address = {}) => {
    const addressNames = [
      address.city,
      address.county
    ]
      .filter(Boolean)
      

    return store.cities.find((city) => {
      return addressNames.some(
        (name) =>
          name === city.name ||
          name === city.enName
      )
    })
  }

  const searchByPosition = async (position) => {
    try {
      const { address } = await $fetch(`${apiBase}/api/reverse-geocode`, {
        params: {
          lat: position.coords.latitude, //緯度
          lon: position.coords.longitude, //經度
        },
      })
      const city = findCity(address)

      if (!city || store.selectedCity) return

      const cityName = locale.value === "zh-TW" ? city.name : city.enName
      const dataset = locale.value === "zh-TW" ? "F-C0032-001" : "F-C0032-002"
      await store.fetchWeather(dataset, cityName)
    } catch (error) {
      console.warn("Unable to search weather from the current location", error)
    }
  }

  return {
    searchByPosition,
  }
}
