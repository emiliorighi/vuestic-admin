<template>
  <div ref="mapRef" class="leaflet-map fill-height" />
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  import 'leaflet-map'
  import 'leaflet/dist/leaflet.css'
  import * as Leaflet from 'leaflet'

  Leaflet.Icon.Default.imagePath = '/vendor/leaflet/'

  const props = defineProps({
    coordinates: Array,
    latitude: Number,
    longitude: Number,
    html: String,
  })
  const mapRef = ref()

  onMounted(() => {
    const map = Leaflet.map(mapRef.value).setView([props.latitude, props.longitude], 8)

    Leaflet.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    Leaflet.marker([props.latitude, props.longitude]).addTo(map).bindPopup(props.html)
  })
</script>
