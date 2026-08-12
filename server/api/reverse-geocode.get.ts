export default defineEventHandler(async (event) => {
  applyApiCors(event)

  const query = getQuery(event)
  const lat = Number(query.lat)
  const lon = Number(query.lon)

  if (
    !Number.isFinite(lat) ||
    !Number.isFinite(lon) ||
    lat < -90 ||
    lat > 90 ||
    lon < -180 ||
    lon > 180
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid latitude or longitude",
    })
  }

  const result = await $fetch<{ address?: Record<string, string> }>(
    "https://nominatim.openstreetmap.org/reverse",
    {
      query: {
        lat,
        lon,
        format: "jsonv2",
        addressdetails: 1,
        "accept-language": "zh-TW,en",
      },
      headers: {
        "User-Agent": "nuxt-weather/1.0 (weather location lookup)",
      },
    },
  )

  return {
    address: result?.address ?? {},
  }
})
