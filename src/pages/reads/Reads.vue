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
              v-model="readStore.searchForm.filter"
              label="search read"
              placeholder="Search by species, taxid, experiment title or instrument platform"
            ></va-input>
          </div>
          <div class="flex lg4 md4 sm12 xs12">
            <va-select
              v-model="readStore.searchForm.filter_option"
              label="filter by"
              :options="['taxid', 'experiment_title', 'instrument_platform', 'scientific_name']"
            />
          </div>
          <div class="flex lg4 md4 sm12 xs12">
            <va-date-input
              v-model="dateRange"
              :format-date="(date:Date) => date.toISOString().substring(0,10)"
              label="Date"
              placeholder="select a date range"
              style="width: 100%"
              mode="range"
              type="month"
              :allowed-months="(date:Date) => date <= new Date()"
              :allowed-years="(date:Date) => date <= new Date()"
            />
          </div>
          <div v-if="readStore.submitters.length" class="flex lg4 md4 sm12 xs12">
            <va-select
              v-model="readStore.searchForm.center"
              searchable
              label="centers"
              :options="readStore.submitters.map((s) => s.name)"
            />
          </div>
          <div class="flex lg4 md4 sm12 xs12">
            <va-select v-model="readStore.searchForm.sort_column" label="sort by" :options="['first_created']" />
          </div>
          <div class="flex lg4 md4 sm12 xs12">
            <va-select v-model="readStore.searchForm.sort_order" label="sorting order" :options="['asc', 'desc']" />
          </div>
        </div>
      </va-card-content>
      <va-card-actions align="between">
        <va-button type="submit">Search</va-button>
        <va-button color="danger" @click="reset()">Reset</va-button>
      </va-card-actions>
    </va-form>
    <va-card-content>
      <va-data-table :items="reads" :columns="columns">
        <template #cell(experiment_accession)="{ rowData }">
          <va-chip
            outline
            size="small"
            :to="{ name: 'read', params: { accession: rowData.experiment_accession, savePosition: true } }"
            >{{ rowData.experiment_accession }}</va-chip
          >
        </template>
        <template #cell(experiment_title)="{ rowData }">
          {{ rowData.metadata.experiment_title }}
        </template>
        <template #cell(instrument_platform)="{ rowData }">
          <va-chip size="small"> {{ rowData.instrument_platform }}</va-chip>
        </template>

        <template #cell(center_name)="{ rowData }">
          {{ rowData.metadata.center_name }}
        </template>
        <template #cell(scientific_name)="{ rowData }">
          {{ rowData.metadata.scientific_name }}
        </template>
        <template #cell(first_created)="{ rowData }">
          {{ rowData.metadata.first_created }}
        </template>
      </va-data-table>
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

  const readStore = useReadStore()
  const columns = [
    'experiment_accession',
    'experiment_title',
    'scientific_name',
    'instrument_platform',
    'center_name',
    'first_created',
  ]
  const initDateRange = {
    start: null,
    end: null,
  }
  const dateRange = ref({ ...initDateRange })

  watch(dateRange, () => {
    if (dateRange.value.start)
      readStore.searchForm.start_date = new Date(dateRange.value.start).toISOString().split('T')[0]
    if (dateRange.value.end) readStore.searchForm.end_date = new Date(dateRange.value.end).toISOString().split('T')[0]
  })

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

  async function reset() {
    dateRange.value = { ...initDateRange }
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
