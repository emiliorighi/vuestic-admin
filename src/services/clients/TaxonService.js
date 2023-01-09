import http from '../../http-axios'

const base = http.base

class TaxonService {
  getTaxon(name) {
    return base.get(`/taxons/${name}`)
  }
  searchTaxon(params) {
    return base.get('/taxons', { params: params })
  }
  getTaxonCoordinates(params) {
    return base.get('/coordinates/node', { params: params })
  }
  getTree(node) {
    return base.get(`/tree/${node}`)
  }
}

export default new TaxonService()
