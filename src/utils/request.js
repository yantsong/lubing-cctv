import Axios from 'axios'
const baseURL = 'http://39.105.215.119:8089/'
const service = Axios.create(
  {
    baseURL,
    timeout: 5000
  }
)
export default service
