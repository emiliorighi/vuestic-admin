<template>
  <va-card class="chart-widget">
    <va-card-title>{{ title }}</va-card-title>
    <va-card-content>
      <va-chart class="chart" :data="createLineChartData(data)" type="line" />
    </va-card-content>
  </va-card>
</template>
<script setup lang="ts">
  import StatisticsService from '../../services/clients/StatisticsService'
  import VaChart from '../../components/va-charts/VaChart.vue'
  import { TLineChartData } from '../../data/types'

  const props = defineProps({
    model: String,
    field: String,
    title: String,
    label: String,
    color: String,
  })
  const { data } = await StatisticsService.getModelFieldStats(props.model, { field: props.field })

  function createLineChartData(data) {
    let submissionDates = {}
    Object.keys(data).forEach((k: string) => {
      const values = k.split('-')
      const date = `${values[0]}-${values[1]}`
      submissionDates[date] = submissionDates[date] ? submissionDates[date] + data[k] : data[k]
    })
    const sortedData = Object.keys(submissionDates)
      .sort((a, b) => new Date(a) > new Date(b))
      .map((k: string) => {
        return {
          label: k,
          value: submissionDates[k],
        }
      })
    const lineChart: TLineChartData = {
      labels: sortedData.map((data) => data.label),
      datasets: [
        {
          label: props.label,
          backgroundColor: props.color,
          data: sortedData.map((data) => data.value),
        },
      ],
    }
    return lineChart
  }
</script>
