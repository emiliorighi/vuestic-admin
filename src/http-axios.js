import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_PATH

const baseURL = 'https://ebp.biogenoma.cat/api'
const base = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-type': 'application/json',
  },
})
const submitInstance = axios.create({
  baseURL: baseURL,
})

const ncbi = axios.create({
  baseURL: 'https://api.ncbi.nlm.nih.gov/datasets/v1',
  headers: {
    'Content-type': 'application/json',
  },
})

const ena = {
  enaApi: axios.create({
    baseURL: 'https://www.ebi.ac.uk',
  }),

  submitXML(url, formData, auth) {
    return axios.post(url, formData, {
      auth: {
        username: auth.user,
        password: auth.password,
      },
    })
  },
}

export default {
  submission: submitInstance,
  base: base,
  ena: ena,
  ncbi: ncbi,
}
