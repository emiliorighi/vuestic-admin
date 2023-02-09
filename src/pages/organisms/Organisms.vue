<template>
  <va-card class="d-flex">
    <va-card-title>
      <div class="row">
        <div class="flex">total: {{ total }}</div>
      </div>
    </va-card-title>
    <va-form tag="form" @submit.prevent="handleSubmit">
      <va-card-content>
        <div class="row align-center justify-start">
          <div class="flex lg4 md4 sm12 xs12">
            <va-input
              v-model="organismStore.searchForm.filter"
              label="search organism"
              placeholder="Search by species, taxid, common_name or tolid"
            ></va-input>
          </div>
          <div class="flex lg4 md4 sm12 xs12">
            <va-select
              v-model="organismStore.searchForm.filter_option"
              label="filter by"
              :options="['taxid', 'common_name', 'scientific_name', 'tolid']"
            />
          </div>
          <div class="flex lg4 md4 sm12 xs12">
            <va-select
              v-model="organismStore.searchForm.parent_taxid"
              label="search parent taxon"
              placeholder="Search by taxon name"
              searchable
              :options="taxons"
              text-by="name"
              track-by="taxid"
              value-by="taxid"
              @update-search="searchTaxon"
            />
          </div>
          <div class="flex lg4 md4 sm12 xs12">
            <va-select
              v-model="organismStore.searchForm.bioproject"
              label="search BioProject"
              placeholder="Search by project title"
              searchable
              :options="bioprojects"
              text-by="title"
              track-by="accession"
              value-by="accession"
              @update-search="searchBioProject"
            />
          </div>
          <div class="flex lg4 md4 sm12 xs12">
            <va-select v-model="organismStore.searchForm.insdc_status" label="INSDC status" :options="insdc_status" />
          </div>
          <div class="flex lg4 md4 sm12 xs12">
            <va-select v-model="organismStore.searchForm.goat_status" label="GoaT status" :options="goat_status" />
          </div>
          <div class="flex lg4 md4 sm12 xs12">
            <va-select
              v-model="organismStore.searchForm.target_list_status"
              label="Target list status"
              :options="target_list_status"
            />
          </div>
          <div class="flex lg4 md4 sm12 xs12">
            <va-select
              v-model="organismStore.searchForm.sort_column"
              label="sort by"
              :options="['scientific_name', 'taxid', 'tolid']"
            />
          </div>
          <div class="flex lg4 md4 sm12 xs12">
            <va-select v-model="organismStore.searchForm.sort_order" label="sorting order" :options="['asc', 'desc']" />
          </div>
        </div>
      </va-card-content>
      <va-card-actions align="between">
        <va-button type="submit">Search</va-button>
        <va-button color="danger" @click="reset()">Reset</va-button>
      </va-card-actions>
    </va-form>
    <va-card-content>
      <DataTable :items="organisms" :columns="columns" />
      <div class="row align-center justify-center">
        <div class="flex">
          <va-pagination
            v-model="offset"
            :page-size="organismStore.pagination.limit"
            :total="total"
            :visible-pages="3"
            buttons-preset="secondary"
            rounded
            gapped
            border-color="primary"
            @update:model-value="handlePagination"
          />
        </div>
      </div>
    </va-card-content>
  </va-card>
</template>
<script setup lang="ts">
  import OrganismService from '../../services/clients/OrganismService'
  import { onMounted, ref, watch } from 'vue'
  import { AxiosResponse } from 'axios'
  import { useOrganismStore } from '../../stores/organism-store'
  import DataTable from '../../components/ui/DataTable.vue'
  import BioProjectService from '../../services/clients/BioProjectService'
  import TaxonService from '../../services/clients/TaxonService'

  const insdc_status = [
    'Sample Acquired',
    'Biosample Submitted',
    'Reads Submitted',
    'Assemblies Submitted',
    'Annotations Created',
  ]
  const goat_status = [
    'Sample Collected',
    'Sample Acquired',
    'Data Generation',
    'In Assembly',
    'INSDC Submitted',
    'Publication Available',
  ]
  const target_list_status = ['long_list', 'family_representative', 'other_priority']

  const organismStore = useOrganismStore()

  const bioprojects = ref([])
  const taxons = ref([])

  const offset = ref(1 + organismStore.pagination.offset)

  const columns = [
    'scientific_name',
    'insdc_common_name',
    'tolid_prefix',
    'taxid',
    'goat_status',
    'insdc_status',
    'target_list_status',
  ]

  const organisms = ref([])
  const total = ref(0)

  watch(
    () => organismStore.searchForm.bioproject,
    (bioproject) => {
      // console.log(bioproject)
      // if(bioproject)
    },
  )

  watch(
    () => organismStore.searchForm.parent_taxid,
    (parent) => {
      console.log(parent)
    },
  )

  onMounted(async () => {
    getOrganisms(await OrganismService.getOrganisms({ ...organismStore.searchForm, ...organismStore.pagination }))
  })

  async function handleSubmit() {
    organismStore.resetPagination()
    getOrganisms(await OrganismService.getOrganisms({ ...organismStore.searchForm, ...organismStore.pagination }))
  }
  async function handlePagination(value: number) {
    organismStore.pagination.offset = value - 1
    getOrganisms(await OrganismService.getOrganisms({ ...organismStore.searchForm, ...organismStore.pagination }))
  }

  async function reset() {
    offset.value = 1
    organismStore.resetForm()
    organismStore.resetPagination()
    getOrganisms(await OrganismService.getOrganisms({ ...organismStore.pagination }))
  }

  function getOrganisms({ data }: AxiosResponse) {
    organisms.value = data.data
    total.value = data.total
    return data
  }
  async function searchBioProject(value: string) {
    if (value.length >= 3) {
      const { data } = await BioProjectService.getBioprojects({ filter: value })
      bioprojects.value = [...data.data]
    }
  }
  async function searchTaxon(value: string) {
    console.log(value)
    if (value.length >= 3) {
      const { data } = await TaxonService.getTaxons({ filter: value })
      taxons.value = [...data.data]
    }
  }
</script>
