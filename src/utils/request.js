import Axios from 'axios'
const baseURL = 'http://39.105.215.119:8089/'

const service = Axios.create(
  {
    baseURL,
    timeout: 5000,
    withCredentials: true // default
  }
)
// service.interceptors.response.use(function(response) {
//   // Do something with response data
//   console.log(response, '111111')
//   return response
// }, function(error) {
//   console.log(error, 'aaaaa')
//   // Do something with response error
//   return Promise.reject(error)
// })
export default service
