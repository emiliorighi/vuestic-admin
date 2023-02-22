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

  getOrganismLineage(taxid) {
    return base.get(`/organisms/${taxid}/lineage`)
  }

  getOrganismBioprojects(taxid) {
    return base.get(`/organisms/${taxid}/bioprojects`)
  }

  getOrganismRelatedData(taxid, model) {
    return base.get(`/organisms/${taxid}/${model}`)
  }
}

export default new OrganismService()
