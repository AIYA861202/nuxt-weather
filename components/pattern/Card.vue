<script setup>
import dayjs from 'dayjs'
const format = (d) => dayjs(d).format("MM/DD HH:mm");
const props = defineProps({
  wx: {
    type: Object,
    required: true
  },
  pop: {
    type: Object,
    required: true
  },
  mint: {
    type: Object,
    required: true
  },
  cl: {
    type: Object,
    required: true
  },
  maxt: {
    type: Object,
    required: true
  }
})

const buildMap = (arr = [], key, parameterKey = null) => {
  const map = new Map()

  for (const item of arr) {
    const k = `${item.startTime}_${item.endTime}`

    if (!map.has(k)) {
      map.set(k, {
        startTime: item.startTime,
        endTime: item.endTime,
      })
    }

    const row = map.get(k)

    row[key] = item.parameter?.parameterName ?? item.value

    if (parameterKey) {
      row[parameterKey] = item.parameter?.parameterValue
    }
  }

  return map
}

const mergedMap = computed(() => {
  const wx = buildMap(
  props.wx?.time ?? [],
  "wx",
  "parameter"
)
  const pop = buildMap(props.pop?.time ?? [], "pop")
  const mint = buildMap(props.mint?.time ?? [], "minT")
  const maxt = buildMap(props.maxt?.time ?? [], "maxT")
  const cl = buildMap(props.cl?.time ?? [], "cl")

  const allKeys = new Set([
    ...wx.keys(),
    ...pop.keys(),
    ...mint.keys(),
    ...maxt.keys(),
    ...cl.keys()
  ])

  return Array.from(allKeys).map((k) => ({
    ...wx.get(k),
    ...pop.get(k),
    ...mint.get(k),
    ...maxt.get(k),
    ...cl.get(k)
  }))
})

const getBlockLabel = (end) => {
  const now = new Date()

  // 計算時間差（毫秒轉為小時）
  const diffHours = (end - now) / (1000 * 60 * 60)

  if (diffHours <= 12) return "現在"
  
  if (diffHours <= 24) return "12小時後"
  
  if (diffHours <= 36) return "24小時後"

  return "其他"
}

const blocks = computed(() => {
  return mergedMap.value.map((item) => {
    const start = new Date(item.startTime)
    const end = new Date(item.endTime)

    return {
      title: getBlockLabel(end),
      range: `${format(start)} ~ ${format(end)}`,
      wx: item.wx,
      parameter: item.parameter,
      pop: item.pop,
      minT: item.minT,
      maxT: item.maxT,
      cl: item.cl
    }
  })
})
// 卡片 v-Motion
const getCardMotion = (i) => ({
  initial: {
    opacity: 0,
    y: 20
  },
  visibleOnce: {
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 50,
      type: 'keyframes',
      ease: 'easeIn',
      // type: 'spring', // 彈性
      // stiffness: 250
    }
  }
})
</script>
<template>
  <div v-for="(b,i) in blocks" v-motion="getCardMotion(i)" :key="b.range" class="min-w-full lg:min-w-[800px]">
    <div class="font-semibold text-lg">{{ b.title }}</div>
    <div class="text-sm text-gray-500">{{ b.range }}</div>

    <div class="grid grid-cols-1 gap-2 mt-2 sm:grid-cols-2 md:grid-cols-4">
      <div class="border rounded bg-white shadow-md p-2 flex flex-col items-center justify-center">
      <component :is="`wxIcon${b.parameter}`" /><div>{{ b.wx }}</div>
      </div>
      <div class="border rounded bg-white shadow-md p-2 pop" :style="`--pop: ${b.pop / 1.7}px;`"><wave/>
        <div class="absolute z-1">{{ $t("Pop") }} {{ b.pop }}%</div>
      </div>
      <div class="border rounded bg-white shadow-md p-2">{{ $t("TR") }}
        <div>{{ b.minT }}°C ~ {{ b.maxT }}°C</div>
      </div>
      <div class="border rounded bg-white shadow-md p-2">{{ $t("Cl") }}<div>{{ b.cl }}</div></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pop{
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;
  overflow: hidden;
  &:after{
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: var(--pop);
    background-color: color-mix(#6CA3F3 20%, white 80%);
  }
  svg{
    position: absolute;
    bottom: var(--pop);
    left: 0;
    width: 100%;
    height: auto;
  }
}
</style>