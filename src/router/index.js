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
    path: '/eventMange',
    component: Layout,
    name:"eventMange",
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
    
  ],
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
    name:"smartSearch",
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
    }],
  },
  {
    path: '/equipgroup',
    component: Layout,
    name:"equipgroup",
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
   ],
  },
  {
    path: '/test1',
    component: Layout,
    redirect: '/test1/test-1',
    name: 'Test1',
    alwaysShow: true,
    meta: {
      title: '测试1'
    },
    children: [{
        path: 'test-1',
        component: () => import('@/views/test/test1'),
        name: 'Test-1',
        meta: {
          title: '测试-1',
          icon: 'edit'
        },
        hidden: true
      },
      {
        path: 'test-2',
        component: () => import('@/views/test/test2'),
        name: 'Test-2',
        meta: {
          title: '测试-2',
          icon: 'list'
        }
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
    children: [{
        path: 'ceshi-1',
        component: () => import('@/views/ceshi1/ceshi1'),
        name: 'Ceshi-1',
        meta: {
          title: '测试-21',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'ceshi-2',
        component: () => import('@/views/ceshi1/ceshi2'),
        name: 'YicaiList',
        meta: {
          title: '测试-22',
          icon: 'list'
        }
      }
    ]
  }
]
export default new Router({
  // mode: 'history', // require service support
  routes: constantRouterMap
})