import http from '../../http-axios'

const base = http.base

class OrganismService {
  getOrganisms(params) {
    return base.get('/organisms', {
      params: params,
    })
  }

  getOrganism(taxid) {
    return base.get(`/organisms/${taxid}`)
  }

  getOrganismRelatedData(taxid, model) {
    return base.get(`/organisms/${taxid}/${model}`)
  }

  createOrganism(formData) {
    return base.post('/organisms', formData)
  }

  updateOrganism(taxid, formData) {
    return base.put(`/organisms/${taxid}`, formData)
  }

  deleteOrganism(taxid) {
    return base.delete(`/organisms/${taxid}`)
  }
}

export default new OrganismService()
