<template>
  <div class="row row-equal">
    <div class="flex lg3 md3 sm12 xs12">
      <va-card>
        <va-card-title>assemblies published by kingdom</va-card-title>
        <va-card-content>
          <va-chart style="height: 350px" :data="chartData" type="doughnut" />
        </va-card-content>
      </va-card>
    </div>
    <div v-if="contributorGroups?.length" class="flex lg3 md3 sm12 xs12">
      <div class="row align-center justify-space-between">
        <div v-for="rank in ranks" :key="rank" class="flex">
          <va-chip :outline="selectedRank !== rank" @click="getGroup(rank)">{{ rank }}</va-chip>
        </div>
      </div>
      <ContributorList
        :key="counter"
        :loading="loading"
        :title="`organisms by ${selectedRank}`"
        :data-type="'Organisms'"
        :contributors="contributorGroups"
      />
    </div>
    <div class="flex lg6 md6 sm12 xs12">
      <div v-if="showTree" class="row">
        <TreeOfLife :data="treeData" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import ContributorList from '../../components/stats/ContributorList.vue'
  import TaxonService from '../../services/clients/TaxonService'
  import OrganismService from '../../services/clients/OrganismService'
  import TreeOfLife from '../../components/TreeOfLife.vue'
  import { TaxonNode, Contributor } from '../../data/types'
  import VaChart from '../../components/va-charts/VaChart.vue'

  const ranks = ['class', 'phylum', 'order', 'family']
  const selectedRank = ref('class')
  const contributorGroups = ref<Contributor[]>()
  const chartData = ref({})
  const counter = ref(0)
  const loading = ref(false)
  const primaryColorVariants = ['#2c82e0', '#ef476f', '#ffd166', '#06d6a0', '#8338ec']
  const showTree = ref(false)
  const treeData = ref({})

  onMounted(async () => {
    console.log('hello from father')
    await generateChartData()
    await getGroup(ranks[0])
    treeData.value = await getTreeData()
    showTree.value = true
  })

  async function getTreeData() {
    const { data } = await TaxonService.getTree('40674')
    return data
  }

  async function generateChartData() {
    const { data } = await TaxonService.searchTaxon({ rank: 'kingdom' })
    const sortedData = await data.sort((a: TaxonNode, b: TaxonNode) => b.leaves - a.leaves)
    const mappedTaxons = await Promise.all(
      sortedData.map((taxon: TaxonNode) => {
        return OrganismService.getOrganismStats({ parent_taxid: taxon.taxid }).then(({ data }) => {
          return { ...taxon, ...data }
        })
      }),
    )
    chartData.value = {
      labels: mappedTaxons.map((taxon: TaxonNode) => taxon.name),
      datasets: [
        {
          label: 'organisms by kingdom',
          backgroundColor: primaryColorVariants,
          data: mappedTaxons.map((taxon: TaxonNode) => taxon.assemblies),
        },
      ],
    }
  }

  async function getGroup(rank: string) {
    loading.value = true
    selectedRank.value = rank
    const { data } = await TaxonService.searchTaxon({ rank: selectedRank.value })
    contributorGroups.value = await data
      .sort((a: TaxonNode, b: TaxonNode) => b.leaves - a.leaves)
      .map((taxon: TaxonNode) => {
        return {
          name: taxon.name,
          contributions: taxon.leaves,
        }
      })
    loading.value = false
    counter.value++
  }
</script>
