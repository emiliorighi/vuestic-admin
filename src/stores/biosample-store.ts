import { defineStore } from 'pinia'
import { Contributor, BreadCrumb } from '../data/types'

const initSearchForm = {
  start_date: null,
  end_date: null,
  filter: null,
  filter_option: null,
  sort_column: null,
  sort_order: null,
}

const initPagination = {
  offset: 0,
  limit: 10,
}

export const useBioSampleStore = defineStore('biosample', {
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
