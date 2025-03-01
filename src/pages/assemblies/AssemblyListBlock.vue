<template>
  <div class="row row-equal">
    <div class="flex lg3 md3 sm12 xs12">
      <va-card>
        <va-card-title> filters </va-card-title>
        <va-form tag="form" @submit.prevent="handleSubmit">
          <va-card-content>
            <div class="row align-center justify-start">
              <div v-if="assemblyStore.submitters.length" class="flex lg12 md12 sm12 xs12">
                <va-select
                  v-model="assemblyStore.searchForm.submitter"
                  :options="assemblyStore.submitters"
                  label="Assembly Submitters"
                  value-by="name"
                  text-by="name"
                  searchable
                ></va-select>
              </div>
              <div v-for="(filter, index) in filters" :key="index" class="flex lg12 md12 sm12 xs12">
                <div v-if="filter.type === 'input'">
                  <va-input
                    v-model="assemblyStore.searchForm[filter.key]"
                    :label="filter.label"
                    :placeholder="filter.placeholder"
                  />
                </div>
                <div v-else-if="filter.type === 'select'">
                  <va-select
                    v-model="assemblyStore.searchForm[filter.key]"
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
          <DataTable :items="assemblies" :columns="columns" />
          <div class="row align-center justify-center">
            <div class="flex">
              <va-pagination
                v-model="offset"
                :page-size="assemblyStore.pagination.limit"
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
  import { useRouter } from 'vue-router'
  import { useAssemblyStore } from '../../stores/assembly-store'
  import AssemblyService from '../../services/clients/AssemblyService'
  import { computed, onMounted, ref, watch } from 'vue'
  import { AxiosResponse } from 'axios'
  import DataTable from '../../components/ui/DataTable.vue'
  import { Filter } from '../../data/types'

  const initDateRange = {
    start: null,
    end: null,
  }
  const dateRange = ref({ ...initDateRange })

  watch(dateRange, () => {
    if (dateRange.value.start)
      assemblyStore.searchForm.start_date = new Date(dateRange.value.start).toISOString().split('T')[0]
    if (dateRange.value.end)
      assemblyStore.searchForm.end_date = new Date(dateRange.value.end).toISOString().split('T')[0]
  })

  const router = useRouter()
  const assemblyStore = useAssemblyStore()

  const validInputs = computed(() => {
    return Object.keys(assemblyStore.searchForm)
      .filter((k) => assemblyStore.searchForm[k])
      .map((k) => assemblyStore.searchForm[k])
  })

  const filters: Filter[] = [
    {
      label: 'search assembly',
      placeholder: 'Search by species, taxid or assembly name',
      key: 'filter',
      type: 'input',
    },
    {
      label: 'filter by',
      key: 'filter_option',
      type: 'select',
      options: ['taxid', 'assembly_name', 'scientific_name'],
    },
    {
      label: 'assembly level',
      key: 'assembly_level',
      type: 'select',
      options: ['Chromosome', 'Complete Genome', 'Contig', 'Scaffold'],
    },
    {
      label: 'sort_column',
      key: 'sort_column',
      type: 'select',
      options: ['contig_n50', 'size', 'submission_date'],
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

  const offset = ref(1 + assemblyStore.pagination.offset)

  const columns = [
    'assembly_name',
    'scientific_name',
    'assembly_level',
    'contig_n50',
    'submitter',
    'submission_date',
    'size',
    'chromosomes',
  ]
  const assemblies = ref([])
  const total = ref(0)

  onMounted(async () => {
    getAssemblies(await AssemblyService.getAssemblies({ ...assemblyStore.searchForm, ...assemblyStore.pagination }))
  })

  async function handleSubmit() {
    assemblyStore.resetPagination()
    offset.value = 1
    getAssemblies(await AssemblyService.getAssemblies({ ...assemblyStore.searchForm, ...assemblyStore.pagination }))
  }
  async function handlePagination(value: number) {
    assemblyStore.pagination.offset = value - 1
    getAssemblies(await AssemblyService.getAssemblies({ ...assemblyStore.searchForm, ...assemblyStore.pagination }))
  }
  function handleDate(payload: Record<string, any>) {
    assemblyStore.searchForm = { ...assemblyStore.searchForm, ...payload }
  }
  async function reset() {
    const { start, end } = dateRange.value
    if (start || end) dateRange.value = { ...initDateRange }
    offset.value = 1
    assemblyStore.resetForm()
    assemblyStore.resetPagination()
    getAssemblies(await AssemblyService.getAssemblies({ ...assemblyStore.pagination }))
  }

  function getAssemblies({ data }: AxiosResponse) {
    assemblies.value = data.data
    total.value = data.total
    return data
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
