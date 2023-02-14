import http from '../../http-axios'

const base = http.base

class TaxonService {
  getTaxon(name) {
    return base.get(`/taxons/${name}`)
  }
  getTaxonCoordinates(name) {
    return base.get(`/taxons/${name}/coordinates`)
  }
  getTaxons(params) {
    return base.get('/taxons', { params: params })
  }
  getTree(node) {
    return base.get(`/tree/${node}`)
  }
}

export default new TaxonService()
