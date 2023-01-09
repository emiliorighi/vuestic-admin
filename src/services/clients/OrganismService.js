import http from '../../http-axios'

const base = http.base

class OrganismService {
  getOrganismStats(params) {
    return base.get('/organisms/statistics', { params: params })
  }
  getOrganisms(params) {
    return base.get('/organisms', {
      params: params,
    })
  }
}

export default new OrganismService()
