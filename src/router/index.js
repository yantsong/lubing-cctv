import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'

Vue.use(Router)
// export const constantRouterMap = [
//   {
//     path: '/login',
//     component: Layout,
//     name: 'Login'
//   }
// ]
export const constantRouterMap = [
  {
    path: '/test1',
    component: Layout,
    redirect: '/test1/test-1',
    name: 'Test1',
    alwaysShow: true,
    meta: {
      title: '测试1'
    },
    children: [
      {
        path: 'test-1',
        component: () => import('@/views/test/test1'),
        name: 'Test-1',
        meta: { title: '测试-1', icon: 'edit' },
        hidden: true
      },
      {
        path: 'test-2',
        component: () => import('@/views/test/test2'),
        name: 'Test-2',
        meta: { title: '测试-2', icon: 'list' }
      }
    ]
  },
  {
    path: '/ceshi1',
    component: Layout,
    redirect: '/ceshi1/ceshi1',
    name: 'ceshi1',
    alwaysShow: true,
    meta: {
      title: '测试2',
      icon: 'international'
    },
    children: [
      {
        path: 'ceshi-1',
        component: () => import('@/views/ceshi1/ceshi1'),
        name: 'Ceshi-1',
        meta: { title: '测试-21', noCache: true },
        hidden: true
      },
      {
        path: 'ceshi-2',
        component: () => import('@/views/ceshi1/ceshi2'),
        name: 'YicaiList',
        meta: { title: '测试-22', icon: 'list' }
      }
    ]
  }
]
export default new Router({
  // mode: 'history', // require service support
  routes: constantRouterMap
})
