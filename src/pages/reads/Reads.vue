<template>
  <va-card class="d-flex">
    <va-card-title>
      <div class="row">
        <div class="flex">total: {{ total }}</div>
      </div>
    </va-card-title>
    <Filters
      :search-form="readStore.searchForm"
      :filters="filters"
      @on-reset="reset"
      @on-submit="handleSubmit"
      @on-date-change="handleDate"
    />
    <va-card-content>
      <DataTable :items="reads" :columns="columns" />
      <div class="row align-center justify-center">
        <div class="flex">
          <va-pagination
            v-model="offset"
            :page-size="readStore.pagination.limit"
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
  import ReadService from '../../services/clients/ReadService'
  import { onMounted, ref, watch } from 'vue'
  import { AxiosResponse } from 'axios'
  import { useReadStore } from '../../stores/read-store'
  import DataTable from '../../components/ui/DataTable.vue'
  import Filters from '../../components/ui/Filters.vue'
  import { Filter } from '../../data/types'

  const readStore = useReadStore()
  const columns = [
    'experiment_accession',
    'experiment_title',
    'scientific_name',
    'instrument_platform',
    'center_name',
    'first_created',
  ]

  const filters: Filter[] = [
    {
      label: 'search read',
      placeholder: 'Search by species, taxid, experiment title or instrument platform',
      key: 'filter',
      type: 'input',
    },
    {
      label: 'filter by',
      key: 'filter_option',
      type: 'select',
      options: ['taxid', 'experiment_title', 'instrument_platform', 'scientific_name'],
    },
    {
      label: 'sort_column',
      key: 'sort_column',
      type: 'select',
      options: ['first_created'],
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
  const offset = ref(1 + readStore.pagination.offset)

  const reads = ref([])
  const total = ref(0)

  onMounted(async () => {
    getReads(await ReadService.getReads({ ...readStore.searchForm, ...readStore.pagination }))
  })

  async function handleSubmit() {
    readStore.resetPagination()
    getReads(await ReadService.getReads({ ...readStore.searchForm, ...readStore.pagination }))
  }
  async function handlePagination(value: number) {
    readStore.pagination.offset = value - 1
    getReads(await ReadService.getReads({ ...readStore.searchForm, ...readStore.pagination }))
  }
  function handleDate(payload: Record<string, any>) {
    readStore.searchForm = { ...readStore.searchForm, ...payload }
  }
  async function reset() {
    offset.value = 1
    readStore.resetForm()
    readStore.resetPagination()
    getReads(await ReadService.getReads({ ...readStore.pagination }))
  }

  function getReads({ data }: AxiosResponse) {
    reads.value = data.data
    total.value = data.total
    return data
  }
</script>
