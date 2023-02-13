<template>
  <va-card class="d-flex">
    <va-tabs v-model="value" grow>
      <template #tabs>
        <va-tab v-for="model in filteredDataModels" :key="model.value" :name="model.value">
          {{ model.label }}
        </va-tab>
      </template>
    </va-tabs>
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
  import { ref } from 'vue'
  import AssemblyService from '../../services/clients/AssemblyService'
  import BioSampleService from '../../services/clients/BioSampleService'
  import OrganismService from '../../services/clients/OrganismService'
  import ReadService from '../../services/clients/ReadService'
  import LocalSampleService from '../../services/clients/LocalSampleService'

  const model = ref('organisms')

  const models = ['organisms', 'assemblies', 'reads', 'biosamples', 'local_samples', 'annotations', '']

  const dataModels = [
    {
      label: 'Organisms',
      value: 'organisms',
      itemProvider: OrganismService.getOrganisms,
      columns: ['scientific_name', 'taxid', 'tolid_prefix', 'actions'],
      deleteAction: OrganismService.deleteOrganism,
      editable: true,
    },
    {
      label: 'BioSamples',
      value: 'biosamples',
      itemProvider: BioSampleService.getBioSamples,
      columns: ['accession', 'taxid', 'sub_samples', 'actions'],
      deleteAction: BioSampleService.deleteBioSample,
      editable: false,
    },
    {
      label: 'Reads',
      value: 'reads',
      itemProvider: ReadService.getReads,
      columns: ['experiment_accession', 'instrument_platform', 'taxid', 'actions'],
      deleteAction: ReadService.deleteRead,
      editable: false,
    },
    {
      label: 'Assemblies',
      value: 'assemblies',
      itemProvider: AssemblyService.getAssemblies,
      columns: ['accession', 'assembly_name', 'taxid', 'actions'],
      deleteAction: AssemblyService.deleteAssembly,
      editable: false,
    },
    // {label:'Annotations',value:'annotations', itemProvider: AnnotationService.getAnnotations,
    // columns:['name','assembly_accession','actions'],deleteAction: AnnotationService.deleteAnnotation,editable:true},
    // {label:'Local samples',value:'local_samples', itemProvider: LocalSampleService.getLocalSamples,
    // columns:['local_id','taxid','broker','actions'], deleteAction: LocalSampleService.deleteLocalSample,editable:false},
    // {label:'Genome Browser Data',value:'jbrowse', itemProvider: GenomeBrowserService.getGenomeBrowserData ,deleteAction: GenomeBrowserService.deleteGenomeBrowserData, columns:['assembly_accession','taxid','actions'], editable:true},
    // {label:'Portal Users',value:'users', itemProvider: UserService.getUsers,deleteAction: UserService.deleteUser,columns:['name','role','actions'],editable:true}
  ]
  const items = ref([])
  const total = ref(0)
</script>
