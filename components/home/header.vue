<script setup>
import logo from "/public/logo.png";
import { isEmpty } from "lodash-es";
const localePath = useLocalePath();
const props = defineProps({
  webInfo: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <header
    v-if="!isEmpty(props.webInfo)"
    class="flex flex-row justify-between flex-wrap"
  >
    <h1 class="logo text-sky-900 mb-0">
      <NuxtLink class="inline-block" :to="localePath('/')" :title="$t('Home')">
        <img :src="logo" class="min-w-[100px]" alt="" />
        <span class="sr-only">{{ props.webInfo.title }}</span>
      </NuxtLink>
    </h1>
    <HomeLang />
  </header>
</template>
