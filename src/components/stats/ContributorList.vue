<template>
  <va-card>
    <va-card-title>
      <div class="row align-center justify-space-between">
        <div class="flex">
          <h1>{{ title }}</h1>
        </div>
        <div style="padding: 0" class="flex">
          <va-button
            :disabled="contributors.length <= step"
            preset="secondary"
            icon="chevron_right"
            @click="showNext"
          />
        </div>
      </div>
    </va-card-title>
    <va-card-content>
      <va-inner-loading :loading="loading" style="width: 100%">
        <div v-for="(contributor, idx) in visibleList" :key="idx" class="mb-3">
          <va-progress-bar :model-value="getPercent(contributor.contributions)" :color="getProgressBarColor(idx)">
            {{ contributor.contributions }} {{ dataType }}
          </va-progress-bar>
          <p class="mt-2">{{ contributor.name }}</p>
        </div>
      </va-inner-loading>
    </va-card-content>
  </va-card>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { Contributor } from '../../data/types'

  const props = defineProps<{
    contributors: Contributor[]
    title: string
    dataType: string
    loading: boolean
  }>()
  const progressMax = ref(392)
  const visibleList = ref<Contributor[]>([])
  const step = ref(5)
  const page = ref(0)

  onMounted(() => {
    progressMax.value = Math.max(...props.contributors.map(({ contributions }) => contributions))
    showNext()
  })

  function getPercent(val: number) {
    return (val / progressMax.value) * 100
  }

  async function showNext() {
    const start = page.value * step.value

    const end = page.value * step.value + step.value

    const elements = props.contributors.slice(start, end)

    visibleList.value = elements

    page.value += 1

    const maxPages = (props.contributors.length - 1) / step.value

    if (page.value > maxPages) {
      page.value = 0
    }
  }

  function getProgressBarColor(idx: number) {
    const themeColors = ['primary', 'success', 'info', 'danger', 'warning']

    if (idx < themeColors.length) {
      return themeColors[idx]
    }

    // Get random color if idx out of colors array
    const keys = Object.keys(themeColors)
    return themeColors[keys[(keys.length * Math.random()) << 0] as unknown as number]
  }
</script>
