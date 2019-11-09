import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'

Vue.use(Router)
// 静态 无论权限 均可访问
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    key: 'login',
    meta: {
      title: 'login',
      icon: 'international'
    },
    component: () => import('@/views/login/index')
  }
]
// 异步加载的路由
export const asyncRouterMap = [
  {
    path: '/faceManagement',
    component: Layout,
    name: 'faceManagement',
    alwaysShow: true,
    meta: {
      title: '人脸库管理'
    },
    children: [
      {
        path: '/',
        component: () => import('@/views/faceManagement/index'),
        name: 'query',
        meta: { title: '查询', icon: 'edit' },
        hidden: false
      },
      {
        path: 'details',
        component: () => import('@/views/faceManagement/details'),
        name: 'details',
        meta: {
          title: '详情',
          icon: 'list'
        }
      },
      {
        path: 'blackList',
        component: () => import('@/views/faceManagement/blackList'),
        name: 'blackList',
        meta: {
          title: '黑名单',
          icon: 'list'
        }
      }
    ]
  },
  {
    path: '/eventMange',
    component: Layout,
    name: 'eventMange',
    alwaysShow: true,
    meta: {
      title: '事件管理'
    },
    children: [{
      path: 'eventMange',
      name: 'eventMange',
      component: () => import('@/views/eventMange/index'),
      meta: {
        title: '事件列表',
        icon: 'tool'
      }
    },
    {
      path: 'eventDetail',
      name: 'eventDetail',
      component: () => import('@/views/eventMange/eventDetail'),
      meta: {
        title: '事件详情',
        icon: 'tool'
      }
    },
    {
      path: 'callpolice',
      name: 'callpolice',
      component: () => import('@/views/eventMange/callpolice'),
      meta: {
        title: '报警优先级低',
        icon: 'tool'
      }
    }

    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/equipmentManage',
    alwaysShow: true,
    meta: {
      title: '设备管理'
    },
    children: [{
      path: 'equipmentManage',
      name: 'equipmentManage',
      component: () => import('@/views/equipmentManage/index'),
      meta: {
        title: '设备管理',
        icon: 'tool'
      }
    },
    {
      path: 'detailPage',
      name: 'detailPage',
      component: () => import('@/views/equipmentManage/detailPage'),
      meta: {
        title: '设备详情',
        icon: 'tool'
      }
    }
    ]
  },
  {
    path: '/smartSearch',
    component: Layout,
    name: 'smartSearch',
    alwaysShow: true,
    meta: {
      title: '智能搜索'
    },
    children: [{
      path: 'smartSearch',
      name: 'smartSearch',
      component: () => import('@/views/smartSearch/index'),
      meta: {
        title: '智能搜索',
        icon: 'tool'
      }
    },
    {
      path: 'smartDetail',
      name: 'smartDetail',
      component: () => import('@/views/smartSearch/smartDetail'),
      meta: {
        title: '设备详情',
        icon: 'tool'
      }
    }]
  },
  {
    path: '/equipgroup',
    component: Layout,
    name: 'equipgroup',
    alwaysShow: true,
    meta: {
      title: '设备分组'
    },
    children: [{
      path: 'equipgroup',
      name: 'equipgroup',
      component: () => import('@/views/equipgroup/index'),
      meta: {
        title: '设备分组',
        icon: 'tool'
      }
    }
    ]
  }
]
export default new Router({
  // mode: 'history', // require service support
  routes: constantRouterMap
})
