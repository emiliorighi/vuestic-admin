<template>
  <CesiumNode :accession="accession" />
</template>
<script setup lang="ts">
  import CesiumNode from '../../components/maps/CesiumNode.vue'
  const accession = 'PRJNA533106'
</script>
