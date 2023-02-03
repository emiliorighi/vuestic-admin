import http from '../../http-axios'

const base = http.base

class BioProjectService {
  getBioProject(accession) {
    return base.get(`/bioprojects/${accession}`)
  }
  getBioprojects(params) {
    return base.get('/bioprojects', { params: params })
  }
  searchBioproject(params) {
    return base.get('/bioprojects', { params: params })
  }
  getBioProjectCoordinates(params) {
    return base.get('/coordinates/node', { params: params })
  }
}

export default new BioProjectService()
