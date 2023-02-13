<template>
  <va-card class="d-flex">
    <va-card-title>
      <div class="row">
        <div class="flex">total: {{ total }}</div>
      </div>
    </va-card-title>
    <Filters
      :search-form="assemblyStore.searchForm"
      :filters="filters"
      @on-reset="reset"
      @on-submit="handleSubmit"
      @on-date-change="handleDate"
    />
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
</template>
<script setup lang="ts">
  import AssemblyService from '../../services/clients/AssemblyService'
  import { onMounted, ref, watch } from 'vue'
  import { AxiosResponse } from 'axios'
  import { useAssemblyStore } from '../../stores/assembly-store'
  import DataTable from '../../components/ui/DataTable.vue'
  import Filters from '../../components/ui/Filters.vue'
  import { Filter } from '../../data/types'

  const assemblyStore = useAssemblyStore()

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
