<template>
  <div class="row align-center">
    <va-select
      v-model="filter.filter_option"
      class="flex lg4 md4 sm12 xs12"
      :options="['accession', 'taxid', 'scientific_name']"
      label="filter by"
    ></va-select>
    <va-input v-model="filter.filter" label="search BioSample" class="flex lg4 md4 sm12 xs12"></va-input>
    <va-button :disabled="filter.filter.length <= 2" icon="search" @click="handleSubmit"> Search </va-button>
  </div>
  <va-data-table :items="biosamples" :columns="['accession', 'scientific_name', 'organism_part', 'actions']">
    <template #cell(organism_part)="{ rowData }">
      {{ rowData.metadata.tissue || rowData.metadata.organism_part || rowData.metadata['organism part'] }}
    </template>
    <template #cell(actions)="{ rowData }">
      <va-chip color="danger" icon="delete" @click="deleteConfirmation(rowData)">Delete BioSample</va-chip>
    </template>
  </va-data-table>
  <div class="row justify-center">
    <div class="flex">
      <va-pagination
        v-model="offset"
        :page-size="pagination.limit"
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
  <va-modal v-model="showModal" hide-default-actions>
    <template #header>
      <h2 style="color: red">Delete {{ sampleToDelete.id }}</h2>
    </template>
    <div style="padding: 10px">
      Are you sure you want to delete sample: <strong>{{ sampleToDelete.id }}</strong> ?
    </div>
    <template #footer>
      <va-button color="danger" @click="deleteLocalSample"> Delete </va-button>
    </template>
  </va-modal>
</template>
<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import BioSampleService from '../../../services/clients/BioSampleService'

  const initPagination = {
    offset: 0,
    limit: 10,
  }

  const initFilter = {
    filter: '',
    filter_option: '',
  }

  const showModal = ref(false)
  const filter = ref({ ...initFilter })
  const pagination = ref({ ...initPagination })
  const offset = ref(1 + pagination.value.offset)
  const biosamples = ref([])
  const total = ref(0)

  const sampleToDelete = ref({
    accession: null,
  })
  onMounted(async () => {
    const { data } = await BioSampleService.getBioSamples({ ...pagination.value })
    biosamples.value = data.data
    total.value = data.total
  })

  async function handlePagination(value: number) {
    pagination.value.offset = value - 1
    const { data } = await BioSampleService.getBioSamples({ ...pagination.value, ...filter.value })
    biosamples.value = data.data
    total.value = data.total
  }
  async function handleSubmit() {
    const { data } = await BioSampleService.getBioSamples({ ...pagination.value, ...filter.value })
    biosamples.value = data.data
    total.value = data.total
    pagination.value = { ...initPagination }
  }

  function deleteConfirmation(rowData) {
    sampleToDelete.value.accession = rowData.accession
    showModal.value = true
  }

  async function deleteLocalSample() {
    const { data } = await BioSampleService.deleteBioSample(sampleToDelete.value.accession)
    console.log(data)
  }
</script>
