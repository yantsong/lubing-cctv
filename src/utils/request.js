import axios from 'axios'
import {
  message
} from 'ant-design-vue'
import router from '../router'
// 创建axios实例
const request = axios.create({
  baseURL: "http://39.105.215.119:8089/", // api的base_url
  withCredentials: true,
  timeout: 55000, // 请求超时时间
})
var cookie=sessionStorage.getItem(cookie);
;
// request拦截器
request.interceptors.request.use(config => {
  request.headers = {
    'Access-Control-Allow-Origin': '*',
    "Cookie":cookie,
    'Content-type': 'application/json'
  };
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
request.interceptors.response.use(
  response => {
    console.log('response: ', response);
    
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    // var cookieValue=response.headers["Set-Cookie"]
    // 
    // if(cookieValue){
    //   sessionStorage.setItem('cookie',cookieValue[0])
    // }
    if (res.code == 'E10001') {
      message.error(res.msg,2,function(){
        
      })
      // if (res.msg == "未登录，不能访问") {
      //   setTimeout(() => {
      //     router.push('/login')
      //   }, 2000);
      // }
      return Promise.reject(res)
    }
    return res

  },
  error => {
    return Promise.reject(error)
  }
)

export default request
