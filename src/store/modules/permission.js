import { asyncRouterMap } from '@/router'
import router from '../../router'
import { whetherShowRoute } from '../../utils/common'
// 是否可以显示route , route没有meta标签可直接显示,route有meta,并且包含当前role可显示
const permission = {
  state: {
    asyncRouter: []
  },
  mutations: {
    GET_ASYNC_ROUTE_BY_ROLE: (state,role) => {
      const asyncRouter = rMap => rMap.filter(
        route => {
          if (route.children && route.children.length) {
            console.log(
              route.children,'--ccccc'
            )
            route.children = asyncRouter(route.children)
          }
          return whetherShowRoute(route,role)
        }
      )
      state.asyncRouter = asyncRouter(asyncRouterMap)
      // 添加异步路由
      console.log(asyncRouter(asyncRouterMap),'async')
      router.addRoutes(state.asyncRouter)
    }
  },
  actions: {
    getAsynceRouteByRole({ commit },role) {
      commit('GET_ASYNC_ROUTE_BY_ROLE',role)
    }
  }
}

export default permission
