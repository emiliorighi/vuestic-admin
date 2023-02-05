<template>
  <div v-if="assembly.metadata">
    <div class="row row-equal align-center justify-space-between">
      <div class="flex">
        <h1 class="va-h1">{{ assembly.assembly_name }}</h1>
        <va-button preset="primary" icon="pets">{{ assembly.scientific_name }}</va-button>
        <va-button preset="primary" icon="hub">{{ assembly.sample_accession }}</va-button>
      </div>
      <div class="flex">
        <div class="row row-equal align-center">
          <div class="flex">
            <a target="_blank" :href="`https://www.ncbi.nlm.nih.gov/assembly/${assembly.accession}`">
              <va-avatar size="large">
                <img :src="'/ncbi.png'" />
              </va-avatar>
            </a>
          </div>
          <div class="flex">
            <a target="_blank" :href="`https://www.ebi.ac.uk/ena/browser/view/${assembly.accession}`">
              <va-avatar size="large">
                <img :src="'/ena.jpeg'" />
              </va-avatar>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="row row-equal">
      <div class="flex">
        <va-card class="mb-4" color="danger">
          <va-card-content>
            <h2 class="va-h4 ma-0" style="color: white">{{ assembly.metadata.contig_n50 }}</h2>
            <p style="color: white">Contig n50</p>
          </va-card-content>
        </va-card>
      </div>
      <div class="flex">
        <va-card class="mb-4" color="info">
          <va-card-content>
            <h2 class="va-h4 ma-0" style="color: white">{{ assembly.metadata.estimated_size }}</h2>
            <p style="color: white">genome size</p>
          </va-card-content>
        </va-card>
      </div>
      <div class="flex">
        <va-card class="mb-4" color="warning">
          <va-card-content>
            <h2 class="va-h4 ma-0" style="color: white">{{ assembly.metadata.assembly_level }}</h2>
            <p style="color: white">assembly level</p>
          </va-card-content>
        </va-card>
      </div>
      <div v-if="assembly.chromosomes.length" class="flex">
        <va-card class="mb-4" color="primary">
          <va-card-content>
            <h2 class="va-h4 ma-0" style="color: white">{{ assembly.chromosomes.length }}</h2>
            <p style="color: white">chromosomes</p>
          </va-card-content>
        </va-card>
      </div>
      <div class="flex">
        <va-card class="mb-4" color="secondary">
          <va-card-content>
            <h2 class="va-h4 ma-0" style="color: white">{{ assembly.metadata.submitter }}</h2>
            <p style="color: white">submitter</p>
          </va-card-content>
        </va-card>
      </div>
      <div class="flex">
        <va-card class="mb-4" color="success">
          <va-card-content>
            <h2 class="va-h4 ma-0" style="color: white">{{ assembly.metadata.submission_date }}</h2>
            <p style="color: white">submission date</p>
          </va-card-content>
        </va-card>
      </div>
    </div>
    <div class="row row-equal">
      <div v-if="showJBrowse" class="flex lg12 md12 sm12 xs12">
        <Jbrowse2 :assembly="jbrowse.assembly" />
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
  const showJBrowse = ref(false)
  onMounted(async () => {
    getAssembly(await AssemblyService.getAssembly(props.accession))
  })

  function getAssembly({ data }: AxiosResponse) {
    assembly.value = { ...data }
    if (assembly.value.chromosomes.length) {
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
  .va-card {
    margin-bottom: 0 !important;
    &__title {
      display: flex;
      justify-content: space-between;
    }
  }

  .list__item + .list__item {
    margin-top: 10px;
  }
</style>
