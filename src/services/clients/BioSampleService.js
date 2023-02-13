import http from '../../http-axios'

const base = http.base

class BioSampleService {
  getBioSamples(params) {
    return base.get('/biosamples', { params: params })
  }
  getBioSample(accession) {
    return base.get(`/biosamples/${accession}`)
  }
  importBioSample(accession) {
    return base.post(`/biosamples/${accession}`)
  }
  deleteBioSample(accession) {
    return base.delete(`/biosamples/${accession}`)
  }
}

export default new BioSampleService()
