import { defineStore } from 'pinia'
import { Contributor } from '../data/types'

const initSearchForm = {
  start_date: null,
  end_date: null,
  filter: null,
  filter_option: null,
  sort_column: null,
  sort_order: null,
  assembly_level: null,
  submitter: null,
}

const initPagination = {
  offset: 0,
  limit: 10,
}

export const useAssemblyStore = defineStore('assembly', {
  state: () => {
    return {
      submitters: [] as Contributor[],
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
