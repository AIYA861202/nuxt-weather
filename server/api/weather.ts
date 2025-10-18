export default defineEventHandler(async (event) => {
const config = useRuntimeConfig()
const query = getQuery(event)
const apiKey = config.WEATHER_API_KEY
const dataset = query.dataset || 'F-C0032-001'

let cities = query.locationName

  if (!cities) cities = []
  if (!Array.isArray(cities)) cities = [cities]

const url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/${dataset}?Authorization=${apiKey}&format=JSON&locationName=${cities.map(encodeURIComponent).join(',')}`

const data: any = await $fetch(url)
 
return data
})