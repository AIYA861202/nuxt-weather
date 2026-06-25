<script setup>
import logo from "/public/logo.png";
import { isEmpty } from "lodash-es";
const props = defineProps({
  webInfo: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <header v-if="!isEmpty(props.webInfo)" class="flex flex-row justify-between">
    <h1 class="logo text-sky-900 mb-0">
      <NuxtLink class="inline-block" :to="'/'" :title="$t('Home')">
        <img :src="logo" alt="" />
        <span class="sr-only">{{ props.webInfo.title }}</span>
      </NuxtLink>
    </h1>
    <HomeLang />
  </header>
</template>
