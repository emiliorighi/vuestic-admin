<template>
  <va-card class="d-flex">
    <va-card-title>
      <div class="row">
        <div class="flex">total: {{ total }}</div>
      </div>
    </va-card-title>
    <Filters
      :search-form="biosampleStore.searchForm"
      :filters="filters"
      @on-reset="reset"
      @on-submit="handleSubmit"
      @on-date-change="handleDate"
    />
    <va-card-content>
      <DataTable :items="biosamples" :columns="columns" />
      <div class="row align-center justify-center">
        <div class="flex">
          <va-pagination
            v-model="offset"
            :page-size="biosampleStore.pagination.limit"
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
  import BioSampleService from '../../services/clients/BioSampleService'
  import { onMounted, ref } from 'vue'
  import { AxiosResponse } from 'axios'
  import { useBioSampleStore } from '../../stores/biosample-store'
  import DataTable from '../../components/ui/DataTable.vue'
  import Filters from '../../components/ui/Filters.vue'
  import { Filter } from '../../data/types'

  const biosampleStore = useBioSampleStore()

  const filters: Filter[] = [
    {
      label: 'search biosample',
      placeholder: 'Search by species, taxid, gal or habitat',
      key: 'filter',
      type: 'input',
    },
    {
      label: 'filter by',
      key: 'filter_option',
      type: 'select',
      options: ['taxid', 'gal', 'scientific_name', 'habitat'],
    },
    {
      label: 'sort_column',
      key: 'sort_column',
      type: 'select',
      options: ['collection_date'],
    },
    {
      label: 'sort_order',
      key: 'sort_order',
      type: 'select',
      options: ['asc', 'desc'],
    },
    {
      label: 'Date',
      key: 'date',
      type: 'date',
    },
  ]

  const offset = ref(1 + biosampleStore.pagination.offset)

  const columns = ['accession', 'scientific_name', 'collection_date', 'gal', 'habitat', 'organism_part']

  const biosamples = ref([])
  const total = ref(0)

  onMounted(async () => {
    getBioSamples(await BioSampleService.getBioSamples({ ...biosampleStore.searchForm, ...biosampleStore.pagination }))
  })

  async function handleSubmit() {
    biosampleStore.resetPagination()
    getBioSamples(await BioSampleService.getBioSamples({ ...biosampleStore.searchForm, ...biosampleStore.pagination }))
  }
  async function handlePagination(value: number) {
    biosampleStore.pagination.offset = value - 1
    getBioSamples(await BioSampleService.getBioSamples({ ...biosampleStore.searchForm, ...biosampleStore.pagination }))
  }

  function handleDate(payload: Record<string, any>) {
    biosampleStore.searchForm = { ...biosampleStore.searchForm, ...payload }
  }
  async function reset() {
    offset.value = 1
    biosampleStore.resetForm()
    biosampleStore.resetPagination()
    getBioSamples(await BioSampleService.getBioSamples({ ...biosampleStore.pagination }))
  }

  function getBioSamples({ data }: AxiosResponse) {
    biosamples.value = data.data
    total.value = data.total
    return data
  }
</script>
