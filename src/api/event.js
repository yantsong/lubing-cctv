// 关于event的api
import http from '../utils/request'

/**
 * @description: 事件列表
 * @param {Object} {exp:'xxx'}
 * @return: Promise
 */
export const getEventList = parmas => http({
  url: '/cctv/event/eventList',
  method: 'get',
  parmas
})

export const searchFaceDB = data => http({
  url: '/cctv/face/searchFaceDB',
  method: 'post',
  data
})
export const deleteFaceDB = data => http({
  url: '/cctv/face/deleteFaceDB',
  method: 'post',
  data
})
export const login = data => http({
  url: '/cctv/user/login',
  method: 'post',
  data
})

export const exportFace = data => http({
  url: '/cctv/face/export',
  method: 'post',
  data
})
