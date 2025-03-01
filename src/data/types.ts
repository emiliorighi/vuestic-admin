import type { TChartData as ChartData } from 'vue-chartjs/dist/types'

export type ColorThemes = {
  [key: string]: string
}

export type TLineChartData = ChartData<'line'>
export type TBarChartData = ChartData<'bar'>
export type TBubbleChartData = ChartData<'bubble'>
export type TDoughnutChartData = ChartData<'doughnut'>
export type TPieChartData = ChartData<'pie'>

export type TChartData = TLineChartData | TBarChartData | TBubbleChartData | TDoughnutChartData | TPieChartData

interface Node {
  children: Array<string>
  leaves: number
  assemblies?: number
  biosamples?: number
  experiments?: number
  local_samples?: number
  annotations?: number
}

export type Filter = {
  label: string
  placeholder?: string
  type: 'input' | 'select' | 'date'
  options?: Array<string>
  key: string
}

interface SearchForm {
  filter: string
  filter_option: string
  sort_column: string
  sort_order: string
  start_date?: string
  end_date?: string
}

export interface OrganismSearchForm extends SearchForm {
  insdc_status: string
  goat_status: string
  parent_taxid: string
  bioproject: string
  target_list_status: string
  country: string
}

export type BioSampleSearchForm = SearchForm

export interface ReadSearchForm extends SearchForm {
  center: string
}
export interface AssemblySearchForm extends SearchForm {
  assembly_level: string
  submitter: string
}

export type ModelSearchForm = OrganismSearchForm | AssemblySearchForm | ReadSearchForm | BioSampleSearchForm

export interface BioProjectNode extends Node {
  title: string
  accession: string
}

export interface TaxonNode extends Node {
  name: string
  rank: string
  taxid: string
}

export type BreadCrumb = {
  name: string
  path: string
}

export type TreeNode = {
  name: string
  rank: string
  taxid: string
  leaves: number
}

export type Publication = {
  source: 'DOI' | 'PubMed ID' | 'PubMed CentralID' | ''
  id: string
}

export type CommonName = {
  value: string
  locality: string
  lang: string
}

export type Contributor = {
  contributions?: number
  name: string
}

type Chromosome = {
  name: string
  size: number
}

export type Adapter = {
  type: 'RefGetAdapter'
  sequenceData: Record<string, Chromosome>
}

type Sequence = {
  type: 'ReferenceSequenceTrack'
  trackId: string
  name: string
  adapter: Adapter
}

export type AssemblyAdapter = {
  name: string
  sequence: Sequence
}
