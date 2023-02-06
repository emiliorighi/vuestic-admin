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
              v-model="assemblyStore.searchForm.filter"
              label="search assembly"
              placeholder="Search by species, taxid or assembly name"
            ></va-input>
          </div>
          <div class="flex lg4 md4 sm12 xs12">
            <va-select
              v-model="assemblyStore.searchForm.filter_option"
              label="filter by"
              :options="['taxid', 'assembly_name', 'scientific_name']"
            />
          </div>
          <div class="flex lg4 md4 sm12 xs12">
            <va-select
              v-model="assemblyStore.searchForm.assembly_level"
              label="assembly level"
              :options="['Chromosome', 'Complete Genome', 'Contig', 'Scaffold']"
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
          <div v-if="assemblyStore.submitters.length" class="flex lg4 md4 sm12 xs12">
            <va-select
              v-model="assemblyStore.searchForm.submitter"
              searchable
              label="submitters"
              :options="assemblyStore.submitters.map((s) => s.name)"
            />
          </div>
          <div class="flex lg4 md4 sm12 xs12">
            <va-select
              v-model="assemblyStore.searchForm.sort_column"
              label="sort by"
              :options="['contig_n50', 'size', 'submission_date']"
            />
          </div>
          <div class="flex lg4 md4 sm12 xs12">
            <va-select v-model="assemblyStore.searchForm.sort_order" label="sorting order" :options="['asc', 'desc']" />
          </div>
        </div>
      </va-card-content>
      <va-card-actions align="between">
        <va-button type="submit">Search</va-button>
        <va-button color="danger" @click="reset()">Reset</va-button>
      </va-card-actions>
    </va-form>
    <va-card-content>
      <va-data-table :items="assemblies" :columns="columns">
        <template #header(assembly_level)="{ label }">{{ label }}</template>
        <template #header(contig_n50)="{ label }">{{ label }}</template>
        <template #cell(assembly_level)="{ rowData }"
          ><va-chip size="small">{{ rowData.metadata.assembly_level }}</va-chip>
        </template>
        <template #cell(assembly_name)="{ rowData }">
          <va-chip
            outline
            size="small"
            :to="{ name: 'assembly', params: { accession: rowData.accession, savePosition: true } }"
            >{{ rowData.assembly_name }}</va-chip
          >
          <!-- <router-link :to="{name: 'assembly', params: {accession:rowData.accession}}">{{ rowData.assembly_name }}</router-link> -->
        </template>
        <template #cell(contig_n50)="{ rowData }">
          {{ rowData.metadata.contig_n50 / getContigN50(rowData.metadata.contig_n50)?.value }}
          {{ getContigN50(rowData.metadata.contig_n50)?.name }}
        </template>
        <template #cell(size)="{ rowData }">
          {{ rowData.metadata.estimated_size / getContigN50(rowData.metadata.estimated_size)?.value }}
          {{ getContigN50(rowData.metadata.estimated_size)?.name }}
        </template>
        <template #cell(submission_date)="{ rowData }">
          {{ rowData.metadata.submission_date }}
        </template>
        <template #cell(submitter)="{ rowData }">
          {{ rowData.metadata.submitter }}
        </template>
        <template #cell(chromosomes)="{ rowData }">{{ rowData.chromosomes.length || '' }}</template>
      </va-data-table>
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

  const assemblyStore = useAssemblyStore()

  const contigs = [
    {
      name: 'Kbp',
      value: 1000,
    },
    {
      name: 'Mbp',
      value: 1000000,
    },
    {
      name: 'Gbp',
      value: 1000000000,
    },
  ]

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

  async function reset() {
    dateRange.value = { ...initDateRange }
    offset.value = 1
    assemblyStore.resetForm()
    assemblyStore.resetPagination()
    getAssemblies(await AssemblyService.getAssemblies({ ...assemblyStore.pagination }))
  }

  function getContigN50(number: number) {
    return contigs.sort((a, b) => {
      return Math.abs(a.value - number) - Math.abs(b.value - number)
    })[0]
  }

  function getAssemblies({ data }: AxiosResponse) {
    assemblies.value = data.data
    total.value = data.total
    return data
  }
</script>
