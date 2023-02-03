<template>
  <div>
    <div class="row row-equal">
      <!-- <div class="flex lg3 md3 sm12 xs12">
          <va-card class="d-flex">
            <va-card-title>
              <h1>Platform used</h1>
              <va-button icon="print" plain @click="printChart" />
            </va-card-title>
            <va-card-content v-if="platformUsedData">
              <va-chart ref="doughnutChart" class="chart chart--donut" :data="platformUsedData" type="doughnut" />
            </va-card-content>
          </va-card>
        </div> -->
      <div class="flex lg4 md4 sm12 xs12">
        <va-card v-if="biosamplesCollected" class="chart-widget">
          <va-card-title>BioSamples collected by month</va-card-title>
          <va-card-content>
            <va-chart class="chart" :data="biosamplesCollected" type="line" />
          </va-card-content>
        </va-card>
      </div>
      <div v-if="galContributors?.length" class="flex lg4 md4 sm12 xs12">
        <ContributorList
          :contributors="galContributors"
          :data-type="'BioSamples'"
          :title="'Genome Aquisition Lab (GAL)'"
        />
      </div>
      <div class="flex lg4 md4 sm12 xs12">
        <va-card class="px-3">
          <va-card-title> Habitats </va-card-title>
          <va-card-content style="max-height: 350px; overflow: scroll">
            <va-list class="py-4">
              <template v-for="(habitat, i) in habitats" :key="i">
                <va-list-item>
                  <va-list-item-section icon>
                    <va-icon :name="getIcon(habitat.label)" />
                  </va-list-item-section>

                  <va-list-item-section>
                    <va-list-item-label>
                      {{ habitat.label }}
                    </va-list-item-label>
                  </va-list-item-section>

                  <va-list-item-section icon>
                    <va-chip size="small">{{ habitat.value }}</va-chip>
                  </va-list-item-section>
                </va-list-item>

                <va-list-separator v-if="i < habitats.length - 1" :key="i" class="my-1" />
              </template>
            </va-list>
          </va-card-content>
        </va-card>
      </div>
    </div>
    <div class="row row-equal">
      <div class="flex sm12 xs12">
        <va-card class="d-flex">
          <va-card-title>biosamples</va-card-title>
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
  import BioSampleService from '../../services/clients/BioSampleService'
  import { onMounted, reactive, ref } from 'vue'
  import { AxiosResponse } from 'axios'
  import VaChart from '../../components/va-charts/VaChart.vue'
  import { TLineChartData } from '../../data/types'
  import ContributorList from '../../components/stats/ContributorList.vue'
  import { Contributor } from '../../data/types'
  import { loadavg } from 'os'

  const columns = [
    'scientific_name',
    'assembly_name',
    'assembly_level',
    'contig_n50',
    'submitter',
    'chromosomes',
    'size',
  ]
  const galContributors = ref<Contributor[]>()
  const biosamplesCollected = ref({})
  const primaryColorVariants = ['#2c82e0', '#ef476f', '#ffd166', '#06d6a0', '#8338ec']
  const habitats = ref([])
  const pagination = reactive({
    total: 0,
    page: 0,
    limit: 10,
  })

  onMounted(async () => {
    // platformUsedData.value = createPieChartData(
    //     await StatisticsService.getModelFieldStats('experiments', { field: 'instrument_platform' }),
    //   )
    biosamplesCollected.value = createLineChartData(
      await StatisticsService.getModelFieldStats('biosamples', { field: 'metadata.collection_date' }),
    )
    galContributors.value = getContributors(
      await StatisticsService.getModelFieldStats('biosamples', { field: 'metadata.GAL' }),
    )
    const { data } = await StatisticsService.getModelFieldStats('biosamples', { field: 'metadata.habitat' })
    habitats.value = Object.keys(data)
      .map((k: string) => {
        return { label: k, value: data[k] }
      })
      .sort((a, b) => b.value - a.value)
    //   getAssemblies(await AssemblyService.getAssemblies({ offset: pagination.page, limit: pagination.limit }))
  })

  function getIcon(habitat: string) {
    const lowCase = habitat.toLowerCase()
    if (
      lowCase.includes('wood') ||
      lowCase.includes('leaves') ||
      lowCase.includes('tree') ||
      lowCase.includes('forest')
    )
      return 'forest'
    if (
      lowCase.includes('water') ||
      lowCase.includes('stream') ||
      lowCase.includes('aqua') ||
      lowCase.includes('marin') ||
      lowCase.includes('sea') ||
      lowCase.includes('river')
    )
      return 'water'
    if (lowCase.includes('garden') || lowCase.includes('botan') || lowCase.includes('grass')) return 'grass'
  }

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
    Object.keys(data)
      .filter((k: string) => k.split('-').length > 1)
      .forEach((k: string) => {
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
          label: 'BioSamples',
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
      .filter((k: string) => k !== 'null')
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
