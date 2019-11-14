// import Axios from 'axios'
// const baseURL = 'http://39.105.215.119:8089/'
// const request = Axios.create(
//   {
//     baseURL,
//     timeout: 5000
//   }
// )
// export default request
import Router from '../router/index'
import axios from 'axios'
import {
  message
} from 'ant-design-vue'
import router from '../router'
// 创建axios实例
const request = axios.create({
  baseURL: 'http://39.105.215.119:8089/', // api的base_url
  withCredentials: true,
  timeout: 55000 // 请求超时时间
})
// respone拦截器
request.interceptors.response.use(
  response => {
    // Router.push({ name: 'login' })

    /**
     * code为非20000是抛错 可结合自己业务进行修改
      */
    const res = response.data
    console.log(response)
    if (response.status===403) {
      Router.push({ name: 'login' })
    } else {
      return res
    }
    // if (res.code == 'E10001') {
    //   message.error(res.msg,2,function() {

    //   })
    //   // if (res.msg == "未登录，不能访问") {
    //   //   setTimeout(() => {
    //   //     router.push('/login')
    //   //   }, 2000);
    //   // }
    //   return Promise.reject(res)
    // }
  },
  error => {
    Router.push({ name: 'login' })
    return Promise.reject(error)
  }
)

export default request
