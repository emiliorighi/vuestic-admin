<template>
  <ul>
    <li v-for="(key, index) in Object.keys(metadata).filter((k) => metadata[k])" :key="index">
      <div class="row row-equal">
        <div class="flex lg12 md12 sm12 xs12">
          <h6 class="va-h6">{{ key }}</h6>
          <div v-if="typeof metadata[key] === 'string'">
            <!-- <div v-if="!isNaN(metadata[key])">
              <p>{{ metadata[key] }}</p>
            </div> -->
            <div v-if="metadata[key].split(';').length > 1">
              <ul>
                <li v-for="(v, index) in metadata[key].split(';')" :key="index">
                  {{ v }}
                </li>
              </ul>
            </div>
            <div v-else>
              <p>{{ metadata[key] }}</p>
            </div>
          </div>
          <div v-else-if="typeof metadata[key] === 'object' && !metadata[key].length">
            <Metadata :metadata="metadata[key]" />
          </div>
          <div v-else-if="typeof metadata[key] === 'object' && metadata[key].length">
            <div v-for="(v, index) in metadata[key]" :key="index">
              <div v-if="typeof v === 'object'">
                <Metadata :metadata="v" />
              </div>
              <div v-else>
                {{ v }}
              </div>
            </div>
          </div>
          <div v-else>
            <p>{{ metadata[key] }}</p>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
<script setup lang="ts">
  const props = defineProps({
    metadata: Object,
  })
</script>
<style>
  ul {
    list-style: outside;
    padding-left: 20px;
  }
</style>
