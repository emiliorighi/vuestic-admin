<template>
  <div>
    <div class="row">
      <div class="flex">
        <va-card v-if="assembly.chromosomes">
          <va-card-title>chromosomes</va-card-title>
          <va-card-content> </va-card-content>
        </va-card>
      </div>
      <div class="flex">
        <va-card>
          <va-card-title>external links</va-card-title>
          <va-card-content> </va-card-content>
        </va-card>
      </div>
      <div class="flex">
        <va-card>
          <va-card-title>related bioprojects</va-card-title>
          <va-card-content> </va-card-content>
        </va-card>
      </div>
      <div class="flex">
        <va-card>
          <va-card-title>related organism</va-card-title>
          <va-card-content> </va-card-content>
        </va-card>
      </div>
      <div class="flex">
        <va-card>
          <va-card-title>related biosample</va-card-title>
          <va-card-content> </va-card-content>
        </va-card>
      </div>
      <div v-if="showJBrowse" class="flex">
        <Jbrowse2 :assembly="jbrowse.assembly" />
      </div>
      <div class="flex">
        <va-card>
          <va-card-title>metadata</va-card-title>
          <va-card-content> </va-card-content>
        </va-card>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import AssemblyService from '../../services/clients/AssemblyService'
  import { onMounted, reactive, ref } from 'vue'
  import { AxiosResponse } from 'axios'
  import Jbrowse2 from '../../components/genome-browser/Jbrowse2.vue'
  import { AssemblyAdapter } from '../../data/types'
  const props = defineProps({
    accession: String,
  })

  const assembly = ref({})
  const jbrowse = reactive({
    assembly: {},
  })
  let jBrowseAssembly = {}
  const showJBrowse = ref(false)
  onMounted(async () => {
    getAssembly(await AssemblyService.getAssembly(props.accession))
  })

  function getAssembly({ data }: AxiosResponse) {
    assembly.value = { ...data }
    if (assembly.value.chromosomes) {
      const assemblyAdapter: AssemblyAdapter = {
        name: assembly.value.assembly_name,
        sequence: {
          name: assembly.value.assembly_name,
          trackId: assembly.value.accession,
          type: 'ReferenceSequenceTrack',
          adapter: {
            type: 'RefGetAdapter',
            sequenceData: {},
          },
        },
      }
      assembly.value.chromosomes.forEach((chr) => {
        const key = 'insdc:' + chr.accession_version
        assemblyAdapter.sequence.adapter.sequenceData[key] = {
          name: chr.metadata.name,
          size: Number(chr.metadata.length),
        }
      })
      jbrowse.assembly = { ...assemblyAdapter }
      showJBrowse.value = true
    }
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
