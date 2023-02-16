import http from '../../http-axios'

const base = http.base

const auth = http.submission

function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}

auth.interceptors.request.use(
  (config) => {
    config.headers = {
      'X-CSRF-TOKEN': getCookie('csrf_access_token'),
      'Content-Type': 'application/json',
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

auth.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (401 === error.response.status) {
      // const authStore = auth()
      // authStore.removeUser()
      // alert('Session expired!')
      // authStore.isLoading=false
      // authStore.showModal = true
      return
    } else {
      return Promise.reject(error)
    }
  },
)

class AuthService {
  login(payload) {
    return base.post('/login', payload)
  }
  logout() {
    return base.get('/logout')
  }
}

export default new AuthService()
