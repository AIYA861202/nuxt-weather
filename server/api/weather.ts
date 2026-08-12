export default defineEventHandler(async (event) => {
  applyApiCors(event);

  if (getMethod(event) === "OPTIONS") {
    setResponseStatus(event, 204);
    return null;
  }

  const config = useRuntimeConfig();
  const query = getQuery(event);
  const apiKey = config.WEATHER_API_KEY;

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "WEATHER_API_KEY is not configured",
    });
  }
  const dataset = String(query.dataset || "F-C0032-001");

  let cities = query.locationName;

  if (!cities) cities = [];
  if (!Array.isArray(cities)) cities = [cities];

  const cityNames = cities.map(String);

  // F-C0032-002 只提供 JSON/XML 檔案下載，不支援 REST datastore 查詢
  if (dataset === "F-C0032-002") {
    const url = new URL(
      `https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/${dataset}`,
    );
    url.searchParams.set("Authorization", apiKey);
    url.searchParams.set("format", "JSON");

    const data: any = await $fetch(url.toString(), {
      responseType: "json",
    });
    const locations = data?.cwaopendata?.dataset?.location;

    if (!Array.isArray(locations)) {
      throw createError({
        statusCode: 502,
        statusMessage: "Invalid weather data returned by CWA",
      });
    }

    return {
      success: "true",
      records: {
        location: cityNames.length
          ? locations.filter((location: any) =>
              cityNames.includes(location.locationName),
            )
          : locations,
      },
    };
  }

  const url = new URL(
    `https://opendata.cwa.gov.tw/api/v1/rest/datastore/${dataset}`,
  );
  url.searchParams.set("Authorization", apiKey);
  url.searchParams.set("format", "JSON");
  if (cityNames.length) url.searchParams.set("locationName", cityNames.join(","));

  return await $fetch(url.toString());
});
