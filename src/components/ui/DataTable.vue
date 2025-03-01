<template>
  <va-data-table :items="items" :columns="columns">
    <template #header(assembly_level)="{ label }">{{ label }}</template>
    <template #header(contig_n50)="{ label }">{{ label }}</template>
    <template #cell(assembly_level)="{ rowData }"
      ><va-chip size="small">{{ rowData.metadata.assembly_level }}</va-chip>
    </template>
    <template #cell(assembly_name)="{ rowData }">
      <va-chip
        outline
        size="small"
        :to="{ name: 'assembly', params: { accession: rowData.accession, savePosition: true } }"
        >{{ rowData.assembly_name }}</va-chip
      >
      <!-- <router-link :to="{name: 'assembly', params: {accession:rowData.accession}}">{{ rowData.assembly_name }}</router-link> -->
    </template>
    <template #cell(contig_n50)="{ rowData }">
      {{ (rowData.metadata.contig_n50 / getContigN50(rowData.metadata.contig_n50)?.value).toFixed(2) }}
      {{ getContigN50(rowData.metadata.contig_n50)?.name }}
    </template>
    <template #cell(organism_part)="{ rowData }">
      {{ rowData.metadata.tissue || rowData.metadata.organism_part || rowData.metadata['organism part'] }}
    </template>
    <template #cell(size)="{ rowData }">
      {{ (rowData.metadata.estimated_size / getContigN50(rowData.metadata.estimated_size)?.value).toFixed(2) }}
      {{ getContigN50(rowData.metadata.estimated_size)?.name }}
    </template>
    <template #cell(submission_date)="{ rowData }">
      {{ rowData.metadata.submission_date }}
    </template>
    <template #cell(submitter)="{ rowData }">
      {{ rowData.metadata.submitter }}
    </template>
    <template #cell(image)="{ rowData }">
      <va-avatar :src="rowData.image" />
    </template>
    <template #cell(chromosomes)="{ rowData }">{{ rowData.chromosomes.length || '' }}</template>
    <template #cell(accession)="{ rowData }">
      <va-chip
        outline
        :to="{ name: 'biosample', params: { accession: rowData.accession, savePosition: true } }"
        size="small"
      >
        {{ rowData.accession }}
      </va-chip>
    </template>
    <template #cell(habitat)="{ rowData }">
      {{ rowData.metadata.habitat }}
    </template>
    <template #cell(collection_date)="{ rowData }">
      {{ rowData.metadata.collection_date }}
    </template>
    <template #cell(gal)="{ rowData }">
      {{ rowData.metadata.GAL }}
    </template>
    <template #cell(experiment_accession)="{ rowData }">
      <va-chip
        outline
        size="small"
        :to="{ name: 'read', params: { accession: rowData.experiment_accession, savePosition: true } }"
        >{{ rowData.experiment_accession }}</va-chip
      >
    </template>
    <template #cell(experiment_title)="{ rowData }">
      {{ rowData.metadata.experiment_title }}
    </template>
    <template #cell(instrument_platform)="{ rowData }">
      <va-chip size="small"> {{ rowData.instrument_platform }}</va-chip>
    </template>

    <template #cell(center_name)="{ rowData }">
      {{ rowData.metadata.center_name }}
    </template>
    <template #cell(scientific_name)="{ rowData }">
      <va-chip outline size="small" :to="{ name: 'organism', params: { taxid: rowData.taxid, savePosition: true } }">
        {{ rowData.scientific_name || rowData.metadata.scientific_name }}</va-chip
      >
    </template>
    <template #cell(organisms)="{ rowData }">
      <va-chip outline size="small"> {{ rowData.leaves }}</va-chip>
    </template>
    <template #cell(first_created)="{ rowData }">
      {{ rowData.metadata.first_created }}
    </template>
  </va-data-table>
</template>
<script setup lang="ts">
  const props = defineProps({
    columns: Array,
    items: Array,
  })

  const contigs = [
    {
      name: 'Kbp',
      value: 1000,
    },
    {
      name: 'Mbp',
      value: 1000000,
    },
    {
      name: 'Gbp',
      value: 1000000000,
    },
  ]

  function getContigN50(number: number) {
    return contigs.sort((a, b) => {
      return Math.abs(a.value - number) - Math.abs(b.value - number)
    })[0]
  }
</script>
