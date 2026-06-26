<script setup>
import logo from "/public/logo.png";
import ogImg from "/public/og_IMG.png";
const store = useWeatherStore();
const { webInfo } = storeToRefs(store);
const { locale, t } = useI18n();
const url = useRequestURL();
const isoCode = {
  "zh-TW": "zh-Hant",
  "en-US": "en",
};

let stopWatcher = null;
stopWatcher = watch(
  locale,
  async (newVal) => {
    await store.getWebInfo(newVal);
  },
  {
    immediate: true,
  },
);

const currentInfo = computed(() => {
  return webInfo.value;
});

watchEffect(() => {
  if (!currentInfo.value) return;
  setSEO(currentInfo.value);
});
onBeforeUnmount(() => {
  if (stopWatcher) {
    stopWatcher();
  }
});

function setSEO(info) {
  useHead({
    htmlAttrs: {
      lang: isoCode[locale.value] || "zh-TW",
    },
  });

  useSeoMeta({
    title: info.seo_title || t("Title"),
    keywords: info.seo_keywords || "",
    description: info.seo_description || "",
    ogTitle: info.seo_title || t("Title"),
    ogDescription: info.seo_description || "",
    ogImage: ogImg,
    ogUrl: url.href,
    twitterTitle: info.seo_title || t("Title"),
    twitterImage: ogImg,
    twitterDescription: info.seo_description || "",
  });
}
// 山坡移動寬幅
const targetX = ref(0);
const handleMove = (e) => {
  const w = window.innerWidth;

  targetX.value = (e.clientX / w - 0.5) * 2;

  console.log("parent:", targetX.value);
};
</script>

<template>
  <div class="p-8 pt-1 bg" @mousemove="handleMove">
    <HomeBgHill :mouse-x="targetX" />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.bg {
  background: linear-gradient(to bottom, #6ca3f3 0%, #addcf3 60%, #ffffff 100%);
  height: 100vh;
  position: relative;
  overflow: hidden;
}
</style>
