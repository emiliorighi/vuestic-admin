<template>
  <div class="bubble-maps-page">
    <div class="row">
      <div class="flex md12 xs12">
        <va-card class="bubble-maps-page__widget" title="Bubble Maps">
          <Suspense>
            <bubble-map :map-data="bubbleMapData" style="height: 75vh" />
          </Suspense>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import BubbleMap from './BubbleMap.vue'
  import { bubbleMapData } from '../../../../data/maps/bubbleMapData'
</script>

<style lang="scss">
  .line-maps-page__widget {
    .va-card__inner {
      border-radius: inherit;
    }
  }
</style>
