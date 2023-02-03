<template>
  <div>
    <div class="row row-equal">
      <div class="flex lg3 md3 sm12 xs12">
        <va-card class="d-flex">
          <va-card-title>
            <h1>Platform used</h1>
            <va-button icon="print" plain @click="printChart" />
          </va-card-title>
          <va-card-content v-if="platformUsedData">
            <va-chart ref="doughnutChart" class="chart chart--donut" :data="platformUsedData" type="doughnut" />
          </va-card-content>
        </va-card>
      </div>
      <div class="flex lg6 md6 sm12 xs12">
        <va-card v-if="readsPublished" class="chart-widget">
          <va-card-title>Reads submitted by month</va-card-title>
          <va-card-content>
            <va-chart class="chart" :data="readsPublished" type="line" />
          </va-card-content>
        </va-card>
      </div>
      <div v-if="readsContributors?.length" class="flex lg3 md3 sm12 xs12">
        <ContributorList :contributors="readsContributors" :data-type="'Reads'" :title="'Center names'" />
      </div>
    </div>
    <div class="row row-equal">
      <div class="flex sm12 xs12">
        <va-card class="d-flex">
          <va-card-title>reads</va-card-title>
          <!-- <va-card-content>
              
                              filters:
                                  chr level
                                  contig n50
                                  bioproject
                                  taxid
                                  submitter
                           
              <div class="row align-center">
                  <div class="flex lg4 md4 sm12 xs12">
                      <va-input label="search read" placeholder="Search by species, taxid or experiment accession"></va-input>
                  </div>
                  <div class="flex lg4 md4 sm12 xs12">
                      <va-select label="instrument platform" :options="['Chromosome','Complete Genome', 'Contig', 'Scaffold']"/>
                  </div>
                  <div class="flex lg4 md4 sm12 xs12">
                      <va-select label="bioprojects" :options="['Chromosome','Complete Genome', 'Contig', 'Scaffold']"/>
                  </div>
                  <div class="flex lg4 md4 sm12 xs12">
                      <va-date-input label="Date" placeholder="select a date range" style="width:100%" mode="range" v-model="range" type="month" :allowedMonths="(date:Date) => date <= new Date()" :allowedYears="(date:Date) => date <= new Date()"/>
                  </div>
              </div>
            </va-card-content> -->
          <!-- <va-card-content>
              <va-data-table :items="reads" :columns="columns">
                  <template #header(assembly_level)="{ label }">{{ label }}</template>
                  <template #header(contig_n50)="{ label }">{{ label }}</template>
                  <template #cell(assembly_level)="{ rowData }"><va-chip size="small">{{ rowData.metadata.assembly_level }}</va-chip></template>
                  <template #cell(contig_n50)="{ rowData }">
                      {{ (rowData.metadata.contig_n50 / getContigN50(rowData.metadata.contig_n50)?.value).toFixed(2)  }} {{ getContigN50(rowData.metadata.contig_n50)?.name }}
                  </template>
                  <template #cell(size)="{ rowData }">                     
                      {{ (rowData.metadata.estimated_size / getContigN50(rowData.metadata.estimated_size)?.value).toFixed(2)  }} {{ getContigN50(rowData.metadata.estimated_size)?.name }}
                  </template>
  
                  <template #cell(submitter)="{ rowData }">{{ rowData.metadata.submitter }}</template>
  
                  <template #cell(chromosomes)="{ rowData }">{{ rowData.chromosomes.length || '' }}</template>
  
              </va-data-table>
            </va-card-content> -->
        </va-card>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import StatisticsService from '../../services/clients/StatisticsService'
  import AssemblyService from '../../services/clients/AssemblyService'
  import { onMounted, reactive, ref } from 'vue'
  import { AxiosResponse } from 'axios'
  import VaChart from '../../components/va-charts/VaChart.vue'
  import { TLineChartData } from '../../data/types'
  import ContributorList from '../../components/stats/ContributorList.vue'
  import { Contributor } from '../../data/types'

  const columns = [
    'scientific_name',
    'assembly_name',
    'assembly_level',
    'contig_n50',
    'submitter',
    'chromosomes',
    'size',
  ]
  const readsContributors = ref<Contributor[]>()
  const readsPublished = ref({})
  const platformUsedData = ref({})
  const primaryColorVariants = ['#2c82e0', '#ef476f', '#ffd166', '#06d6a0', '#8338ec']
  const reads = ref([])
  const range = ref()
  const pagination = reactive({
    total: 0,
    page: 0,
    limit: 10,
  })

  onMounted(async () => {
    platformUsedData.value = createPieChartData(
      await StatisticsService.getModelFieldStats('experiments', { field: 'instrument_platform' }),
    )
    readsPublished.value = createLineChartData(
      await StatisticsService.getModelFieldStats('experiments', { field: 'metadata.first_public' }),
    )
    readsContributors.value = getContributors(
      await StatisticsService.getModelFieldStats('experiments', { field: 'metadata.center_name' }),
    )
    //   getAssemblies(await AssemblyService.getAssemblies({ offset: pagination.page, limit: pagination.limit }))
  })

  function createPieChartData(response: AxiosResponse) {
    const { data } = response
    const sortedData = Object.keys(data)
      .sort((a, b) => data[b] - data[a])
      .map((k) => {
        return {
          label: k,
          value: data[k],
        }
      })
    return {
      labels: sortedData.map((d) => d.label),
      datasets: [
        {
          backgroundColor: primaryColorVariants,
          label: 'Reads by instrument platform',
          data: sortedData.map((d) => d.value),
        },
      ],
    }
  }

  function createLineChartData(response: AxiosResponse) {
    const { data } = response
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
          label: 'Reads',
          backgroundColor: '#2c82e0',
          data: sortedData.map((data) => data.value),
        },
      ],
    }
    return lineChart
  }

  function getContributors(response: AxiosResponse): Contributor[] {
    const { data } = response
    const contibutors: Contributor[] = Object.keys(data)
      .sort((a, b) => data[b] - data[a])
      .map((key: string) => {
        return {
          name: key,
          contributions: data[key],
        }
      })
    return contibutors
  }
  function printChart() {
    const windowObjectReference = window.open('', 'Print', 'height=600,width=800') as Window

    const img = windowObjectReference.document.createElement('img')

    img.src = `${(document.querySelector('.chart--donut canvas') as HTMLCanvasElement | undefined)?.toDataURL(
      'image/png',
    )}`

    img.onload = () => {
      windowObjectReference?.document.body.appendChild(img)
    }

    windowObjectReference.print()

    windowObjectReference.onafterprint = () => {
      windowObjectReference?.close()
    }
  }
</script>

<style scoped>
  .chart {
    height: 400px;
  }
</style>
