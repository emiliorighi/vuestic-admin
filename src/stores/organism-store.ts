import { defineStore } from 'pinia'
import { Contributor, BreadCrumb } from '../data/types'

const initSearchForm = {
  insdc_status: null,
  goat_status: null,
  parent_taxid: null,
  bioproject: null,
  target_list_status: null,
  filter: null,
  filter_option: null,
  sort_column: null,
  sort_order: null,
}

const initPagination = {
  offset: 0,
  limit: 10,
}

export const useOrganismStore = defineStore('organism', {
  state: () => {
    return {
      gals: [] as Contributor[],
      breadcrumbs: [] as BreadCrumb[],
      searchForm: { ...initSearchForm },
      pagination: { ...initPagination },
    }
  },

  actions: {
    resetForm() {
      this.searchForm = { ...initSearchForm }
    },
    resetPagination() {
      this.pagination = { ...initPagination }
    },
  },
})
