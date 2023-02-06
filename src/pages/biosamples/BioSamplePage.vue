<template>
  <div>
    <!-- <p class="va-title">stats</p>
    <div class="row row-equal">
      <div class="flex lg4 md4 sm12 xs12">
        <Suspense>
          <DateLineChart
            :label="'BioSamples'"
            :field="'metadata.collection_date'"
            :title="'BioSamples collected by month'"
            :model="'biosamples'"
            :color="'#2c82e0'"
          />
        </Suspense>
      </div>
      <div class="flex lg4 md4 sm12 xs12">
        <Suspense>
          <ContributorList
            :field="'metadata.GAL'"
            :model="'biosamples'"
            :title="'Genome Aquisition Labs (GAL)'"
            @list-created="getSubmitters"
          />
        </Suspense>
      </div>
      <div class="flex lg4 md4 sm12 xs12">
        <va-card class="px-3">
          <va-card-title> Habitats </va-card-title>
          <va-card-content style="max-height: 350px; overflow: scroll">
            <va-list class="py-4">
              <template v-for="(habitat, i) in habitats" :key="i">
                <va-list-item>
                  <va-list-item-section icon>
                    <va-icon size="large" color="info" :name="getIcon(habitat.label)" />
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
    </div> -->
    <div class="row row-equal">
      <div class="flex sm12 xs12">
        <va-breadcrumbs class="va-title" color="primary">
          <va-breadcrumbs-item :to="{ name: 'biosample-list', params: { savePosition: true } }" label="biosamples" />
          <va-breadcrumbs-item
            v-if="router.currentRoute.value.name === 'biosample'"
            active
            :label="router.currentRoute.value.params.accession"
          />
        </va-breadcrumbs>
        <va-divider />
        <router-view v-slot="{ Component, route }">
          <Transition name="fade">
            <component :is="Component" :key="route.path" />
          </Transition>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import StatisticsService from '../../services/clients/StatisticsService'
  import BioSampleService from '../../services/clients/BioSampleService'
  import { onMounted, reactive, ref } from 'vue'
  import VaChart from '../../components/va-charts/VaChart.vue'
  import ContributorList from '../../components/stats/ContributorList.vue'
  import { useRouter } from 'vue-router'
  import { Contributor } from '../../data/types'
  import { useBioSampleStore } from '../../stores/biosample-store'
  import DateLineChart from '../../components/charts/DateLineChart.vue'

  const router = useRouter()
  const biosampleStore = useBioSampleStore()

  function getSubmitters(value: Contributor[]) {
    biosampleStore.submitters = [...value]
  }
  const columns = [
    'scientific_name',
    'assembly_name',
    'assembly_level',
    'contig_n50',
    'submitter',
    'chromosomes',
    'size',
  ]
  const biosamplesCollected = ref({})
  const habitats = ref([])
  const pagination = reactive({
    total: 0,
    page: 0,
    limit: 10,
  })

  onMounted(async () => {
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
      lowCase.includes('wet') ||
      lowCase.includes('river')
    )
      return 'water'
    if (lowCase.includes('rock') || lowCase.includes('mount')) return 'landscape'
    if (lowCase.includes('wall') || lowCase.includes('city')) return 'apartment'

    if (
      lowCase.includes('garden') ||
      lowCase.includes('soil') ||
      lowCase.includes('botan') ||
      lowCase.includes('weed') ||
      lowCase.includes('grass')
    )
      return 'grass'
  }
</script>

<style lang="scss">
  .chart {
    height: 400px;
  }
  .row-equal .flex {
    .va-card {
      height: 100%;
    }
  }
</style>
