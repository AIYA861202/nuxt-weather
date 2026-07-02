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

const buildMap = (arr, key) => {
  const map = new Map()

  for (const item of arr) {
    const k = `${item.startTime}_${item.endTime}`

    if (!map.has(k)) {
      map.set(k, {
        startTime: item.startTime,
        endTime: item.endTime,
      })
    }

    map.get(k)[key] = item.parameter?.parameterName ?? item.value
  }

  return map
}

const mergedMap = computed(() => {
  const wx = buildMap(props.wx?.time ?? [], "wx")
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

const getBlockLabel = (start, now = new Date()) => {
  const hour = new Date(start).getHours()

  if (hour === 6) return "現在至中午"
  if (hour === 12) return "中午至下午"
  if (hour === 18) return "晚間至明早"

  return "其他"
}

const blocks = computed(() => {
  return mergedMap.value.map((item) => {
    const start = new Date(item.startTime)
    const end = new Date(item.endTime)

    return {
      title: getBlockLabel(item.startTime),
      range: `${format(start)} ~ ${format(end)}`,
      wx: item.wx,
      pop: item.pop,
      minT: item.minT,
      maxT: item.maxT,
      cl: item.cl
    }
  })
})
</script>
<template>
  <div v-for="b in blocks" :key="b.range" class="mb-6">
    <div class="font-semibold text-lg">{{ b.title }}</div>
    <div class="text-sm text-gray-500">{{ b.range }}</div>

    <div class="grid grid-cols-1 gap-2 mt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div class="border rounded bg-white shadow-md p-2">{{ $t("Wx") }}<div>{{ b.wx }}</div></div>
      <div class="border rounded bg-white shadow-md p-2">{{ $t("Pop") }}<div>{{ b.pop }}%</div></div>
      <div class="border rounded bg-white shadow-md p-2">{{ $t("TR") }}<div>{{ b.minT }}°C ~ {{ b.maxT }}°C</div></div>
      <div class="border rounded bg-white shadow-md p-2">{{ $t("Cl") }}<div>{{ b.cl }}</div></div>
    </div>
  </div>
</template>
