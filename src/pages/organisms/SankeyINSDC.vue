<template>
  <div ref="tree" class="tree" />
</template>

<script setup lang="ts">
  import * as am5 from '@amcharts/amcharts5'
  import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
  import { ref, onMounted } from 'vue'
  import * as am5hierarchy from '@amcharts/amcharts5/hierarchy'
  import OrganismService from '../../services/clients/OrganismService'

  const props = defineProps({
    taxid: String,
  })

  const tree = ref()

  onMounted(async () => {
    const { data } = await OrganismService.getINSDCSankeyData(props.taxid)
    createSankeyDiagram(data)
  })

  async function createSankeyDiagram(data) {
    const root = am5.Root.new(tree.value)
    root.setThemes([am5themes_Animated.new(root)])
    const container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout,
      }),
    )
    const series = container.children.push(
      am5hierarchy.ForceDirected.new(root, {
        categoryField: 'name',
        idField: 'name',
        downDepth: 1,
        initialDepth: 1,
        valueField: 'value',
        childDataField: 'children',
        linkWithField: 'links',
        minRadius: 30,
        maxRadius: am5.percent(10),
        // centerStrength: 0.5,
        // manyBodyStrength: -1,
        nodePadding: 5,
        // initialFrames: 1000,
        // showOnFrame: 1000,
        velocityDecay: 0.7,
      }),
    )
    series.nodes.template.set('tooltipText', '{category}')
    series.nodes.template.events.on('pointerover', (event) => {
      console.log(event)
    })

    series.data.setAll([data])
  }
</script>
<style scoped>
  .tree {
    width: 100%;
    height: 600px;
  }
</style>
