<script setup>
const { locale, locales, setLocale, setLocaleCookie, switchLocalePath } =
  useI18n();
const lang = computed(() => {
  return locales.value.find((l) => l.code !== locale.value);
});

const setLang = async (newLocale) => {
  if (newLocale === locale.value) return;

  try {
    await setLocale(newLocale);
    await setLocaleCookie(newLocale);
    console.log(`Language switched to: ${newLocale}`);

    await navigateTo(switchLocalePath(newLocale));
  } catch (error) {
    console.error("Language switch failed:", error);
  }
};
</script>

<template>
  <button type="button" :title="$t(`${lang.code}`)" @click="setLang(lang.code)">
    <span
      class="p-3 text-[#ffffff] hover:text-sky-200 transition-colors duration-200"
      >{{ $t(`${lang.code}-s`) }}</span
    >
  </button>
</template>
