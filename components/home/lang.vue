<script setup>
const store = useWeatherStore()
const { locale, locales, setLocale, setLocaleCookie } =
  useI18n();
const lang = computed(() => {
  return locales.value.find((l) => l.code !== locale.value);
});

const setLang = async (newLocale) => {
  if (newLocale === locale.value) return;

  try {
    store.cityData = null;
    await setLocale(newLocale);
    await setLocaleCookie(newLocale);
    await navigateTo(switchLocalePath(newLocale));
  } catch (error) {
    console.error("Language switch failed:", error);
  }
};
</script>

<template>
  <button type="button" :title="$t(`${lang.code}`)" @click="setLang(lang.code)">
    <span
      class="p-3 text-[#ffffff] hover:text-[var(--color-main-dark)] transition-colors duration-300 whitespace-nowrap"
      >{{ $t(`${lang.code}-s`) }}</span
    >
  </button>
</template>
