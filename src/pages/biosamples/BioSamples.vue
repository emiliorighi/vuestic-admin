<template>
  <va-card class="d-flex">
    <va-card-title>
      <div class="row justify-end align-center">
        <div class="flex">total: {{ total }}</div>
      </div>
    </va-card-title>
    <va-form tag="form" @submit.prevent="handleSubmit">
      <va-card-content>
        <div class="row align-center justify-start">
          <div class="flex lg4 md4 sm12 xs12">
            <va-input
              v-model="biosampleStore.searchForm.filter"
              label="search biosample"
              placeholder="Search by species, taxid, gal or habitat"
            ></va-input>
          </div>
          <div class="flex lg4 md4 sm12 xs12">
            <va-select
              v-model="biosampleStore.searchForm.filter_option"
              label="filter by"
              :options="['taxid', 'gal', 'scientific_name', 'habitat']"
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
          <div class="flex lg4 md4 sm12 xs12">
            <va-select v-model="biosampleStore.searchForm.sort_column" label="sort by" :options="['collection_date']" />
          </div>
          <div class="flex lg4 md4 sm12 xs12">
            <va-select
              v-model="biosampleStore.searchForm.sort_order"
              label="sorting order"
              :options="['asc', 'desc']"
            />
          </div>
        </div>
      </va-card-content>
      <va-card-actions align="between">
        <va-button type="submit">Search</va-button>
        <va-button color="danger" @click="reset()">Reset</va-button>
      </va-card-actions>
    </va-form>
    <va-card-content>
      <va-data-table :items="biosamples" :columns="columns">
        <template #cell(accession)="{ rowData }">
          <va-chip
            outline
            :to="{ name: 'biosample', params: { accession: rowData.accession, savePosition: true } }"
            size="small"
          >
            {{ rowData.accession }}
          </va-chip>
        </template>
        <template #cell(habitat)="{ rowData }">
          {{ rowData.metadata.habitat }}
        </template>
        <template #cell(collection_date)="{ rowData }">
          {{ rowData.metadata.collection_date }}
        </template>
        <template #cell(gal)="{ rowData }">
          {{ rowData.metadata.GAL }}
        </template>
      </va-data-table>
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
  import { onMounted, ref, watch } from 'vue'
  import { AxiosResponse } from 'axios'
  import { useBioSampleStore } from '../../stores/biosample-store'

  const biosampleStore = useBioSampleStore()

  const initDateRange = {
    start: null,
    end: null,
  }
  const dateRange = ref({ ...initDateRange })

  watch(dateRange, () => {
    if (dateRange.value.start)
      biosampleStore.searchForm.start_date = new Date(dateRange.value.start).toISOString().split('T')[0]
    if (dateRange.value.end)
      biosampleStore.searchForm.end_date = new Date(dateRange.value.end).toISOString().split('T')[0]
  })

  const offset = ref(1 + biosampleStore.pagination.offset)

  const columns = ['accession', 'scientific_name', 'collection_date', 'gal', 'habitat']

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

  async function reset() {
    dateRange.value = { ...initDateRange }
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
