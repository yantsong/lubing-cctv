import store from '../store/index'
import router from '../router/index'
// mock get role
function getRole() {
  return new Promise(
    resolve => {
      // 在这里获取权限 可能是一个异步请求 也可能是读取cookie,以下为模拟异步请求
      setTimeout(() => {
        const mockRole = 0
        resolve(mockRole)
      }, 100)
    }
  )
}
// 拿到role数据,在vuex里,添加异步路由
getRole().then(
  res => {
    store.dispatch('getAsynceRouteByRole',res)
  }
)
