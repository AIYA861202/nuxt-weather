<script setup>
const props = defineProps({
  mouseX: {
    type: Number,
    default: 0,
  },
});
// 滑鼠目標幅度
const targetX = ref(0);
// 最終幅度
const animatedX = ref(0);

//讓targetX的值隨著props.mouseX的變化而更新
watch(
  () => props.mouseX,
  (v) => {
    targetX.value = v;
  },
  { immediate: true },
);

const hillPath = computed(() => {
  const basePeakX = 500;

  const offset = animatedX.value * 280; //自訂乘數越大幅度越大

  return `
    M 0 300
    L 0 180
    Q ${basePeakX + offset} 40 1000 180
    L 1000 300
    Z
  `;
});

const animate = () => {
  animatedX.value += (targetX.value - animatedX.value) * 0.08;
  requestAnimationFrame(animate);
};

onMounted(() => {
  animate();
});
</script>

<template>
  <svg
    class="absolute bottom-0 left-0 w-full h-[35vh]"
    viewBox="0 0 1000 300"
    preserveAspectRatio="none"
  >
    <path :d="hillPath" fill="url(#hillGradient)" />
    <defs>
      <radialGradient
        id="hillGradient"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(500 100) rotate(90) scale(211 1055)"
      >
        <stop stop-color="#FFBDBD" />
        <stop offset="0.6" stop-color="#BB94BD" />
        <stop offset="1" stop-color="#8278B8" />
      </radialGradient>
    </defs>
  </svg>
</template>

<style scoped lang="scss"></style>
