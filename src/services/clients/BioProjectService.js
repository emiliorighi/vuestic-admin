import http from '../../http-axios'

const base = http.base

class BioProjectService {
  getBioProject(accession) {
    return base.get(`/bioprojects/${accession}`)
  }
  getBioProjectCoordinates(accession) {
    return base.get(`/bioprojects/${accession}/coordinates`)
  }
  getBioprojects(params) {
    return base.get('/bioprojects', { params: params })
  }
  searchBioproject(params) {
    return base.get('/bioprojects', { params: params })
  }
}

export default new BioProjectService()
