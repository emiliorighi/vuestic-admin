<template>
  <div class="row row-equal">
    <div class="flex lg3 md3 sm12 xs12">
      <va-card>
        <va-card-title> filters </va-card-title>
        <va-form tag="form" @submit.prevent="handleSubmit">
          <va-card-content>
            <div class="row align-center justify-start">
              <div v-if="readStore.submitters.length" class="flex lg12 md12 sm12 xs12">
                <va-select
                  v-model="readStore.searchForm.center"
                  :options="readStore.submitters"
                  label="Sequencing Centers"
                  value-by="name"
                  text-by="name"
                  searchable
                ></va-select>
              </div>
              <div v-for="(filter, index) in filters" :key="index" class="flex lg12 md12 sm12 xs12">
                <div v-if="filter.type === 'input'">
                  <va-input
                    v-model="readStore.searchForm[filter.key]"
                    :label="filter.label"
                    :placeholder="filter.placeholder"
                  />
                </div>
                <div v-else-if="filter.type === 'select'">
                  <va-select
                    v-model="readStore.searchForm[filter.key]"
                    :label="filter.label"
                    :options="filter.options"
                  />
                </div>
                <div v-else>
                  <va-date-input
                    v-model="dateRange"
                    :format-date="(date:Date) => date.toISOString().substring(0,10)"
                    label="Date"
                    placeholder="select a date range"
                    style="width: 100%"
                    mode="range"
                    type="month"
                    prevent-overflow
                    :allowed-months="(date:Date) => date <= new Date()"
                    :allowed-years="(date:Date) => date <= new Date()"
                  />
                </div>
              </div>
            </div>
          </va-card-content>
          <va-card-actions align="between">
            <va-button type="submit">Search</va-button>
            <va-button color="danger" @click="reset()">Reset</va-button>
          </va-card-actions>
        </va-form>
      </va-card>
    </div>
    <div class="flex lg9 md9 sm12 xs12">
      <va-card class="d-flex">
        <va-card-content> Total: {{ total }} </va-card-content>
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
    </div>
  </div>
</template>
<script setup lang="ts">
  import ReadService from '../../services/clients/ReadService'
  import { onMounted, ref, watch } from 'vue'
  import { AxiosResponse } from 'axios'
  import { useReadStore } from '../../stores/read-store'
  import DataTable from '../../components/ui/DataTable.vue'
  import { Filter } from '../../data/types'

  const initDateRange = {
    start: null,
    end: null,
  }
  const dateRange = ref({ ...initDateRange })
  const readStore = useReadStore()

  watch(dateRange, () => {
    if (dateRange.value.start)
      readStore.searchForm.start_date = new Date(dateRange.value.start).toISOString().split('T')[0]
    if (dateRange.value.end) readStore.searchForm.end_date = new Date(dateRange.value.end).toISOString().split('T')[0]
  })

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
    offset.value = 1
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
