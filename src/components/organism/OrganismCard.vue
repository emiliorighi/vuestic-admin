<template>
  <va-card>
    <va-image v-if="data.image" style="height: 200px" :src="data.image" />
    <va-card-content>
      <va-button icon="pets">{{ data.scientific_name }}</va-button>
    </va-card-content>
  </va-card>
</template>
<script setup lang="ts">
  import OrganismService from '../../services/clients/OrganismService'

  const props = defineProps({
    taxid: String,
  })

  const { data } = await OrganismService.getOrganism(props.taxid)
</script>
