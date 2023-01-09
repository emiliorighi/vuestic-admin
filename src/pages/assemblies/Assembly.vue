<template>
  <div>
    <div class="row row-equal">
      <div class="flex lg3 md3 sm12 xs12">
        <va-card class="d-flex">
          <va-card-title>
            <h1>assembly level</h1>
            <va-button icon="print" plain @click="printChart" />
          </va-card-title>
          <va-card-content v-if="assemblyLevelData">
            <va-chart ref="doughnutChart" class="chart chart--donut" :data="assemblyLevelData" type="doughnut" />
          </va-card-content>
        </va-card>
      </div>
      <div class="flex lg6 md6 sm12 xs12">
        <va-card v-if="assembliesPublished" class="chart-widget">
          <va-card-title>Assemblies submitted by month</va-card-title>
          <va-card-content>
            <va-chart class="chart" :data="assembliesPublished" type="line" />
          </va-card-content>
        </va-card>
      </div>
      <div v-if="assembliesContributors?.length" class="flex lg3 md3 sm12 xs12">
        <ContributorList :contributors="assembliesContributors" :data-type="'Assemblies'" :title="'Submitters'" />
      </div>
    </div>
    <div class="row row-equal">
      <div class="flex lg6 md6 sm12 xs12">
        <va-card class="d-flex">
          <va-card-title>assemblies</va-card-title>
          <va-card-content>
            <!-- 
                            filters:
                                chr level
                                contig n50
                                bioproject
                                taxid
                                submitter
                         -->
          </va-card-content>
          <va-card-content>
            <va-list>
              <va-list-item v-for="(assembly, index) in assemblies" :key="index" class="list__item">
                <va-list-item-section>
                  <va-list-item-label>
                    {{ assembly.assembly_name }}
                  </va-list-item-label>

                  <va-list-item-label caption>
                    {{ assembly.scientific_name }}
                  </va-list-item-label>
                  <va-list-item-label caption>
                    {{ assembly.metadata.assembly_level }}
                  </va-list-item-label>
                </va-list-item-section>
                <va-list-item-section icon>
                  <va-icon name="remove_red_eye" color="background-tertiary" /> {{ assembly.biosample }}
                </va-list-item-section>
                <va-list-item-section icon>
                  <va-icon name="remove_red_eye" color="background-tertiary" />
                </va-list-item-section>
              </va-list-item>
            </va-list>
          </va-card-content>
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
  import { totalmem } from 'os'

  const assembliesContributors = ref<Contributor[]>()
  const assembliesPublished = ref({})
  const assemblyLevelData = ref({})
  const primaryColorVariants = ['#2c82e0', '#ef476f', '#ffd166', '#06d6a0', '#8338ec']
  const assemblies = ref([])
  const pagination = reactive({
    total: 0,
    page: 0,
    limit: 10,
  })

  onMounted(async () => {
    assemblyLevelData.value = createPieChartData(
      await StatisticsService.getModelFieldStats('assemblies', { field: 'metadata.assembly_level' }),
    )
    assembliesPublished.value = createLineChartData(
      await StatisticsService.getModelFieldStats('assemblies', { field: 'metadata.submission_date' }),
    )
    assembliesContributors.value = getContributors(
      await StatisticsService.getModelFieldStats('assemblies', { field: 'metadata.submitter' }),
    )
    getAssemblies(await AssemblyService.getAssemblies({ offset: pagination.page, limit: pagination.limit }))
  })

  function createPieChartData(response: AxiosResponse) {
    const { data } = response
    return {
      labels: Object.keys(data),
      datasets: [
        {
          backgroundColor: primaryColorVariants,
          label: 'Assemblies by assembly level',
          data: Object.values(data),
        },
      ],
    }
  }

  function getAssemblies({ data }: AxiosResponse) {
    assemblies.value = data.data
    pagination.total = data.total
    return data
  }
  function createLineChartData(response: AxiosResponse) {
    const { data } = response
    let submissionDates = {}
    Object.keys(data).forEach((k: string) => {
      const values = k.split('-')
      const date = `${values[0]}-${values[1]}`
      submissionDates[date] = submissionDates[date] ? submissionDates[date] + data[k] : data[k]
    })
    console.log(submissionDates)
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
          label: 'Assemblies',
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
