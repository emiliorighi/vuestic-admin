import { defineStore } from 'pinia'
import { BreadCrumb, Contributor } from '../data/types'

const initSearchForm = {
  start_date: null,
  end_date: null,
  filter: null,
  filter_option: null,
  sort_column: null,
  sort_order: null,
  center: null,
}

const initPagination = {
  offset: 0,
  limit: 10,
}

export const useReadStore = defineStore('read', {
  state: () => {
    return {
      submitters: [] as Contributor[],
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
