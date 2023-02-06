<template>
  <div v-if="biosample.metadata">
    <div class="row row-equal align-center justify-space-between">
      <div class="flex">
        <h1 class="va-h1">{{ biosample.accession }}</h1>
        <va-button preset="primary" icon="pets">{{ biosample.scientific_name }}</va-button>
      </div>
      <div class="flex">
        <div class="row row-equal align-center">
          <div class="flex">
            <a target="_blank" :href="`https://www.ncbi.nlm.nih.gov/biosample/${biosample.accession}`">
              <va-avatar size="large">
                <img :src="'/ncbi.png'" />
              </va-avatar>
            </a>
          </div>
          <div class="flex">
            <a target="_blank" :href="`https://www.ebi.ac.uk/ena/browser/view/${biosample.accession}`">
              <va-avatar size="large">
                <img :src="'/ena.jpeg'" />
              </va-avatar>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="row row-equal justify-start">
      <div v-if="biosample.metadata.GAL" class="flex">
        <va-card class="mb-4" color="danger">
          <va-card-content>
            <h2 class="va-h4 ma-0" style="color: white">{{ biosample.metadata.GAL }}</h2>
            <p style="color: white">Genome Aquisition Lab</p>
          </va-card-content>
        </va-card>
      </div>
      <div v-if="biosample.metadata['organism part']" class="flex">
        <va-card class="mb-4" color="secondary">
          <va-card-content>
            <h2 class="va-h4 ma-0" style="color: white">{{ biosample.metadata['organism part'] }}</h2>
            <p style="color: white">organism part</p>
          </va-card-content>
        </va-card>
      </div>
      <div v-if="biosample.metadata.tissue" class="flex">
        <va-card class="mb-4" color="warning">
          <va-card-content>
            <h2 class="va-h4 ma-0" style="color: white">{{ biosample.metadata.tissue }}</h2>
            <p style="color: white">tissue</p>
          </va-card-content>
        </va-card>
      </div>
      <div v-if="biosample.metadata.habitat" class="flex">
        <va-card class="mb-4" color="info">
          <va-card-content>
            <h2 class="va-h4 ma-0" style="color: white">{{ biosample.metadata.habitat }}</h2>
            <p style="color: white">habitat</p>
          </va-card-content>
        </va-card>
      </div>
      <div v-if="biosample.metadata['collection date']" class="flex">
        <va-card class="mb-4" color="success">
          <va-card-content>
            <h2 class="va-h4 ma-0" style="color: white">{{ biosample.metadata['collection date'] }}</h2>
            <p style="color: white">collection date</p>
          </va-card-content>
        </va-card>
      </div>
      <div v-if="biosample.metadata.collection_date" class="flex">
        <va-card class="mb-4" color="success">
          <va-card-content>
            <h2 class="va-h4 ma-0" style="color: white">{{ biosample.metadata.collection_date }}</h2>
            <p style="color: white">collection date</p>
          </va-card-content>
        </va-card>
      </div>
      <div v-if="biosample.metadata.geo_loc_name" class="flex">
        <va-card class="mb-4" color="primary">
          <va-card-content>
            <h2 class="va-h4 ma-0" style="color: white">{{ biosample.metadata.geo_loc_name }}</h2>
            <p style="color: white">Geolocation</p>
          </va-card-content>
        </va-card>
      </div>
      <div v-if="biosample.metadata['geographic location (country and/or sea)']" class="flex">
        <va-card class="mb-4" color="warning">
          <va-card-content>
            <h2 class="va-h4 ma-0" style="color: white">
              {{ biosample.metadata['geographic location (country and/or sea)'] }}
            </h2>
            <p style="color: white">Country</p>
          </va-card-content>
        </va-card>
      </div>
      <div v-if="biosample.metadata['geographic location (region and locality)']" class="flex">
        <va-card class="mb-4" color="primary">
          <va-card-content>
            <h2 class="va-h4 ma-0" style="color: white">
              {{ biosample.metadata['geographic location (region and locality)'] }}
            </h2>
            <p style="color: white">Region</p>
          </va-card-content>
        </va-card>
      </div>
    </div>
    <div class="row row-equal">
      <div v-if="biosample.sub_samples.length" class="flex">
        <List :route="'biosample'" :title="'related biosamples'" :list="biosample.sub_samples" />
      </div>
      <div v-if="biosample.experiments.length" class="flex">
        <List :route="'read'" :title="'related reads'" :list="biosample.experiments" />
      </div>
      <div v-if="biosample.assemblies.length" class="flex">
        <List :route="'assembly'" :title="'related assemblies'" :list="biosample.assemblies" />
      </div>
    </div>
    <div class="row row-equal">
      <div class="flex lg6 md6 sm12 xs12">
        <Metadata :metadata="biosample.metadata" />
      </div>
      <div
        v-if="biosample.latitude && biosample.longitude && Number(biosample.latitude) && Number(biosample.longitude)"
        class="flex lg6 md6 sm12 xs12"
      >
        <va-card>
          <LeafletMap
            :latitude="Number(biosample.latitude)"
            :longitude="Number(biosample.longitude)"
            :html="`${biosample.accession}`"
          />
        </va-card>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import BioSampleService from '../../services/clients/BioSampleService'
  import { onMounted, ref } from 'vue'
  import { AxiosResponse } from 'axios'
  import Metadata from '../../components/ui/Metadata.vue'
  import List from '../../components/ui/List.vue'
  import LeafletMap from '../../components/maps/LeafletMap.vue'

  const props = defineProps({
    accession: String,
  })

  const biosample = ref({})

  onMounted(async () => {
    getRead(await BioSampleService.getBioSample(props.accession))
  })

  function getRead({ data }: AxiosResponse) {
    biosample.value = { ...data }
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
