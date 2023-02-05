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

export interface BioProjectNode extends Node {
  title: string
  accession: string
}

export interface TaxonNode extends Node {
  name: string
  rank: string
  taxid: string
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
  //   {
  //     "name":"dm6",
  //   "sequence":{
  //       "type": "ReferenceSequenceTrack",
  //       "trackId": "dm6",
  //       "name": 'dm6',
  //       "adapter": {
  //           "type": "RefGetAdapter",
  //           "sequenceData": {
  //               "b6a98b7c676bdaa11ec9521ed15aff2b":{"name":"2L","size":23513712},
  //               "2ecce4ca1c0106bb7c63a78b93ab49ba":{"name":"2R","size":25286936},
  //               "3c3ea06b22af8cc59809dbf8d154791e":{"name":"3L","size":28110227},
  //               "420540d26d86fbf14185d2f2d68af9c4":{"name":"3R","size":32079331},
  //               "f7228bbf9f8fa0af457bc2fb7e396e4d":{"name":"X","size":23542271},
  //               "8dbdf26f38049dd9df4076b6d480ae61":{"name":"4","size":1348131},
  //               "0938dd2253a423799e7938dc892f1c04":{"name":"Y","size":3667352},
  //               "e53875ad4457fb4a0a894e31495449e6":{"name":"MT","size":19524},
  //           }
  //       }
  //   }
  // }
}
