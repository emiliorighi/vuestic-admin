<template>
  <div>
    <va-breadcrumbs class="va-title" color="primary">
      <va-breadcrumbs-item active :to="{ name: 'organisms' }" label="organisms" />
    </va-breadcrumbs>
    <va-divider />
    <OrganismListBlock />
  </div>
</template>
<script setup lang="ts">
  import OrganismListBlock from './OrganismListBlock.vue'
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
