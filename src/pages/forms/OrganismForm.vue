<template>
  <va-card class="d-flex">
    <va-card-content>
      <va-input v-model="input" label="taxid">
        <template #append>
          <va-button :disabled="input.length < 1" type="submit" icon="search" @click="getTaxon()">Search</va-button>
        </template>
      </va-input>
    </va-card-content>
    <va-card-content>
      <h5 class="va-h5">{{ input }}</h5>
    </va-card-content>
    <va-card-content v-if="metadata">
      <Metadata :metadata="metadata" />
    </va-card-content>
  </va-card>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import ENAClientService from '../../services/clients/ENAClientService'
  import { useToast } from 'vuestic-ui'
  import Metadata from '../../components/ui/Metadata.vue'
  const { init } = useToast()

  const input = ref('')

  const errorMessage = ref('')

  const metadata = ref()

  async function getTaxon() {
    const { data } = await ENAClientService.getTaxon(input.value)
    console.log(data)
  }
</script>
