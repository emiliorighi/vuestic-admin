<template>
  <div v-if="read.metadata">
    <div class="row row-equal align-center justify-space-between">
      <div class="flex">
        <h1 class="va-h1">{{ read.metadata.experiment_title }}</h1>
        <va-button preset="primary" icon="pets">{{ read.metadata.scientific_name }}</va-button>
        <va-button preset="primary" icon="hub">{{ read.metadata.sample_accession }}</va-button>
      </div>
      <div class="flex">
        <div class="row row-equal align-center">
          <div class="flex">
            <a target="_blank" :href="`https://www.ncbi.nlm.nih.gov/sra/${read.experiment_accession}`">
              <va-avatar size="large">
                <img :src="'/ncbi.png'" />
              </va-avatar>
            </a>
          </div>
          <div class="flex">
            <a target="_blank" :href="`https://www.ebi.ac.uk/ena/browser/view/${read.experiment_accession}`">
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
            <h2 class="va-h4 ma-0" style="color: white">{{ read.instrument_platform }}</h2>
            <p style="color: white">instrument platform</p>
          </va-card-content>
        </va-card>
      </div>
      <div class="flex">
        <va-card class="mb-4" color="info">
          <va-card-content>
            <h2 class="va-h4 ma-0" style="color: white">{{ read.instrument_model }}</h2>
            <p style="color: white">instrument model</p>
          </va-card-content>
        </va-card>
      </div>
      <div class="flex">
        <va-card class="mb-4" color="secondart">
          <va-card-content>
            <h2 class="va-h4 ma-0" style="color: white">{{ read.metadata.base_count }}</h2>
            <p style="color: white">base count</p>
          </va-card-content>
        </va-card>
      </div>
      <div class="flex">
        <va-card class="mb-4" color="warning">
          <va-card-content>
            <h2 class="va-h4 ma-0" style="color: white">{{ read.metadata.center_name }}</h2>
            <p style="color: white">center name</p>
          </va-card-content>
        </va-card>
      </div>
      <div class="flex">
        <va-card class="mb-4" color="secondary">
          <va-card-content>
            <h2 class="va-h4 ma-0" style="color: white">{{ read.metadata.first_created }}</h2>
            <p style="color: white">first created</p>
          </va-card-content>
        </va-card>
      </div>
    </div>
    <div v-for="key in Object.keys(read.metadata)" :key="key" class="row row-equal">
      <div v-if="read.metadata[key]" class="flex lg12 md12 sm12 xs12">
        <h6 class="va-h6">{{ key }}</h6>
        <div v-if="read.metadata[key] && read.metadata[key].split(';').length > 1">
          <ul class="va-unordered">
            <li v-for="(v, index) in read.metadata[key].split(';')" :key="index">
              {{ v }}
            </li>
          </ul>
        </div>
        <div v-else>
          <p>{{ read.metadata[key] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import ReadService from '../../services/clients/ReadService'
  import { onMounted, ref } from 'vue'
  import { AxiosResponse } from 'axios'

  const props = defineProps({
    accession: String,
  })

  const read = ref({})

  onMounted(async () => {
    getRead(await ReadService.getRead(props.accession))
  })

  function getRead({ data }: AxiosResponse) {
    read.value = { ...data }
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
