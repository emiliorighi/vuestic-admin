<template>
  <va-breadcrumbs class="va-title" color="primary">
    <va-breadcrumbs-item :to="{ name: 'biosamples' }" label="biosamples" />
    <va-breadcrumbs-item
      v-if="router.currentRoute.value.name === 'biosample'"
      active
      :label="router.currentRoute.value.params.accession"
    />
  </va-breadcrumbs>
  <div v-if="showData">
    <div class="row row-equal justify-space-between">
      <div class="flex">
        <h1 class="va-h1">{{ biosample.accession }}</h1>
        <div class="row align-center">
          <div class="flex">
            <va-button :to="{ name: 'organism', params: { taxid: biosample.taxid } }" preset="primary" icon="pets">{{
              biosample.scientific_name
            }}</va-button>
          </div>
          <div v-for="(dt, index) in validData" :key="index" class="flex">
            <va-button-dropdown v-if="biosample[dt.key].length" round preset="primary">
              <template #label> <va-icon :name="dt.icon" size="small" /> {{ dt.title }} </template>
              <List :route="dt.route" :list="biosample[dt.key]" />
            </va-button-dropdown>
          </div>
        </div>
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
    <div class="row row-equal">
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
    <va-card-title>metatada</va-card-title>
    <div class="row row-equal">
      <div class="flex lg6 md6 sm12 xs12">
        <va-card-content style="max-height: 350px; overflow-y: scroll">
          <Metadata :metadata="biosample.metadata" />
        </va-card-content>
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
  <div v-else>
    <h3 class="va-h3">
      {{ error }}
    </h3>
  </div>
</template>
<script setup lang="ts">
  import BioSampleService from '../../services/clients/BioSampleService'
  import { computed, onMounted, ref, watch } from 'vue'
  import { AxiosResponse } from 'axios'
  import Metadata from '../../components/ui/Metadata.vue'
  import List from '../../components/ui/List.vue'
  import LeafletMap from '../../components/maps/LeafletMap.vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const showData = ref(false)
  const error = ref('')
  const props = defineProps({
    accession: String,
  })

  watch(
    () => props.accession,
    async (value) => {
      try {
        getBioSample(await BioSampleService.getBioSample(props.accession))
        showData.value = true
      } catch (e) {
        error.value = props.accession + ' ' + e.response.data.message
        showData.value = false
      }
    },
  )
  const relatedData = [
    {
      title: 'Related BioSamples',
      icon: 'hubs',
      key: 'sub_samples',
      route: 'biosample',
    },
    {
      title: 'Related Reads',
      icon: 'widgets',
      key: 'experiments',
      route: 'read',
    },
    {
      title: 'Related Assemblies',
      icon: 'library_books',
      key: 'assemblies',
      route: 'assembly',
    },
  ]
  const biosample = ref({})

  const validData = ref()

  onMounted(async () => {
    try {
      getBioSample(await BioSampleService.getBioSample(props.accession))
      showData.value = true
    } catch (e) {
      error.value = props.accession + ' ' + e.response.data.message
      showData.value = false
    }
  })

  function getBioSample({ data }: AxiosResponse) {
    biosample.value = { ...data }
    validData.value = relatedData.filter(
      (data) => Object.keys(biosample.value).includes(data.key) && biosample.value[data.key].length,
    )
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
