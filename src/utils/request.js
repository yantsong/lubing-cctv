import Axios from 'axios'
import Router from '../router/index'
const baseURL = 'http://39.105.215.119:8089/'

const service = Axios.create(
  {
    baseURL,
    timeout: 5000,
    withCredentials: true // default
  }
)
service.interceptors.response.use(function(response) {
  // Do something with response data
  if (response.status === 403) {
    Router.push({ name: 'login' })
  } else {
    return response
  }
}, function(error) {
  // Do something with response error
  return Promise.reject(error)
})
export default service
