<template>
  <va-card class="d-flex">
    {{ crudObj }}
    <va-card-content>
      <va-inner-loading :loading="isLoading">
        <div class="row">
          <div class="flex">
            <va-radio
              v-for="(m, index) in crudList"
              :key="index"
              v-model="model"
              :disabled="metadata && Object.keys(metadata).length"
              :label="m.label"
              :option="m.value"
            />
          </div>
          <div class="flex">
            <va-input v-model="input" label="accession number">
              <template #append>
                <va-button :disabled="input.length <= 3" type="submit" icon="search" @click="getINSDCObject()"
                  >Search</va-button
                >
              </template>
            </va-input>
          </div>
        </div>
      </va-inner-loading>
    </va-card-content>
  </va-card>
  <Transition name="slide">
    <va-card v-if="metadata">
      <va-card-content>
        <h5 class="va-h5">{{ input }}</h5>
      </va-card-content>
      <va-card-content>
        <Metadata :metadata="metadata" />
      </va-card-content>
      <va-card-actions align="between">
        <va-button type="submit" @click="submit()">Submit</va-button>
        <va-button color="danger" type="reset" @click="reset()">Reset</va-button>
      </va-card-actions>
    </va-card>
  </Transition>
</template>
<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import AssemblyService from '../../services/clients/AssemblyService'
  import BioSampleService from '../../services/clients/BioSampleService'
  import ReadService from '../../services/clients/ReadService'
  import ENAClientService from '../../services/clients/ENAClientService'
  import NCBIClientService from '../../services/clients/NCBIClientService'
  import { useToast } from 'vuestic-ui'
  import Metadata from '../../components/ui/Metadata.vue'

  const { init } = useToast()

  const model = ref('biosample')

  const input = ref('')

  const errorMessage = ref('')

  const isLoading = ref(false)

  watch(model, () => {
    input.value = ''
  })

  const crudObj = computed(() => {
    return crudList.find((it) => it.value === model.value)
  })

  const metadata = ref()

  const crudList = [
    {
      label: 'import BioSample',
      value: 'biosample',
      getFromDB: BioSampleService.getBioSample,
      postToDB: BioSampleService.importBioSample,
      getFromINSDC: ENAClientService.getBioSample,
    },
    {
      label: 'import Assembly',
      value: 'assembly',
      getFromDB: AssemblyService.getAssembly,
      postToDB: AssemblyService.importAssembly,
      getFromINSDC: NCBIClientService.getAssembly,
    },
    {
      label: 'import Read',
      value: 'read',
      getFromDB: ReadService.getRead,
      postToDB: ReadService.importRead,
      getFromINSDC: ENAClientService.getRead,
    },
  ]

  async function getINSDCObject() {
    try {
      const { status } = await crudObj.value.getFromDB(input.value)
      if (status === 200) {
        errorMessage.value = `${crudObj.value.value} with id ${input.value} already present`
        init({ message: errorMessage.value, color: 'danger' })
        return
      }
    } catch (error) {
      // here we check if object is not present in the db, we expect a 404
      if (!error.response || !error.response.status || error.response.status !== 404) {
        errorMessage.value = `Something happened`
        init({ message: errorMessage.value, color: 'danger' })
      }
    }
    const { data } = await crudObj.value.getFromINSDC(input.value)

    switch (crudObj.value.value) {
      case 'biosample': {
        if (!data._embedded || !data._embedded.samples || !data._embedded.samples.length) {
          errorMessage.value = `BioSample with id: ${input.value} not found in INSDC`
          init({ message: errorMessage.value, color: 'danger' })
          return
        }
        metadata.value = data._embedded.samples[0]
        break
      }
      case 'assembly': {
        if (!data || !data.assemblies || !data.assemblies.length) {
          errorMessage.value = `Assembly with id: ${input.value} not found in INSDC`
          init({ message: errorMessage.value, color: 'danger' })
          return
        }
        metadata.value = data.assemblies[0]
        break
      }
      case 'read': {
        if (!data || !data.length) {
          errorMessage.value = `Read with id: ${input.value} not found in INSDC`
          init({ message: errorMessage.value, color: 'danger' })
          return
        }
        metadata.value = data[0]
        break
      }
    }
  }
  async function submit() {
    const { status } = await crudObj.value.postToDB(input.value)
    if (status === 201) {
      const message = `${crudObj.value.value} with id ${input.value} saved!`
      init({ message: message, color: 'success' })
    }
  }

  function reset() {
    input.value = ''
    metadata.value = null
  }
</script>
