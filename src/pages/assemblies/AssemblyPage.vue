<template>
  <div>
    <!-- <p class="va-title">stats</p>
    <div class="row row-equal">
      <div class="flex lg3 md3 sm12 xs12">
        <Suspense>
          <PieChart
            :field="'metadata.assembly_level'"
            :model="'assemblies'"
            :title="'assembly levels'"
            :label="'Assemblies by assembly level'"
          />
        </Suspense>
      </div>
      <div class="flex lg6 md6 sm12 xs12">
        <Suspense>
          <DateLineChart
            :label="'Assemblies'"
            :field="'metadata.submission_date'"
            :title="'Assemblies submitted by month'"
            :model="'assemblies'"
            :color="'#2c82e0'"
          />
        </Suspense>
      </div>
      <div class="flex lg3 md3 sm12 xs12">
        <Suspense>
          <ContributorList
            :field="'metadata.submitter'"
            :model="'assemblies'"
            :title="'Submitters'"
            @list-created="getSubmitters"
          />
        </Suspense>
      </div>
    </div> -->
    <div class="row row-equal">
      <div class="flex sm12 xs12">
        <va-breadcrumbs class="va-title" color="primary">
          <va-breadcrumbs-item :to="{ name: 'assembly-list', params: { savePosition: true } }" label="assemblies" />
          <va-breadcrumbs-item
            v-if="router.currentRoute.value.name === 'assembly'"
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
  import { useRouter } from 'vue-router'
  import ContributorList from '../../components/stats/ContributorList.vue'
  import { Contributor } from '../../data/types'
  import { useAssemblyStore } from '../../stores/assembly-store'
  import DateLineChart from '../../components/charts/DateLineChart.vue'
  import PieChart from '../../components/charts/PieChart.vue'

  const router = useRouter()
  const assemblyStore = useAssemblyStore()

  function getSubmitters(value: Contributor[]) {
    assemblyStore.submitters = [...value]
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
