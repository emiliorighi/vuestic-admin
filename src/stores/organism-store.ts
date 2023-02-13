import { defineStore } from 'pinia'
import { Contributor, BreadCrumb } from '../data/types'
import { OrganismSearchForm } from '../data/types'

const initSearchForm: OrganismSearchForm = {
  insdc_status: '',
  goat_status: '',
  parent_taxid: '',
  bioproject: '',
  target_list_status: '',
  filter: '',
  filter_option: '',
  sort_column: '',
  sort_order: '',
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
