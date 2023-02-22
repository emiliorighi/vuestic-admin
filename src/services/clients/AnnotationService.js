import http from '../../http-axios'

const base = http.base

class AnnotationService {
  getAnnotations(params) {
    return base.get('/annotations', { params: params })
  }
  getAnnotation(name) {
    return base.get(`/annotations/${name}`)
  }
  createAnnotation(assemblyAccession) {
    return base.post(`/annotations/${assemblyAccession}`)
  }
  updateAnnotation(assemblyAccession, name) {
    return base.put(`/annotations/${assemblyAccession}/${name}`)
  }
  deleteAnnotation(name) {
    return base.delete(`/annotations/${name}`)
  }
}

export default new AnnotationService()
