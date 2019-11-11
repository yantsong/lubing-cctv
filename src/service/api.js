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
  url: '/cctv/dface/searchFaceDB',
  method: 'post',
  data
})

export const login = data => http({
  url: '/cctv/user/login',
  method: 'post',
  data
})
